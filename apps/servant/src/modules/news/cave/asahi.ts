import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class AsahiSpider extends BaseSpider {
    name = '朝日新闻';
    enName = 'Asahi Shimbun';
    website = 'https://www.asahi.com/international/';
    language = Language.JAPANESE;
    country = '日本';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto(this.website);
            const $ = cheerio.load(await page.content());

            const stroies = $('.Section h4').toArray();
            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).text(),
                        desc: '',
                        url: $(item).find('a').attr('href') || $(item).closest('a').attr('href'),
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
