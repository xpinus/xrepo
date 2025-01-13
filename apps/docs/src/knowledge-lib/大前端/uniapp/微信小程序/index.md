
## 判断H5是否在小程序环境

```js
//3.通过判断navigator.userAgent中包含miniProgram字样
var userAgent = navigator.userAgent;
var isMini = /miniProgram/i.test(userAgent);
```

当结合 current-device.min.js 进行平台判断时
```shell
var platform = /miniProgram/i.test(navigator.userAgent) ? 'mobile' :  device.type; 
```


## webview中a标签点击不跳转

在pc端和某些系统场景下，h5的a标签点击没有反应，需要改为`location.href`