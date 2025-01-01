import { ApiStatus } from '@/utils';
import BaseApi from './BaseApi';

import alimt20181012, * as $alimt20181012 from '@alicloud/alimt20181012';
import * as $OpenApi from '@alicloud/openapi-client';
import * as $Util from '@alicloud/tea-util';

class ALiTransApi extends BaseApi {
    name = '阿里翻译';
    status = ApiStatus.IDLE;
    QPS = 10;

    client: alimt20181012;

    constructor() {
        super();

        this.client = this.createClient();
    }

    createClient(): alimt20181012 {
        // 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考。
        // 建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html。
        const config = new $OpenApi.Config({
            // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID。
            accessKeyId: process.env['ALIBABA_CLOUD_ACCESS_KEY_ID'],
            // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
            accessKeySecret: process.env['ALIBABA_CLOUD_ACCESS_KEY_SECRET'],
        });
        // Endpoint 请参考 https://api.aliyun.com/product/alimt
        config.endpoint = `mt.cn-hangzhou.aliyuncs.com`;
        return new alimt20181012(config);
    }

    async _translate(q: string, to: string) {
        const translateGeneralRequest = new $alimt20181012.TranslateGeneralRequest({
            formatType: 'text',
            sourceLanguage: 'auto',
            targetLanguage: to,
            sourceText: q,
            scene: 'general', // https://next.api.aliyun.com/api/alimt/2018-10-12/Translate
        });
        const runtime = new $Util.RuntimeOptions({});

        const { body } = await this.client.translateGeneralWithOptions(translateGeneralRequest, runtime);

        if (body.code !== 200) {
            throw new Error(body.code + ': ' + JSON.stringify(body));
        }

        return body.data.translated;
    }
}

const aLiTransApi = new ALiTransApi();

export default aLiTransApi;
