# Vue3深入本质

## 虚拟DOM

> DOM工作原理
- 浏览器引擎是如何处理DOM操作的？

WebIDL(web interface definition language)。定义浏览器和js之间如何通信，通过webIDL浏览器开发者可以描述哪些方法可以被js访问，以及这些方法如何被映射到js中。

真实DOM: 浏览器底层调用C++应用API的操作

> 虚拟DOM本质
- 是一种编程概念，在这个概念里，UI是以一种理想化的、“虚拟”的形式保存在内存中
- 虚拟DOM的本质就是普通的JS对象
- 在Vue中可以通过`h`函数创建虚拟DOM节点

> 为什么需要使用虚拟DOM

平时所说的虚拟DOM快的前提，要看和谁比较：
- 肯定是比原生js的DOM操作慢，因为使用虚拟dom涉及两个层面的计算
  - 创建js对象
  - 根据js对象创建DOM节点
- 相比innerHTML比较
  - 在初始化渲染时两者间差距并不大，虚拟DOM多了一层计算会略慢
  - 主要是更新时，虚拟DOM性能更高, 因为普通的模板语法只能做到全量更新
- 异步更新，可以合并多次操作，避免无效渲染
  
**虚拟DOM主要是防止在重新渲染时性能恶化**

还有哪些好处？
- 跨平台性：虚拟DOM增加一层抽象层，相当于和底层操作解耦。
  - 这个其实是设计原则里的依赖倒置原则：高层模块不应该依赖底层模块的额实现，两者都应该依赖于抽象。
- 框架更加灵活，无需手动操作dom

> diff 算法

## 模板的本质

> 渲染函数（h）

> 模板编译：将模板中的字符串编译成渲染函数
- 解析器：将模板字符串解析成对应的模板AST
- 转换器：将模板AST转换为JS AST
- 生成器：将JS AST生成最终的渲染函数

> 编译的时机
- 运行时编译
  - CDN引入Vue时
- 预编译

## 组件树和虚拟DOM树

> 组件树：由组件所组成的树结构

> 虚拟DOM树：指某一个组件内部的虚拟DOM树，**并非整个应用的虚拟DOM结构**

## 响应式

回顾Vue1 Vue2的响应式
- Object.defineProperty
- Dep： 相当于发布者
- Watcher: 相当于观察者
  - Vue1一个响应式数据对应一个Watcher
  - Vue2一个组件对应一个Watcher, 颗粒度放大

### 数据拦截的本质
- js中的数据拦截
  - Vue1\2： Object.defineProperty
  - Vue3： Proxy和Obeject.defineProperty

共同点：
- 都可以实现数据拦截
- 都可以实现深度拦截，Object.defineProperty需要手写递归

不同点：
- 拦截的广度
  - Object.defineProperty针对特定属性进行`读写`拦截，后续新增属性无法拦截
  - Proxy`针对一整个对象的多种操作`，包括属性的读取、复制、属性的删除等拦截，凡是被Reflect暴露的底层操作应该是都可以拦截
- 性能上的区别
  - 大多数情况下Proxy更加高效

### 响应式数据的本质
> 响应式数据就是被拦截的对象

ref: Object.defineProperty 和 Proxy

reactive: Proxy

> 学会判断某个操作是否会产生拦截, 因为只有拦截才会由依赖收集和派发更新

```js
const state = ref(1)

state;  // 不会产生拦截
console.log(state); // 不会拦截
console.log(state.value) // 会拦截
console.log(state.a) // 不会拦截
state.a = 2 // 不会拦截
delete state.a // 不会拦截
state = 3; // 不会拦截
```

```js
const state = ref({ a: 1})

state;  // 不会产生拦截
console.log(state); // 不会拦截
console.log(state.value) // 会拦截
console.log(state.a) // 不会拦截
console.log(state.value.a) // 会拦截  出发两层拦截  value  a
state.a = 2 // 不会拦截
delete state.value.a // 会拦截  value的get  a的delete
state = 3; // 不会拦截
```

```js
const state = reactive({ a: 1})

state;  // 不会产生拦截
console.log(state); // 不会拦截
console.log(state.a) // 会拦截
state.a = 2 // 会拦截
state.a = {
  b: {
    c: 3
  }
}  // 会拦截 a的set
console.log(state.a.b.c) // 会拦截 3次
delete state.a // 会拦截  a的delete
```

```js
const arr = reactive([1,2,3])
arr; // 不会
arr.length // 会
arr[0] // 会， 0 的get操作
arr[0] = 4 // 会， 0 的set操作
arr[0].push(4); // 会， push的get length的get 3的set length的set
```

### 响应式的本质
- 依赖收集：收集一些函数，当数据变化时需要重新执行这些函数
- 派发更新：就是通知收集的函数重新执行

**数据**

ref\reactivee\props\computed 这几种得到的就是响应式数据

**依赖**

`在函数运行期间`，出现了读取响应式数据被拦截的情况，就会产生依赖关系

- **注意：如果存在异步，则异步之后不看**
- **函数**：函数必须是被监控的函数： effect、watchEffect、watch、组件渲染函数

### 响应式和组件渲染

当render函数内部用到了响应式数据时，会产生关联，当响应式数据变化，关联的render函数会重新运行（源码中是updateComponent）

`vite-plugin-inspect`可以编译过程中代码变化

