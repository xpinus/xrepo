import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class PeninsulaSpider extends BaseSpider {
    name = '半岛报';
    enName = 'Peninsula';
    website = 'https://thepeninsulaqatar.com/category/world';
    language = Language.ENGLISH;
    country = '卡塔尔';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto(this.website);
            const $ = cheerio.load(await page.content());

            const stroies = $('a.title').toArray().slice(0, 5);
            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).text(),
                        desc: '',
                        url: $(item).attr('href'),
                    },
                    ['国际'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // await page.screenshot({ path: 'fp_myntra.png', fullPage: true });

        return this.newsList;
    }
}
