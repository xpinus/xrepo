import { ApiStatus } from '@/utils';
import * as tencentcloud from 'tencentcloud-sdk-nodejs';
import BaseApi from './BaseApi';

const TmtClient = tencentcloud.tmt.v20180321.Client;

class TecentTransApi extends BaseApi {
    name = '腾讯翻译';
    status = ApiStatus.IDLE;
    QPS = 5;

    // sdk
    // https://console.cloud.tencent.com/api/explorer?Product=tmt&Version=2018-03-21&Action=TextTranslate
    client = new TmtClient({
        credential: {
            secretId: process.env.TENCENTCLOUD_SECRET_ID,
            secretKey: process.env.TENCENTCLOUD_SECRET_KEY,
        },
        region: 'ap-shanghai',
        profile: {
            httpProfile: {
                endpoint: 'tmt.tencentcloudapi.com',
            },
        },
    });

    async _translate(q: string, to: string) {
        const data = await this.client.TextTranslate({
            SourceText: q,
            Source: 'auto',
            Target: to,
            ProjectId: 0,
        });

        return data.TargetText;
    }
}

const tencentTransApi = new TecentTransApi();

export default tencentTransApi;

/**
 * 错误码
FailedOperation.ErrorUserArea	用户区域与请求服务区域不一致。
FailedOperation.LanguageRecognitionErr	暂时无法识别该语种。
FailedOperation.NoFreeAmount	本月免费额度已用完，如需继续使用您可以在机器翻译控制台升级为付费使用。
FailedOperation.RequestAiLabErr	内部请求错误。
FailedOperation.ServiceIsolate	账号因为欠费停止服务，请在腾讯云账户充值。
FailedOperation.StopUsing	账号已停服。
FailedOperation.UserNotRegistered	服务未开通，请在腾讯云官网机器翻译控制台开通服务。
InternalError	内部错误。
InternalError.BackendTimeout	后台服务超时，请稍后重试。
InternalError.ErrorGetRoute	路由获取错误。
InternalError.ErrorUnknown	未知错误。
InternalError.RequestFailed	请求失败。
InvalidParameter	参数错误。
InvalidParameter.MissingParameter	参数错误。
InvalidParameterValue	参数取值错误。
LimitExceeded	超过配额限制。
LimitExceeded.LimitedAccessFrequency	超出请求频率。
MissingParameter	缺少参数错误。
RequestLimitExceeded.UinLimitExceeded	超出UIN使用限额。
UnauthorizedOperation.ActionNotFound	请填写正确的Action字段名称。
UnsupportedOperation	操作不支持。
UnsupportedOperation.TextTooLong	单次请求text超过长度限制。
UnsupportedOperation.UnSupportedTargetLanguage	不支持的目标语言，请参照语言列表。
UnsupportedOperation.UnsupportedLanguage	不支持的语言，请参照语言列表。
UnsupportedOperation.UnsupportedSourceLanguage	不支持的源语言，请参照语言列表。
 */
