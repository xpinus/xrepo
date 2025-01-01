import { Module, forwardRef } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { TranslateService } from './translate.service';
import { TransProcessor, TRANS_QUEUE } from './queue/translate.processor';
import { TranslateController } from './translate.controller';

import { NewsModule } from '@/modules/news/news.module';

@Module({
    imports: [
        forwardRef(() => NewsModule),
        BullModule.registerQueue({
            name: TRANS_QUEUE,
        }),
    ],
    controllers: [TranslateController],
    providers: [TranslateService, TransProcessor],
    exports: [TranslateService],
})
export class TranslateModule {}
