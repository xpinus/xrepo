# Vue3深入本质

## 虚拟DOM

> DOM工作原理
- 浏览器引擎是如何处理DOM操作的？

WebIDL(web interface definition language)。定义浏览器和js之间如何通信，通过webIDL浏览器开发者可以描述哪些方法可以被js访问，以及这些方法如何被映射到js中。

真实DOM: 浏览器底层调用C++应用API的操作

- 虚拟DOM本质
> 是一种编程概念，在这个概念里，UI是以一种理想化的、“虚拟”的形式保存在内存中

> 虚拟DOM的本质就是普通的JS对象

在Vue中可以通过`h`函数创建虚拟DOM节点

> 为什么需要使用虚拟DOM

使用虚拟dom涉及两个层面的计算
- 创建js对象
- 根据js对象创建DOM节点

平时所说的虚拟DOM快的前提：
- 和谁比较：
  - 肯定是比原生js的DOM操作慢
  - 相比innerHTML比较
    - 在初始化渲染时两者间差距并不大，虚拟DOM多了一层计算会略慢
    - 主要是更新时，虚拟DOM性能更高
  
**虚拟DOM主要是防止在重新渲染时性能恶化**

还有哪些好处？
- 跨平台性：虚拟DOM增加一层抽象层，相当于和底层操作解耦。这个其实是设计原则里的依赖倒置原则：
  - 高层模块不应该依赖底层模块的额实现，两者都应该依赖于抽象。
- 框架更加灵活

## 模板的本质

> 渲染函数（h）

> 模板编译
> 将模板中的字符串编译成渲染函数
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

回顾Vue1 Vue2的响应式
- Object.defineProperty
- Dep： 相当于发布者
- Watcher: 相当于观察者
  - Vue1一个响应式数据对应一个Watcher
  - Vue2一个组件对应一个Watcher, 颗粒度放大

## 响应式

### 数据拦截的本质
- js中的数据拦截
  - Vue1\2 Object.defineProperty
  - Vue3 Proxy和Obeject.defineProperty

共同点：
- 都可以实现数据拦截
- 都可以实现深度拦截，Object.defineProperty需要手写递归

不同点：
- 拦截的广度
  - Object.defineProperty针对特定属性进行`读写`拦截，后续新增属性无法拦截
  - Proxy`针对一整个对象的多种操作`，包括属性的读取、复制、属性的删除等拦截
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
console.log(state.value.a) // 不会拦截  出发两层拦截  value  a
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

### 实现响应式系统

## 指令的本质



- v-if
背后就是三目运算符的不同分支，每一次 Ssetup上对应的值变化，都会触发渲染函数重新运行，进入到不同的分支

- v-for
用到了一个renderList内部方法，使用$setup对应的数据，renderList内部方法会对数据进行遍历，renderItem渲染每一项数据

## 插槽的本质

 使用的本质：父组件向子组件传递模板内容
 
传递内容的本质：传递的是一个对象，每一个KV对应一个插槽，值是一个（渲染）函数，能够得到对应的虚拟DOM

子组件设置插槽的本质：调用对应的函数，得到对应的虚拟Dom

## v-model的本质

语法糖，v-model会被展开为一个名为onUpdate:modelValue的自定义事件

## setup语法标签

宏（defineProps）：在开始编译之前，对宏代码进行文本替换

替换成vue3初始时的 export default {  ...配置  }

**默认不爆露任何成员**
 
## 组件生命周期


1. 初始化选项式API: 涉及组件实例对象的创建，创建前后对应着一组生命周期钩子函数，创建前：setup beforeCreate，组件实例创建后 created
2. 模板编译：编译后执行beforeMount 
3. 初始化渲染，创建和插入真实DOM节点，执行mounted
4. 组件更新，更新前执行beforeUpdate，更新后执行updated
5. 销毁组件，销毁前执行beforeDestroy，销毁后执行destroyed

了解：Vue3和Vue2的生命周期方法可以共存，Vue3的会更早执行

本质：在合适时机调用用户所设置的回调函数

组件实例本质上是一个对象，该对象维护者组件运行过程中的所有信息 

## KeepAlive

对组件进行缓存，避免组件被重复创建销毁

keep-alive的生命周期 onActived onDeactived

需要渲染器层面的支持，当组件需要卸载的时候，不能真的卸载，而是搬（move）到一个隐藏的容器（createElement）里，实现“假卸载”

## key

虚拟dom节点的唯一标识
- 高效的更新：
  - 在没有key时，vue会尽量复用已有的元素，而不管他们实际内容是否变化，这可能导致不必要的更新或错误更新
  - 通过key，vue可以准确知道哪些元素发生了变化，从而高效更新
- 确保元素的唯一性：key属性要求是唯一的，防止混淆
- 提升渲染性能：vue能通过key快速定位需要更新的元素



