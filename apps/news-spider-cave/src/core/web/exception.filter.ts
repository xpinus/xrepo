import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

import { CommonResult } from "@/core/vo/CommonResult";

// @Catch() 装饰器绑定所需的元数据到异常过滤器上。它告诉 Nest这个特定的过滤器正在寻找
@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp(); // 获取上下文
        const response = ctx.getResponse<Response>(); // 获取响应体
        const statusCode = exception.getStatus(); // 获取状态码

        let messgae = exception.message;
        try {
            messgae = (exception.getResponse() as any).message.join(";");
        } catch (_) {}

        response.status(statusCode).json(new CommonResult(statusCode, messgae, null)); // 自定义异常返回体
    }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        // 获取上下文
        const ctx = host.switchToHttp();
        // 获取响应体
        const response = ctx.getResponse<Response>();
        // 获取状态码，判断是HTTP异常还是服务器异常
        const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        console.error("错误信息", exception);

        // 自定义异常返回体
        response.status(statusCode).json(new CommonResult(statusCode, "服务器内部错误!", null));
    }
}
