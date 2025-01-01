import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class WashingtonpostSpider extends BaseSpider {
    name = '华盛顿邮报';
    enName = 'Washington post';
    website = 'https://www.washingtonpost.com/';
    language = Language.ENGLISH;
    country = '美国';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto('https://www.washingtonpost.com/');

            const $ = cheerio.load(await page.content());

            const stroies = $('.card.relative').toArray().slice(0, 12);

            stroies.forEach((item, index) => {
                if (index === 1) return;

                this.addNews(
                    {
                        title: $(item).find('.headline a span').text(),
                        desc: $(item).find('.headline').next().find('a span').text(),
                        url: $(item).find('.headline a').attr('href'),
                    },
                    ['首页'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // 政治
        try {
            await page.goto('https://www.washingtonpost.com/politics/');
            const $ = cheerio.load(await page.content());

            const navs = $('nav[aria-label="Section"]').find('a').toArray();

            for (let i = 0; i < navs.length; i++) {
                const nav = navs[i];
                const navName = $(nav).text();
                await page.goto($(nav).attr('href'));

                const _$ = cheerio.load(await page.content());

                let stroies = _$('.headline').toArray().slice(0, 9);
                if (stroies.length === 0) {
                    stroies = _$('.story-headline').toArray().slice(0, 6);
                }
                stroies.forEach((item) => {
                    this.addNews(
                        {
                            title: _$(item).find('a').text(),
                            desc: _$(item).next().find('a').text(),
                            url: _$(item).find('a').attr('href'),
                        },
                        ['politics', navName],
                    );
                });
            }
        } catch (err) {
            console.log(err);
        }

        // await page.screenshot({ path: 'fp_myntra.png', fullPage: true });

        return this.newsList;
    }
}
