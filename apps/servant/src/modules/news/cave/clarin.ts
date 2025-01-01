import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class ClarinSpider extends BaseSpider {
    name = 'Clarin';
    enName = 'Clarín';
    website = 'https://www.clarin.com';
    language = Language.SPANISH;
    country = '阿根廷';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto(this.website);

            const $ = cheerio.load(await page.content());

            const stroies = $('.module-grid:first-child div[class*=div]').toArray().slice(0, 6);

            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).find('.title').text(),
                        desc: $(item).find('.bottomSummary').text(),
                        url: $(item).closest('article').find('a').attr('href'),
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
                tag: 'Politics',
            },
            {
                path: 'economia',
                tag: 'Economy',
            },
            {
                path: 'mundo',
                tag: 'World',
            },
        ];

        for (let i = 0; i < subpages.length; i++) {
            // 美国
            try {
                await page.goto(`https://www.clarin.com/${subpages[i].path}`);

                const $ = cheerio.load(await page.content());

                const stroies = $('li article').toArray().slice(0, 8);

                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).find('.title').text(),
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
