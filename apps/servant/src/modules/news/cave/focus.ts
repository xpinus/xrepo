import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class FocusSpider extends BaseSpider {
    name = '焦点周刊';
    enName = 'Focus';
    website = 'https://www.focus.de';
    language = Language.GERMAN;
    country = '德国';

    async _pull(page) {
        // 首页新闻
        const subpages = [
            {
                path: 'https://www.focus.de/finanzen/',
                tag: '经济',
            },
            {
                path: 'https://www.focus.de/politik',
                tag: '政治',
            },
        ];

        for (let i = 0; i < subpages.length; i++) {
            try {
                await page.goto(subpages[i].path);

                const $ = cheerio.load(await page.content());

                const stroies = $('article').toArray().slice(0, 10);
                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).find('h3').text(),
                            desc: $(item).find('.right p').text(),
                            url: $(item).find('a').attr('href'),
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
