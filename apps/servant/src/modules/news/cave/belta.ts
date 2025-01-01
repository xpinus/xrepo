import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class BelTASpider extends BaseSpider {
    name = '白俄罗斯新闻';
    enName = 'BelTA';
    website = 'https://www.belta.by';
    language = Language.RUSSIAN;
    country = '白俄罗斯';

    async _pull(page) {
        // 首页新闻
        const subpages = [
            {
                path: 'https://belta.by/president/',
                tag: '总统',
            },
            {
                path: 'https://belta.by/politics/',
                tag: '政治',
            },
            {
                path: 'https://belta.by/economics/',
                tag: '经济',
            },
            {
                path: 'https://belta.by/world/',
                tag: '世界',
            },
        ];

        for (let i = 0; i < subpages.length; i++) {
            try {
                await page.goto(subpages[i].path);

                const $ = cheerio.load(await page.content());

                const stroies = $('.content a[class*=news]').toArray().slice(1, 4);
                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).attr('title'),
                            desc: '',
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
