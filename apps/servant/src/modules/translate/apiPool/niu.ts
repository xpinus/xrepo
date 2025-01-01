import { ApiStatus } from '@/utils';
import { Md5 } from 'ts-md5';
import request from 'umi-request';
import BaseApi from './BaseApi';

class NiuTransApi extends BaseApi {
    name = '小牛翻译';
    status = ApiStatus.IDLE;
    QPS = 5;

    key: string;

    constructor() {
        super();
        this.key = process.env.NIU_API_KEY;
    }

    async _translate(q: string, to: string) {
        const response = await request
            .get(`https://api.niutrans.com/NiuTransServer/translation`, {
                params: {
                    from: 'auto',
                    to,
                    src_text: q,
                    apikey: this.key,
                },
            })
            .catch(function (error) {
                console.log(error);
            });

        if (response.error_code) {
            throw new Error(response.error_code + ': ' + response.error_msg);
        }

        return response.tgt_text;
    }
}

const niuTransApi = new NiuTransApi();

export default niuTransApi;
