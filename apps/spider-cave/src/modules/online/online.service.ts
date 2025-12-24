import { Injectable } from "@nestjs/common";
import { BingSearchEngine } from "./engines/Bing";
import * as cheerio from "cheerio";
import { ChromiumBrowserConnection } from "@/utils/browsers/chromium";
import type { BrowserContext } from "playwright";

@Injectable()
export class OnlineService {
    private browserConn: ChromiumBrowserConnection;
    constructor() {
        this.browserConn = new ChromiumBrowserConnection();
        this.browserConn
            .connect()
            .then((ctx) => {
                console.log("debug browser has inited");
            })
            .catch((e) => {
                console.error(e);
            });
    }

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
    async publishHotNews(content: string) {
        const page = this.browserConn.getPage();
        await page.goto("https://mp.weixin.qq.com/");
    }
}
