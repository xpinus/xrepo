import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class RTSpider extends BaseSpider {
    name = '俄罗斯今日';
    enName = 'RT';
    website = 'https://www.rt.com';
    language = Language.RUSSIAN;
    country = '俄罗斯';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto(this.website);
            await page.waitForLoadState('networkidle');

            const $ = cheerio.load(await page.content());

            const stroies = $('.main-promobox__list li').toArray().slice(0, 10);
            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).find('.main-promobox__link').text(),
                        desc: $(item).find('.main-promobox__summary').text(),
                        url: $(item).find('.main-promobox__link').closest('a').attr('href'),
                    },
                    ['首页'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        const subpages = [
            {
                path: 'https://www.rt.com/news/',
                tag: 'World',
            },
            {
                path: 'https://www.rt.com/india/',
                tag: 'India',
            },
        ];

        for (let i = 0; i < subpages.length; i++) {
            try {
                await page.goto(subpages[i].path);

                const $ = cheerio.load(await page.content());

                let stroies = $('.list-card__content--title').toArray().slice(0, 6);
                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).text(),
                            desc: '',
                            url: $(item).find('a').attr('href') || $(item).closest('a').attr('href'),
                        },
                        [subpages[i].tag],
                    );
                });

                stroies = $('a[data-manual*="teaser-url"][aria-label]').toArray().slice(0, 4);
                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).closest('article').find('span[data-manual="teaser-title"]').text(),
                            desc: $(item).closest('article').find('p[data-manual="teaser-text"]').text(),
                            url: $(item).attr('href'),
                        },
                        [subpages[i].tag],
                    );
                });
            } catch (err) {
                console.log(err);
            }
        }

        // await page.screenshot({ path: 'fp_myntra.png', fullPage: true });

        return this.newsList;
    }
}
