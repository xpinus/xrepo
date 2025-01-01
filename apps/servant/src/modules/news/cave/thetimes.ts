import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class ThetimesSpider extends BaseSpider {
    name = '泰晤士报';
    enName = 'The Times';
    website = 'https://www.thetimes.com/world';
    language = Language.ENGLISH;
    country = '英国';

    async _pull(page) {
        const subpages = [
            {
                path: '/uk/politics',
                tag: ['政治'],
            },
        ];

        // world下的所有子页面
        await page.goto(this.website);

        const $ = cheerio.load(await page.content());

        const subItems = $('div[aria-label="Secondary Navigation"] li a').toArray();
        subItems.slice(1, subItems.length).forEach((a) => {
            subpages.push({
                path: $(a).attr('href'),
                tag: [$(a).text().trim()],
            });
        });

        for (let i = 0; i < subpages.length; i++) {
            try {
                await page.goto(`https://www.thetimes.com${subpages[i].path}`);

                const $ = cheerio.load(await page.content());

                const top = $('div[data-testid="lead-article-content"]').toArray()[0];
                this.addNews(
                    {
                        title: $($(top).find('a').toArray()[0]).text(),
                        desc: $($(top).find('a').toArray()[1]).text(),
                        url: $(top).find('a').attr('href'),
                    },
                    subpages[i].tag,
                );

                const stroies = $('a.article-headline').toArray().slice(2, 8);

                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).text(),
                            desc: '',
                            url: $(item).attr('href'),
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
