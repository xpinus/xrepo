import { Module, forwardRef } from '@nestjs/common';

import { EventsGateway } from './events.gateway';
import { NewsModule } from '@/modules/news/news.module';

@Module({
    imports: [forwardRef(() => NewsModule)],
    providers: [EventsGateway],
    exports: [EventsGateway],
})
export class EventsModule {}
