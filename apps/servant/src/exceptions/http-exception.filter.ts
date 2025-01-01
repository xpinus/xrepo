import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

import { responseMessage } from '@/utils';

// @Catch() 装饰器绑定所需的元数据到异常过滤器上。它告诉 Nest这个特定的过滤器正在寻找
@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp(); // 获取上下文
        const response = ctx.getResponse<Response>(); // 获取响应体
        const statusCode = exception.getStatus(); // 获取状态码

        response.status(statusCode).json(responseMessage(null, exception.message, statusCode)); // 自定义异常返回体
    }
}
