import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import ConnectSpider from './ConnectSpider';

export default class BloombergSpider extends ConnectSpider {
    name = '彭博社';
    enName = 'Bloomberg';
    website = 'http://www.bloomberg.com/';
    language = Language.ENGLISH;
    country = '美国';

    async _pull(page) {
        const subpages = [
            {
                path: 'https://www.bloomberg.com/',
                tag: ['世界'],
            },
            {
                path: 'https://www.bloomberg.com/economics',
                tag: ['经济'],
            },
            {
                path: 'https://www.bloomberg.com/politics',
                tag: ['政治'],
            },
        ];

        for (let i = 0; i < subpages.length; i++) {
            try {
                await page.goto(subpages[i].path);

                const $ = cheerio.load(await page.content());

                const stroies = $('a[class*=StoryBlock_storyLink]').toArray().slice(0, 10);

                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).find('div[class*=Headline]').text(),
                            desc: $(item).find('section').text(),
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
