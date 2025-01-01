import { ApiStatus } from '@/utils';
import { Md5 } from 'ts-md5';
import request from 'umi-request';
import BaseApi from '../BaseApi';

import Signer, { HttpRequest } from './sdk/Signer';

class HuaweiTransApi extends BaseApi {
    name = '华为翻译';
    status = ApiStatus.IDLE;
    QPS = 1;

    async _translate(q: string, to: string) {
        const data = {
            text: q,
            from: 'auto',
            to: to,
            scene: 'common',
        };

        const r = new HttpRequest(
            'POST',
            'https://nlp-ext.cn-north-4.myhuaweicloud.com/v1/5661d30a43954a82816f6367ebb05911/machine-translation/text-translation',
            { 'Content-Type': 'application/json' },
            JSON.stringify(data),
        );

        const opt = Signer.Sign(r);

        const response = await request
            .post(
                `https://nlp-ext.cn-north-4.myhuaweicloud.com/v1/5661d30a43954a82816f6367ebb05911/machine-translation/text-translation`,
                {
                    headers: opt.headers,
                    data,
                },
            )
            .catch(function (error) {
                console.log(error);
            });

        return response.translated_text;
    }
}

const huaweiTransApi = new HuaweiTransApi();

export default huaweiTransApi;
