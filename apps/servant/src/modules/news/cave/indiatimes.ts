import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class IndiatimesSpider extends BaseSpider {
    name = '印度时报';
    enName = 'The Times of India';
    website = 'https://timesofindia.indiatimes.com/';
    language = Language.ENGLISH;
    country = '印度';

    async _pull(page) {
        const subpages = [
            {
                path: 'https://timesofindia.indiatimes.com/world',
                tag: ['国际'],
            },
            {
                path: 'https://timesofindia.indiatimes.com/india',
                tag: ['印度'],
            },
        ];

        for (let i = 0; i < subpages.length; i++) {
            try {
                await page.goto(subpages[i].path);

                const $ = cheerio.load(await page.content());

                const stroies = $('.WavNE')
                    .toArray()
                    .slice(0, (i + 1) * 5);

                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).text(),
                            desc: $(item).next().text(),
                            url: $(item).closest('a').attr('href'),
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
