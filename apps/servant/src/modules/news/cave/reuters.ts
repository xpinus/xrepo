import * as cheerio from 'cheerio';
import ConnectSpider from './ConnectSpider';
import { Language } from '@/utils';
import BaseSpider from './BaseSpider';

export default class ReutersSpider extends ConnectSpider {
    name = '路透社';
    enName = 'Reuters';
    website = 'https://www.reuters.com/';
    language = Language.ENGLISH;
    country = '英国';

    async _pull(page) {
        await page.goto('https://www.reuters.com/world/');

        const $ = cheerio.load(await page.content());

        const subpages = [];

        $('ul[data-testid="SectionSelectorLinks"] li a')
            .toArray()
            .forEach((a) => {
                subpages.push({
                    path: `https://www.reuters.com${$(a).attr('href')}`,
                    tag: $(a).text().trim(),
                });
            });

        for (let i = 0; i < subpages.length; i++) {
            try {
                await page.goto(subpages[i].path);
                await page.waitForTimeout(3000);

                const $ = cheerio.load(await page.content());

                const stroies = $('div[class*=media-story-card__body] *[data-testid="Heading"]').toArray().slice(0, 10);

                stroies.forEach((item, index) => {
                    this.addNews(
                        {
                            title: $(item).text(),
                            desc: $(item).closest('div[class*=media-story-card__body]').find('p[data-testid="Body"]').text(),
                            url: $(item).find('a').attr('href') || $(item).attr('href'),
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
