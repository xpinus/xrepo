---
sort: 13
---

# meta和viewport 

> `viewport`

```js
<meta name="viewport" content="width=device-witdh, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
```

* `width`：设置`viewport`宽度，为一个正整数或字符串`device-witdh`表示设备宽度
* `height`：一般设置宽度后高度会自动解析，不用设置
* `initial-scale`：默认缩放比例，为一个数字可以带小数
* `minimum-scale`：允许用户最小缩放比例
* `maximum-scale`：允许用户最大缩放比例
* `user-scalable`：是否允许手动缩放

## 延伸问题

怎么处理移动端1px被渲染成2px的问题？

* 局部处理：
  * `meta`标签中的`viewport`属性里的`initial-scale`设置为`1.0`
  * `rem`按照设计稿标准走，外加利用`transform`的`scale(0.5)`缩小一倍即可
* 全局处理：
  * `meta`标签中的`viewport`属性里的`initial-scale`设置为`0.5`
  * `rem`按照设计稿标准走即可

## 其它meta

``` html
<!DOCTYPE html>   H5声明
<head lang="en" />  语言
<meta charset='utf-8' />  声明文档字符编码
<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1"/> 优先使用IE最新版和chrome
<meta http-equiv=”pragma” content=”no-cache”> <!--设定禁止浏览器从本地机的缓存中调阅页面内容，设定后一旦离开网页就无法从Cache中再调出-->
<meta http-equiv=”cache-control” content=”no-cache”> <!--设置页面不缓存,清除缓存-->
<meta http-equiv=”expires” content=”0″>  <!--设定网页的到期时间 -->
<meta name="desciption" content="不超过150个字符"/>  页面描述
<meta name="keywords" content="xx xx"/>  页面关键词
<meta name="author" content="name, emial@gmail.com"/>   网页作者
<meta name='robots' content="index, follow"/>  告诉搜索引擎机器人哪些页面需要索引抓取
```

* `content`的内容：
  * `all`文件将被检索，且页面上的链接可以被跟踪
  * `none`文件：文件将不被检索，且页面上的链接不可以被跟踪；(和 “noindex, no follow”起相同作用)
  * index：文件将被检索；（让robot/spider登录）
  * follow：页面上的链接可以被查询；
  * noindex：文件将不被检索，但页面上的链接可以被查询；(不让robot/spider登录)
  * nofollow：文件可以被检索，页面上的链接不可以被查询。(不让robot/spider顺着此页的连接往下抓取)

* 产生如下写法：

```html
  <meta name=”robots” content=”index, follow” /> <!--表示此页面允许索引并跟踪此页面上的链接-->
  <meta name=”robots” content=”noindex, nofollow” /> <!--此页面允许索引并跟踪此页面上的链接--> 
  <meta name=”robots” content=”index, nofollow” /> <!--此页面允许索引并跟踪此页面上的链接-->
  <meta name=”robots” content=”noindex, follow” /> <!--允许索引并跟踪此页面上的链接-->
<meta name=”apple-mobile-web-app-title” content=”标题”/> iOS 设备 begin
<meta name=”apple-mobile-web-app-capable” content=”yes”/>  添加到主屏后的标题（iOS 6 新增）是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏
<meta name=”apple-itunes-app” content=”app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL”/> 添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）
<meta name=”apple-mobile-web-app-status-bar-style” content=”black”/> 设置苹果工具栏颜色
<meta name=”format-detection” content=”telphone=no, email=no”/> 格式检测，用来检测html里的一些格式
<meta name=”renderer” content=”webkit”>   启用360浏览器的极速模式(webkit)
<meta http-equiv=”X-UA-Compatible” content=”IE=edge”/> 避免IE使用兼容模式
<meta http-equiv=”Cache-Control” content=”no-siteapp” />  不让百度转码

<meta name=”HandheldFriendly” content=”true”>     <!--针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓-->
<meta name=”MobileOptimized” content=”320″>   <!--微软的老式浏览器-->
<meta name=”screen-orientation” content=”portrait”>   <!--uc强制竖屏-->
<meta name=”x5-orientation” content=”portrait”>    <!--QQ强制竖屏-->
<meta name=”full-screen” content=”yes”>              <!--UC强制全屏-->
<meta name=”x5-fullscreen” content=”true”>       <!--QQ强制全屏-->
<meta name=”browsermode” content=”application”>   <!--UC应用模式-->
<meta name=”x5-page-mode” content=”app”>   <!-- QQ应用模式-->
<meta name=”msapplication-tap-highlight” content=”no”>    <!--windows phone 点击无高亮-->
```
