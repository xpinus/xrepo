# Vue2

## 响应式系统

**大概原理**：`Vue `内部通过 `Object.defineProperty`方法属性拦截的方式，把 `data` 对象里每个数据的读写转化成 `getter`/`setter`，当数据变化时通知视图更新。

![1.gif](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/1/16c4a3ce0b13bc14~tplv-t2oaga2asx-watermark.awebp)

![3.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/1/16c4a3ce0bcb0d91~tplv-t2oaga2asx-watermark.awebp)

主要通过以下 4 个步骤来实现数据双向绑定的：
- 实现一个监听器 `Observer`，用来劫持并监听所有属性，对数据对象进行递归遍历，利用 `Object.defineProperty()` 对属性都加上 `setter` 和 `getter`。如果属性发生变化，就通知订阅者。
- 实现一个订阅者 `Watcher`，可以收到属性的变化通知并执行相应的方法，从而更新视图；订阅者是`Observer `和`Compile `之间通信的桥梁 ，主要的任务是订阅`Observer `中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。
- 实现一个发布者 `Dep`，记录依赖，也就是数据和 watcher 之间的映射关系；
- 实现一个解析器 `Compile`，可以解析 `Vue `模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。

### 监听器 Observer

监听器 `Observer` 的实现，主要是指让数据对象变得“可观测”，即每次数据读或写时，我们能感知到数据被读取了或数据被改写了。

具体实现上，它会递归遍历对象的所有属性，以完成深度的属性转换。

要使数据变得“可观测”，`Vue 2.0` 源码中用到 `Object.defineProperty()`  来劫持各个数据属性的 `setter / getter`，`Object.defineProperty` 方法，在 MDN 上是这么定义的：

```js
/**
  * 循环遍历数据对象的每个属性
  */
function observable(obj) {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    let keys = Object.keys(obj);
    // 对每个属性都进行绑定操作
    keys.forEach((key) => {
        defineReactive(obj, key, obj[key])
    })
    return obj;
}
/**
 * 将对象的属性用 Object.defineProperty() 进行设置
 */
function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        get() {
            console.log(`${key}属性被读取了...`);
            return val;
        },
        set(newVal) {
            console.log(`${key}属性被修改了...`);
            val = newVal;
        }
    })
}

// 使用
let person = observable({
    name: 'tom',
    age: 15
});
```

### 发布者Dep实现

- **发布-订阅设计模式**又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态改变时，所有依赖于它的对象都将得到通知。
- **订阅器 Dep 实现**：发布者 `Dep` 主要负责收集订阅者，然后当数据变化的时候后执行对应订阅者的更新函数。

```js
function Dep () {
    this.subs = [];
}
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};
Dep.target = null;
```

* 将订阅器植入监听器

```js
function defineReactive(obj, key, val) {
	var dep = new Dep();
    Object.defineProperty(obj, key, {
    	enumerable: true,
		configurable: true,
		get: function getter () {
			if (Dep.target) {
				dep.addSub(Dep.target);
			}
			return val;
		},
		set: function setter (newVal) {
			if (newVal === val) {
				return;
			}
			val = newVal;
			dep.notify();
		}
    })
}
```

我们设计了一个订阅器 `Dep` 类，该类里面定义了一些属性和方法，这里需要特别注意的是它有一个静态属性 `Dep.target`，这是一个全局唯一的`Watcher`，因为在同一时间只能有一个全局的 `Watcher` 被计算，另外它的自身属性 `subs` 也是 `Watcher` 的数组。

### 订阅者Watcher实现

订阅者 `Watcher` 在初始化的时候需要将自己添加进订阅器 `Dep` 中，那该如何添加呢？

在订阅者 `Watcher` 初始化的时候触发对应的 `get` 函数去执行添加订阅者操作即可，核心原因就是因为我们使用了 `Object.defineProperty( )` 进行数据监听。

这里还有一个细节点需要处理，我们只要在订阅者 `Watcher` 初始化的时候才需要添加订阅者，所以需要做一个判断操作，因此可以在订阅器上做一下手脚：在 `Dep.target` 上缓存下订阅者，添加成功后再将其去掉就可以了。订阅者 `Watcher` 的实现如下：

```js
function Watcher(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get();  // 将自己添加到订阅器的操作
}

Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    get: function() {
        Dep.target = this; // 全局变量 订阅者 赋值
        var value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
        Dep.target = null; // 全局变量 订阅者 释放
        return value;
    }
};
```

