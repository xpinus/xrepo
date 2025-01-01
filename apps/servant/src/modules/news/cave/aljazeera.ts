import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class AljazeeraSpider extends BaseSpider {
    name = '半岛电视台';
    enName = 'aljazeera';
    website = 'https://www.aljazeera.com/';
    language = Language.ENGLISH;
    country = '卡塔尔';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto(this.website);
            const $ = cheerio.load(await page.content());

            const stroies = $('.trending-articles__list .article-trending__title a').toArray();
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

        // 美国大选
        try {
            await page.goto('https://www.aljazeera.com/us-election-2024');
            const $ = cheerio.load(await page.content());

            const stroies = $('.gc__content').toArray().slice(0, 5);
            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).find('.gc__title').text(),
                        desc: $(item).find('.gc__body-wrap').text(),
                        url: $(item).find('.gc__title a').attr('href'),
                    },
                    ['美国大选'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // await page.screenshot({ path: 'fp_myntra.png', fullPage: true });

        return this.newsList;
    }
}
