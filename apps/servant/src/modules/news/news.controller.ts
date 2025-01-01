import { Controller, Get, Post, Body, Delete, Param, Query } from '@nestjs/common';

import { NewsService } from '@/modules/news/news.service';
import { PullNewsDto, ListDto, FocusDto } from './dto/news.dto';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get()
    async getNews(@Query() params: ListDto): Promise<any> {
        return await this.newsService.getNews(params);
    }

    @Get('spiders')
    async getSpiders(): Promise<any> {
        return await this.newsService.getAllSpiders();
    }

    @Get('spiders/list')
    async getSpidersList(): Promise<any> {
        return '测试';
    }

    @Post('spiders/pull')
    async pullNews(@Body() pullNewsDto: PullNewsDto): Promise<boolean> {
        return await this.newsService.pullNews(pullNewsDto.target);
    }

    @Delete(':id?')
    async deleteNews(@Param('id') id?: string) {
        return await this.newsService.deleteNews(id);
    }

    @Post('focus')
    async setFocus(@Body() focusDto: FocusDto): Promise<void> {
        await this.newsService.setFocus(focusDto.uuid, focusDto.status);
    }

    @Get('filters')
    async getFilters(): Promise<any> {
        return await this.newsService.getFilters();
    }
}