订阅者 `Watcher` 分析如下：

订阅者 `Watcher` 是一个 类，在它的构造函数中，定义了一些属性：

- `vm`一个 Vue 的实例对象；
- `exp`是 `node` 节点的 `v-model` 等指令的属性值 或者插值符号中的属性。如 `v-model="name"`，`exp` 就是`name`;
- `cb`是 `Watcher` 绑定的更新函数;

当我们去实例化一个渲染 `watcher` 的时候，首先进入 `watcher` 的构造函数逻辑，就会执行它的 `this.get()` 方法，进入 `get` 函数，首先会执行：

```
Dep.target = this;  // 将自己赋值为全局的订阅者
```

实际上就是把 `Dep.target` 赋值为当前的渲染 `watcher` ,接着又执行了：

```
let value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
```

在这个过程中会对 `vm` 上的数据访问，其实就是为了触发数据对象的 `getter`。

每个对象值的 `getter` 都持有一个 `dep`，在触发 `getter` 的时候会调用 `dep.depend()` 方法，也就会执行`this.addSub(Dep.target)`，即把当前的 `watcher` 订阅到这个数据持有的 `dep` 的 `watchers` 中，这个目的是为后续数据变化时候能通知到哪些 `watchers` 做准备。

这样实际上已经完成了一个依赖收集的过程。那么到这里就结束了吗？其实并没有，完成依赖收集后，还需要把 `Dep.target` 恢复成上一个状态，即：

```
Dep.target = null;  // 释放自己
```

而 `update()` 函数是用来当数据发生变化时调用 `Watcher` 自身的更新函数进行更新的操作。先通过 `let value = this.vm.data[this.exp];` 获取到最新的数据,然后将其与之前 `get()` 获得的旧数据进行比较，如果不一样，则调用更新函数 `cb` 进行更新。

至此，简单的订阅者 `Watcher` 设计完毕。

### 解析器 Compile 实现

通过监听器 `Observer` 订阅器 `Dep` 和订阅者 `Watcher` 的实现，其实就已经实现了一个双向数据绑定的例子，但是整个过程都没有去解析 `dom` 节点，而是直接固定某个节点进行替换数据的，所以接下来需要实现一个解析器 `Compile` 来做解析和绑定工作。解析器 `Compile` 实现步骤：

- 解析模板指令，并替换模板数据，初始化视图；
- 将模板指令对应的节点绑定对应的更新函数，初始化相应的订阅器；

我们下面对 '{{变量}}' 这种形式的指令处理的关键代码进行分析，感受解析器 `Compile` 的处理逻辑，关键代码如下：

```
compileText: function(node, exp) {
	var self = this;
	var initText = this.vm[exp]; // 获取属性值
	this.updateText(node, initText); // dom 更新节点文本值
    // 将这个指令初始化为一个订阅者，后续 exp 改变时，就会触发这个更新回调，从而更新视图
	new Watcher(this.vm, exp, function (value) { 
		self.updateText(node, value);
	});
}
```

### 简单实现一个 Vue 实例

完成监听器 `Observer` 、订阅器 `Dep` 、订阅者 `Watcher` 和解析器 `Compile` 的实现，我们就可以模拟初始化一个`Vue` 实例，来检验以上的理论的可行性了。我们通过以下代码初始化一个 `Vue` 实例，该实例的源码已经放到 github 上面：[github.com/fengshi123/…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ffengshi123%2Fmvvm_example) ，有兴趣的可以 git clone：

```
<body>
    <div id="mvvm-app">
        <input v-model="title">
        <h2>{{title}}</h2>
        <button v-on:click="clickBtn">数据初始化</button>
    </div>
</body>
<script src="../dist/bundle.js"></script>
<script type="text/javascript">
    var vm = new MVVM({
        el: '#mvvm-app',
        data: {
            title: 'hello world'
        },

        methods: {
            clickBtn: function (e) {
                this.title = 'hello world';
            }
        },
    });
</script>
```

## 生命周期

### 对 Vue 生命周期的理解？

**1）生命周期是什么？**

Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

**（2）各个生命周期的作用**

