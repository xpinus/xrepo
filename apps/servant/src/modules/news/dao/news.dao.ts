import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { News } from '@/models/news.entity';
import { ListDto } from '../dto/news.dto';
import { VectorDBDao } from './vectorDB';

@Injectable()
export class NewsDao {
    vectorDB: VectorDBDao;

    constructor(
        @InjectRepository(News)
        private newsRepository: Repository<News>,
    ) {
        this.vectorDB = new VectorDBDao();
    }

    findAll({ page = 1, pageSize = 10 }: ListDto): Promise<News[]> {
        return (
            this.newsRepository
                .createQueryBuilder('news')
                .select()
                // .limit(pageSize)
                // .offset((page - 1) * pageSize)
                .getMany()
        );
    }

    async findByPrompt(params: ListDto): Promise<News[]> {
        console.log('Prompt: ', params.prompt);

        const { prompt } = params;

        const response = await this.vectorDB.search(prompt);

        const uuids = response?.ids[0] || [];
        // console.log('uuids', uuids);
        if (uuids.length === 0) {
            return [];
        }

        return await this.newsRepository.createQueryBuilder('news').select().where('uuid IN (:uuids)', { uuids }).getMany();
    }

    findOne(uuid: string): Promise<News | null> {
        return this.newsRepository.findOneBy({ uuid });
    }

    // 是否存在
    async exists(uuid: string): Promise<boolean> {
        try {
            const result = await this.newsRepository.createQueryBuilder('news').where('news.uuid = :uuid', { uuid }).getCount();

            return result > 0;
        } catch (error) {
            // 最初可能数据库还没创建呢
            // console.log(error);
        }

        return false;
    }

    async findAndCount(property: string, value: string): Promise<number> {
        return this.newsRepository.createQueryBuilder('news').where(`news.${property} = :value`, { value: value }).getCount();
    }

    async remove(uuid: string) {
        const uuids = uuid.split(',');

        // 从mysql删除
        await this.newsRepository.createQueryBuilder().delete().from(News).where('uuid IN (:uuids)', { uuids }).execute();

        // 从向量库删除
        await this.vectorDB.delete(uuids);

        return uuids;
    }

    async clear() {
        // 获取所有新闻的uuid
        const newsList = await this.newsRepository.find({
            select: ['uuid'],
        });
        const uuids = newsList.map((item) => item.uuid);

        // 从mysql删除
        await this.newsRepository.createQueryBuilder().delete().from(News).execute();

        // 从向量库删除
        await this.vectorDB.delete(uuids);

        return Array.from(uuids);
    }

    async insert(uuid: string, newsDoc: NewsDoc): Promise<News> {
        if (!uuid) {
            throw new Error('id is required');
        }

        if (await this.exists(uuid)) {
            console.warn(uuid, ' exists');
            return;
        }

        // 插入向量库
        try {
            await this.vectorDB.add([
                {
                    id: uuid,
                    metadata: {
                        tag: newsDoc.tag.join(';'),
                    },
                    document: JSON.stringify({
                        title: newsDoc.title,
                        desc: newsDoc.desc,
                        en_title: newsDoc.en_title,
                        en_desc: newsDoc.en_desc,
                        content: newsDoc.content,
                    }),
                },
            ]);
        } catch (error) {
            console.log(error);
            return;
        }

        // 插入mysql
        return await this.newsRepository.save({
            uuid,
            ...newsDoc,
            tag: newsDoc.tag.join(','),
            focus: false,
        });
    }

    setFocus(uuid: string, status: boolean) {
        return this.newsRepository
            .createQueryBuilder()
            .update(News)
            .set({ focus: status })
            .where('uuid = :uuid', { uuid })
            .execute();
    }
}
