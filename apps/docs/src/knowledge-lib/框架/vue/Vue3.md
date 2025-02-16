# Vue3
Vue的优缺点
- 优点：
  - 数据驱动视图
  - 组件化
  - 强大且丰富的 API
  - 生命周期钩子函数
  - 生态好，社区活跃
- 缺点
  - 兼容性问题
    - 由于底层基于 Object.defineProperty 实现响应式，而这个 api 本身不支持 IE8 及 以下浏览器
    - 由于Proxy，vue3不支持IE浏览器
  - 首屏性能问题
  - SEO

## 变化

- 源码上的变化
  - 改为monirep源码管理模式
  - typescript支持
- 性能的变化
  - 代码体积缩小，移除像filter等冷门功能，采用rollup tree-shaking打包
  - 数据劫持优化：Proxy
  - 编译优化：
    - 静态提升
    - 预字符串化
    - 缓存事件处理函数
    - Block Tree
    - PatchFlag
  - diff算法优化：
    - vue2 双端diff
    - vue3 快速diff
- 语法API的变化
  - Vue2 OptionsAPI，逻辑代码按照 data、methods、computed、props 进行分类
  - Vue3.x: OptionsAPI + CompositionAPI（推荐）
    - CompositionAPI优点：查看一个功能的实现时候，不需要在文件跳来跳去；并且这种风格代码可复用的粒度更细，高内聚
  - 优化逻辑复用: vue2使用mi'xing，vue3使用组合式函数
  - 更改了创建vue实例的方式
    - vue2: new Vue(options) 这种方式缺点在于一个页面如果存在多个 Vue 应用，部分配置会影响所有的 Vue 应用
    - vue3: createApp(options)
- 引入RFC: RFC 全称是 Request For Comments. 这是一种在软件开发和开源项目中常用的提案流程，用于收集社区对某个新功能、改动或标准的意见和建议

> 面试题：为什么 Vue3 中去掉了 Vue 构造函数？

参考答案：

Vue2 的全局构造函数带来了诸多问题：
- 调用构造函数的静态方法会对所有vue应用生效，不利于隔离不同应用
- Vue2 的构造函数集成了太多功能，不利于 tree shaking，Vue3 把这些功能使用普通函数导出，能够充分利用 tree shaking 优化打包体积
- Vue2 没有把组件实例和 Vue 应用两个概念区分开，在 Vue2 中，通过 new Vue 创建的对象，既是一个 Vue 应用，同时又是一个特殊的 Vue 组件。Vue3 中，把两个概念区别开来，通过 createApp 创建的对象，是一个 Vue 应用，它内部提供的方法是针对整个应用的，而不再是一个特殊的组件。

> 说一下 Vue3 相比 Vue2 有什么新的变化？

Vue3 相比 Vue2 的整体变化，可以分为好几大类：

- 源码优化
- 性能优化
- 语法 API 优化
- 引入 RFC
源码优化体现在使用 typescript 重构整个 Vue 源码，对冷门的功能进行了删除，并且整个源码的结构变为了使用 Monorepo 进行管理，这样粒度更细，不同的包可以独立测试发布。用户也可以单独引入某一个包使用，而不用必须引入 Vue.

性能上的优化是整个 Vue3 最核心的变化，通过优化响应式、diff算法、模板编译，Vue3 的性能相比 Vue2 有质的飞跃，基本上将性能这一块儿做到了极致。所以 Vue 的新项目建议都使用 Vue3 来搭建。

不过性能层面的优化，开发者无法直接的感知，开发者能够直接感知的，是语法上的优化，例如 Vue3 提出的 CompositionAPI，用于替代 Vue2 时期的 OptionsAPI. 这样能够让功能逻辑更加集中，无论是在阅读还是修改都更加方便。另外 CompositionAPI 让代码复用的粒度上更细，不需要再像以前一样使用 mixin 复用逻辑，而是推荐使用组合式函数来复用逻辑。

不过 Vue3 也不是完全废弃了 OptionsAPI，在 Vue3 中，OptionsAPI 成为了一种编码风格。

