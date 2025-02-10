# vue-router

## 内置组件和函数

- RouterLink
  - activeClass： 当链接所指向的路径匹配当前路由路径时，应用于该链接的 CSS 类
  - exactActiveClass：当链接所指向的路径精确匹配当前路由路径时，应用于该链接的 CSS 类
- RouterView： 视图或路由出口
  RouterView 组件暴露了一个插槽（作用域插槽），这个插槽可以用来获取当前匹配的路由组件, 方便扩展一些其他的功能。
```html
<router-view v-slot="{ Component }">
  <transition>
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </transition>
</router-view>
```


- useRouter和useRoute: 在 setup 中没有 this，因此无法像 Vue2 那样通过 this.router或者this.
  route 来访问路由实例和当前路由。与之替代的就是通过 useRouter 和 useRoute 这两个内置函数。
- useLink：用于自定义导航组件的时候使用


## 路由模式
vue-router 有 3 种路由模式：
- hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器
- history : 依赖 HTML5 History API 和服务器配置
- abstract : 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.

### hash 模式

早期的前端路由的实现就是基于 location.hash 来实现的。

location.hash 的值就是 URL 中 # 后面的内容。比如下面这个网站，它的 location.hash 的值为 '#search'：

```bash
https://www.word.com#search
```

- hash 路由模式的实现主要是基于下面几个特性：
  - URL 中 hash 值只是客户端的一种状态，**Hash 的变化不会请求服务器**，也就是说当向服务器端发出请求时，hash 部分不会被发送；
  - hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制 hash 的切换；
  - 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用js来对`loaction.hash`进行赋值，改变 URL 的 hash 值
  - 我们可以使用`hashchange`事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。
- 优点：
  - 通用性好，支持各种浏览器
  - 不需要后端服务器做配合
- 缺点：
  - 不好看
  - 不支持SEO。搜索引擎会直接抛弃#号后面的

### history 模式

`HTML5`提供了 `History API` 来实现 URL 的变化。**hashchange，你只能改变#后面的url片段，而history api则给了前端完全的自由**

- 优点：路径比较正规
- 缺点：
    - 如果没有后端渲染的话，还是不支持SEO
    - 兼容性不如 hash

History API：
- history.pushState(state, title, url)：将一个状态推入到历史堆栈里面
- history.replaceState(state, title, url)：替换当前历史堆栈最上面的状态
- window.onpopstate：这是一个事件，当用户点击浏览器的前进或者后退按钮的时候，会触发该事件

**实现原理**

- 拦截链接点击事件
  - 客户端路由器会拦截页面上的所有链接点击事件（通常是通过阻止链接的默认行为 event.preventDefault( )）
  - 取而代之的是，路由器使用 history.pushState 或 history.replaceState 更新 URL。
- URL 变化处理:
  - 当 URL 变化时，路由器会捕捉到这个变化。
    - 路由器不会发出新的 HTTP 请求，而是根据新的 URL 查找预先定义好的路由规则，并加载相应的视图组件

**History存在的问题**

一旦刷新，就会报 404 错误。

原因：刷新的时候，是会请求服务器的。但是服务器并没有这个后端路由，这个仅仅是一个前端路由。

解决： 需要在服务器（nginx）上面做一些配置。添加一个回退路由，如果 URL 不匹配任何的静态资源，回退到首页。

### Memory模式
无论是 Hash 也好、History API 也好，本质上都是基于浏览器的特性来实现的。

而 Memory 模式一般用于非浏览器环境，例如 Node 或者 SSR. 因为是非浏览器环境，所以不会有 URL 交互也不会自动触发初始导航。

该模式用 createMemoryHistory( ) 创建，并且需要在调用 app.use(router) 之后手动 push 到初始导航。

## 导航守卫
> 所谓导航守卫，就是在当你进行导航的时候将其拦截下来，从而方便做一些其他的事情
- 全局的路由钩子函数：beforeEach、beforeResolve、afterEach
- 单个的路由钩子函数：beforeEnter
- 组件内的路由钩子函数：beforeRouteEnter、beforeRouteLeave、beforeRouteUpdate

