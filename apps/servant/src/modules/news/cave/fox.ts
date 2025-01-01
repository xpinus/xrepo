import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';
export default class FoxSpider extends BaseSpider {
    name = '福克斯';
    enName = 'FOX';
    website = 'https://www.foxnews.com/';
    language = Language.ENGLISH;
    country = '美国';

    async _pull(page) {
        const pages = [
            {
                path: '',
                tag: '首页',
            },
            {
                path: 'us',
                tag: '美国',
            },
            {
                path: 'politics',
                tag: '政治',
            },
            {
                path: 'world',
                tag: '世界',
            },
        ];

        for (let i = 0; i < pages.length; i++) {
            try {
                await page.goto(`https://www.foxnews.com/${pages[i].path}`);

                const $ = cheerio.load(await page.content());

                const stroies = $('.main-content .info-header').toArray().slice(0, 10);

                stroies.forEach((item, index) => {
                    const tags = [pages[i].tag];

                    const meta = $(item).find('.meta a').text();
                    if (meta) {
                        tags.push(meta);
                    }

                    this.addNews(
                        {
                            title: $(item).find('.title a').text(),
                            desc: '',
                            url: $(item).find('.title a').attr('href'),
                        },
                        tags,
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
