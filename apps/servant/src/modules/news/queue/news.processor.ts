import {
  OnQueueCompleted,
  OnQueueDrained,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Inject, forwardRef } from '@nestjs/common';
import { Job } from 'bull';

import { NewsService } from '../news.service';

export const NEWS_QUEUE = 'news-queue';

@Processor(NEWS_QUEUE)
export class NewsProcessor {
  constructor(
    @Inject(forwardRef(() => NewsService))
    private readonly newsService: NewsService,
  ) {}

  @Process({
    name: 'del',
    concurrency: 10,
  })
  async delNews(job: Job<unknown>) {
    // 新闻过期后删除数据
    await this.newsService.deleteNews(job.id as string);
  }

  @OnQueueCompleted()
  handleCompleted(job: Job<{ target: string }>, result: string) {
    console.log(`job ${job.name} - completed: ` + job.id);
  }

  @OnQueueFailed()
  handleFailed(job: Job<{ target: string }>, err: Error) {
    console.log(`job ${job.name} - failed: ` + job.id);
    console.error(err);
  }

  @OnQueueDrained()
  handleCleaned(jobs: Job[], type: string) {
    console.log(`job $type} - drained: ` + jobs.map((job) => job.id));
  }
}
