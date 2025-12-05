package top.xrepo.servant.core.exception;

import top.xrepo.servant.core.constants.ServiceExceptionEnum;

/**
 * 业务异常错误码
 */
public class ServiceException extends RuntimeException {
    /**
     * 错误码
     */
    private final Integer code;

    public ServiceException(ServiceExceptionEnum serviceExceptionEnum) {
        super(serviceExceptionEnum.getMessage());
        this.code = serviceExceptionEnum.getCode();
    }

    public Integer getCode() {
        return code;
    }
}
