import { Controller, Get, Put, Query } from '@nestjs/common';
import { Language } from '@/utils';
import { TranslateService } from './translate.service';

@Controller('trans')
export class TranslateController {
    constructor(private readonly translateService: TranslateService) {}

    @Get('test')
    async getTranslate(): Promise<string> {
        return await this.translateService.translate('hello world', Language.CHINESE);
    }

    @Get()
    async getTranslators(): Promise<any> {
        return await this.translateService.getAllTranslators();
    }

    @Put()
    async activeTranslator(@Query('name') name: string): Promise<any> {
        return await this.translateService.activeTranslator(name);
    }
}
