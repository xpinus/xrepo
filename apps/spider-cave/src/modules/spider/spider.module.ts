import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { SpiderController } from "./spider.controller";
import { SpiderService } from "./spider.service";
import { SPIDER_QUEUE, SpiderScrapeProcessor } from "./queue/spider.processor";

@Module({
    imports: [
        // 注册队列
        BullModule.registerQueue({
            name: SPIDER_QUEUE,
            limiter: { max: 5, duration: 1000 },
        }),
    ],
    controllers: [SpiderController],
    providers: [SpiderService, SpiderScrapeProcessor],
    exports: [SpiderService],
})
export class SpiderModule {}
