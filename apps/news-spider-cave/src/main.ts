import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

import { HttpExceptionsFilter, AllExceptionsFilter } from "@/core/web/exception.filter";
import { ResponseInterceptor } from "@/core/web/response.interception";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix("api/");

    // 使用拦截器、异常过滤器统一response格式
    // https://roubin.me/nest-format-response/
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalFilters(new AllExceptionsFilter()); // 顺序很重要
    app.useGlobalFilters(new HttpExceptionsFilter());

    // 全局验证管道
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            disableErrorMessages: false,
        }),
    );

    const configService = app.get(ConfigService);
    const PORT = configService.get("PORT", 6001);

    console.log(process.env.NODE_ENV, PORT);

    await app.listen(PORT);
}

bootstrap();