最后就是引入 RFC，尤雨溪和核心团队广泛采用了 RFC 的流程来处理新功能和重大更改。

## 属性透传
一些没有被组件声明为 props、emits 或自定义事件的属性，但依然能传递给子组件，例如常见的 class、style 和 id

1. 对 class 和 style 的合并
   
如果一个子组件的根元素已经有了 class 或 style attribute，它会和从父组件上继承的值合并。

子组件其他同名的属性，会被忽略，应用父组件上继承的值。

**注意** 
- 和 props 不同，透传 attributes 在 JS 中保留原始大小写，所以像 foo-bar 这样的 attribute 需要通过 $attrs['foo-bar'] 来访问。
- 像 @click 这样的一个 v-on 事件监听器将在此对象下被暴露为一个函数 $attrs.onClick

2. 深层组件继承

有些情况下，一个组件会在根节点上直接去渲染另一个组件，这种情况属性会继续透传。深层透传的属性不包含 A 组件上声明过的 props 或是针对 emits 声明事件的 v-on 侦听函数，可以理解为这些属性在 A 组件上消费了。

3. 禁用属性透传

属性会自动透传到根元素上，但有时我们想要控制透传属性的位置

禁用透传
```js
defineOptions({
  inheritAttrs: false
})
```
通过 v-bind 绑定 $attrs 手动指定位置
```vue
<div>
  <p v-bind="$attrs">A组件</p>
</div>
```

4. 多根节点属性透传

这种情况下 Vue 不知道要将 attribute 透传到哪里，所以会抛出一个警告。此时需要通过 $attrs 显式绑定。

5. JS中访问透传的属性
```vue
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
```
或者
```js
export default {
  setup(props, ctx) {
    // 透传 attribute 被暴露为 ctx.attrs
    console.log(ctx.attrs)
  }
}
```

## 依赖注入
> 方便实现跨层级传递

- 提供方：负责提供数据
```js
<script setup>
import { provide } from 'vue'

provide(/* 数据名称 */ 'message', /* 实际数据 */ 'hello!')
</script>
```

- 注入方：负责接收数据
```js
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

**注意项**
- 如果使用options API则必须在setup中同步调用，因为 Vue 的依赖注入机制需要在组件初始化期间同步建立依赖关系，这样可以**确保所有组件在渲染之前就已经获取到必要的依赖数据**。
- 全局依赖提供 `app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')`
- 默认值 `const value = inject('message', '这是默认值'); // 如果没有祖先提供message则会采用默认值`
- 提供方所提供的值可以是**任意类型的值，包括响应式的值**。
  - 如果提供的值是一个 ref，注入进来的会是该 ref 对象，而不会自动解包为其内部的值。
  - 代码风格推荐：可能将任何对响应式状态的变更都保持在提供方组件中，如需修改可以向下传递对应的方法
  - 使用 readonly 来提供只读值 `provide('read-only-count', readonly(count)) // import { ref, provide, readonly } from 'vue' `
- 使用Symbol作为数据名防止冲突

## 组合式函数
组合式函数，本质上也就是代码复用的一种方式。
- 组件：对结构、样式、逻辑进行复用
- 组合式函数：侧重于对 有状态 的逻辑进行复用

**约定和最佳实践**
- 以`use`作为开头, 驼峰命名法
- 输入参数是响应式数据的情况, 为了让它能够被正确追踪，请确保要么使用 watch( ) 显式地监视 ref 或 getter，要么在 watchEffect( ) 中调用 toValue( )
- 返回值推荐返回一个普通对象，该对象的每一项是 ref 数据，这样可以保证在解构的时候仍然能够保持其响应式的特性
- 副作用：例如添加 DOM 事件监听器或者请求数据。但是请确保在 onUnmounted 里面清理副作用。
- 使用限制：
  - 选项式 API，那么需要在 setup 方法中调用组合式函数，并且返回，这样才能暴露给 this 及其模板使用
  - 只能被同步调用，以确保在组件实例的初始化过程中，所有相关的状态和副作用都能被正确地设置和处理。
  - 可以在像 onMounted 生命周期钩子中调用：在某些情况下，可以在如 onMounted 生命周期钩子中调用组合式函数。这些生命周期钩子也是同步执行的，并且在组件实例已经被初始化后调用，因此可以安全地使用组合式函数。