整体的执行顺序：
- 组件离开守卫
- 全局前置守卫
- 路由级别守卫
- 全局解析守卫
- 全局后置守卫
- 组件进入守卫
如果是组件复用，参数变化的情况，执行顺序如下：
- 全局前置守卫
- 组件更新守卫
- 全局解析守卫
- 全局后置守卫

### 全局守卫
- beforeEach：全局前置守卫，会在解析组件守卫和异步路由组件之前被调用
- beforeResolve：全局解析守卫，在导航被确认之前，但在所有组件内守卫和异步路由组件被解析之后调用,上面两个其实就是执行的时机一前一后
- afterEach：全局后置守卫，在导航确认后触发的钩子函数。该钩子函数执行后会触发 DOM 更新，用户看到新的页面。
  - 思考🤔：既然导航都已经确认了，这里安插一个守卫干嘛呢？
  - 全局后置守卫经常用于如下的场景：
    - 记录页面访问历史：可以使用 afterEach 来记录用户访问的页面，以便进行统计或分析。
    - 关闭加载指示器：在 beforeEach 中开启加载指示器，在 afterEach 中关闭它，以提供更好的用户体验。
    - 页面切换动画：在 afterEach 中触发页面切换动画或其他视觉效果，以提升用户体验。
    - 更新文档标题：在导航完成后更新页面标题，以反映当前页面内容

```js
router.beforeEach((to, from, next) => {
  // 返回 false 以取消导航
  console.log('全局路由——to：', to)
  document.title = to.meta.title
  next();
})
```

应用：
- 设置浏览器的title
   虽然现在的浏览器都是多标签的形式，每个窗口的title展示的空间都非常小，基本显示不了几个字，但是也还是要设置一下。那么就可以在这里统一设置一下。
- 登录验证、权限验证
   有些页面必须登录后才能访问，比如用户中心、管理后台等，有些页面还需要验证具体的权限，那么都可以在这里进行。

### 路由守卫

beforeEnter：针对特定路由设置的守卫，在某个路由配置中设置
- beforeEnter 守卫只在进入路由时触发，不会在 params、query 或 hash 改变时触发
- 如果放在父级路由上，路由在具有相同父级的子路由之间移动时，它不会被触发

### 组件守卫

提供了三种监听方式：

- beforeRouteEnter：进入了该导航，组件开始渲染之前
  - 只能在 option API 里面使用，因为 该守卫在导航确认前被调用，因此即将登场的新组件还没被创建，那么就更不用说 setup 了。 因为现在 setup 非常流行，script setup 更加诱人，所以  beforeRouteEnter 基本被废掉了。
- beforeRouteUpdate：当前路由改变，但是该组件被复用时调用，例如对于一个带有动态参数的路径 /users/:id，在 /users/1 和 /users/2 之间跳转的时候会触发
  - 虽然可以在 setup 里面使用，但是受到拖累，基本比较鸡肋。
- beforeRouteLeave：离开了该导航，组件失活的时候
  - 可以做一些提示性操作，比如：你真的要离开吗？你真的真的要离开吗？你写的文档还没保存呢！
```js
import { onBeforeRouteLeave } from 'vue-router'
onBeforeRouteLeave((to, from) => { 
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (!answer) return false
});
```

## 动态路由

**需求**：一般路由是在` router/index.js`里面设置的，这样我们有了一套固定的路由。
 但是有的时候我们需要在运行时可以动态设置一些路由，最常见的就是后台管理。 用户登录后，根据用户的角色、权限，加载对应的路由。这样感觉上可以安全一些，另外路由的“体积”也不用那么大。

**实现**：


### 动态添加路由

