# 前端开发规范

## 编程规范

### 命名规范
- 项目命名：全部采用小写方式， 以中划线分隔单词
> ✅ fronted-project

> ❌ frontedProject / fronted_project  

- 目录命名：全部采用小写方式， 以中划线分隔，有复数结构时，要采用复数命名法， 缩写不用复数

> ✅ scripts / styles / components / images / utils / layouts / img / doc

> ❌ script / style / imgs / docs

- 文件命名： 全部采用小写方式， 以中划线分隔

> ✅ render-dom.js / user-management.html

> ❌ renderDom.js / UserManagement.html

- 其他

> ❌ 严禁使用拼音与英文混合的方式，除特殊词义，不推荐使用拼音

> ❌ 严禁使用拼音与英文混合的方式，除特殊词义，不推荐使用拼音

### HTML规范

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta charset="UTF-8" />
    <title>Page title</title>
    <link href="style.css" />
  </head>
  <body>
    <img src="images/company-logo.png" alt="Company" />
  </body>
  <script src="demo.js"></script>
</html>
```

### CSS规范
> [BEM规范以及用法](https://juejin.cn/post/6844904104792162312?from=search-suggest)

类名由三部分组成：块（block）、元素（element）、修饰符（modifier）

```html
<style>
  .form { }
  .form--theme-xmas { }
  .form--simple { }
  .form__input { }
  .form__submit { }
  .form__submit--disabled { }
</style>

<!-- 对应的HTML结构如下：-->
<form class="form form--theme-xmas form--simple">
  <input class="form__input" type="text" />
  <input
    class="form__submit form__submit--disabled"
    type="submit" />
</form>

```

⚠ 对于less/sass要避免嵌套层级过多：将嵌套深度限制在3级。对于超过4级的嵌套，给予重新评估

⚠ 避免使用ID选择器及全局标签选择器，防止污染全局样式


### js规范
> 项目中应使用eslint+prettier 实现代码风格统一、语法检查、代码美化

- 命名
  - 方法名、参数名、成员变量、局部变量都统一使用 lowerCamelCase 风格，必须遵从驼峰形式
  - 方法命名必须是 动词 或者 动词+名词 形式，确保语义化，应该始终是多个单词组成（≥ 2）
  - 全局常量命名采用全大写，单词间用下划线连接，力求语义表达完整清楚，不要嫌名字长
  - 👍 推荐用词
    - 增/删/改/查/详情：add  /  delete / update / get / detail
    - get 获取 / set 设置
    - add 增加 / remove 删除
    - create 创建 / destory 移除
    - start 启动 / stop 停止
    - open 打开 / close 关闭
    - read 读取 / write 写入
    - load 载入 / save 保存
    - create 创建 / destroy 销毁
    - begin 开始 / end 结束
    - backup 备份 / restore 恢复
    - import 导入 / export 导出
    - split 分割 / merge 合并
    - inject 注入 / extract 提取
    - attach 附着 / detach 脱离
    - bind 绑定 / unbind 分离
    - view 查看 / browse 浏览
    - edit 编辑 / modify 修改
    - select 选取 / mark 标记
    - copy 复制 / paste 粘贴
    - undo 撤销 / redo 重做
    - insert 插入 / delete 移除
    - add 加入 / append 添加
    - clean 清理 / clear 清除
    - index 索引 / sort 排序
    - find 查找 / search 搜索
    - increase 增加 / decrease 减少
    - play 播放 / pause 暂停
    - launch 启动 / run 运行
    - compile 编译 / execute 执行
    - debug 调试 / trace 跟踪
    - observe 观察 / listen 监听
    - build 构建 / publish 发布
    - input 输入 / output 输出
    - encode 编码 / decode 解码
    - encrypt 加密 / decrypt 解密
    - compress 压缩 / decompress 解压缩
    - pack 打包 / unpack 解包
    - parse 解析 / emit 生成
    - connect 连接 / disconnect 断开
    - send 发送 / receive 接收
    - download 下载  /upload 上传
    - refresh 刷新 / synchronize 同步
    - update 更新 / revert 复原
    - lock 锁定 / unlock 解锁
    - check out 签出 / check in 签入
    - submit 提交 / commit 交付
    - push 推 / pull 拉
    - expand 展开 / collapse 折叠
    - begin 起始 / end 结束
    - start 开始 / finish 完成
    - enter 进入 / exit 退出
    - abort 放弃 / quit 离开
    - obsolete 废弃 / depreciate 废旧
    - collect 收集 / aggregate 聚集

> ✅ render-dom.js / user-management.html

> ❌ renderDom.js / UserManagement.html

- 使用 ES6+语法
- 禁用undefined判断：永远不要直接使用 undefined 进行变量判断；使用 typeof 和字符串’undefined’对变量进行判断
- 条件判断和循环最多三层： 如果超过 3 层请抽成函数，并写清楚注释
- this的转换命名：对上下文 this 的引用只能使用’that’来命名
- 注释：[JSDocs：快速入门指南](https://juejin.cn/post/7220244993789214757#heading-5)
```js
/**
 * Adds two numbers together and returns the result.
 * @param {number} value1 - The first value
 * @param {number} value2 - The second value
 * @returns {string} The values that have been added together
 * @example
 * const a = 10;
 * const b = 20;
 *
 * const result = addNumbers(a, b);
 * console.log(result);
 * // Logs: 30
 */
