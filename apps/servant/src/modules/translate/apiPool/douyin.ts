import { ApiStatus } from '@/utils';
import { Md5 } from 'ts-md5';
import request from 'umi-request';
import BaseApi from './BaseApi';
import { Service } from '@volcengine/openapi';

class DouyinTransApi extends BaseApi {
    name = '火山翻译';
    status = ApiStatus.IDLE;
    QPS = 10;

    accessKeyId = process.env.VOLC_ACCESSKEY;
    secretKey = process.env.VOLC_SECRETKEY;

    constructor() {
        super();
    }

    async _translate(q: string, to: string) {
        const data = {
            TargetLanguage: to,
            TextList: [q],
        };

        const service = new Service({
            host: 'open.volcengineapi.com',
            serviceName: 'translate',
            region: 'cn-north-1',
            accessKeyId: this.accessKeyId,
            secretKey: this.secretKey,
        });

        const fetchApi = service.createAPI('TranslateText', {
            Version: '2020-06-01',
            method: 'POST',
            contentType: 'json',
        });

        const { ResponseMetadata, TranslationList } = (await fetchApi(data)) as any;

        if (ResponseMetadata.Error) {
            throw new Error(ResponseMetadata.Error.Code + ': ' + ResponseMetadata.Error.Message);
        }

        return TranslationList[0].Translation;
    }
}

const douyinTransApi = new DouyinTransApi();

export default douyinTransApi;