```js
// router/index.js 里面添加动态路由
router.addRoute({ path: '/about22', component: About })

// main.js 里面添加动态路由
router.addRoute({ path: '/about33', component: () => import('./views/home.vue') })

// 添加嵌套路由，可以将路由的 name 作为第一个参数传递
router.addRoute({ name: 'admin', path: '/admin', component: Admin })
router.addRoute('admin', { path: 'settings', component: AdminSettings })
// 或
router.addRoute({
  name: 'admin',
  path: '/admin',
  component: Admin,
  children: [{ path: 'settings', component: AdminSettings }],
})

// 其他组件
import { useRouter } from 'vue-router'

const { addRoute } = useRouter()
// 添加动态路由
addRoute({ name: 'about77', path: '/about77', component: () => import('./views/home.vue') })
addRoute({ name: 'about66', path: '/about66', component: () => import('./views/baseControl.vue') })
// router.replace('/about66')  // 自动跳转
```

我们可以在  router/index.js 里面加，也可以在main.js 里面加，也可以在其他地方加，比如登录的组件。

> 在  router/index.js  和 main.js 里面添加的动态路由，可以在地址栏里面直接刷新就是按F5。
>  而在其他组件里面添加的动态路由，不支持按F5，除非使用 router.replace 跳转一下。

###  删除路由
- 按照名称删除
```js
addRoute({ path: '/about', name: 'about', component: About })
// 删除路由
removeRoute('about')
```
- 利用返回的实例
```js
const delRoute = router.addRoute(routeRecord)
delRoute() // 删除路由如果存在的话
```
- 以新换旧
```js
router.addRoute({ path: '/about', name: 'about', component: About })
// 这将会删除之前已经添加的路由，因为他们具有相同的名字且名字必须是唯一的
router.addRoute({ path: '/other', name: 'about', component: Other })
```

### 其它
- router.hasRoute(name)：检查路由是否存在。
- router.getRoutes( )：获取一个包含所有路由记录的数组。

## 复杂的路由权限设置

比如OA系统、多种角色的权限配置。通常需要后台传来当前用户对应权限的路由表，前端通过调接口拿到后处理(后端处理路由)，里边逻辑很复杂，不好返给前端用户权限，担心路由放到前端不安全。

**思路**：拦截路由->后台取到路由->保存路由到`localStorage`(用户登录进来只会从后台取一次，其余都从本地取,所以用户，只有退出再登录路由才会更新)->动态添加路由

https://www.jianshu.com/p/eaa7354ecee2

## 路由传参
> 场景：点击当前页的某个按钮跳转到另一个页面，并将某个值带过去

路由跳转方式

```html
//  router-link
<router-link to="/list">点击跳转到列表页</router-link>
```

```js
// 2 js
this.$router.push
```

## 1 直接使用路由属性配置`this.$router.push`实现携带参数跳转

* 对应的路由配置(每个路由配置信息以对象的形式保存)

```js
import VueRouter from 'vue-router'; //引入vue-router
Vue.config.producionTip = false; //阻止启动生产消息
// 开发环境下，Vue 会提供很多警告信息来帮你对付常见的错误与陷阱。
// 而在生产环境下，这些警告语句却没有用，反而会增加应用的体积。此外，有些警告检查还有一些小的运行时开销，这在生产环境模式下是可以避免的。
// Vue.config.producionTip = false; 可以当做是消息提示的环境配置，false即设置为开发环境下，true即生产环境下

Vue.use(VueRouter); //使用VueRouter，注入到Vue实例中

const router = new VueRotuer({ //创建路由对象
    mode: 'history', //设置路由模式为history模式
{
    path:'/user/:id',  // 设定待传递的值
        name
:
    'User',
        component
:
    User
}
})
;

//将路由对象添加到vue实例对象中
new Vue({ router, render: h => h(App) }).$mount('#app');

```

* 返送方使用`$router.push`跳转时，在url中携带参数

```js
this.$router.push({path:`/user/${id}/`})   // 通过路径添加值
```

* 接收方使用`$route.params`获取传递过来的值，参数名为配置中设置的名

```
this.$route.params.id  
```

# 2 通过路由属性中的`name`来匹配路由，然后通过`params`来传递参数

* 路由配置无需更改

