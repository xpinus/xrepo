package top.xrepo.servant.core.constants;

public enum ServiceExceptionEnum {
    // ========  错误码  ========

    // ========  系统级别 ========
    SUCCESS(0, "成功"),
    SYSTEM_ERROR(2001001001, "系统异常"),
    MISSING_REQUEST_PARAM_ERROR(2001001001, "参数缺失"),
    INVALID_REQUEST_PARAM_ERROR(2001001002, "参数校验错误"),

    // ========  新闻模块 ========
    NEWS_NOT_FOUND(1001001001, "新闻不存在"),
    ;
    /**
     * 错误码
     */
    private final int code;
    /**
     * 错误信息
     */
    private final String message;

    ServiceExceptionEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
