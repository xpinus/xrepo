import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class GuardianSpider extends BaseSpider {
    name = '卫报';
    enName = 'The Guardian';
    website = 'https://www.theguardian.com/world';
    language = Language.ENGLISH;
    country = '英国';

    async _pull(page) {
        const subpages = [];

        // world下的所有子页面
        await page.goto(this.website);

        const $ = cheerio.load(await page.content());

        const subItems = $('nav ul[role="list"] li a').toArray();
        subItems.slice(1, subItems.length - 2).forEach((a) => {
            subpages.push({
                path: $(a).attr('href'),
                tag: [$(a).text().trim()],
            });
        });

        for (let i = 0; i < subpages.length; i++) {
            try {
                await page.goto(`https://www.theguardian.com${subpages[i].path}`);

                const $ = cheerio.load(await page.content());

                const stroies = $('h3.card-headline').toArray().slice(0, 12);

                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).text(),
                            desc: '',
                            url: $(item).closest('li').find('a').attr('href'),
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
