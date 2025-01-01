import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class NytimesSpider extends BaseSpider {
    name = '纽约时报';
    enName = 'New york times';
    website = 'https://www.nytimes.com/';
    language = Language.ENGLISH;
    country = '美国';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto('https://www.nytimes.com/');

            const $ = cheerio.load(await page.content());

            const stroies = $('section.story-wrapper').toArray().slice(0, 10);

            stroies.forEach((item) => {
                this.addNews(
                    {
                        title: $(item).find('p.indicate-hover').text(),
                        desc: $(item).find('p.summary-class').text(),
                        url: $(item).find('a').attr('href'),
                    },
                    ['首页'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // 跳转到美国新闻页面
        try {
            await page.goto('https://www.nytimes.com/section/us');
            const $ = cheerio.load(await page.content());

            const stroies = $('ol[data-testid=asset-stream] li article').toArray().slice(0, 10);

            stroies.forEach((item) => {
                this.addNews(
                    {
                        title: $(item).find('h3').text(),
                        desc: $(item).children('p:eq(0)').text(),
                        url: $(item).find('a').attr('href'),
                    },
                    ['美国'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // 跳转到全球新闻页面
        try {
            await page.goto('https://www.nytimes.com/section/world');
            const $ = cheerio.load(await page.content());

            $('#collection-highlights-container ol li')
                .toArray()
                .forEach((item) => {
                    this.addNews(
                        {
                            title: $(item).find('a').text(),
                            desc: $(item).find('.story-body  p:eq(0)').text(),
                            url: $(item).find('a').attr('href'),
                        },
                        ['world'],
                    );
                });
        } catch (err) {
            console.log(err);
        }

        // await page.screenshot({ path: 'fp_myntra.png', fullPage: true });

        return this.newsList;
    }
}