> 解决了 Vue2 时期 mixin 的一些问题。
- 不清晰的数据来源：当使用多个 minxin 的时候，实例上的数据属性来自于哪一个 mixin 不太好分辨。
- 命名空间冲突：如果多个 mixin 来自于不同的作者，可能会注册相同的属性名，造成命名冲突
- 隐式的跨mixin交流

```js
const mixinA = {
  data() {
    return {
      sharedValue: 'some value'
    };
  },
  methods: {
    fetchData() {
      // fetch data logic for mixin A
      console.log('Fetching data from mixin A');
    }
  }
};

const mixinB = {
  methods: {
    fetchData() {
      // fetch data logic for mixin B
      console.log('Fetching data from mixin B');
    }
  },
  computed: {
    dValue(){
      // 和 mixinA 具有隐式的交流
      // 因为最终 mixin 的内容会被合并到组件实例上面，因此在 mixinB 里面可以直接访问 mixinA 的数据
      return this.sharedValue + 'xxxx';
    }
  }
};

new Vue({
  mixins: [mixinA, mixinB],
  template: `
    <div>
      <button @click="fetchData">Fetch Data</button>
    </div>
  `
});
```

## 自定义指令
> 自定义指令的本质也是一种复用: 重用涉及普通元素的底层 DOM 访问的逻辑

**1. 不同组件写法下的自定义指令**

Vue3 setup 语法中，任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令
```vue
<template>
  <input type="text" v-focus />
</template>

<script setup>
// 会自动局部注册自定义指令
const vFocus = {
  // 键：生命周期钩子 值：函数
  mounted: (el) => {
    // 这个是 DOM 原生方法，用来让元素获取焦点
    el.focus()
  }
}
</script>
```
非 setup 语法：需要在 directives 中进行注册
```js
export default {
  // 有一个directives的配置选项
  directives: {
    focus: {
      mounted: (el) => el.focus()
    }
  }
}
```

**2. 全局注册**
```js
app.directive('focus', {
  mounted(el) {
    el.focus();
  }
});
```

**3. 指令生命周期钩子**
```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode) {}
}
```
- el: 指令绑定到的元素。这可以用于直接操作 DOM。
- binding: 指令的绑定对象。它包含了指令所绑定的一些属性和方法。
```text
<div v-example:foo.bar="baz">

binding = {
  arg: 'foo',
  modifiers: { bar: true },
  value: /* baz 的值 */,
  oldValue: /* 上一次更新时 baz 的值 */
}
```
- vnode：代表绑定元素的底层 VNode
- preVnode：代表之前的渲染中指令所绑定元素的 VNode。

**4. 传递多个值**

需要传递多个值时，可以使用对象字面量

## 插件
> 插件（plugin）是一种可选的独立模块，它可以添加特定功能或特性，而无需修改主程序的代码。

一个插件可以是一个拥有 install 方法的对象, 也可以直接是一个安装函数
```js
const myPlugin = {
  install(app, options) {
    // 配置此应用
  }
}

// app.use(myPlugin, { ... });  // 使用
```
- app：应用实例
- options：额外选项，这是在使用插件时传入的额外信息

**Vue中插件带来的增强包括**：
- 通过 app.component 和 app.directive 注册一到多个全局组件或自定义指令
  - 例如：自定义组件库时，install 方法所做的事情就是往当前应用注册所有的组件
