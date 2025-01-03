import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class GuanChaSpider extends BaseSpider {
    name = '观察者网';
    enName = 'GuanCha';
    website = 'https://www.guancha.cn/internation?s=dhguoji';
    language = Language.CHINESE;
    country = '中国';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto(this.website);
            const $ = cheerio.load(await page.content());

            let stroies = $('.new-header-list h4 a').toArray();
            stroies = stroies.concat($('li.middle .module-title a').toArray().slice(0, 10));
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