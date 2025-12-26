import { Injectable } from "@nestjs/common";
import * as cheerio from "cheerio";
import { WechatService } from "./service/wechat.service";
import { HotNewsArticleDto } from "./dto/online.dto";

@Injectable()
export class OnlineService {
    constructor(private wechatService: WechatService) {}

    /**
     * 获取网页内容
     */
    async fetchPage(url: string) {
        return await fetch(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36",
            },
        }).then((res) => res.text());
    }

    /**
     * 利用Bing实现搜索
     */
    async bingSearch(q: string): Promise<any> {
        return this.fetchPage(`https://cn.bing.com/search?q=${encodeURIComponent(q)}`);
    }

    /**
     * 黄历
     * @param date 2025-12-23
     */
    async huangLi(date: string) {
        const response = await this.fetchPage(`https://www.d5168.com/huangli/${date}`);
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
    async publishHotNews(content: HotNewsArticleDto) {
        await this.wechatService.publishHotNews(content);

        // 发送邮件，通知
    }
}