function addNumbers(value1, value2) {
  return value1 + value2;
}
```

## Vue规范

先阅读[官方风格指导](https://cn.vuejs.org/style-guide/)

- 组件名应该为多个单词
  - 基础组件统一以Base开头，如：`BaseButton` / `BaseIcon`
  - 子组件应该以其父组件名开头，如：`TodoList` / `TodoListItem` / `TodoListItemButton`
  - 组件名应尽量保证一致的开头：`SearchButtonClear` / `SearchButtonRun` / `SearchInputQuery`
  - Vue组件在使用时
    - 在SFC、string templates、JSX中使用大驼峰自闭合的写法：`<MyComponent/>`
    - 在dom中使用短横线命名法：`<my-component></my-component>`
  - 组件名始终不推荐出现缩写、拼音等
- Props
  - 定义时采用小驼峰命名
  - 使用时使用短横线命名，保持风格一致
- 避免在一个元素上同时使用v-for和v-if
- 使用component-scoped样式
- template中不要出现js，采用computed替代
- SFC 中的标签顺序统一为 `<script>`、`<template>`、`<style>`
- 代码中禁止出现 this.$parent、this.$root 之类的访问祖先组件的代码，防止数据流混乱
  - 使用prop和emit，或者全局store

## Git规范
### commit规范
> husky  + lint-staged + commitlint + cz-customizable(commitizen) 实现git提交格式规范

[约定式提交规范](https://www.conventionalcommits.org/zh-hans/v1.0.0/#%e7%ba%a6%e5%ae%9a%e5%bc%8f%e6%8f%90%e4%ba%a4%e8%a7%84%e8%8c%83)

[gitmoji](https://gitmoji.dev/)

> `<类型>[范围]`: `<标题>[主题内容]`
- 类型（必须)：用于说明git commit的类别，只允许使用下面的标识。
  - feat：新功能（feature）。
  - fix：修复bug，可以是QA发现的BUG，也可以是研发自己发现的BUG。
  - docs：文档（documentation）。
  - style：格式（不影响代码运行的变动）。
  - refactor：重构（即不是新增功能，也不是修改bug的代码变动）。
  - perf：优化相关，比如提升性能、体验。
  - test：增加测试。
  - chore：构建过程或辅助工具的变动。
  - revert：回滚到上一个版本。
  - merge：代码合并。
- 范围(可选)：用于说明 commit 影响的范围，例如项目包含多模块，admin、interface、task、job等
多个以|分割
- 标题(必须)：标题是commit目的的简短描述。
- 主体内容(可选)：用新的空行将“标题”和“主体内容”隔开，Git 会自动识别第一行为摘要。主体内容是commit目的的详细描述，可以放一些备注、说明等

### 版本管理和changelog

standard-version 实现版本管理和changelog


## 提高代码的可维护性和可扩展性

- 遵循合适设计原则和模式：单一职责、开闭原则、依赖倒置原则等，是代码更加清晰可维护
- 模块化开发
- 遵循一致的开发规范，见上文
- 单元测试和自动化测试
- 持续集成和部署