import { Inject, forwardRef } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Processor, Process, OnQueueCompleted, OnQueueFailed } from '@nestjs/bull';
import { Job } from 'bull';

import { NewsService } from '../news.service';
import { TranslateService } from '@/modules/translate/translate.service';
import { EventsGateway } from '@/events/events.gateway';
import { SpiderStatus } from '@/utils';
import spiders from '../cave';
import { generateUuid5 } from '@/utils';

export const SPIDER_QUEUE = 'spider-queue';

@Processor(SPIDER_QUEUE)
export class SpiderProcessor {
    constructor(
        @Inject(forwardRef(() => NewsService))
        private readonly newsService: NewsService,
        private readonly transService: TranslateService,
        private readonly eventsGateway: EventsGateway,
    ) {}

    @Process({
        name: 'pull',
        concurrency: 4,
    })
    async query(job: Job<{ target: string }>) {
        const target = job.data.target;

        this.newsService.setSpiderStatus(target, SpiderStatus.RUNNING);

        const Spider = spiders.find((item) => item.name === target);
        if (!Spider) {
            throw new Error('未找到对应的爬虫:' + target);
        }
        const spider = new Spider(); // 应该改为工厂模式

        const data = await spider.pull();

        for (let i = 0; i < data.length; i++) {
            const uuid = generateUuid5(data[i].title.toLocaleLowerCase().trim());
            const exist = await this.newsService.exists(uuid);
            if (exist) continue;

            // 添加到翻译队列
            this.transService.addTranslateNewsTask(uuid, data[i]);
        }
    }

    @OnQueueCompleted()
    handleCompleted(job: Job<{ target: string }>, result: string) {
        console.log(`spider-queue job ${job.name} - ${job.data.target} completed: ` + job.id);

        this.newsService.setSpiderStatus(job.data.target, SpiderStatus.IDLE);
    }

    @OnQueueFailed()
    handleFailed(job: Job<{ target: string }>, err: Error) {
        console.error(`spider-queue job ${job.name} - ${job.data.target} failed: ` + job.id);
        console.error(err);

        this.newsService.setSpiderStatus(job.data.target, SpiderStatus.ERROR);
    }
}
