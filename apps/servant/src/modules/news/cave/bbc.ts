import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class BBCSpider extends BaseSpider {
    name = 'BBC';
    enName = 'BBC';
    website = 'https://www.bbc.com/news';
    language = Language.ENGLISH;
    country = '英国';

    async _pull(page) {
        const subpages = [];

        // news下的所有子页面
        await page.goto(this.website);
        await page.waitForTimeout(500);

        const $ = cheerio.load(await page.content());

        const subItems = $('nav[data-testid="level2-navigation-container"] li a').toArray();
        subItems.slice(0, subItems.length - 3).forEach((a) => {
            subpages.push({
                path: $(a).attr('href'),
                tag: [$(a).text().trim()],
            });
        });

        for (let i = 0; i < subpages.length; i++) {
            try {
                await page.goto(`https://www.bbc.com${subpages[i].path}`);

                const $ = cheerio.load(await page.content());

                const stroies = $('div[data-testid="card-text-wrapper"]').toArray().slice(0, 12);

                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).find('h2').text(),
                            desc: $(item).find('p[data-testid="card-description"]').text(),
                            url: $(item).closest('a').attr('href'),
                        },
                        subpages[i].tag,
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
