import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class SMHSpider extends BaseSpider {
    name = '悉尼晨锋报';
    enName = 'The Sydney Morning Herald';
    website = 'https://www.smh.com.au/';
    language = Language.ENGLISH;
    country = '澳大利亚';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto(this.website);

            const $ = cheerio.load(await page.content());

            const stroies = $('section[data-an-cu-group="news-well"] div[data-testid="story-tile"]').toArray().slice(0, 5);

            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).find('h3 a').text(),
                        desc: $(item).find('h3').next().text(),
                        url: $(item).find('h3 a').attr('href'),
                    },
                    ['首页'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // 世界
        try {
            await page.goto('https://www.smh.com.au/world');

            const $ = cheerio.load(await page.content());

            const stroies = $('div[data-testid="story-tile"]').toArray().slice(0, 8);

            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).find('h3 a').text(),
                        desc: $(item).find('h3').next().text(),
                        url: $(item).find('h3 a').attr('href'),
                    },
                    ['世界'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // await page.screenshot({ path: 'fp_myntra.png', fullPage: true });

        return this.newsList;
    }
}
