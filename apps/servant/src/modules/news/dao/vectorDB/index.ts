import { ConfigService } from '@nestjs/config';
import { ChromaClient, OllamaEmbeddingFunction } from 'chromadb';
import type { Collection } from 'chromadb';

const configService = new ConfigService();

// 向量表中存储的数据
type VectorDocument = {
    id: string;
    metadata: {
        [prop: string]: string;
    };
    document: string;
};

export class VectorDBDao {
    collection: Collection;

    constructor() {
        const client = new ChromaClient({
            path: `http://${configService.get('CHROMA_HOST')}:${configService.get('CHROMA_PORT')}`,
        });

        client
            .getOrCreateCollection({
                name: 'news_vector',
                embeddingFunction: new OllamaEmbeddingFunction({
                    url: configService.get('OLLAMA_EMBEDDING_URL'),
                    model: configService.get('OLLAMA_EMBEDDING_MODEL'),
                }),
            })
            .then((collection) => {
                this.collection = collection;
            });
    }

    async delete(uuids: string[]) {
        await this.collection.delete({
            ids: uuids,
        });
    }

    async add(docs: VectorDocument[]) {
        const ids = [];
        const metadatas = [];
        const documents = [];

        docs.forEach((item) => {
            ids.push(item.id);
            metadatas.push(item.metadata);
            documents.push(item.document);
        });

        await this.collection.add({
            ids,
            metadatas,
            documents,
        });
    }

    async search(q: string) {
        // return await this.vectorStore.similaritySearch(q, 10);
        // return await this.vectorStore.collection;
        return this.collection.query({
            queryTexts: q, // Chroma will embed this for you
            nResults: 10, // how many results to return
        });
    }
}
