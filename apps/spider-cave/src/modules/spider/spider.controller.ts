import { Controller, Get, Post, Query } from "@nestjs/common";
import { SpiderService } from "./spider.service";

@Controller("spider")
export class SpiderController {
    constructor(private spiderService: SpiderService) {}

    @Get()
    hello() {
        this.spiderService.setHello();
        return "hello";
    }

    @Post("scrape")
    async scrapeNews(@Query("spiderName") spiderName: string) {
        return await this.spiderService.scrapeNews(spiderName);
    }

    @Post("scrape_all")
    async scrapeAllNews() {
        return await this.spiderService.scrapeAllSites();
    }
}
