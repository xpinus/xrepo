# 远程调用
> 远程调用（RPC，Remote Procedure Call） 是一种通信协议，允许程序像调用本地函数一样调用远程服务器上的函数或服务。它屏蔽了底层网络通信细节，使开发者能够专注于业务逻辑

**一般用于微服务场景下** 


http
-  原始http在更复杂的高并发场景下，会不够高效和稳定，因此大型基建通常会设计一层无线网关（gateway）,并对http协议进行定制，增加登录验证、请求跟踪、监控、限流等功能
- 前端代码通过远程调用（RPC）的方式而非直接使用http
- 定制化的http协议带来更强大的功能

以bilibili为例，前端发起一个grpc请求至gateway网关，同时发送了多个自定义请求头

响应中 content-type: application/grpc; 表明这是一个grpc请求

阿里开源的[Dubbo](https://cn.dubbo.apache.org/zh-cn/overview/what/)