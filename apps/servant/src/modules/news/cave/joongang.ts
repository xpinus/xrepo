import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class JoongAngSpider extends BaseSpider {
    name = '中央日报';
    enName = 'JoongAng';
    website = 'https://www.joongang.co.kr/politics';
    language = Language.KOREAN;
    country = '韩国';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto(this.website);
            const $ = cheerio.load(await page.content());

            const stroies = $('.rank_list h2').toArray();
            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).text(),
                        desc: '',
                        url: $(item).find('a').attr('href'),
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
