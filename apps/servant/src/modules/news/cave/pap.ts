import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class PAPSpider extends BaseSpider {
    name = '波兰新闻社';
    enName = 'pap.pl';
    website = 'https://www.pap.pl/';
    language = Language.POLISH;
    country = '波兰';

    async _pull(page) {
        // 首页新闻
        const subpages = [
            {
                path: 'https://www.pap.pl/kraj',
                tag: '波兰',
            },
            {
                path: 'https://www.pap.pl/swiat',
                tag: '国际',
            },
        ];

        for (let i = 0; i < subpages.length; i++) {
            try {
                await page.goto(subpages[i].path);

                const $ = cheerio.load(await page.content());

                let stroies = $('.title a').toArray().slice(0, 4);
                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).text(),
                            desc: '',
                            url: $(item).attr('href'),
                        },
                        [subpages[i].tag],
                    );
                });

                stroies = $('a[data-manual*="teaser-url"][aria-label]').toArray().slice(0, 4);
                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).closest('article').find('span[data-manual="teaser-title"]').text(),
                            desc: $(item).closest('article').find('p[data-manual="teaser-text"]').text(),
                            url: $(item).attr('href'),
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
