import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class CNNSpider extends BaseSpider {
    name = 'CNN';
    enName = 'CNN';
    website = 'https://www.cnn.com/';
    language = Language.ENGLISH;
    country = '美国';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto(this.website);

            const $ = cheerio.load(await page.content());

            const stroies = $('.zone-2-observer .container__headline-text').toArray().slice(0, 12);

            stroies.forEach((item, index) => {
                if (index === 1) return;

                this.addNews(
                    {
                        title: $(item).text(),
                        desc: '',
                        url: $(item).closest('a').attr('href'),
                    },
                    ['首页'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        const subpages = [
            {
                path: 'us',
                tag: '美国',
            },
            {
                path: 'world',
                tag: 'World',
            },
            {
                path: 'world/china',
                tag: 'China',
            },
            {
                path: 'politics',
                tag: 'Politics',
            },
        ];

        for (let i = 0; i < subpages.length; i++) {
            // 美国
            try {
                await page.goto(`https://www.cnn.com/${subpages[i].path}`);

                const $ = cheerio.load(await page.content());

                const stroies = $('.zone[data-collapsed-text]:first-child .container__headline-text').toArray().slice(0, 8);

                stroies.forEach((item, index) => {
                    if (index === 1) return;

                    this.addNews(
                        {
                            title: $(item).text(),
                            desc: '',
                            url: $(item).closest('a').attr('href'),
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
