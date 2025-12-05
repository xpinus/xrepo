import { join } from "path";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { BullModule } from "@nestjs/bull";
import { RedisModule } from "@nestjs-modules/ioredis";
import { ServeStaticModule } from "@nestjs/serve-static";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SpiderModule } from "./modules/spider/spider.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        /* 静态资源 */
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "client"),
            exclude: ["/api/{*test}"],
            serveStaticOptions: {
                fallthrough: false,
            },
        }),
        /* 队列配置 */
        BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                redis: {
                    host: configService.get("REDIS_HOST"),
                    port: configService.get("REDIS_PORT"),
                    password: configService.get("REDIS_PASSWORD"),
                },
            }),
            inject: [ConfigService],
        }),
        /* redis */
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "single",
                url: configService.get("REDIS_URL"),
                options: {
                    password: configService.get("REDIS_PASSWORD"),
                },
            }),
        }),
        /* modules */
        SpiderModule,
    ],
    controllers: [AppController],
    providers: [AppService],
    exports: [],
})
export class AppModule {}
