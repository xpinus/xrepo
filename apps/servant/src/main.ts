import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import { AllExceptionsFilter } from '@/exceptions/all-exception.filter';
import { HttpExceptionsFilter } from '@/exceptions/http-exception.filter';
import { ResponseInterceptor } from '@/interceptions/response.interception';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');

    // 使用拦截器、异常过滤器统一response格式
    // https://roubin.me/nest-format-response/
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalFilters(new HttpExceptionsFilter());

    const configService = app.get(ConfigService);
    const PORT = configService.get('PORT', 9000);

    console.log(process.env.NODE_ENV, PORT);

    await app.listen(PORT);
}

bootstrap();
