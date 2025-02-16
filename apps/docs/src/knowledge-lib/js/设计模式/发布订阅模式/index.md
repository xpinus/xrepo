# 发布订阅模式

<<< ./index.js

## [使用发布订阅模式解耦](https://www.bilibili.com/video/BV1U36GYsE5c/?spm_id_from=333.1387.upload.video_card.click&vd_source=13577946ef3878abe2197cc65b72005c)

在前端项目开发中，会遇到如router、axios等模块发生一些事件需要触发页面或其它模块的操作，但直接互相引用往往会使得组件之间的耦合性越来越大，逐渐堆积成屎山，因此可以在设计上采用发布订阅模式对组件进行解耦

<<< eventEmitter.ts

此时如在某个axios拦截其中
```js
const sucessHandler = () => {
    // ...
}

const errorHandler = () => {
    if (error.response.status === 401) {
        eventEmitter.emit('API:UN_AUTH');
    }
}

axios.intercepts.response.use(sucessHandler, errorHandler);
```
路由中
```js
eventEmitter.on('API:UN_AUTH', () => {
    router.push('/login');  // 跳转到登录页
})
```