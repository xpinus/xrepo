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
    website: string;
    meta: any;
    routes: any[];

    constructor(spiderJson: any) {
        this.website = spiderJson.website;
        this.meta = spiderJson.meta;
        this.routes = spiderJson.routes;
    }

    async doScrape() {
        console.log(`---开始爬取 ${this.meta.name} : ${this.website}---`);

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

    // 通过解析json配置爬取目标
    private async _scrapeBySpider(page: Page, context: BrowserContext) {
        const result: any[] = [];

        const getContent = async (detailLink: string, contentField) => {
            await page.goto(detailLink);
            const $ = cheerio.load(await page.content());
            const content = $(contentField.selector).text();
            await page.goBack();
            return content;
        };

        for (const route of this.routes) {
            try {
                const href = new URL(route.path, this.website).href;
                await page.goto(href);

                if (route.wait) {
                    await page.waitForSelector(route.wait.target, { timeout: route.wait.timeout || 1000 * 10 });
                }

                const $ = cheerio.load(await page.content());

                if (route.selectors) {
                    for (const selector of route.selectors) {
                        const articleEls = $(selector.selector)
                            .toArray()
                            .slice(0, selector.limit || Infinity);

                        for (const el of articleEls) {
                            const news: any = {};
                            for (const field of selector.fields) {
                                if (field.name === "content" && news.link) {
                                    // 跳转详情页获取内容
                                    news["content"] = await getContent(new URL(news.link, this.website).href, field);
                                    continue;
                                }

                                const target = field.selector ? $(el).find(field.selector) : $(el);
                                switch (field.type) {
                                    case "text":
                                        news[field.name] = $(target).text();
                                        break;
                                    case "attr":
                                        news[field.name] = $(target).attr(field.attributeName);
                                        break;
                                }
                            }

                            news.id = generateUuid5(news.title.toLocaleLowerCase().trim());
                            Object.assign(news, {
                                label: selector.label,
                                ...this.meta,
                            });

                            result.push(news);
                        }
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }

        console.log(result);

        return result;
    }
}
