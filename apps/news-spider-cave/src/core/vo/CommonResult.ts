export class CommonResult<T> {
    static CODE_SUCCESS = 0;
    code: number;
    message: string;
    data: T;

    constructor(code: number, message: string, data: T) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    static success<T>(data: T): CommonResult<T> {
        return new CommonResult(CommonResult.CODE_SUCCESS, "success", data);
    }

    static error<T>(code: number, message: string): CommonResult<T> {
        return new CommonResult(code, message, null);
    }
}
