# Nestjs

> 之前有使用过nodejs开发服务器吗，说说你最常用的框架，并说明其设计思想与原理

我了解过的框架(库)有
1. express
2. koa
3. egg
4. nestjs

## nestjs
借鉴了spring boot, AOP\IoC

- typescript
- 清晰的模块化设计理念
- 可插拔的生态，底层可以用express\fastify\websocket\graphql

### 模块 Module

### 控制器 Controller
控制前后端连接点，请求处理

### 服务 Providers
提供具体的个性化服务，包含 数据库连接池、kafka驱动、redis处理、文件IO等

### 中间件 Middleware

面向切面的，通过不改变原逻辑的方式，为系统提供一些个性化处理

日志

### 守卫 Guard

权限控制，模块访问性处理

### 过滤器 Filter

异常处理

### 拦截器 Interceptor

拦截器偏请求到服务器路由中间的过程，中间件是服务器在处理中间的过程

## 复杂业务系统，持久化后端设计
核心目标
- 高可用：系统稳定性
- 高性能：高并发
- 扩展性
- 可维护性
- 数据安全

关键性设计问题
- 缓存，数据缓存，redis
- 数据库，关系型（mysql\postgresql）、非关系型(mongodb)
- 日志数据库，数据量太大，log4j, clickhous 列式存储数据库

### 数据持久化选型
- 常规数据postgresql
- 秒杀、用户、聊天过程数据redis缓存
- clickhouse 用户埋点数据、性能监控日志、用户行为日志（Hadoop,Hbase）
- Kafka，消息队列，削峰

### 高并发

微服务架构
