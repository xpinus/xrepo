# [testcafe](https://testcafe.io/)

testcafe是一个端到端的web测试框架，依赖于nodejs支持linux\windows\macOS系统。能够运行在主流的桌面浏览器、云浏览器、移动端。
- TestCafe 使用[本机CDP协议](https://www.cnblogs.com/bigben0123/p/13540598.html)来自动化基于 Chromium 的本地浏览器。原生自动化使 TestCafe 能够忠实地重现与低级、高速浏览器访问的用户交互。
- 定制的反向代理允许 TestCafe 自动化其他浏览器，包括云浏览器和远程设备上的浏览器。


## 基本语法
> testcafe的测试文件由fixtures和tests组成
```js
import { Selector } from 'testcafe';

// 一个fixture表示一组有相同开始url的tests
fixture('Getting Started')
    .page('https://devexpress.github.io/testcafe/example'); // page方法设置开始的URL

// 声明一个新的测试方法
test('My first test', async (t) => {
    // 行为链
    await t
        .typeText('#developer-name', 'John Smith')  // 操作：填充文本
        .click('#submit-button') // 操作：点击按钮
        .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!'); // 断言
    
    // 以下错误发生，测试自动失败：
    // 1. 无法打开page URL
    // 2. 无法执行一个操作
    // 3. 网站抛出js错误
});
```
> 运行测试脚本
```shell
testcafe chrome getting-started.js 

testcafe chrome getting-started.js --live // live mode支持修改后自动重新运行
```

> [hooks](https://testcafe.io/documentation/402831/guides/basic-guides/test-structure)

## Element Selectors 元素选择器
- 类似css选择器，选中页面元素
- test action和assertions接收Selector作为参数

```js
/** 基于Selector Keywords的选择器 **/ 

Selector('button').withText('click me');  // 选中指定内容的按键

t.click(Selector('#big-red-button'));  // 点击指定元素；如果获取到多个action只会执行第一个；如果没获取到会报错
// or
t.click('#big-red-button');

Selector('nav .button');  // 支持更复杂的选择器  
// or 
Selector('nav').find('.button')


/** 基于Function的选择器 **/
const element = Selector(() => {
    const storedElementId = window.localStorage.storedElementId;
    return document.getElementById(storedElementId);
});


/** 基于Selector的选择器 **/
const parent = Selector('div'); // filters the DOM
const child = parent.find('button'); // inherits
```