> 为什么vue能实现组件更新

因为响应式数据是和组件的render函数关联在一起的

> 为什么vue能实现数据共享

在vue中可以轻松实现数据共享，只需要将响应式数据单独提取出来，在多个组件中使用即可

**那pinia的作用呢？**
Pinia是经过完善的测试的，更多附加功能，例如：
- 开发者工具支持
- 热替换
- 插件机制
- 自动补全
- SSR
- 持久化

### 实现响应式系统

[源码](https://github.com/xpinus/xrepo/tree/main/apps/docs/src/knowledge-lib/%E6%A1%86%E6%9E%B6/vue/%E5%AE%9E%E7%8E%B0%E5%93%8D%E5%BA%94%E5%BC%8F%E7%B3%BB%E7%BB%9F)

## 指令的本质
> 最终编译出来的渲染函数，根本不存在什么指令，不同的指令会被编译为不同处理。
- `v-if`编译后后就是三目运算符的不同分支，每一次 $setup 上对应的值变化，都会触发渲染函数重新运行，进入到不同的分支
- `v-for`编译后用到了一个renderList内部方法，使用 $setup 对应的数据，renderList内部方法会对数据进行遍历，使用renderItem渲染每一项数据
- `v-bind`编译后将$setup对应的属性值赋给元素的属性，每一次 $setup 对应的值变化，都会触发重新渲染
- `v-on`编译为元素上对应的事件函数如onClick等

## 插槽的本质
- 默认插槽：拥有默认的一些内容
- 具名插槽：给你的插槽取一个名字，从而在不同位置设置多个插槽
- 作用域插槽：数据来自于子组件，通过插槽的形式传递给父组件使用

**使用时的表现**：子组件通过slot设置插槽，父组件向子组件传递template模板内容
 
**传递内容的本质**：父组件向子组件传递的是一个对象，每一个KV对应一个插槽`{ default: function { ... } }`，值是一个（渲染）函数，能够得到对应的虚拟DOM

**子组件设置插槽的本质**：调用对应的函数，得到对应的虚拟Dom

## v-model的本质
v-model有两个使用场景：
- 表单元素和响应式数据的双向绑定
- 父子组件传递数据

语法糖，v-model会被展开为一个名为onUpdate:modelValue的自定义事件

## setup语法标签
> `<script setup>`做了什么

是一个对于vue3初始时的 export default {  ...配置  } 的配置式选项写法中setup的语法糖

**区别：**
- 配置式setup内书写的内容在编译后会原封不动的放到编译后的setup()函数中
  - setup返回的内容会默认全部暴漏出去，除非手动配置expose或在setup中调用expose()
- 标签式也会编译成一个setup()函数，
  - 其内会自动调用expose(),默认不会暴露任何东西
  - 宏函数：在开始编译之前，预处理时会对宏代码进行文本替换，编译后不存在
 
## 组件生命周期
> 本质：在合适时机调用的用户所设置的回调函数 
1. 初始化选项式API: 涉及组件实例对象的创建，创建前后对应着一组生命周期钩子函数，创建前：setup beforeCreate，组件实例创建后 created
2. 模板编译：编译后执行beforeMount 
3. 初始化渲染，创建和插入真实DOM节点，之后执行mounted
4. 组件更新，更新前执行beforeUpdate，更新后执行updated
5. 销毁组件，销毁前执行beforeDestroy，销毁后执行destroyed
6. 失活/激活组件，keep-alive的生命周期，失活前执行onDeactived，激活后执行onActived
7. 子组件错误：onErrorCaptured 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播

![](./asset/hook.png)

了解：Vue3和Vue2的生命周期方法可以共存，Vue3的会更早执行

**组件实例本质上是一个对象，该对象维护者组件运行过程中的所有信息** 

> 监听子组件的生命周期
```vue
<Child @vnode-mounted="doSomething"></Child>
```

## KeepAlive
> 对组件进行缓存，避免组件被重复创建销毁

```vue
<template>
  <keep-alive>
      <Tab v-if="currentTab === 1">...</Tab>
      <Tab v-if="currentTab === 2">...</Tab>
      <Tab v-if="currentTab === 3">...</Tab>	
  </keep-alive>
</template>
```

**keepalive的本质**：需要渲染器层面的支持，当组件需要卸载的时候，不能真的卸载，而是搬（move）到一个隐藏的容器（createElement）里，实现“假卸载”
- keep-alive 会给内部组件添加一些特殊的标识，这些标识就是给渲染器的用，回头渲染器在挂载和卸载组件的时候，会根据这些标识执行特定的操作
- include 和 exclude 核心原理就是对内部组件进行一个匹配操作，匹配上了再进入后面的缓存逻辑
- max：添加之前看一下缓存里面有没有缓存过该组件
  - 缓存过：更新到队列最后
  - 没有缓存过：加入到缓存里面，但是要看一下有没有超过最大值，超过了就需要进行修剪。

## key
> 虚拟dom节点的唯一标识
- 提升渲染性能，高效的更新：vue能通过key快速定位需要更新的元素
  - 在没有key时，vue会尽量复用已有的元素，而不管他们实际内容是否变化，这可能导致不必要的更新或错误更新
  - 通过key，vue可以准确知道哪些元素发生了变化，从而高效更新
- 确保元素的唯一性：key属性要求是唯一的，防止混淆



