import * as dayjs from 'dayjs';

/**
 * @description: 响应码
 */
export enum RESPONSE_CODE {
    NOSUCCESS = -1, // 表示请求成功，但操作未成功
    SUCCESS = 200, // 请求成功
    BAD_REQUEST = 400, // 请求错误
    UNAUTHORIZED = 401, // 未授权
    FORBIDDEN = 403, // 禁止访问
    NOT_FOUND = 404, // 资源未找到
    INTERNAL_SERVER_ERROR = 500, // 服务器错误
}

/**
 * @description: 请求提示语
 */
export enum RESPONSE_MSG {
    SUCCESS = '请求成功',
    FAILURE = '请求失败',
}

/**
 * @description: 全局标准响应体
 */
type Response<T = any> = {
    code: number; // 状态码
    data?: T; // 业务数据
    msg: string; // 响应信息
    timestamp: number; // 时间戳
};

/**
 * @description: 统一返回体
 */
export const responseMessage = <T = any>(
    data,
    msg: string = RESPONSE_MSG.SUCCESS,
    code: number = RESPONSE_CODE.SUCCESS,
): Response<T> => ({
    data,
    msg,
    code,
    timestamp: dayjs().valueOf(),
});
