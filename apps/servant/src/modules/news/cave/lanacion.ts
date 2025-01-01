import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class LanacionSpider extends BaseSpider {
    name = 'Lanacion';
    enName = 'La Nación';
    website = 'https://www.lanacion.com.ar';
    language = Language.SPANISH;
    country = '阿根廷';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto(this.website);

            const $ = cheerio.load(await page.content());

            const stroies = $('.grid-item > article .description-container').toArray().slice(0, 7);

            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).find('.title').text(),
                        desc: $(item).find('.subhead').text(),
                        url: $(item).closest('a').attr('href'),
                    },
                    ['首页'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // Política
        // Economía
        // Mundo
        const subpages = [
            {
                path: 'politica',
                tag: '政治',
            },
            {
                path: 'el-mundo',
                tag: '世界',
            },
        ];

        for (let i = 0; i < subpages.length; i++) {
            // 美国
            try {
                await page.goto(`https://www.lanacion.com.ar/${subpages[i].path}`);

                const $ = cheerio.load(await page.content());

                const stroies = $('h2.com-title').toArray().slice(0, 4);

                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).text(),
                            desc: '',
                            url: $(item).find('a').attr('href'),
                        },
                        [subpages[i].tag],
                    );
                });
            } catch (err) {
                console.log(err);
            }
        }

        // await page.screenshot({ path: 'fp_myntra.png', fullPage: true });

        return this.newsList;
    }
}
