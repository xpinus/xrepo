import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class APSpider extends BaseSpider {
    name = '美联社';
    enName = 'AP';
    website = 'https://apnews.com/';
    language = Language.ENGLISH;
    country = '美国';

    async _pull(page) {
        const subpages = [
            {
                path: 'https://apnews.com/politics',
                tag: ['政治'],
            },
            {
                path: 'https://apnews.com/us-news',
                tag: ['美国'],
            },
            {
                path: 'https://apnews.com/hub/election-2024',
                tag: ['Election-2024'],
            },
        ];

        // World下的所有子页面
        await page.goto(this.website);

        const $ = cheerio.load(await page.content());

        $('.MainNavigation-items li:first-child .Subheader-Sections-items a')
            .toArray()
            .forEach((a) => {
                subpages.push({
                    path: $(a).attr('href'),
                    tag: ['世界', $(a).text().trim()],
                });
            });

        for (let i = 0; i < subpages.length; i++) {
            try {
                await page.goto(subpages[i].path);

                const $ = cheerio.load(await page.content());

                const stroies = $('main .PagePromo-title').toArray().slice(0, 12);

                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).text(),
                            desc: $(item).closest('.PagePromo-content').find('.PagePromo-description').text(),
                            url: $(item).find('a').attr('href'),
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
