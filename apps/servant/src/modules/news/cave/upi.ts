import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class UPISpider extends BaseSpider {
    name = '合众国际社';
    enName = 'UPI';
    website = 'https://www.upi.com/';
    language = Language.ENGLISH;
    country = '美国';

    async _pull(page) {
        const subpages = [
            {
                path: 'https://www.upi.com/Top_News/World-News/',
                tag: ['世界'],
            },
            {
                path: 'https://www.upi.com/Top_News/US/',
                tag: ['美国'],
            },
        ];

        for (let i = 0; i < subpages.length; i++) {
            try {
                await page.goto(subpages[i].path);

                const $ = cheerio.load(await page.content());

                let stroies = $('.container a[title][onclick]').toArray();
                stroies = stroies.concat($('.story.list a[title]').toArray().slice(0, 4));

                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).find('.title').text(),
                            desc: $(item).find('.content').text(),
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
