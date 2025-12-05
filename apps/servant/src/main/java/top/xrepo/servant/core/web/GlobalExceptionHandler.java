package top.xrepo.servant.core.web;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import top.xrepo.servant.core.constants.ServiceExceptionEnum;
import top.xrepo.servant.core.exception.ServiceException;
import top.xrepo.servant.core.vo.CommonResult;

@ControllerAdvice(basePackages = "top.xrepo.servant.module")
public class GlobalExceptionHandler {
    private Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * 处理自定义的业务异常
     */
    @ResponseBody
    @ExceptionHandler(value = ServiceException.class)
    public CommonResult handleServerException(ServiceException e) {
        logger.error("[serviceExceptionHandler]: ", e);
        return CommonResult.error(e.getCode(), e.getMessage());
    }

    /**
     * 处理参数校验异常
     *
     * 当使用 Bean Validation API（如 Hibernate Validator）对单个字段或方法参数进行验证时触发
     */
    @ResponseBody
    @ExceptionHandler(value = ConstraintViolationException.class)
    public CommonResult constraintViolationExceptionHandler(ConstraintViolationException e) {
        logger.warn("[handleConstraintViolationException]", e);

        // 拼接错误
        StringBuilder detailMessage = new StringBuilder();
        for (ConstraintViolation<?> constraintViolation : e.getConstraintViolations()) {
            // 使用 ; 分隔多个错误
            if (!detailMessage.isEmpty()) {
                detailMessage.append(";");
            }
            // 拼接内容到其中
            detailMessage.append(constraintViolation.getMessage());
        }

        return CommonResult.error(ServiceExceptionEnum.INVALID_REQUEST_PARAM_ERROR.getCode(), ServiceExceptionEnum.INVALID_REQUEST_PARAM_ERROR.getMessage() + ":" + detailMessage.toString());
    }

    /**
     * 处理参数校验异常
     *
     * 当使用 @Valid 或 @Validated 注解对方法参数进行验证时，如果验证失败则抛出此异常
     */
    @ResponseBody
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public CommonResult methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e) {
        logger.warn("[handleMethodArgumentNotValidException]", e);

        StringBuilder detailMessage = new StringBuilder();
        for(FieldError fieldError : e.getBindingResult().getFieldErrors()) {
            if (!detailMessage.isEmpty()) {
                detailMessage.append(";");
            }

            detailMessage.append(fieldError.getDefaultMessage());
        }

        return CommonResult.error(ServiceExceptionEnum.INVALID_REQUEST_PARAM_ERROR.getCode(), ServiceExceptionEnum.INVALID_REQUEST_PARAM_ERROR.getMessage() + ':' + detailMessage.toString());
    }

    /**
     * 处理其他异常
     */
    @ResponseBody
    @ExceptionHandler(value = Exception.class)
    public CommonResult handleException(Exception e) {
        logger.error("[exceptionHandler]: ", e);
        return CommonResult.error(ServiceExceptionEnum.SYSTEM_ERROR.getCode(), ServiceExceptionEnum.SYSTEM_ERROR.getMessage());
    }
}
