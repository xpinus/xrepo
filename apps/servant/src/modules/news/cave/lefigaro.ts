import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class LiberationSpider extends BaseSpider {
    name = '解放报';
    enName = 'liberation';
    website = 'https://www.liberation.fr';
    language = Language.FRENCH;
    country = '法国';

    async _pull(page) {
        // 首页新闻
        const subpages = [
            {
                path: 'https://www.liberation.fr/international/asie-pacifique/',
                tag: '亚太',
            },
            {
                path: 'https://www.liberation.fr/international/moyen-orient/',
                tag: '中东',
            },
            {
                path: 'https://www.liberation.fr/international/europe/',
                tag: '欧洲',
            },
        ];

        for (let i = 0; i < subpages.length; i++) {
            try {
                await page.goto(subpages[i].path);

                const $ = cheerio.load(await page.content());

                const stroies = $('article').toArray().slice(0, 8);
                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).find('h2').text(),
                            desc: $(item).find('.description-text').text(),
                            url: $(item).find('h2').closest('a').attr('href'),
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
