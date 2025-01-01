import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class News24Spider extends BaseSpider {
    name = '新闻24';
    enName = 'News24';
    website = 'https://www.news24.com/news24/southafrica';
    language = Language.ENGLISH;
    country = '南非';

    async _pull(page) {
        const subpages = [
            {
                path: 'https://www.news24.com/news24/southafrica',
                tag: ['南非'],
            },
            {
                path: 'https://www.news24.com/news24/world',
                tag: ['世界'],
            },
        ];

        for (let i = 0; i < subpages.length; i++) {
            try {
                await page.goto(subpages[i].path);

                const $ = cheerio.load(await page.content());

                const stroies = $('.article-item--container').toArray().slice(0, 4);

                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).find('a[aria-label]').attr('aria-label'),
                            desc: $(item).find('.featured__content').text(),
                            url: $(item).find('a[aria-label]').attr('href'),
                        },
                        subpages[i].tag,
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
