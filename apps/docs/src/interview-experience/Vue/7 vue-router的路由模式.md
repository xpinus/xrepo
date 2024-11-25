---
sort: 7
---

# vue-router 路由模式有几种？

vue-router 有 3 种路由模式：hash、history、abstract，对应的源码如下所示：

```cpp
switch (mode) {
```

其中，3 种路由模式的说明如下：

- hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；
- history : 依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式；
- abstract : 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.

## 能说下 vue-router 中常用的 hash 和 history 路由模式实现原理吗？

### hash 模式的实现原理

就是地址栏里面带个#号。早期的前端路由的实现就是基于 location.hash 来实现的。其实现原理很简单，location.hash 的值就是 URL 中 # 后面的内容。比如下面这个网站，它的 location.hash 的值为 '#search'：

```bash
https://www.word.com#search
```

* hash 路由模式的实现主要是基于下面几个特性：
  * URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
  * hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；
  * 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用 JavaScript 来对**` loaction.hash `**进行赋值，改变 URL 的 hash 值；
  * 我们可以使用**`hashchange `**事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。

* 优点：
  * 通用性好，支持各种浏览器
  * 不需要后端服务器做配合
* 缺点：
  * 不好看
  * 不支持SEO。搜索引擎会直接抛弃#号后面的

### history 模式的实现原理

`HTML5 `提供了 `History API` 来实现 URL 的变化。前面的**hashchange，你只能改变#后面的url片段，而history api则给了前端完全的自由**

history api可以分为两大部分：切换和修改

#### （1）切换历史状态

　　包括`back、forward、go`三个方法，对应浏览器的前进，后退，跳转操作，有同学说了，(谷歌)浏览器只有前进和后退，没有跳转，嗯，在前进后退上长按鼠标，会出来所有当前窗口的历史记录，从而可以跳转(也许叫跳更合适)：

```js
history.go(-2);//后退两次
history.go(2); //前进两次
history.back(); //后退
hsitory.forward(); //前进
```

#### （2）修改历史状态

　　包括了`pushState、replaceState`两个方法，这两个方法接收三个参数：stateObj，title，url

```js
history.pushState({color:'red'}, 'red', 'red')

window.onpopstate = function(event){
    console.log(event.state)
    if(event.state && event.state.color === 'red'){
        document.body.style.color = 'red';
    }
}

history.back();
history.forward();
```

通过pushstate把页面的状态保存在state对象中，当页面的url再变回这个url时，可以通过event.state取到这个state对象，从而可以对页面状态进行还原，这里的页面状态就是页面字体颜色，其实滚动条的位置，阅读进度，组件的开关的这些页面状态都可以存储到state的里面。

#### （3）popstate实现history路由拦截，监听页面返回事件

　　当活动历史记录条目更改时，将触发popstate事件。

　　1、如果被激活的历史记录条目是通过对 history.pushState() 的调用创建的，或者受到对 history.replaceState() 的调用的影响，popstate事件的state属性包含历史条目的状态对象的副本。

　　2、需要注意的是调用 history.pushState() 或 history.replaceState() 用来在浏览历史中添加或修改记录，不会触发popstate事件；

　　只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在Javascript代码中调用history.back()）

* history 路由模式的实现主要基于存在下面几个特性：
  * pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；
  * 我们可以使用 popstate 事件来监听 url 的变化，从而对页面进行跳转（渲染）；
  * history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。

* 优点：
  * 好看，没有#号，确实好看了很多，另外也可以顺便把 ？给去掉。

* 缺点：
  * <span style="color: red">需要后端做配合，否则F5的时候会报404错误</span>。在hash模式下，前端路由修改的是#中的信息，而浏览器请求时是不带它玩的，所以没有问题。但是在history下，你可以自由的修改path，当刷新时，如果服务器中没有相应的响应或者资源，会分分钟刷出一个404来。
  * 如果没有后端渲染的话，还是不支持SEO。

#### （4）配置
* ```js
  const router = new VueRouter({
    mode: 'history',
    routes: [
        { path :"/home",component:()=>import("../views/Home")},
        // 当我访问/home首页时，页面才去加载Home组件，减少首页加载的时长
    ]
  })
      
  // 不过这种模式要玩好，还需要后台配置支持。
  // 因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。
  // 所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。  
  ```
  
  # vue路由钩子函数

**路由的钩子函数总结有6个**

**全局的路由钩子函数：beforeEach、afterEach**

**单个的路由钩子函数：beforeEnter**

**组件内的路由钩子函数：beforeRouteEnter、beforeRouteLeave、beforeRouteUpdate**

https://blog.csdn.net/qq_37481512/article/details/94400698



vue解决跨域问题的方法：

https://www.cnblogs.com/ldlx-mars/p/7816316.html 

