import { ApiStatus } from '@/utils';
import { Md5 } from 'ts-md5';
import request from 'umi-request';
import BaseApi from './BaseApi';

class BaiduTransApi extends BaseApi {
    name = '百度翻译';
    status = ApiStatus.IDLE;
    QPS = 1;

    appid: string;
    key: string;

    constructor() {
        super();
        this.appid = process.env.BAIDU_FANYI_APPID;
        this.key = process.env.BAIDU_FANYI_KEY;
    }

    async _translate(q: string, to: string) {
        // 随机数
        const salt = new Date().getTime();

        // Step1. 拼接字符串1：
        const str = `${this.appid}${q}${salt}${this.key}`;

        // Step2. 计算签名：（对字符串1做MD5加密）
        const sign = Md5.hashStr(str);

        const response = await request
            .get(
                `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${q}&from=auto&to=${to}&appid=${this.appid}&salt=${salt}&sign=${sign}`,
            )
            .catch(function (error) {
                console.log(error);
            });

        if (response.error_code) {
            throw new Error(response.error_code + ': ' + response.error_msg);
        }

        return response.trans_result[0].dst;
    }
}

const baiduTransApi = new BaiduTransApi();

export default baiduTransApi;