```
{ 
    path: '/user', 
    name: 'User', 
    component: User 
}
```

* 发送方

```
this.$router.push({
    name: 'User',
    params: { id: id }
})
```

* 接收方 **页面刷新时传递参数会消失**

```
this.$route.params.id  
```

## 3 使用路由属性中的`path`来匹配路由，然后通过`query`来传递参数

**这种情况下`query`传递的参数会显示在`url`后面, 如`/user?id=？`即参数再浏览器刷新时不会丢失！**

* 路由配置无需更改
* 发送方

```
this.$router.push({
    path: '/user',
    query: { id: id }
})
```

* 接收方一致

##  `params`和`query`路由传参的区别
（1）使用方面

* `query`用`path`来匹配路由，接收参数`this.$route.query.name`。

* 如果`params`方式写成`path`引入，接收的参数会是`undefined`。
* 用`params`传参方式的参数用/来间隔显示，如/login/10/tom；

（2）浏览器地址栏显示方面

* `query`传参方式，在地址栏会显示参数；
* `params`传参方式，地址栏不显示参数。
* 用`query`传参方式的参数`/login?id=1&name=tom`。
  注意：如果你在地址栏中手动输入参数后，当页面一刷新时，`params`的值就消失了。


**将参数直接以 props 的形式传递给组件**

首先在路由配置中开启 props
```js
const routes = [
  { path: '/user/:userId(\\d+)', name: 'User', component: User, props: true }
]
```
在组件内部设置 id 这个 props，之后路由参数就会以 props 的形式传递进来
```js
const props = defineProps({
  userId: {
    type: String,
    required: true
  }
})
```

## 路由匹配语法

- 静态路由匹配：/about ---> /about
- 动态路由匹配：/users/:id ---> /users/1、/users/2
- 参数正则： /users/:userId(\\d+)  限制参数的类型,路由后面的参数就只能匹配数字
- 重复参数： /product/:name+  参数:name+ 表示 1 或者多次，* 表示 0 或者多次
- 可选参数: /users/:userId?

## 其它

###  路由别名

- 兼容旧路径：有些时候需要更新路径，使用别名可以保证旧的路由依然有效
- 简化路径：特别是嵌套路由的情况下，路径可能会很长，别名可以简化路径

```js
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/user/:id/profile',
            name: 'user-profile',
            component: UserProfile,
            alias: '/profile/:id' // 配置路由别名, 可以通过 /profile/:id 进行访问
        }
    ]
});
```

### 命名视图

有些时候会存在这样的需求，那就是**一个路由对应多个组件**，而非一个组件。不同的组件渲染到不同的视图里面，此时需要给视图设置不同的 name 来加以区分。

如果视图没有设置名字，那么默认为 default.

```text
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      // 注意这里是 components，多了一个's'
      components: {
        default: Home,
        // LeftSidebar: LeftSidebar 的缩写
        LeftSidebar,
        // 它们与 <router-view> 上的 name 属性匹配
        RightSidebar,
      },
    },
  ],
})
```
```html
<router-view class="view left-sidebar" name="LeftSidebar" />
<router-view class="view main-content" />
<router-view class="view right-sidebar" name="RightSidebar" />
```

### 重定向

通过 redirect 可以配置路由重定向
- 字符串: 重定向路径
- 对象：可以使用对象来更详细地定义重定向，包括传递路径参数和查询参数
- 函数：重定向函数可以根据路由信息**动态**生成重定向目标路径。

### 路由元数据 

元数据（meta fields）是一种附加到路由配置中的属性，用来存储与路由相关的附加信息。

经常用于权限控制、标题设置、面包屑导航、路由过渡之类的效果

```js
router.beforeEach((to, from, next) => {
  // 实现权限控制
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next('/login');
  } else {
    next();
  }
});
```

### 路由懒加载

`component: () => import('../views/AboutView.vue')`

好处在于：
- 当路由被访问的时候才加载对应组件，这样就会更加高效, 因此也没必要在使用异步组件
- 进行打包的时候方便做代码分割
