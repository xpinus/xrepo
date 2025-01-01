import { OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Inject, forwardRef } from '@nestjs/common';
import { Job } from 'bull';
import { Language } from '@/utils';

import { NewsService } from '@/modules/news/news.service';
import { TranslateService } from '@/modules/translate/translate.service';

export const TRANS_QUEUE = 'trans-queue';

@Processor(TRANS_QUEUE)
export class TransProcessor {
    constructor(
        @Inject(forwardRef(() => NewsService))
        private readonly newsService: NewsService,
        @Inject(forwardRef(() => TranslateService))
        private readonly transService: TranslateService,
    ) {}

    @Process()
    async query(
        job: Job<{
            id: string;
            newsItem: NewsItem;
        }>,
    ) {
        // 和news绑定太死，那就没必要单独拿出来了呀
        const { id, newsItem } = job.data;

        const newsDoc = {
            ...newsItem,
            zh_title: newsItem.title,
            en_title: newsItem.title,
            zh_desc: newsItem.desc,
            en_desc: newsItem.desc,
            content: '',
        };

        // 翻译
        const { zh: zhTitle, en: enTitle } = await this.transService.translateToZhEn(newsDoc.title, newsDoc.language as Language);

        newsDoc.zh_title = zhTitle;
        newsDoc.en_title = enTitle;

        if (newsItem.desc) {
            const { zh: zhDesc, en: enDesc } = await this.transService.translateToZhEn(
                newsItem.desc,
                newsDoc.language as Language,
            );
            newsDoc.zh_desc = zhDesc;
            newsDoc.en_desc = enDesc;
        }

        this.newsService.insertNews(id, newsDoc);

        return newsDoc.zh_title;
    }

    @OnQueueCompleted()
    async handleCompleted(job: Job, result: string) {
        console.log(`translate completed: ` + job.id + ' ' + result);
    }

    @OnQueueFailed()
    async handleFailed(job: Job, err: Error) {
        console.log(`translate failed: ` + job.id);
        console.error(err);
    }
}
