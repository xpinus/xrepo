import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class PunchngSpider extends BaseSpider {
    name = '每日信使';
    enName = 'The Punch';
    website = 'https://punchng.com/topics/news/';
    language = Language.ENGLISH;
    country = '尼日利亚';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto(this.website);

            const $ = cheerio.load(await page.content());

            let stroies = $('.entry-title').toArray().slice(0, 6);
            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).text(),
                        desc: '',
                        url: $(item).find('a').attr('href'),
                    },
                    ['最新'],
                );
            });

            stroies = $('.top-news article .post-title').toArray();
            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).text(),
                        desc: '',
                        url: $(item).find('a').attr('href'),
                    },
                    ['热点'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // await page.screenshot({ path: 'fp_myntra.png', fullPage: true });

        return this.newsList;
    }
}
