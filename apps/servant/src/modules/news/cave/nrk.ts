import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class NRKSpider extends BaseSpider {
    name = '挪威国家广播公司';
    enName = 'NRK';
    website = 'https://www.nrk.no/nyheter/';
    language = Language.NORWEGIAN;
    country = '挪威';

    async _pull(page) {
        try {
            await page.goto(this.website);

            const $ = cheerio.load(await page.content());

            const stroies = $('li article').toArray().slice(0, 6);
            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).find('.bulletin-title').text(),
                        desc: $(item).find('.bulletin-text-body').text(),
                        url: 'https://www.nrk.no/nyheter/',
                    },
                    [$(item).find('.bulletin-compilations').text()],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // await page.screenshot({ path: 'fp_myntra.png', fullPage: true });

        return this.newsList;
    }
}