| 生命周期        | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| `beforeCreate`  | 组件实例被创建之初，组件的属性生效之前                       |
| `created`       | 组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，$el 还不可用 |
| `beforeMount`   | 在挂载开始之前被调用：相关的 render 函数首次被调用           |
| `mounted`       | el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子    |
| `beforeUpdate`  | 组件数据更新之前调用，发生在虚拟 DOM 打补丁之前              |
| `update`        | 组件数据更新之后                                             |
| `activited`     | keep-alive 专属，组件被激活时调用                            |
| `deactivated`   | keep-alive 专属，组件被销毁时调用                            |
| `beforeDestory` | 组件销毁前调用                                               |
| `destoryed`     | 组件销毁后调用                                               |

<img src="https://cn.vuejs.org/images/lifecycle.png" alt="Vue 实例生命周期" style="zoom: 50%;" />

### Vue 的父组件和子组件生命周期钩子函数执行顺序？

Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：

- 加载渲染过程

  ```
  父 beforeCreate -> 父 created -> 父 beforeMount -> 
  
  		子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted 
  
  -> 父 mounted
  ```

- 子组件更新过程

  ```
  父 beforeUpdate -> 
  
  		子 beforeUpdate -> 子 updated 
  
  -> 父 updated
  ```

- 父组件更新过程

  ```
  父 beforeUpdate -> 父 updated
  ```

- 销毁过程

  ```
  父 beforeDestroy -> 
  		子 beforeDestroy -> 子 destroyed 
  -> 父 destroyed
  ```

### 在哪个生命周期内调用异步请求？

可以在钩子函数 `created`、`beforeMount`、`mounted` 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。但是推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

- 能更快获取到服务端数据，减少页面 loading 时间；
- **SSR**不支持 `beforeMount `、`mounted` 钩子函数，所以放在 `created `中有助于一致性；
    - https://zhuanlan.zhihu.com/p/57375824
    - https://www.jianshu.com/p/10b6074d772c

### 在什么阶段才能访问操作DOM？

在钩子函数 `mounted `被调用前，Vue 已经将编译好的模板挂载到页面上，所以在 mounted 中可以访问操作 DOM。

### 父组件可以监听到子组件的生命周期吗？

- 比如有父组件 Parent 和子组件 Child，如果父组件监听到子组件挂载 mounted 就做一些逻辑处理，可以通过手动通过 $emit 触发父组件的事件，- 
- 更简单的方式可以在父组件引用子组件时通过 @hook 来监听即可，当然 @hook 方法不仅仅是可以监听 mounted，其它的生命周期事件，例如：created，updated 等都可以监听。

    * ```html
    <Child @hook:mounted="doSomething"/>
    ```

## keep-alive

keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：

