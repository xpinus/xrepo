import { Module, forwardRef } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { SPIDER_QUEUE, SpiderProcessor } from './queue/spider.processor';
import { NEWS_QUEUE, NewsProcessor } from './queue/news.processor';
import { EventsModule } from '@/events/events.module';
import { TranslateModule } from '@/modules/translate/translate.module';

import { News } from '@/models/news.entity';
import { NewsDao } from './dao/news.dao';

@Module({
    imports: [
        // 注册队列
        BullModule.registerQueue({
            name: SPIDER_QUEUE,
        }),
        BullModule.registerQueue({
            name: NEWS_QUEUE,
            limiter: { max: 5, duration: 1000 },
        }),
        // mysql
        TypeOrmModule.forFeature([News]),
        // websoket
        forwardRef(() => EventsModule),
        forwardRef(() => TranslateModule),
    ],
    controllers: [NewsController],
    providers: [NewsService, SpiderProcessor, NewsProcessor, NewsDao],
    exports: [NewsService],
})
export class NewsModule {}
