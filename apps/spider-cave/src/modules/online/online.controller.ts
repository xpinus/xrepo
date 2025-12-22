import { Controller, Get, Post, Query, Body } from "@nestjs/common";
import { OnlineService } from "./online.service";
import { HuangLiDto, WechatArticleDto } from "./dto/online.dto";

@Controller("online")
export class OnlineController {
    constructor(private searchService: OnlineService) {}

    @Get("search")
    async scrapeNews(@Query("q") q: string) {
        return await this.searchService.search(q);
    }

    @Get("huangli")
    async huangLi(@Query() query: HuangLiDto) {
        return await this.searchService.huangLi(query.date);
    }

    @Post("wx_publish")
    async wxPublish(@Body() dto: WechatArticleDto) {
        return await this.searchService.wxPublish(dto.content);
    }
}
