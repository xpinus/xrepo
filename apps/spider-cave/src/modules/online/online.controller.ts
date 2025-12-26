import { Controller, Get, Post, Query, Body, All } from "@nestjs/common";
import { OnlineService } from "./online.service";
import { HuangLiDto, HotNewsArticleDto } from "./dto/online.dto";

@Controller("online")
export class OnlineController {
    constructor(private searchService: OnlineService) {}

    @Get("search")
    async search(@Query("q") q: string) {
        return await this.searchService.bingSearch(q);
    }

    @Get("huangli")
    async huangLi(@Query() query: HuangLiDto) {
        return await this.searchService.huangLi(query.date);
    }

    @Post("publish")
    async publish(@Body() content: HotNewsArticleDto) {
        await this.searchService.publishHotNews(content);
        return "已发布";
    }
}
