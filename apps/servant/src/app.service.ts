import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World! ' + process.env.NODE_ENV + '  ' + process.env.TENCENTCLOUD_SECRET_ID;
    }
}
