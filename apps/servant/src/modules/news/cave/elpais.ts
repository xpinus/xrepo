import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';
import path from 'path';

export default class ElpaisSpider extends BaseSpider {
    name = '国家报';
    enName = 'elpais';
    website = 'http://www.sueddeutsche.de';
    language = Language.SPANISH;
    country = '西班牙';

    async _pull(page) {
        // 首页新闻
        const subpages = [
            {
                path: 'https://elpais.com/america/?ed=ame',
                tag: '美国',
            },
            {
                path: 'https://elpais.com/?ed=es',
                tag: '西班牙',
            },
            {
                path: 'https://elpais.com/us/?ed=us',
                tag: '美国',
            },
        ];

        for (let i = 0; i < subpages.length; i++) {
            try {
                await page.goto(subpages[i].path);

                const $ = cheerio.load(await page.content());

                const stroies = $('article').toArray().slice(0, 6);
                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).find('header').text(),
                            desc: $(item).find('p').text(),
                            url: $(item).find('header a').attr('href'),
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
