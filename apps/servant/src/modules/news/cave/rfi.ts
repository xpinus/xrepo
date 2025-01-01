import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class RFISpider extends BaseSpider {
    name = '法新社';
    enName = 'rfi';
    website = 'https://www.rfi.fr';
    language = Language.FRENCH;
    country = '法国';

    async _pull(page) {
        const languages = [
            {
                tag: '英文网',
                lan: 'en',
                language: Language.ENGLISH,
                subpage: ['france', 'africa', 'international'],
            },
            {
                tag: '中文网',
                lan: 'cn',
                language: Language.CHINESE,
                subpage: ['中国', '港澳台', '法国', '亚洲', '美洲', '欧洲', '中东'],
            },
            {
                tag: '法语网',
                lan: 'fr',
                language: Language.FRENCH,
                subpage: ['europe', 'amériques', 'france', 'moyen-orient', 'asie-pacifique'],
            },
        ];

        for (let i = 0; i < languages.length; i++) {
            const { tag, lan, language, subpage } = languages[i];

            subpage.push('');
            for (let j = 0; j < subpage.length; j++) {
                const path = subpage[j];
                try {
                    await page.goto(`https://www.rfi.fr/${lan}/${path}`);
                    const $ = cheerio.load(await page.content());

                    const stroies = $('.article__infos')
                        .toArray()
                        .slice(0, i === 0 ? 8 : 4);
                    stroies.forEach((item, index) => {
                        this.addNews(
                            {
                                title: $(item).find('.article__title').text(),
                                desc: '',
                                url: $(item).find('a').attr('href'),
                            },
                            [tag, path ?? '首页', $(item).find('.a-tag').text()],
                            language,
                        );
                    });
                } catch (e) {
                    console.log(e);
                }
            }

            try {
                await page.goto(`https://www.rfi.fr/${lan}/live-news/`);
                const $ = cheerio.load(await page.content());

                const stroies = $('.article__title').toArray();
                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).text(),
                            desc: '',
                            url: $(item).find('a').attr('href'),
                        },
                        [tag, $(item).find('.a-tag').text()],
                        language,
                    );
                });
            } catch (e) {
                console.log(e);
            }
        }

        // await page.screenshot({ path: 'fp_myntra.png', fullPage: true });

        return this.newsList;
    }
}
