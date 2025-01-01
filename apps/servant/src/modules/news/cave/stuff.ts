import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class StuffSpider extends BaseSpider {
    name = 'Stuff';
    enName = 'stuff';
    website = 'https://www.stuff.co.nz';
    language = Language.ENGLISH;
    country = '新西兰';

    async _pull(page) {
        const subpages = [
            {
                path: 'https://www.stuff.co.nz/',
                tag: ['首页'],
            },
            {
                path: 'https://www.stuff.co.nz/world-news',
                tag: ['世界'],
            },
        ];

        for (let i = 0; i < subpages.length; i++) {
            try {
                await page.goto(subpages[i].path);

                const $ = cheerio.load(await page.content());

                const stroies = $('.story-card-link').toArray().slice(0, 5);

                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).find('.article-title').text(),
                            desc: $(item).find('.stuff-intro-text-body').text(),
                            url: $(item).attr('href'),
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
