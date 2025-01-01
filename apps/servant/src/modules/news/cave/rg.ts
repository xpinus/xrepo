import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class RGSpider extends BaseSpider {
    name = '俄罗斯报';
    enName = 'Rossiyskaya Gazeta';
    website = 'https://rg.ru';
    language = Language.RUSSIAN;
    country = '俄罗斯';

    async _pull(page) {
        // 首页新闻
        const subpages = [
            {
                path: 'https://rg.ru/tema/gos',
                tag: '权力',
            },
            {
                path: 'https://rg.ru/rf',
                tag: '俄罗斯地区',
            },
            {
                path: 'https://rg.ru/tema/mir',
                tag: '世界',
            },
        ];

        for (let i = 0; i < subpages.length; i++) {
            try {
                await page.goto(subpages[i].path);

                const $ = cheerio.load(await page.content());

                const stroies = $('[class^=ItemOfListStandard_wrapper]').toArray().slice(0, 6);
                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).find('[class^=ItemOfListStandard_title]').text(),
                            desc: '',
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
