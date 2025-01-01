import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class SpiegelSpider extends BaseSpider {
    name = '明镜周刊';
    enName = 'Spiegel';
    website = 'http://www.spiegel.de';
    language = Language.GERMAN;
    country = '德国';

    async _pull(page) {
        // 首页新闻
        try {
            await page.goto(this.website);

            const $ = cheerio.load(await page.content());

            const stroies = $('div[data-area*="article_teaser>news"]').toArray().slice(0, 8);

            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).find('header').text(),
                        desc: $(item).find('section').text(),
                        url: $(item).find('header a').attr('href'),
                    },
                    ['首页'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        try {
            const $ = cheerio.load(await page.content());

            const navItems = $('nav[role="navigation"].polygon-swiper li a')
                .toArray()
                .slice(3, 8)
                .map((i) => {
                    return {
                        path: $(i).attr('href'),
                        tag: $(i).text().trim(),
                    };
                });

            for (let i = 0; i < navItems.length; i++) {
                try {
                    await page.goto(navItems[i].path);

                    const $ = cheerio.load(await page.content());

                    const stroies = $('div[data-area*="article_teaser>news"]').toArray().slice(0, 8);

                    stroies.forEach((item, index) => {
                        this.addNews(
                            {
                                title: $(item).find('header').text(),
                                desc: $(item).find('section').text(),
                                url: $(item).find('header a').attr('href'),
                            },
                            [navItems[i].tag],
                        );
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        } catch (err) {}

        // const subpages = [
        //   {
        //     path: 'us',
        //     tag: '美国',
        //   },
        //   {
        //     path: 'world',
        //     tag: 'World',
        //   },
        //   {
        //     path: 'world/china',
        //     tag: 'China',
        //   },
        //   {
        //     path: 'politics',
        //     tag: 'Politics',
        //   },
        // ];

        // for (let i = 0; i < subpages.length; i++) {
        //   // 美国
        //   try {
        //     await page.goto(`https://www.cnn.com/${subpages[i].path}`);

        //     const $ = cheerio.load(await page.content());

        //     const stroies = $(
        //       '.zone[data-collapsed-text]:first-child .container__headline-text',
        //     )
        //       .toArray()
        //       .slice(0, 8);

        //     stroies.forEach((item, index) => {
        //       if (index === 1) return;

        //       this.addNews(
        //         {
        //           title: $(item).text(),
        //           desc: '',
        //           url: $(item).closest('a').attr('href'),
        //         },
        //         ['CNN', subpages[i].tag],
        //       );
        //     });
        //   } catch (err) {
        //     console.log(err);
        //   }
        // }

        // await page.screenshot({ path: 'fp_myntra.png', fullPage: true });

        return this.newsList;
    }
}
