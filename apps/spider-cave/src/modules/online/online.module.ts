import { Module } from "@nestjs/common";
import { OnlineController } from "./online.controller";
import { OnlineService } from "./online.service";
import { WechatService } from "./service/wechat.service";

@Module({
    imports: [],
    controllers: [OnlineController],
    providers: [OnlineService, WechatService],
    exports: [OnlineService],
})
export class OnlineModule {}
