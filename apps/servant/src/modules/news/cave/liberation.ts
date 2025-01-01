import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class SueddeutscheSpider extends BaseSpider {
    name = '南德意志报';
    enName = 'Sueddeutsche';
    website = 'http://www.sueddeutsche.de';
    language = Language.GERMAN;
    country = '德国';

    async _pull(page) {
        // 首页新闻
        const subpages = [
            {
                path: 'http://www.sueddeutsche.de/wirtschaft',
                tag: '经济',
            },
            {
                path: 'http://www.sueddeutsche.de/politik',
                tag: '政治',
            },
        ];

        await page.goto(this.website);
        const $ = cheerio.load(await page.content());
        $('#product-navigation-swiper li a')
            .toArray()
            .slice(2, 5)
            .forEach((a) => {
                subpages.push({
                    path: $(a).attr('href'),
                    tag: $(a).text().trim(),
                });
            });

        for (let i = 0; i < subpages.length; i++) {
            try {
                await page.goto(subpages[i].path);

                const $ = cheerio.load(await page.content());

                let stroies = $('span[data-manual="teaser-title"]').toArray().slice(0, 4);
                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).text(),
                            desc: $(item).closest('h3').next().text(),
                            url: $(item).closest('article').find('a').attr('href'),
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
