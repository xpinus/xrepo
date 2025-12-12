import { Inject, forwardRef } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { Processor, Process, OnQueueCompleted, OnQueueFailed } from "@nestjs/bull";
import { Job } from "bull";

import { SpiderService } from "../spider.service";
import { SpiderStatus } from "@/utils";
import { PrimordialSpider } from "../js/PrimordialSpider";

export const SPIDER_QUEUE = "spider-queue";

@Processor(SPIDER_QUEUE)
export class SpiderScrapeProcessor {
    constructor(@Inject(forwardRef(() => SpiderService)) private readonly spiderService: SpiderService) {}

    @Process({
        name: "scrape",
        concurrency: 3,
    })
    async query(job: Job<any>) {
        const spiderJson = job.data.json;

        const spider = new PrimordialSpider(spiderJson);

        this.spiderService.pubNews(await spider.doScrape());
    }

    // @OnQueueCompleted()
    // handleCompleted(job: Job<{ target: string }>, result: string) {
    //     console.log(`spider-queue job ${job.name} - ${job.data.target} completed: ` + job.id);
    //
    //     this.newsService.setSpiderStatus(job.data.target, SpiderStatus.IDLE);
    // }
    //
    // @OnQueueFailed()
    // handleFailed(job: Job<{ target: string }>, err: Error) {
    //     console.error(`spider-queue job ${job.name} - ${job.data.target} failed: ` + job.id);
    //     console.error(err);
    //
    //     this.newsService.setSpiderStatus(job.data.target, SpiderStatus.ERROR);
    // }
}
