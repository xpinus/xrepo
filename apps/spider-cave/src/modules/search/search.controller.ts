import { Controller, Get, Post, Query } from "@nestjs/common";
import { SearchService } from "./search.service";
import { HuangLiDto } from "./dto/search.dto";

@Controller("online")
export class SearchController {
    constructor(private searchService: SearchService) {}

    @Get("search")
    async scrapeNews(@Query("q") q: string) {
        return await this.searchService.search(q);
    }

    @Get("huangli")
    async huangLi(@Query() query: HuangLiDto) {
        return await this.searchService.huangLi(query.date);
    }
}
