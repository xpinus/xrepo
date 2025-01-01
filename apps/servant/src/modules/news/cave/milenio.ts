import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class MilenioSpider extends BaseSpider {
    name = '千年';
    enName = 'Milenio';
    website = 'https://www.milenio.com';
    language = Language.SPANISH;
    country = '墨西哥';

    async _pull(page) {
        const pages = [
            {
                path: '',
                tag: '首页',
            },
            {
                path: 'politica',
                tag: '政治',
            },
            {
                path: 'internacional',
                tag: '世界',
            },
        ];

        for (let i = 0; i < pages.length; i++) {
            try {
                await page.goto(`https://www.milenio.com/${pages[i].path}`);

                const $ = cheerio.load(await page.content());

                const stroies = $('.board-module__a').toArray().slice(0, 8);

                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).text(),
                            desc: '',
                            url: $(item).attr('href'),
                        },
                        [pages[i].tag],
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
