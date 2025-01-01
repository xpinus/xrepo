import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import ConnectSpider from './ConnectSpider';
import BaseSpider from './BaseSpider';

export default class ORIGOSpider extends BaseSpider {
    name = 'ORIGO';
    enName = 'ORIGO';
    website = 'https://www.origo.hu/';
    language = Language.HUNGARIAN;
    country = '匈牙利';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto(this.website);
            await page.waitForLoadState('networkidle');

            const $ = cheerio.load(await page.content());

            const stroies = $('.article-card-title').toArray().slice(0, 6);
            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).text(),
                        desc: $(item).next().text(),
                        url: $(item).closest('a').attr('href'),
                    },
                    ['首页', $(item).find('.tag-with-date').text()],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // await page.screenshot({ path: 'fp_myntra.png', fullPage: true });

        return this.newsList;
    }
}
