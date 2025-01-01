import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import { type Page } from 'playwright';
import ConnectSpider from './ConnectSpider';

class WsjSpider extends ConnectSpider {
    name = '华尔街日报';
    enName = 'Wall Street Journal';
    website = 'https://www.wsj.com/';
    language = Language.ENGLISH;
    country = '美国';

    async _pull(page: Page) {
        // 首页新闻
        try {
            await page.goto(this.website);
            console.log(await page.title());

            const $ = cheerio.load(await page.content());

            const stroies = $('div[class*="headline"]').toArray().slice(0, 10);

            stroies.forEach((item, index) => {
                if (index === 0) return;

                this.addNews(
                    {
                        title: $(item).find('a').text(),
                        desc: $(item).next().find('span[class*=summaryText]').text(),
                        url: $(item).find('a').attr('href'),
                    },
                    ['首页'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // World
        try {
            await page.goto('https://www.wsj.com/world');

            await page.waitForSelector('a[aria-label="WSJ Logo"]', {
                timeout: 10000,
            });

            const $ = cheerio.load(await page.content());

            const stroies = $('div[class*="HeadlineTextBlock"]').toArray().slice(0, 21);

            stroies.forEach((item) => {
                this.addNews(
                    {
                        title: $(item).text(),
                        desc: $(item).parent().parent().find('a').text(),
                        url: $(item).parent().attr('href'),
                    },
                    ['世界'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // 美国
        try {
            await page.goto('https://www.wsj.com/us-news');
            const $ = cheerio.load(await page.content());

            const stroies = $('div[class*="HeadlineTextBlock"]').toArray().slice(0, 4);

            stroies.forEach((item) => {
                this.addNews(
                    {
                        title: $(item).text(),
                        desc: $(item).parent().parent().find('a').text(),
                        url: $(item).parent().attr('href'),
                    },
                    ['美国'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // Politics
        try {
            await page.goto('https://www.wsj.com/politics');
            const $ = cheerio.load(await page.content());

            const stroies = $('div[class*="HeadlineTextBlock"]').toArray().slice(0, 4);

            stroies.forEach((item) => {
                this.addNews(
                    {
                        title: $(item).text(),
                        desc: $(item).parent().parent().find('a').text(),
                        url: $(item).parent().attr('href'),
                    },
                    ['Politics'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // Economy
        try {
            await page.goto('https://www.wsj.com/economy');
            const $ = cheerio.load(await page.content());

            const stroies = $('div[class*="HeadlineTextBlock"]').toArray().slice(0, 10);

            stroies.forEach((item) => {
                this.addNews(
                    {
                        title: $(item).text(),
                        desc: $(item).parent().parent().find('a').text(),
                        url: $(item).parent().attr('href'),
                    },
                    ['Economy'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // await page.screenshot({ path: 'fp_myntra.png', fullPage: true });

        return this.newsList;
    }
}

export default WsjSpider;
