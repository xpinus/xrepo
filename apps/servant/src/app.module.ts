import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from '@/events/events.gateway';
import { NewsModule } from './modules/news/news.module';
import { TranslateModule } from './modules/translate/translate.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production', '.env'],
        }),
        /* 队列配置 */
        BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                redis: {
                    host: configService.get('REDIS_HOST'),
                    port: configService.get('REDIS_PORT'),
                    password: configService.get('REDIS_PASSWORD'),
                },
            }),
            inject: [ConfigService],
        }),
        /* mysql */
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('MYSQL_HOST'),
                port: configService.get('MYSQL_PORT'),
                username: configService.get('MYSQL_USERNAME'),
                password: configService.get('MYSQL_PASSWORD'),
                database: configService.get('MYSQL_DB'),
                synchronize: true,
                autoLoadEntities: true,
            }),
            inject: [ConfigService],
        }),
        /* 缓存配置 */
        CacheModule.register({
            isGlobal: true,
            ttl: 1000 * 60 * 60 * 72, // 72h
        }),
        /* modules */
        NewsModule,
        TranslateModule,
    ],
    controllers: [AppController],
    providers: [AppService, EventsGateway],
    exports: [EventsGateway],
})
export class AppModule {}
