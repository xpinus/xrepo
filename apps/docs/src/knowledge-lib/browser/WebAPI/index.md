# WebAPI



## 几个很实用的BOM属性对象方法

**location对象**

`location.href`-- 返回或设置当前文档的URL

`location.search` -- 返回URL中的查询字符串部分。

`location.hash` -- 返回URL#后面的内容，如果没有#，返回空

`location.host` -- 返回URL中的域名部分，例如www.dreamdu.com

`location.hostname` -- 返回URL中的主域名部分，例如dreamdu.com

`location.pathname` -- 返回URL的域名后的部分。例如 http://www.dreamdu.com/xhtml/ 返回/xhtml/

`location.port` -- 返回URL中的端口部分。例如 http://www.dreamdu.com:8080/xhtml/ 返回8080

`location.protocol` -- 返回URL中的协议部分。例如 http://www.dreamdu.com:8080/xhtml/ 返回(//)前面的内容http:

`location.assign` -- 设置当前文档的URL

`location.replace()` -- 设置当前文档的URL，并且在history对象的地址列表中移除这个URL location.replace(url);

`location.reload()` -- 重载当前页面

**history对象**

`history.go()` -- 前进或后退指定的页面数 history.go(num);

`history.back()` -- 后退一页

`history.forward()` -- 前进一页

**navigator对象**

`navigator.userAgent` -- 返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)

`navigator.cookieEnabled` -- 返回浏览器是否支持(启用)cookie


**window对象**

`window.resize()`

## Geolocation API

```js
function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            ...
        }, (err) => { ... })
    } 
}
```

## 页面可见性

document.hidden  boolean  用户当前是否正在观看该页面

document.visibilityState  visible  hidden

`visibilitychange事件`

## Web Animation API

浏览器提供的原生js动画方案

https://www.bilibili.com/video/BV15E4m1R7tq/?spm_id_from=333.1387.0.0&vd_source=13577946ef3878abe2197cc65b72005c

