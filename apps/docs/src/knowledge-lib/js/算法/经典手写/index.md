# 经典手写

<script setup>
import f1 from './src/f1.js?raw';
import f2 from './src/f2.js?raw';
import q1 from './src/q1.js?raw';
import tree1 from './src/tree1.js?raw';
import tree2 from './src/tree2.js?raw';
import flat from './src/flat.js?raw';
import filter from './src/filter.js?raw';
import unsort from './src/unsort.js?raw';
import keli from './src/keli.js?raw';
import deepClone from './src/deepClone.js?raw';
import structure from './src/structure.js?raw';
import debounceRef from './src/debounceRef.vue';
import debounceRefCode from './src/debounceRef.vue?raw';
import debounce from './src/debounce.js?raw';
import throttle from './src/throttle.js?raw';
import params1 from './src/params1.js?raw';
import params2 from './src/params2.js?raw';
import LRU from './src/LRU.js?raw';
import memoize from './src/memoize.js?raw';
import numberSum from './src/numberSum.js?raw';
import fetchTimeout from './src/fetchTimeout.js?raw';
import taskPro from './src/taskPro.js?raw';
import revereStr from './src/revereStr.js?raw';
import timeout from './src/timeout.js?raw';
import LIS from './src/LIS.js?raw';
import demoDefineProperty from './src/demoDefineProperty.vue';
import demoProxy from './src/demoProxy.vue';
import demoDefinePropertyCode from './src/demoDefineProperty.vue?raw';
import demoProxyCode from './src/demoProxy.vue?raw';
</script>

## sleep延时函数

<run-script name="基于promise" :code="f1"></run-script>

<run-script name="基于Date.now()" :code="f2"></run-script>

## 函数式编程

<run-script name="实现下面函数" :code="q1">
</run-script>

## 扁平数组转树

- 法1 简单易懂，性能能差
<run-script :code="tree1"></run-script>
- 法2 一次遍历
<run-script :code="tree2"></run-script>

## 数组扁平化

<run-script :code="flat"></run-script>

## 数组去重
> 两个属性相同的对象也认为是相同的

<run-script :code="filter"></run-script>

## 数组打乱顺序

<run-script :code="unsort"></run-script>

> 为什么不用sort, 如`arr.sort((a, b) => Math.random() - 0.5)`
>
> sort算法会导致程序不稳定，极端条件下可能不会打乱顺序
 
## 柯里化

<run-script :code="keli"></run-script>

## 深浅拷贝

### 浅拷贝
- 展开运算符`...`
- `Object.assign`

### 深拷贝

- 可以通过 `JSON.parse(JSON.stringify(object))` 来解决
    - 会忽略 `undefined`和函数
    - 不能解决循环引用的对象
    - 将Date对象转换为字符串
- 第三方库lodash, 递归拷贝
  <run-script  :code="deepClone"></run-script>
- structuredClone() API 结构化克隆算法
    - core-js 已经支持 structuredClone 的 polyfill
    - 是浏览器提供的原生API，内部实现已经处理了许多复杂的细节和边缘情况，如循环引用、嵌套对象等，性能更好
    - 可以用于跨线程或跨工作线程的数据传输
    - 不支持拷贝某些复杂类型，如 Function、Dom节点、及对象上的一些特殊参数getter/setter/原型链等
      <run-script  :code="structure"></run-script>

## 防抖
> 仅执行一段时间内的最后一次操作

<run-script name='普通的js防抖'  :code="debounce"></run-script>

**vue3中使用自定义ref实现防抖**

<preview :code="debounceRefCode">
  <debounce-ref />
</preview>

## 节流
> 防抖动和节流本质是不一样的。防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行

<run-script :code="throttle"></run-script>

## 解析URL中的参数

- 法1 浏览器API
  <run-script :code="params1">
  </run-script>
- 法2
  <run-script :code="params2">
  </run-script>

## 双向数据绑定`mvvm`

### Object.defineProperty

<preview :code="demoDefinePropertyCode">
  <demo-define-property />
</preview>

### proxy实现

<preview :code="demoProxyCode">
  <demo-proxy />
</preview>

###  优劣对比

Proxy 的优势如下:

- Proxy 可以直接监听对象而非属性；
- Proxy 可以直接监听数组的变化；
- Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
- Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；
- Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；

Object.defineProperty 的优势如下:

- 兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。

## LRU最久未使用队列

<run-script :code="LRU"></run-script>

## memoize可记忆函数

<run-script :code="memoize"></run-script>

## 大数相加

<run-script :code="numberSum"></run-script>

## 请求超时取消

<run-script :code="fetchTimeout"></run-script>

## 任务链

<run-script :code="taskPro"></run-script>

## 反转字符串

<run-script :code="revereStr"></run-script>

## 可暂停的倒计时

<run-script :code="timeout"></run-script>

## 最长递增子序列

> 思路：贪心算法 + 二分查找 + 反向链表

<run-script :code="LIS"></run-script>
