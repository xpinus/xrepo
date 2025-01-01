import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class HaaretzSpider extends BaseSpider {
    name = '哈雷茨';
    enName = 'Haaretz';
    website = 'https://www.haaretz.com/israel-news';
    language = Language.ENGLISH;
    country = '以色列';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto(this.website);
            const $ = cheerio.load(await page.content());

            const stroies = $('article .jm a').toArray().slice(0, 10);
            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).text(),
                        desc: '',
                        url: $(item).attr('href'),
                    },
                    ['TOP'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // await page.screenshot({ path: 'fp_myntra.png', fullPage: true });

        return this.newsList;
    }
}
