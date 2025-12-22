import { Injectable } from "@nestjs/common";
import { BingSearchEngine } from "./engines/Bing";
import * as cheerio from "cheerio";
import { chromium } from "playwright-extra";
import { openBrowserDebugging } from "@/utils/browser";

const stealth = require("puppeteer-extra-plugin-stealth");
chromium.use(stealth());

@Injectable()
export class OnlineService {
    constructor() {}

    /**
     * 搜索
     */
    async search(q: string): Promise<any> {
        return BingSearchEngine.search(q);
    }

    /**
     * 黄历
     * @param date 2025-12-23
     */
    async huangLi(date: string): Promise<any> {
        //

        const response = await fetch(`https://www.d5168.com/huangli/${date}`, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36",
            },
        }).then((res) => res.text());

        const $ = cheerio.load(response);

        const result: string[] = [];
        $(".bd > table > tbody > tr > th").each(function () {
            result.push(`${$(this).text()}: ${$(this).next().text()}`);
        });

        return result;
    }
    /**
     * 自动化发布微信文章：个人账号无法调用api
     */
    async wxPublish(content: string) {
        // start
        openBrowserDebugging("https://mp.weixin.qq.com/cgi-bin/home?t=home/index&lang=zh_CN&token=1141324390");
        const browser = await chromium.connectOverCDP("http://localhost:9222");
        const context = browser.contexts()[0];
        context.setDefaultTimeout(1000 * 60 * 60);
        context.setDefaultNavigationTimeout(1000 * 60 * 60);
        const page = await context.newPage();

        // 点击草稿箱
        await page.locator("#menu_10125").click();
        await page.locator(".create_article_item a").click();

        // 标题
        await page.locator("textarea#title").fill("测试");
        // 作者
        await page.locator("input#author").fill("山君談");
        // 内容
        await page.locator(".rich_media_content .ProseMirror").evaluate((el) => {
            el.innerHTML = `
<h1>60s天下事<h1>
            
<section>
${content}
</section>
            `;
        });

        // close
        await context.close();
        await browser.close();

        return "成功";
    }
}
