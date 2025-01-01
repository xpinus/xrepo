import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class EltiempoSpider extends BaseSpider {
    name = 'Eltiempo';
    enName = 'El Tiempo';
    website = 'https://www.eltiempo.com';
    language = Language.SPANISH;
    country = '哥伦比亚';

    async _pull(page) {
        const subpages = [
            {
                path: '',
                tag: '首页',
            },
            {
                path: 'politica',
                tag: '政治',
            },
            {
                path: 'mundo',
                tag: '世界',
            },
        ];

        for (let i = 0; i < subpages.length; i++) {
            // 美国
            try {
                await page.goto(`https://www.eltiempo.com/${subpages[i].path}`);

                const $ = cheerio.load(await page.content());

                const stroies = $('.c-article__title').toArray().slice(0, 4);

                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).find('a').text(),
                            desc: $(item).next().text(),
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
