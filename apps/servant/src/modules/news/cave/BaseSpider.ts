import { Language } from '@/utils';
import { type BrowserContext, type Page } from 'playwright';
import { chromium } from 'playwright-extra';

// import stealth from 'puppeteer-extra-plugin-stealth';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stealth = require('puppeteer-extra-plugin-stealth');
chromium.use(stealth());

export default abstract class BaseSpider {
    newsList: NewsItem[] = [];
    abstract name: string;
    abstract enName: string;
    abstract website: string;
    abstract language: Language;
    abstract country: string;

    abstract _pull(page: Page, context: BrowserContext): Promise<NewsItem[]>;

    async pull() {
        console.log(`---开始爬取 ${this.name} : ${this.website}---`);

        // const context = await chromium.launchPersistentContext(
        //   'C:\\Users\\pinus\\AppDataLocal\\Google\\Chrome\\User Data',
        //   {
        //     headless: false,
        //     channel: 'chrome',
        //     executablePath:
        //       'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        //   },
        // );

        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            // executablePath:
            //   'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        }); //启动游览器
        const context = await browser.newContext();
        context.setDefaultTimeout(1000 * 60 * 60);
        context.setDefaultNavigationTimeout(1000 * 60 * 60);
        const page = await context.newPage();

        // 拉取新闻
        const newsList = await this._pull(page, context);

        // ---------------------
        await context.close();
        await browser.close();

        return newsList;
    }

    addNews(newsInfo: PickPartial<NewsInfo, 'tag'>, tag: string[], language?: Language) {
        newsInfo.title = newsInfo.title.trim();
        newsInfo.desc = newsInfo.desc.trim();

        if (!newsInfo.title) {
            console.warn(this.name, ': newsItem.title is empty');
            return;
        }

        // 确保新闻url为绝对路径
        const base = new URL(this.website).origin;
        newsInfo.url = new URL(newsInfo.url, base).href;

        const item = {
            ...newsInfo,
            country: this.country,
            language: language ?? this.language,
            source: this.name,
            source_href: this.website,
        };

        const existedItem = this.newsList.find((n) => n.title === item.title);
        if (existedItem) {
            existedItem.tag = this.filterTags([...existedItem.tag, ...tag]);
        } else {
            item.tag = this.filterTags(tag);
            this.newsList.push(item as NewsItem);
        }
    }

    filterTags(tag: string[]) {
        return Array.from(new Set(tag)).filter((item) => !!item.trim());
    }
}
