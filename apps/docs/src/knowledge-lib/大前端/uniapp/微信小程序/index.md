# 微信小程序




## 问题汇总

[微信开放社区](https://developers.weixin.qq.com/community/develop/mixflow) 遇到问题可以下在这里搜索下

> 判断H5是否在小程序环境

```js
//3.通过判断navigator.userAgent中包含miniProgram字样
var userAgent = navigator.userAgent;
var isMini = /miniProgram/i.test(userAgent);
```

当结合 current-device.min.js 进行平台判断时
```shell
var platform = /miniProgram/i.test(navigator.userAgent) ? 'mobile' :  device.type; 
```


> webview中a标签点击不跳转

在pc端和某些系统场景下，h5的a标签点击没有反应，需要改为`location.href`

> web-view下 重定向的问题

[参考](https://developers.weixin.qq.com/community/develop/doc/00026426fe0e889cab480b3095b000?highLine=web-view%2520%25E9%2587%258D%25E5%25AE%259A%25E5%2590%2591)

看重定向后的地址是否协议正确，会不会存在写死为http的情况

## 面试题

> 小程序如何显示用户头像与用户名

传统接口 wx.getuserinfo 目前可以用，需要用户授权，使用时会有官方发提示，这个 方法需要升级 

最新方法：open-data 标签，使用这个标签可以不用用户授权直接获取头像和用户名， 可以在 button 中将 opendata 作为属性写进去，写个点击事件就直接获取到了