```html
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

- 一般结合路由和动态组件一起使用，用于缓存组件；
- 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
- 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

## filter 过滤器

## Vue2 使用冻结对象提升效率
`Object.freeze(obj)`
vue3中可以使用shallowRef

## 组件间通讯

- 父子通信： 
  - 父向子传递数据是通过 `props`，子向父是通过 `events（ $emit）`；
  - 通过父链 / 子链也可以通信`（ $parent / $children）`；
  - `ref` 也可以访问子组件实例；
  - `provide / inject API`； 
  - `$attrs`和`$listeners`
  - `$slots`和`$scopedSlots`
- 兄弟通信： eventbus；`Vuex`
- 跨级通信： eventbus；`Vuex`；provide / inject API、 `$attrs`和`$listeners`

### `props/$emit`

* 父 to 子 `props`   **父组件通过props向下传递数据给子组件**
  * 组件中的数据有三种，`data`, `props`, `computed`

```html
<Child :childName="username">     父组件中通过标签属性，将值进行传递
```

```js
// 子组件设置props，添加具体项，接收
// 直接使用 this.childName使用
props:{
    childName:{           // 这个就是父组件中子标签自定义名字
      type: String,       // 类型
      required:true,      // 必须传递
      default: 'xyf'      // 默认值，对于数组，必须使用函数返回值形式设置默认值 () => []
    }
```

* 子 to 父 `$emit`   **子组件通过events给父组件发送消息，实际上就是子组件把自己的数据发送到父组件**

```js
// 子组件在对应的事件函数里触发
// 参数：事件名，要传递的值
this.$emit('nameChanged', '新名字')  
```

```html
<Child @nameChanged="handleNameChanged">     父组件中通过标签属性，绑定对应的事件处理程序
```

### `$emit`/`$on`   EventBus

**这种方法通过一个空的Vue实例作为中央事件总线（事件中心），用它来触发事件和监听事件,巧妙而轻量地实现了任何组件间的通信，包括父子、兄弟、跨级**。

```js
export default eventBus = new Vue();

//使用
eventBus.$emit(时间名，数据)
eventBus.$on(事件名，handleFunction)
```

**示例**

```html
存在3个兄弟组件A、B、C，要让C获取其它两兄弟的数据
<div id="brothers">
    <demoA></demoA>
    <demoB></demoB>
    <demoC></demoC>
</div>
```

*demoA*实现点击发送名称

```js
import eventBus from 'xxx'
...
...
handleAClick() {
	eventBus.$emit('nameFromA', this.username)
}
```

*demoB*实现点击发送年龄

```js
import eventBus from 'xxx'
...
...
handleBClick() {
	eventBus.$emit('ageFromB', this.userage)
}
```

*demoC*中实现数据的接收处理

```js
import eventBus from 'xxx'
...
...
mounted() {
    eventBus.$on('nameFromA'，handleNameFunction)
    eventBus.$on('ageFromB'，handleAgeFunction)
}
```

### Vuex

![image](https://segmentfault.com/img/remote/1460000019208632)

* `Vuex`实现了一个单向数据流，在全局拥有一个`State`存放数据，当组件要更改其中的数据时，必须通过`Mutation`进行，`Mutation`同时提供了订阅者模式供外部插件调用获取`State`数据的更新。而当所有异步操作(常见于调用后端接口异步获取更新数据)或批量的同步操作需要走`Action`，但`Action`也是无法直接修改`State`的，还是需要通过`Mutation`来修改`State`的数据。最后，根据`State`的变化，渲染到视图上。Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

  * https://blog.csdn.net/qq_37481512/article/details/92831940
  * `Vue Components`：Vue组件。HTML页面上，负责接收用户操作等交互行为，执行`Dispatch`方法触发对应`Action`进行回应。
  * `Dispatch`派遣：操作行为触发方法，是唯一能执行`Action`的方法。
  * `Actions`：**操作行为处理模块，由组件中的<span style="color: red;">`$store.dispatch('action 名称', data1)`</span>>来触发。然后由`Commit`来触发`Mutation`的调用 , 间接更新 `state`**。负责处理`Vue Components`接收到的所有交互行为。包含同步/异步操作，支持多个同名方法，按照注册的顺序依次触发。向后台API请求的操作就在这个模块中进行，包括触发其他`action`以及提交`mutation`的操作。该模块提供了`Promise`的封装，以支持`action`的链式触发。
  * `commit`：状态改变提交操作方法，是唯一能执行`mutation`的方法。
  * `mutations`突变：**状态改变操作方法，由`actions`中的<span style="color: red;">`commit('mutation 名称')`</span>>来触发**。是修改`state`的唯一推荐方法。该方法只能进行同步操作，且方法名只能全局唯一。操作之中会有一些`hook`暴露出来，以进行`state`的监控等。
  * `state`：页面状态管理容器对象。集中存储`Vue components`中`data`对象的零散数据，全局唯一，以进行统一的状态管理。页面显示所需的数据从该对象中进行读取，利用Vue的细粒度数据响应机制来进行高效的状态更新。
  * `Getters`：`state`对象读取方法。图中没有单独列出该模块，应该被包含在了`render`中，`Vue Components`通过该方法读取全局state对象。

* `Vuex`和`localStorage`

  `vuex `是 `vue` 的状态管理器，存储的数据是响应式的。但是并不会保存起来，刷新之后就回到了初始状态，具体做法应该在`vuex`里数据改变的时候把数据拷贝一份保存到`localStorage`里面，刷新之后，如果`localStorage`里有保存的数据，取出来再替换`store`里的`state`。

```js
let defaultCity = "杭州"
try {
    // 防止用户关闭了本地存储功能，所以外面添加try
    if(!defaultCity){
        defaultCity = JSON.parse(window.localStorage.getItem('defaultCity'))   // 因为本地存储的是字符串
    }
}catch(e){}

export default new Vuex.Store({
    state: {
        city: defaultCity
    },
    mutations : {
        changeCity(state, city) {
            state.city = city
            try {
                window.localStorage.setItem('defaultCity', JSON.stringify(state.city))  // 数据改变时更新本地存储
            }catch(e) {}
        }
    }
})
```

###  `$attrs`和`$listeners`

多级组件嵌套需要传递数据时，通常使用的方法是通过vuex。但如果仅仅是传递数据，而不做中间处理，使用 vuex 处理，未免有点大材小用。为此Vue2.4 版本提供了另一种方法

- `attrs`：包含了父作用域中不被`prop`所识别(且获取)的特性绑定(`class`和`style`除外)。当一个组件没有声明任何`prop`时，这里会包含所有父作用域的绑定(`class`和`style`除外)，并且可以通过`v-bind="$attrs"`传入内部组件。通常配合 `interitAttrs` 选项一起使用。
- `listeners`：包含了父 作用域中的(不含`.native` 修饰器的，其将事件注册到子组件的根元素上)`v-on` 事件监听器 。它可以通过`v-on="$listeners"`传入内部组件


*Father*作为顶层的组件，要向下传递多层数据，其内部直接使用*Child1*
```html
<Child1 :dataA='A' :dataB='B' :dataC='C'></Child1>
```
*Child1*中仅仅定义了自己需求的dataA属性，包含*Child2*
```html
<Child2 v-bind="$attrs" ></Child2>
```

```js
props: {
    dataA: String   // dataA作为Child1的属性
}
created() {
    console.log(this.$attrs)  // {'dataB': 'B', 'dataC': 'C'}, 因为dataB\C没有定义，被保存在$attrs中
}
```

*Child2*中定义属性dataB
```js
props: {
    dataA: String   // dataA作为Child1的属性
}
created() {
    console.log(this.$attrs)  // {'dataC': 'C'}, 因为dataC没有定义，被保存在$attrs中
}
```

### `provide`和`inject`

这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。

一言而蔽之：祖先组件中通过`provider`来提供变量，然后在子孙组件中通过`inject`来注入变量。这对API主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。

* *示例*
* ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190527111339833.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzQ2MDM3Mg==,size_16,color_FFFFFF,t_70)

*组件A*提供theme

```js
provide() {
	return {
		theme: {
			color: this.color   // 方法一：这种方式绑定的数据不是可响应的，即A变化，DEF不会变仍然是初始值
		}
	}
}

provide() {
	return {
		theme: this  // 方法二：提供祖先的实例，子孙根据实例获取最新值
		}
	}
}

