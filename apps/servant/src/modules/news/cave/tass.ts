import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class TASSSpider extends BaseSpider {
    name = '塔斯社';
    enName = 'TASS';
    website = 'https://tass.ru/';
    language = Language.RUSSIAN;
    country = '俄罗斯';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto(this.website);

            const $ = cheerio.load(await page.content());

            const stroies = $('a[class*=tass_pkg_link] ').toArray().slice(0, 10);
            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title:
                            $(item).find('div[class*=tass_pkg_title_wrapper]').text() ||
                            $(item).find('span[class*=tass_pkg_title]').text(),
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
