import { Language } from '@/utils';
import * as cheerio from 'cheerio';
import BaseSpider from './BaseSpider';

export default class CBCSpider extends BaseSpider {
    name = '加拿大广播公司';
    enName = 'CBC';
    website = 'https://www.cbc.ca/news';
    language = Language.ENGLISH;
    country = '加拿大';

    async _pull(page) {
        // news
        try {
            await page.goto(this.website);

            const $ = cheerio.load(await page.content());

            this.addNews(
                {
                    title: $('.featuredNewsContentPackage .desktopHeadline a').text(),
                    desc: $('.featuredNewsContentPackage .contentFlexLayout .deck').text(),
                    url: $('.featuredNewsContentPackage .desktopHeadline a').attr('href'),
                },
                ['首页'],
            );

            const stroies = $('.featuredTopStories a.card').toArray().slice(0, 10);

            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).find('.headline').text(),
                        desc: $(item).find('.description').text(),
                        url: $(item).attr('href'),
                    },
                    ['首页'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // world
        try {
            await page.goto('https://www.cbc.ca/news/world');

            const $ = cheerio.load(await page.content());

            this.addNews(
                {
                    title: $('.card.cardContentPackage a').text(),
                    desc: $('.featuredNewsContentPackage .contentFlexLayout .deck').text(),
                    url: $('.featuredNewsContentPackage .desktopHeadline a').attr('href'),
                },
                ['World'],
            );

            const stroies = $('.card.cardRegular').toArray().slice(0, 10);

            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).find('.headline').text(),
                        desc: '',
                        url: $(item).attr('href'),
                    },
                    ['CBC', 'World'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // canada
        try {
            await page.goto('https://www.cbc.ca/news/canada');

            const $ = cheerio.load(await page.content());

            const stroies = $('.card-content').toArray().slice(0, 10);

            stroies.forEach((item, index) => {
                this.addNews(
                    {
                        title: $(item).find('.headline').text(),
                        desc: $(item).find('.description').text(),
                        url: $(item).closest('a').attr('href'),
                    },
                    ['Canada'],
                );
            });
        } catch (err) {
            console.log(err);
        }

        // await page.screenshot({ path: 'fp_myntra.png', fullPage: true });

        return this.newsList;
    }
}
