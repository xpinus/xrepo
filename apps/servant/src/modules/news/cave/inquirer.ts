import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class InquirerSpider extends BaseSpider {
    name = '菲律宾每日问询报';
    enName = 'Philippine Daily Inquirer';
    website = 'https://globalnation.inquirer.net/';
    language = Language.ENGLISH;
    country = '菲律宾';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto(this.website);
            const $ = cheerio.load(await page.content());

            const stroies = $('div[id="cmr-info"]').toArray();
            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).find('h1').text() || $(item).find('h2').text(),
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
