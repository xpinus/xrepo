import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class ChosunSpider extends BaseSpider {
    name = '朝鲜日报';
    enName = 'Chosun';
    website = 'https://www.chosun.com/';
    language = Language.KOREAN;
    country = '韩国';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto(this.website);
            const $ = cheerio.load(await page.content());

            const stroies = $('.story-card').toArray().slice(0, 8);
            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).find('a.story-card__headline').text(),
                        desc: $(item).find('.story-card__deck').text(),
                        url: $(item).find('a.story-card__headline').attr('href'),
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
