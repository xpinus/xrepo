import { PromptTemplate } from '@langchain/core/prompts';
import { ChatOllama } from '@langchain/ollama';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bull';
import { z } from 'zod';

import TransApiPool from './apiPool';
import { TRANS_QUEUE } from './queue/translate.processor';
import { Language, ApiStatus } from '@/utils';

type Translation = {
    zh: string;
    en: string;
};

@Injectable()
export class TranslateService {
    llm: ChatOllama;
    apiPool = new TransApiPool();

    constructor(
        private configService: ConfigService,
        @InjectQueue(TRANS_QUEUE) private readonly transQueue: Queue,
    ) {
        // const model = new ChatOpenAI({ temperature: 0 });

        this.llm = new ChatOllama({
            model: this.configService.get('OLLAMA_MODEL'),
            temperature: 0,
            maxRetries: 2,
            // other params...
        });
    }

    /**
     * 添加翻新闻任务
     */
    async addTranslateNewsTask(id: string, newsItem: NewsItem) {
        this.transQueue.add(
            {
                id,
                newsItem,
            },
            {
                attempts: 3, // 最大重试次数
                backoff: 10000, // 重试间隔
            },
        );
    }

    /**
     * api翻译
     */
    async transByApi(input: string, to: Language): Promise<string> {
        return await this.apiPool.translate(input, to);
    }

    /**
     * 大模型翻译
     */
    async transByLlm(input: string): Promise<Translation> {
        const translation = z.object({
            zh: z.string().describe('corresponding to the Chinese translation result'),
            en: z.string().describe('corresponding to the English translation'),
        });

        const structuredLlm = this.llm.withStructuredOutput(translation);

        const prompt = PromptTemplate.fromTemplate('Please translate {input} to Chinese and English:\n');

        const chain = prompt.pipe(structuredLlm);

        const res = await chain.invoke({ input });

        return res as Translation;
    }

    async translate(input: string, to: Language): Promise<string> {
        try {
            // console.log('input: ', input, 'to: ', to);

            return await this.transByApi(input, to);
        } catch (err) {
            console.log(err);

            // 降级，使用大模型翻译
            const prompt = PromptTemplate.fromTemplate('Please translate {input} to ${to}:\n');

            const chain = prompt.pipe(this.llm);
            const res = await chain.invoke({ input, to });
            return res.content.toString();
        }
    }

    async translateToZhEn(input: string, language: Language): Promise<Translation> {
        // 优先使用api翻译
        try {
            if (language === Language.CHINESE) {
                return {
                    zh: input,
                    en: await this.transByApi(input, Language.ENGLISH),
                };
            }

            if (language === Language.ENGLISH) {
                return {
                    zh: await this.transByApi(input, Language.CHINESE),
                    en: input,
                };
            }

            return {
                zh: await this.transByApi(input, Language.CHINESE),
                en: await this.transByApi(input, Language.ENGLISH),
            };
        } catch (error) {
            console.log(error);
            // 降级，使用大模型翻译
            return await this.transByLlm(input);
        }
    }

    async getAllTranslators() {
        return this.apiPool.pool.map((trans) => ({
            name: trans.name,
            status: trans.status,
        }));
    }

    async activeTranslator(name: string) {
        const trans = this.apiPool.pool.find((trans) => trans.name === name);
        name;

        if (!trans) {
            throw new Error('翻译接口不存在');
        }

        trans.status = ApiStatus.IDLE;
    }
}
