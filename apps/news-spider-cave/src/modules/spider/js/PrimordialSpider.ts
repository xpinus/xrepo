import { Language } from "@/utils";
import { type BrowserContext, type Page } from "playwright";
import { chromium } from "playwright-extra";
import * as cheerio from "cheerio";
import * as fs from "fs-extra";
import { generateUuid5 } from "@/utils";

// import stealth from 'puppeteer-extra-plugin-stealth';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stealth = require("puppeteer-extra-plugin-stealth");
chromium.use(stealth());

export class PrimordialSpider {
    name: string;
    enName: string;
    website: string;
    language: Language;
    country: string;
    routes: any[];

    constructor(spiderJson: any) {
        this.name = spiderJson.name;
        this.enName = spiderJson.enName;
        this.website = spiderJson.website;
        this.language = spiderJson.language;
        this.country = spiderJson.country;
        this.routes = spiderJson.routes;
    }

    async doScrape() {
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
            channel: "chrome",
            // executablePath:
            //   'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        }); //启动游览器
        const context = await browser.newContext();
        context.setDefaultTimeout(1000 * 60 * 60);
        context.setDefaultNavigationTimeout(1000 * 60 * 60);
        const page = await context.newPage();

        // 爬取新闻
        const result = await this._scrapeBySpider(page, context);

        // ---------------------
        await context.close();
        await browser.close();

        return result;
    }

    private async _scrapeBySpider(page: Page, context: BrowserContext) {
        const result: any[] = [];
        for (const route of this.routes) {
            try {
                const href = new URL(route.path, this.website).href;
                await page.goto(href);
                const $ = cheerio.load(await page.content());

                for (const selector of route.selectors) {
                    $(selector.selector)
                        .toArray()
                        .slice(0, selector.limit)
                        .forEach((item, index) => {
                            const news: any = {
                                label: selector.label,
                            };
                            for (const field of selector.fields) {
                                news[field.name] = $(item).text();
                            }

                            news.id = generateUuid5(news.title.toLocaleLowerCase().trim());

                            result.push(news);
                        });
                }
            } catch (err) {
                console.log(err);
            }
        }

        return result;
    }
}
