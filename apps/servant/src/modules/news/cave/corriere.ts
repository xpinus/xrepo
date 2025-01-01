import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class CorriereSpider extends BaseSpider {
    name = '晚邮报';
    enName = 'corriere';
    website = 'https://www.corriere.it/';
    language = Language.ITALIAN;
    country = '意大利';

    async _pull(page) {
        try {
            await page.goto(this.website);
            const $ = cheerio.load(await page.content());

            const stroies = $('.media-news__content').toArray().slice(0, 8);
            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).find('h4').text(),
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
