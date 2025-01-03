---
sort: 5
---

# 一次请求会产生哪些缓存

`dns`缓存，`cdn`缓存，浏览器缓存，服务器缓存

# 从浏览器地址栏输入url到显示页面的步骤

![performance timing](https://ask.qcloudimg.com/http-save/yehe-8081386/1668f163c56881fa319467b2ae0ebfe2.png?imageView2/2/w/1620)

<iframe src='https://ask.qcloudimg.com/http-save/yehe-8081386/1668f163c56881fa319467b2ae0ebfe2.png?imageView2/2/w/1620'></iframe>

**浏览器请求**
* 在浏览器地址栏输入url
* 浏览器查看**缓存**：
  * 没有缓存，发起新请求
  * 已经缓存，检验是否新鲜
* 浏览器**解析URL**获取协议、主机、端口(默认80)、path，
* DNS解析**获取主机IP**地址：
  * DNS的ip也是有缓存的：浏览器缓存 -> 本机缓存 -> hosts文件 -> 路由器缓存 -> ISP DNS缓存 -> DNS递归查询（可能存在负载均衡导致每次IP不一样）
* **等待TCP队列**：chrome 有个机制，同一域名下同时最多只能建立6个TCP连接，如果同时有10个请求发生，其中4个就会进入等待队列，直至进行中的请求完成，如果小于6个，则直接进入TCP 连接。
* 打开一个socket与目标IP地址，端口**建立TCP连接**，三次握手：
  * 客户端发送一个TCP的`SYN=1, Seq=X`的包至服务器端口
  * 服务端发回`SYN=1, ACK=X+1, Seq=Y`的相应包
  * 客户端发送`ACK=Y+1, Seq=Z`
  * ![image-20211108162200854](https://imagehost-1311720054.cos.ap-nanjing.myqcloud.com/blog/%E7%9D%80%E6%89%8B%E6%90%AD%E5%BB%BA%E7%BD%91%E7%AB%99/image-20211108162200854.png)
* TCP连接建立后，**发送HTTP请求**，连接建立成功之后，浏览器就可以与服务器之间通讯了。
* 服务器接收到请求进行解析，如果请求头包含**缓存验证信息**，如果新鲜返回304等状态码，或者是进行其它操作，最后将**响应报文通过TCP连接发送回浏览器**
* 浏览器接收HTTP响应，根据情况**关闭TCP或保留重用**，关闭的四次握手：
  * 主动方发送`Fin=1, Ack=Z, Seq=X`报文
  * 被动方发送`Ack=X+1, Seq=Z`
  * 被动方发送`Fin=1, Ack=X, Seq=Y`
  * 主动方发送`Ack=Y, Seq=X`
* 如果资源可缓存进行缓存
* 对响应进行**解码**（如gzip压缩）

**浏览器渲染过程**

![image-20211113145750091](https://imagehost-1311720054.cos.ap-nanjing.myqcloud.com/blog/%E7%9D%80%E6%89%8B%E6%90%AD%E5%BB%BA%E7%BD%91%E7%AB%99/image-20211113145750091.png)

<span style="color: red;">必看---</span>[浏览器是如何解析html的？](https://juejin.cn/post/6844903745730396174#heading-1)

* 、**解析HTML文档，构件DOM树，下载资源，构造CSSOM树，执行js脚本**，这些操作没有严格的先后顺序，以下分别解释：
* 构建**DOM树**：[如何构建DOM树](https://juejin.cn/post/6991097279604064292)
  * `Tokenizing`：根据HTML规范将字符流解析为标记
  * `Lexing`：词法分析将标记转换为对象并定义属性和规则
  * `DOM constroction`：根据HTML标记关系将对象组成DOM树
* 构建**CSS规则树**：
  * `Tokenizing`：字符流转换为标记流
  * `Node`：根据标记创建节点
  * `CSSOM`：节点创建CSSOM树
* 根据DOM树和CSSOM树构建**渲染树**：
  * 从DOM树的根节点遍历所有**可见节点**
  * 对每一个可见节点，找到恰当的CSSOM规则并应用
  * 发布可见节点的内容和计算样式
* **js解析**如下：
  * 参看必看

**显示页面**（HTML解析过程中会逐步显示页面）


![渲染](/interview/render.png)

1. 解析html文档
  - 过程中会解析html元素生成DOM树
  - 遇到style标签，link元素、行内样式等css样式，会解析css生成cssom树
    - css不会阻塞html解析。因为下载和解析css的工作是在预解析线程中进行的。
    - js会阻塞html解析。因为js代码的执行可能会修改当前的dom树，所以dom树的生成必须暂停。
2. 样式计算
  主线程会遍历DOM树，计算每个节点的最终样式`Computed Style`。在这一过程中很多预设值会变成绝对值，比如`red`变成`rgb(255,0,0)`.
  **这一步结束后会得到一棵带有样式的DOM树**
3. 布局Layout
   布局阶段会遍历DOM树，计算每个节点的`几何信息`，例如节点的宽高、位置
4. 分层Layer
   - 主线程会使用复杂的策略对整个布局树进行分层，意义在于当某个层改变后，仅对该层进行处理，提升效率。
   - 滚动条、堆叠上下文、transform、opacity等或多或少会影响分层结果，也可以通过will-change更大程度上影响分层结果
   
5. 绘制paint
   主线程会为每个层单独产生绘制指令集，用于描述这一层的内容该如何绘制
   **绘制完成后**，主线程将每个图层的绘制信息提交给`合成线程`，剩余工作将有合成线程完成
6. 合成tilling  合成线程对图层进行分块，将其划分为更多的小区域。分块的工作是多线程同时进行的
7. 光栅化rast   合成线程会将块信息交给GPU，GPU会开启多个线程快速完成光栅化，并优先处理靠近视口的区域
8. 画 draw  
 - 合成线程拿到光栅化结果的位图后，生成一个个[指引quad]信息。
 - 指引会标识出每个位图应该画到屏幕哪个位置，以及考虑到旋转、缩放等变形
   - 变形发生在合成线程，与渲染主线程无关，这就是transform效率高的本质
 - 合成线程将指引交给GPU，最终完成屏幕丞相


**load事件的缺点**

```js
//你的代码
window.onload=fun1

//插件代码
window.onload=fun2
```

很明显，fun1被替换成fun2；所以就会出现，你的代码失效了！
现在很多插件都是要等到文档加载完才执行的，所以很多插件自己内部都会这有类似window.onload的注册方法，那么大家都用window.onload来注册函数那么就会出现部分代码失效问题！

而jquery的ready方法不会出现这个问题，因为它是个函数，函数有个参数是回调函数，每执行一次就会注册一个回调，你的代码写在回调里，这样就不会出现代码失效了，即使大家都用ready这个方法。

* window.onload的替代方案--DOM状态检测

```js
var alreadyrunflag=0 //flag to indicate whether target function has already been run
 
if (document.addEventListener)
  document.addEventListener("DOMContentLoaded", function(){
      alreadyrunflag=1; 
      walkmydog()
  }, false)
else if (document.all && !window.opera){
  document.write('<script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"><\/script>')
  var contentloadtag=document.getElementById("contentloadtag")
  contentloadtag.onreadystatechange=function(){
    if (this.readyState=="complete"){
      alreadyrunflag=1;
      walkmydog()
    }
  }
}
 
window.οnlοad=function(){
  setTimeout("if (!alreadyrunflag) walkmydog()", 0);
}
```

* 哪些异步加载js的方法

1) async  HTML5的属性,让JavaScript代码进行异步加载

```html
<script type="text/javascript" src="05.js" async="async"></script>
```

2) defer 老版本IE专用

```html
<script type="text/javascript" defer="defer"></script>
```

3) 动态的创建script的标签(可以解决兼容h5以及低版本ie的问题)

```html
<script type="text/javascript">
    function asyncLoaded(url,callback){
        var script = document.createElement("script");
        //  script.src = url;   假如说网速非常好，直接执行完成了，后面就监听不到状态的改变了
        if(script.readyState){
            script.onreadystatechange = function(){
                if(script.readyState == "complete" || script.readyState =="loaded"){
                    //                            执行某个函数
                    callback()
                }
            }
        }else{
            script.onload = function(){
                //                        执行某个函数
                callback()
            }
        }
        script.src = url;    //异步的过程
        document.head.appendChild(script)    
    }
    asyncLoaded("05.js",function(){
        fn()　　　　　　　　　　//05.js中的函数
    })
</script>
```

## 什么是回流 reflow 和 重绘 repaint  ?

> reflow的本质是浏览器重新计算layout树
- 当进行了会影响布局树的操作后（如：尺寸、位置、隐藏/状态状态发生改变时），产生重绘回流，重新计算布局树
- **注意**：JS 获取 Layout 属性值（如：`offsetLeft`、`scrollTop`、`getComputedStyle`等）也会引起回流。因为浏览器需要通过回流计算最新值，而修改则是异步的
- 回流必将引起重绘，而重绘不一定会引起回流

> repaint的本质是重新根据分层信息计算绘制指令
- 当渲染树中的元素外观（如：颜色）发生改变，不影响布局时，产生重绘

> 如何避免？

- 需要要对元素进行复杂的操作时，可以先隐藏(`display:"none"`)，操作完成后再显示
- 需要创建多个`DOM`节点时，使用`DocumentFragment`创建完后一次性的加入`document`
- 缓存`Layout`属性值，如：`var left = elem.offsetLeft;` 这样，多次使用 `left` 只产生一次回流
- 尽量避免用`table`布局（`table`元素一旦触发回流就会导致 table 里所有的其它元素回流）
- 避免使用`css`表达式(`expression`)，因为每次调用都会重新计算值（包括加载页面）
- 尽量使用 `css` 属性简写，如：用 `border` 代替 `border-width`, `border-style`, `border-color`
- 批量修改元素样式：`elem.className` 和 `elem.style.cssText` 代替 `elem.style.xxx`

## 为什么transform效率高  ?

**transform**只影响渲染流程的最后一个draw阶段，不会影响layout布局或paint绘制指令

由于draw阶段位于合成线程，所以transform的变化和渲染主线程互不影响