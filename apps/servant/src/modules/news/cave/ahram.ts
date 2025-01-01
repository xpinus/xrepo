import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class AhramSpider extends BaseSpider {
    name = '金字塔报';
    enName = 'Al-Ahram';
    website = 'https://www.ahram.org.eg';
    language = Language.ARABIC;
    country = '埃及';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto(this.website);
            const $ = cheerio.load(await page.content());

            const stroies = $('.carousel-item').toArray();
            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).find('a').text(),
                        desc: '',
                        url: $(item).find('a').attr('href'),
                    },
                    ['首页'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        //
        try {
            await page.goto('https://gate.ahram.org.eg/Portal/54/%D8%B9%D8%B1%D8%A8-%D9%88%D8%B9%D8%A7%D9%84%D9%85.aspx');
            const $ = cheerio.load(await page.content());

            const stroies = $('div[id^=ContentPlaceHolder1] .col-lg-9').toArray().slice(0, 10);
            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).find('a').text(),
                        desc: $(item).find('p').text(),
                        url: $(item).find('a').attr('href'),
                    },
                    ['最新'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // await page.screenshot({ path: 'fp_myntra.png', fullPage: true });

        return this.newsList;
    }
}
