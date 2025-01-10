
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
