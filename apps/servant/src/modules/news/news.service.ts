import { InjectQueue } from '@nestjs/bull';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
import Redis from 'ioredis';
import * as dayjs from 'dayjs';

import { SpiderStatus, WebSocketEvent } from '@/utils';
import spiders from './cave';
import { NEWS_QUEUE } from './queue/news.processor';
import { SPIDER_QUEUE } from './queue/spider.processor';
import { EventsGateway } from '@/events/events.gateway';
import { NewsDao } from './dao/news.dao';
import { ListDto } from './dto/news.dto';

const NEWS_TIMEOUT = 1000 * 60 * 60 * 24 * 7; // 数据7天后过期

@Injectable()
export class NewsService {
    redis = new Redis({
        host: this.configService.get('REDIS_HOST'),
        port: this.configService.get('REDIS_PORT'),
        password: this.configService.get('REDIS_PASSWORD'),
    });

    constructor(
        @InjectQueue(SPIDER_QUEUE) private readonly spiderQueue: Queue,
        @InjectQueue(NEWS_QUEUE) private readonly newsQueue: Queue,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly configService: ConfigService,
        private readonly eventsGateway: EventsGateway,
        private readonly newsDao: NewsDao,
    ) {}

    /**
     * 获取全部新闻数据
     * TODO: 分页查询，关键词查询
     */
    async getNews(params: ListDto): Promise<any> {
        let newsList = [];

        if (params.prompt) {
            newsList = await this.newsDao.findByPrompt(params);
        } else {
            newsList = await this.newsDao.findAll(params);
        }

        return {
            list: newsList,
        };
    }

    /**
     * 插入新闻进数据库，设置过期时间
     */
    async insertNews(id: string, newsDoc: NewsDoc) {
        // 插入数据库
        await this.newsDao.insert(id, newsDoc);

        // 添加超时队列
        await this.newsQueue.add(
            'del',
            {},
            {
                delay: NEWS_TIMEOUT,
                jobId: id,
            },
        );

        this.eventsGateway.send(WebSocketEvent.REFRESH);
    }

    async getSpiderStatus(name) {
        return {
            status: (await this.redis.get(`spider_status##${name}`)) as SpiderStatus,
            time: await this.redis.get(`spider_time##${name}`),
        };
    }

    async setSpiderStatus(name, status: SpiderStatus) {
        await this.redis.set(`spider_status##${name}`, status);
        await this.redis.set(`spider_time##${name}`, dayjs().format('YYYY-MM-DD HH:mm:ss'));
        this.eventsGateway.send(WebSocketEvent.REFRESH);
    }

    /**
     * 获取所有爬虫信息
     */
    async getAllSpiders() {
        const data = [];

        for (let i = 0; i < spiders.length; i++) {
            const key = spiders[i].name;
            const { status, time } = await this.getSpiderStatus(key);
            const spider = new spiders[i]();

            data.push({
                keyName: key,
                status: status ?? SpiderStatus.IDLE,
                name: spider.name,
                country: spider.country,
                count: await this.newsDao.findAndCount('source', spider.name),
                href: spider.website,
                last_run_time: time || '-',
            });
        }

        return data;
    }

    /**
     * 执行爬虫，拉取新闻
     */
    async pullNews(target: string): Promise<boolean> {
        const pushToQueue = async (spiderName) => {
            await this.setSpiderStatus(spiderName, SpiderStatus.PENDING);
            this.spiderQueue.add('pull', {
                target: spiderName,
            });
        };

        if (target === 'all') {
            for (let i = 0; i < spiders.length; i++) {
                await pushToQueue(spiders[i].name);
            }
        } else {
            await pushToQueue(target);
        }

        return true;
    }

    async exists(uuid: string) {
        return await this.newsDao.exists(uuid);
    }

    /**
     * 删除新闻
     */
    async deleteNews(uuid?: string) {
        let idList: string[];

        if (uuid) {
            // 移除指定id数据
            idList = await this.newsDao.remove(uuid);
        } else {
            // 删除全部数据
            idList = await this.newsDao.clear();
        }

        // 删除对应的过期任务
        for (let i = 0; i < idList.length; i++) {
            await this.newsQueue.removeJobs(idList[i]);
        }

        this.eventsGateway.send(WebSocketEvent.REFRESH);

        return 'ok';
    }

    async setFocus(uuid: string, status: boolean) {
        await this.newsDao.setFocus(uuid, status);
        this.eventsGateway.send(WebSocketEvent.REFRESH);
    }

    /**
     * 获取新闻的过滤项
     */
    async getFilters() {
        const data = [];

        for (let i = 0; i < spiders.length; i++) {
            const key = spiders[i].name;
            const spider = new spiders[i]();

            data.push({
                keyName: key,
                name: spider.name,
                country: spider.country,
            });
        }

        return data;
    }
}
