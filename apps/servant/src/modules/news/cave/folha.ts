import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';
import { Language } from '@/utils';

export default class FolhaSpider extends BaseSpider {
    name = '环球报';
    enName = 'Folha de S.Paulo';
    website = 'https://www1.folha.uol.com.br';
    language = Language.PORTUGUESE;
    country = '巴西';

    async _pull(page) {
        const pages = [
            {
                path: '',
                tag: '首页',
            },
            {
                path: 'poder',
                tag: '政治',
            },
            {
                path: 'mundo',
                tag: '世界',
            },
        ];

        for (let i = 0; i < pages.length; i++) {
            try {
                await page.goto(`https://www1.folha.uol.com.br/${pages[i].path}`);

                const $ = cheerio.load(await page.content());

                const stroies = $('h2[class*=headline__title]').toArray().slice(0, 8);

                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).text(),
                            desc: $(item).next().text(),
                            url: $(item).closest('a').attr('href'),
                        },
                        [pages[i].tag],
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
