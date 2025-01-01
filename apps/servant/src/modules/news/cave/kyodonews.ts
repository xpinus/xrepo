import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class KyodonewsSpider extends BaseSpider {
    name = '共同社';
    enName = 'kyodonews';
    website = 'https://www.kyodonews.jp/news/';
    language = Language.JAPANESE;
    country = '日本';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto(this.website);
            const $ = cheerio.load(await page.content());

            const stroies = $('#shuyo a').toArray();
            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).find('.title').text(),
                        desc: '',
                        url: $(item).attr('href'),
                    },
                    ['首页'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // await page.screenshot({ path: 'fp_myntra.png', fullPage: true });

        return this.newsList;
    }
}
