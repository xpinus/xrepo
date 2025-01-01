import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class GlobalNewsSpider extends BaseSpider {
    name = '全球电视网';
    enName = 'Global News';
    website = 'https://globalnews.ca';
    language = Language.ENGLISH;
    country = '加拿大';

    async _pull(page) {
        const pages = [
            {
                path: '',
                tag: '首页',
            },
            {
                path: 'canada',
                tag: '加拿大',
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
                await page.goto(`https://globalnews.ca/${pages[i].path}`);

                const $ = cheerio.load(await page.content());

                const stroies = $('.l-section__main div[class*=headline]').toArray().slice(0, 8);

                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).text(),
                            desc: $(item).find('.description').text(),
                            url: $(item).closest('a').attr('href'),
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
