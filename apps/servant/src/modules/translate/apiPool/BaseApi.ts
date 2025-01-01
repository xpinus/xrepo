import { ApiStatus } from '@/utils';
import { sleep } from '@/utils';
import { Language } from '@/utils';

export default abstract class BaseApi {
    abstract name: string;
    abstract status: ApiStatus;
    abstract QPS: number;

    async response(success: boolean, text: string) {
        await sleep(2000 / this.QPS); // 拿1000还是太快

        return {
            success,
            text,
        };
    }

    async translate(q: string, to: Language) {
        this.status = ApiStatus.BUSY;

        try {
            const res = await this._translate(q, to);
            this.status = ApiStatus.IDLE;
            return await this.response(true, res);
        } catch (error) {
            console.log('翻译接口 ', BaseApi.name, ' 错误： ', error);
            this.status = ApiStatus.INVALID;
            return await this.response(false, error.toString());
        }
    }

    get isAvailable() {
        return this.status === ApiStatus.IDLE;
    }

    abstract _translate(q: string, to: Language): Promise<string>;
}
