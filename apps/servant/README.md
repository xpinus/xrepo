```text
src/main/java/
├── com/
│   └── example/
│       └── wechat/
│           ├── config/                    # 配置类
│           │   ├── WechatConfig.java
│           │   ├── RestTemplateConfig.java
│           │   ├── RedisConfig.java      # 缓存相关配置
│           │   ├── AsyncConfig.java      # 异步任务配置
│           │   └── WechatProperties.java # 属性配置类
│           │
│           ├── domain/                    # 领域模型
│           │   ├── enums/
│           │   │   ├── WechatEventType.java
│           │   │   ├── WechatMsgType.java
│           │   │   └── WechatLang.java
│           │   │
│           │   ├── model/
│           │   │   ├── request/
│           │   │   │   ├── WechatBaseRequest.java
│           │   │   │   ├── TemplateMessage.java
│           │   │   │   ├── MenuCreateRequest.java
│           │   │   │   ├── UserInfoRequest.java
│           │   │   │   └── MediaUploadRequest.java
│           │   │   │
│           │   │   ├── response/
│           │   │   │   ├── WechatBaseResponse.java
│           │   │   │   ├── AccessTokenResponse.java
│           │   │   │   ├── UserInfoResponse.java
│           │   │   │   ├── MediaUploadResponse.java
│           │   │   │   └── TemplateSendResponse.java
│           │   │   │
│           │   │   ├── event/
│           │   │   │   ├── BaseEvent.java
│           │   │   │   ├── SubscribeEvent.java
│           │   │   │   ├── MenuClickEvent.java
│           │   │   │   └── MessageEvent.java
│           │   │   │
│           │   │   └── vo/                # 值对象
│           │   │       ├── WechatUserVO.java
│           │   │       ├── MenuVO.java
│           │   │       └── ArticleVO.java
│           │   │
│           │   └── constants/            # 常量定义
│           │       ├── WechatConstants.java
│           │       └── WechatApiConstants.java
│           │
│           ├── client/                    # HTTP客户端层
│           │   ├── WechatApiClient.java
│           │   ├── interceptor/
│           │   │   ├── WechatAuthInterceptor.java
│           │   │   └── WechatLoggingInterceptor.java
│           │   ├── error/
│           │   │   └── WechatErrorHandler.java
│           │   └── fallback/             # 降级处理
│           │       ├── WechatApiFallback.java
│           │       └── WechatApiFallbackFactory.java
│           │
│           ├── service/                   # 业务服务层
│           │   ├── interfaces/           # 服务接口定义
│           │   │   ├── WechatService.java
│           │   │   ├── WechatUserService.java
│           │   │   ├── WechatMessageService.java
│           │   │   ├── WechatMenuService.java
│           │   │   ├── WechatMaterialService.java
│           │   │   └── WechatTemplateService.java
│           │   │
│           │   ├── impl/                 # 服务实现
│           │   │   ├── WechatServiceImpl.java
│           │   │   ├── WechatUserServiceImpl.java
│           │   │   ├── WechatMessageServiceImpl.java
│           │   │   ├── WechatMenuServiceImpl.java
│           │   │   ├── WechatMaterialServiceImpl.java
│           │   │   └── WechatTemplateServiceImpl.java
│           │   │
│           │   ├── cache/                # 缓存服务
│           │   │   ├── WechatCacheService.java
│           │   │   └── impl/
│           │   │       ├── RedisWechatCacheService.java
│           │   │       └── LocalWechatCacheService.java
│           │   │
│           │   ├── token/                # Token管理
│           │   │   ├── TokenManager.java
│           │   │   └── AccessTokenManager.java
│           │   │
│           │   └── handler/              # 消息/事件处理器
│           │       ├── MessageHandler.java
│           │       ├── EventHandler.java
│           │       ├── TextMessageHandler.java
│           │       ├── ImageMessageHandler.java
│           │       └── SubscribeEventHandler.java
│           │
│           ├── controller/               # Web层
│           │   ├── api/                  # 对外API
│           │   │   ├── WechatApiController.java
│           │   │   ├── WechatMenuController.java
│           │   │   └── WechatUserController.java
│           │   │
│           │   └── callback/             # 微信回调接口
│           │       ├── WechatCallbackController.java
│           │       └── WechatMessageController.java
│           │
│           ├── aspect/                   # 切面
│           │   ├── WechatApiMonitorAspect.java
│           │   ├── WechatLogAspect.java
│           │   └── WechatRateLimitAspect.java
│           │
│           ├── exception/                # 异常处理
│           │   ├── WechatApiException.java
│           │   ├── WechatBusinessException.java
│           │   ├── WechatRateLimitException.java
│           │   └── WechatExceptionHandler.java
│           │
│           ├── util/                     # 工具类
│           │   ├── WechatSignUtil.java
│           │   ├── WechatXmlUtil.java
│           │   ├── WechatEncryptUtil.java
│           │   ├── WechatMessageBuilder.java
│           │   └── WechatApiUrlBuilder.java
│           │
│           ├── listener/                 # 事件监听器
│           │   ├── WechatTokenRefreshListener.java
│           │   └── WechatApiCallListener.java
│           │
│           ├── scheduler/                # 定时任务
│           │   ├── WechatTokenRefreshScheduler.java
│           │   └── WechatDataSyncScheduler.java
│           │
│           └── manager/                  # 管理器（复杂业务组合）
│               ├── WechatApiManager.java
│               ├── WechatMessageManager.java
│               └── WechatUserManager.java
│
├── resources/
│   ├── application.yml                   # 主配置文件
│   ├── application-dev.yml               # 开发环境配置
│   ├── application-prod.yml              # 生产环境配置
│   │
│   ├── wechat/                           # 微信相关配置
│   │   ├── wechat-config.yml
│   │   ├── menu-template.json           # 菜单模板
│   │   └── message-template.xml         # 消息模板
│   │
│   └── sql/
│       └── wechat/                       # 微信相关SQL
│           ├── schema.sql
│           └── data.sql
│
└── test/                                 # 测试目录
└── java/
└── com/
└── example/
└── wechat/
├── unit/             # 单元测试
│   ├── service/
│   ├── client/
│   └── util/
│
├── integration/      # 集成测试
│   ├── WechatApiIntegrationTest.java
│   └── WechatCallbackTest.java
│
├── mock/             # Mock数据
│   ├── WechatMockData.java
│   └── WechatMockServer.java
│
└── config/           # 测试配置
└── TestWechatConfig.java

```


关键目录说明
1. config/ - 配置层
   集中管理所有配置类

使用@ConfigurationProperties绑定配置

支持多环境配置

2. domain/ - 领域层
   按业务模块组织模型

清晰的请求/响应分离

常量集中管理

3. client/ - 客户端层
   第三方HTTP调用封装

拦截器、错误处理器

降级和熔断实现

4. service/ - 服务层
   接口与实现分离

按功能模块划分

缓存和Token管理独立

5. controller/ - 控制层
   API与回调分离

职责单一，便于维护

6. aspect/ - 切面层
   监控、日志、限流

统一的横切关注点