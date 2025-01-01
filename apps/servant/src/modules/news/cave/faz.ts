import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class FAZSpider extends BaseSpider {
    name = '法兰克福汇报';
    enName = 'FAZ';
    website = 'https://www.faz.net/aktuell/';
    language = Language.GERMAN;
    country = '德国';

    async _pull(page) {
        // 首页新闻
        const subpages: any = [
            {
                path: 'https://www.faz.net/aktuell/wirtschaft/',
                tag: '经济',
            },
        ];

        await page.goto('https://www.faz.net/politik');
        const $ = cheerio.load(await page.content());
        let deps = $('.department-head__subdepartments a').toArray();
        deps = deps.slice(0, deps.length - 4);
        deps.forEach((a) => {
            subpages.push({
                path: $(a).attr('href'),
                tag: ['Politics', $(a).text().trim()],
            });
        });

        for (let i = 0; i < subpages.length; i++) {
            try {
                await page.goto(subpages[i].path);

                const $ = cheerio.load(await page.content());

                $('a.top1-teaser__body');

                this.addNews(
                    {
                        title: $('a.top1-teaser__body').text(),
                        desc: $('a.top1-teaser__body').next().text(),
                        url: $('a.top1-teaser__body').attr('href'),
                    },
                    [subpages[i].tag],
                );

                let stroies = $('.teaser-object').toArray().slice(0, 6);
                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).find('a[title]').text(),
                            desc: $(item).find('.teaser-object__teaser-text').text(),
                            url: $(item).find('a[title]').attr('href'),
                        },
                        [subpages[i].tag],
                    );
                });

                stroies = $('a[data-manual*="teaser-url"][aria-label]').toArray().slice(0, 4);
                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).find('p[data-manual="teaser-text"]').prev().text(),
                            desc: $(item).closest('h3').next().text(),
                            url: $(item).find('p[data-manual="teaser-text"]').text(),
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
