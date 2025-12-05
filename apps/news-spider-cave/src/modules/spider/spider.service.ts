import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { SPIDER_QUEUE } from "@/modules/spider/queue/spider.processor";
import * as fs from "fs-extra";
import Redis from "ioredis";
import { InjectRedis } from "@nestjs-modules/ioredis";

const NEWS_TOPIC = "NEWS";

@Injectable()
export class SpiderService {
    constructor(
        @InjectQueue(SPIDER_QUEUE) private readonly spiderQueue: Queue,
        @InjectRedis() private readonly redis: Redis,
    ) {}

    setHello() {
        this.redis.set("key", "hello", "EX", 60 * 60);
    }

    /**
     * 执行爬虫，拉取新闻
     */
    async scrapeNews(spiderName: string): Promise<any> {
        let spiderJson = "";
        try {
            spiderJson = await fs.readJSON(`./client/cave/${spiderName}.json`);
        } catch (err) {
            throw new HttpException(`读取${spiderName}爬虫配置失败`, HttpStatus.BAD_REQUEST, {
                cause: err,
            });
        }
        this.spiderQueue.add("scrape", {
            json: spiderJson,
        });
        return "正在爬取";
    }

    /**
     * 将爬取的新闻publish
     */
    pubNews(newsList: any[]) {
        for (const news of newsList) {
            this.redis.publish(NEWS_TOPIC, JSON.stringify(news));
        }
    }
}