- 通过 app.provide 使一个资源注入进整个应用
- 向 app.config 中添加一些全局实例属性或方法
  - [config.errorHandler](https://blog.csdn.net/m0_37943716/article/details/142357194) 定义一个全局的 错误处理 函数来捕获整个应用程序中的错误
- 一个可能上述三种都包含了的功能库 (例如 vue-router)

## Transition
> Transition 是 Vue 提供的一个内置组件，作用：会在一个元素或组件进入和离开 DOM 时应用动画。

## Teleport
> Vue 里面的一个内置组件。作用：将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。

## 异步组件`defineAsyncComponent`
> 指的是在需要时才加载的组件

```vue
<template>
  <div id="app">
    <button @click="loadComponent('Home')">访问主页</button>
    <component :is="currentComponent" v-if="currentComponent"></component>
  </div>
</template>

<script setup>
import { shallowRef, defineAsyncComponent } from 'vue'
// import Home from './components/Home.vue'

const currentComponent = shallowRef(null)

const loadComponent = (name) => {
  currentComponent.value = defineAsyncComponent(() => import(`./components/${name}.vue`))
}
</script>
```

## Suspense

主要用来在组件树中协调对异步依赖的处理
```text
<Suspense>
└─ <Dashboard>
   ├─ <Profile>（内容一）
   │  └─ <FriendStatus>（好友状态组件：有异步的setup方法）
   └─ <Content>（内容二）
      ├─ <ActivityFeed> （活动提要：异步组件）
      └─ <Stats>（统计组件：异步组件）
```
在这个组件树中有多个嵌套组件，要渲染出它们，首先得解析一些异步资源。

每个异步组件需要处理自己的加载、报错和完成状态。在最坏的情况下，可能会在页面上看到三个旋转的加载状态，然后在不同的时间显示出内容。

有了 `<Suspense>` 组件后，我们就可以在等待整个多层级组件树中的各个异步依赖获取结果时，在**顶层统一处理加载状态**。

**`<Suspense>` 可以等待的异步依赖有两种：**
- 带有异步 setup( ) 钩子的组件。这也包含了使用 `<script setup>` 时有顶层 await 表达式的组件
- 异步组件

**在 `<Suspense>` 组件中有两个插槽，两个插槽都只允许一个直接子节点。**
- #default：当所有的异步依赖都完成后，会进入完成状态，展示默认插槽内容。
- #fallback：如果有任何异步依赖未完成，则进入挂起状态，在挂起状态期间，展示的是后备内容。

**其他细节**
- 内置组件嵌套顺序: `<Transition>、<KeepAlive>、<Suspense> `
- 事件:
  - pending：在进入挂起状态时触发
  - resolve：在 default 插槽完成获取新内容时触发
  - fallback：显示后备内容的时候触发

## 组件通信

### 父子组件
- Props：通过 Props 可以实现父组件向子组件传递数据。
- Event：又被称之为自定义事件，原理是父组件通过 Props 向子组件传递一个自定义事件，子组件通过 emit 来触发自定义事件，触发自定义事件的时候就会传递一些数据给父组件
- 属性透传：一些没有被组件声明为 props、emits 或自定义事件的属性，但依然能传递给子组件，例如常见的 class、style 和 id.
- ref引用：ref除了创建响应式数据以外，还可以拿来作为引用。
- 作用域插槽：子组件在设置 slot 的时候，上面绑定一些属性，回头父组件通过 v-slot 来拿到这些属性。
### 跨层级组件通信
- 依赖注入：通过 provide（提供数据方）和 inject（注入数据方）来实现的。
- 事件总线：从 Vue2 时期就支持的一种通信方式。从 Vue3 开始更加推荐 依赖注入 或者 Pinia 来进行组件通信。不过事件总线这种方式仍然保留了下来。
  - 本质上是设计模式里面的观察者模式，有一个对象（事件总线）维护一组依赖于它的对象（事件监听器），当自身状态发生变化的时候会通过所有的事件监听器
- 数据仓库：pinia



## vuex和pinia的区别

pinia: 响应式、store分离、类型安全、热更新、持久化

## 如何获得v-for生成的批量ref


```js
const itemRefs = [];

const setItemRef = (el) => {
    if (el) {
        itemRefs.push(el);
    }
};

// 
// <li v-for="(item, index) in list" :key="index" :ref="setItemRef">
```



## 插槽

当父组件需要向子组件传递模板内容时

实现：子组件内添加slot，父组件在使用子组件时，在子组件子元素之间书写的内容会放在插槽处

## Vue3中ref('张三')和ref({name: '张三'})有什么区别

ref 是用来创建响应式引用的函数。
- 当使用 ref 包装 基本类型 时，Vue 会对RefImpl的value属性拦截getter和setter将这个基本值变成响应式，更新时触发视图更新。
- 当使用 ref 包装 对象 时，Vue 还会用toReactive将对象本身变成响应式对象。访问和修改这些属性时同样会触发视图更新。

## Vue3.0 编译做了哪些优化？

- 生成 Block tree
  - Vue.js 2.x 的数据更新并触发重新渲染的粒度是组件级的，单个组件内部需要遍历该 组件的整个 vnode 树。在 2.0 里，渲染效率的快慢与组件大小成正相关：组件越大， 渲染效率越慢。并且，对于一些静态节点，又无数据更新，这些遍历都是性能浪费。 Vue.js 3.0 做到了通过编译阶段对静态模板的分析，编译生成了 Block tree。 
  - Block tree是一个将模版基于动态节点指令切割的嵌套区块，每个区块内部的节点结构是固定的， 每个区块只需要追踪自身包含的动态节点。所以，在 3.0 里，渲染效率不再与模板大 小成正相关，而是与模板中动态节点的数量成正相关
- slot 编译优化
  - Vue.js 2.x 中，如果有一个组件传入了 slot，那么每次父组件更新的时候，会强制使 子组件 update，造成性能的浪费
  - Vue.js 3.0 优化了 slot 的生成，使得非动态 slot 中属性的更新只会触发子组件的更新。 动态 slot 指的是在 slot 上面使用 v-if，v-for，动态 slot 名字等会导致 slot 产生运行 时动态变化但是又无法被子组件 track 的操作
- diff 算法优化
  - Vue2.x 中的虚拟 dom 是进行全量的对比。
  - Vue3.0 中新增了静态标记（PatchFlag）：在与上次虚拟结点进行对比的时候，只对 比带有 patch flag 的节点，并且可以通过 flag 的信息得知当前节点要对比的具体内容化
- hoistStatic 静态提升
  - Vue2.x : 无论元素是否参与更新，每次都会重新创建。 
  - Vue3.0 : 对不参与更新的元素，只会被创建一次，之后会在每次渲染时候被不停的复 用。
- cacheHandlers 事件侦听器缓存
  - 默认情况下 onClick 会被视为动态绑定，所以每次都会去追踪它的变化但是因为是同 一个函数，所以没有追踪变化，直接缓存起来复用即可。


## Vue3.0 新特性 —— Composition API 与 React.js 中 Hooks 的异同点

React hook 底层是基于链表实现，调用的条件是每次组件被 render 的时候都会顺序 执行所有的 hooks。 

Vue hook 只会被注册调用一次，Vue 能避开这些麻烦的问题，原因在于它对数据的 响应是基于 proxy 的，对数据直接代理观察。（这种场景下，只要任何一个更改 data 的地方，相关的 function 或者 template 都会被重新计算，因此避开了 React 可能遇 到的性能上的问题）。

React 中，数据更改的时候，会导致重新 render，重新 render 又会重新把 hooks 重 新注册一次，所以 React 复杂程度会高一些

## vue 要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？

## 双向绑定造成的效率问题

频繁修改v-model造成的卡顿：
- 通过ref操作dom获取值，不用v-model
- v-model.lazy: 内部是监听改为监听change事件

## 组件name的作用

在 Vue 中，组件的 name 选项有多个作用，虽然它不是必须的，但在某些场景下它非常有用。

1. 通过名字找到对应的组件
   - 递归组件
   - 跨级组件通信
2. 通过 name 属性指定要缓存的组件

3. 使用 vue-devtools 进行调试时，组件名称也是由 name 决定的

即使在没有上述特殊需求的情况下，添加 name 也有助于提高代码的可读性，尤其是在调试和分析性能时。为组件命名可以使开发者更清楚地了解每个组件的用途和角色。