provide() {
    // 方法三：使用新API，优化响应式provide
    this.theme = Vue.observable({
        color: 'blue'
    })
	return {
		theme: this.theme 
	}
}

// 法四  传递一个能获得最新值得参数
// 法五  computed
```

*子孙*组件

```js
inject: {
    theme: {
        default: () => ({})   // 函数式组件取值不一样
    }
}
```

### `$parent`和`$children`和`&ref`

`&ref`：如果在普通的 `DOM `元素上使用，引用指向的就是 `DOM` 元素；如果用在子组件上，引用就指向组件实例

`$parent` / `$children`：访问父 / 子实例

需要注意的是：这两种都是直接得到组件实例，使用后可以直接调用组件的方法或访问数据。我们先来看个用来访问组件的例子：

## 问题

### 组件中 data 为什么是一个函数？

为什么组件中的 data 必须是一个函数，然后 return 一个对象，而 new Vue 实例里，data 可以直接是一个对象？

因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响，如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响；而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。

### 如何给vue自定义组件添加点击事件？

需要在@click后面加上.native,官方对于native的解释为：

.native 监听组件根元素的原生事件

### 为什么避免 v-if 和 v-for 用在一起

当 Vue 处理指令时，v-for 比 v-if 具有更高的优先级，通过v-if 移动到容器元素，不会再重复遍历列表中的每个值。取而代之的是，我们只检查它一次，且不会在 v-if 为否的时候运算 v-for。

### vue-loader是什么？使用它的用途有哪些？

解析.vue文件的一个加载器，跟template/js/style转换成js模块。

### 直接给一个数组项赋值，Vue 能检测到变化吗？

由于 Object.defineProperty 只能拦截读写操作，因此 Vue 不能检测到以下数组的变动：
- 当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
- 当你修改数组的长度时，例如：vm.items.length = newLength

Vue2 提供了以下操作方法：`vm.$set()`来实现为对象添加响应式属性
- 如果目标是数组，直接使用数组的 splice 方法触发相应式，因为Vue在数组的原型链上重写`push、pop、shift、unshift、sort、reverse、splice`方法
- 如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理（ defineReactive 方法就是 Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）