# vue-router实现路由懒加载（动态加载路由 ）
答:三种方式
第一种：vue异步组件技术 ==== 异步加载，vue-router配置路由 , 使用vue的异步组件技术 , 可以实现按需加载 .但是,这种情况下一个组件生成一个js文件。
第二种：路由懒加载(使用import)。
第三种：webpack提供的require.ensure()，vue-router配置路由，使用webpack的require.ensure技术，也可以实现按需加载。这种情况下，多个路由指定相同的chunkName，会合并打包成一个js文件。

# 全局守卫
```js
router.beforeEach((to, from) => {
  // 返回 false 以取消导航
  console.log('全局路由——to：', to)
  document.title = to.meta.title
  return true
})
```

应用：

* 设置浏览器的title
   虽然现在的浏览器都是多标签的形式，每个窗口的title展示的空间都非常小，基本显示不了几个字，但是也还是要设置一下。那么就可以在这里统一设置一下。
* 登录验证、权限验证
   有些页面必须登录后才能访问，比如用户中心、管理后台等，有些页面还需要验证具体的权限，那么都可以在这里进行。
* 其他
   编程本就是很灵活的事情，所以没有啥强制要求。这里还可以放其他各种可以设置的功能。

# 组件内守卫

提供了三种监听方式：

- beforeRouteEnter

  - 只能在 option API 里面使用，因为 该守卫在导航确认前被调用，因此即将登场的新组件还没被创建，那么就更不用说 setup 了。

    因为现在 setup 非常流行，script setup 更加诱人，所以  beforeRouteEnter 基本被废掉了。

- beforeRouteUpdate

  - 虽然可以在 setup 里面使用，但是受到拖累，基本比较鸡肋。

- beforeRouteLeave

  - 离开组件的时候触发，可以做一些提示性操作，比如：你真的要离开吗？你真的真的要离开吗？你写的文档还没保存呢！

  - ```js
    // option API
    beforeRouteLeave (to, from) {
      const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
      if (!answer) return false
    }
    
    // composition API  是Vue3的
    import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
    onBeforeRouteLeave((to, from) => {...}
    ```

# 动态路由

**需求**：一般路由是在` router/index.js`里面设置的，这样我们有了一套固定的路由。
 但是有的时候我们需要在运行时可以动态设置一些路由，最常见的就是后台管理。 用户登录后，根据用户的角色、权限，加载对应的路由。这样感觉上可以安全一些，另外路由的“体积”也不用那么大。

**实现**：

## 简单的实现

比如只涉及到管理员和普通用户的权限。通常直接在前端进行简单的角色权限设置。前端这边把路由写好，登录的时候根据用户的角色权限来动态展示路由，(前端控制路由)。

#### 添加路由

```js
// router/index.js 里面添加动态路由
router.addRoute({ path: '/about22', component: About })

// main.js 里面添加动态路由
router.addRoute({ path: '/about33', component: () => import('./views/home.vue') })

// 其他组件
import { useRouter } from 'vue-router'
const { addRoute } = useRouter()
// 添加动态路由
addRoute({ name:'about77', path: '/about77', component: () => import('./views/home.vue') })
addRoute({ name:'about66', path: '/about66', component: () => import('./views/baseControl.vue') })
// router.replace('/about66')  // 自动跳转
```

我们可以在  router/index.js 里面加，也可以在main.js 里面加，也可以在其他地方加，比如登录的组件。

> 在  router/index.js  和 main.js 里面添加的动态路由，可以在地址栏里面直接刷新就是按F5。
>  而在其他组件里面添加的动态路由，不支持按F5，除非使用 router.replace 跳转一下。

####  删除路由

- 按照名称删除

```js
addRoute({ path: '/about', name: 'about', component: About })
// 删除路由
removeRoute('about')
```

- 利用返回的实例
   添加路由的时候其实是有个返回值，执行这个返回值就可以删除这个路由，感觉好神奇。

```js
const delRoute = router.addRoute(routeRecord)
delRoute() // 删除路由如果存在的话
```

- 以新换旧
   就是添加个新的路由，覆盖掉旧的路由。

```js
router.addRoute({ path: '/about', name: 'about', component: About })
// 这将会删除之前已经添加的路由，因为他们具有相同的名字且名字必须是唯一的
router.addRoute({ path: '/other', name: 'about', component: Other })
```



## 2 复杂的路由权限设置

比如OA系统、多种角色的权限配置。通常需要后端返回路由列表，前端渲染使用

后台传来当前用户对应权限的路由表，前端通过调接口拿到后处理(后端处理路由)，里边逻辑很复杂，不好返给前端用户权限，担心路由放到前端不安全。

**思路**：拦截路由->后台取到路由->保存路由到`localStorage`(用户登录进来只会从后台取一次，其余都从本地取,所以用户，只有退出在登录路由才会更新)

https://www.jianshu.com/p/eaa7354ecee2
