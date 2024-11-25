---
sort: 3
---

# 什么是React 路由？

React 路由是一个构建在 React 之上的强大的路由库，它有助于向应用程序添加新的屏幕和流。这使 URL 与网页上显示的数据保持同步。它负责维护标准化的结构和行为，并用于开发单页 Web 应用。 React 路由有一个简单的API。

为什么React Router v4中使用 switch 关键字 ？
虽然 <div> ** 用于封装 Router 中的多个路由，当你想要仅显示要在多个定义的路线中呈现的单个路线时，可以使用 “switch” 关键字。使用时，<switch>** 标记会按顺序将已定义的 URL 与已定义的路由进行匹配。找到第一个匹配项后，它将渲染指定的路径。从而绕过其它路线。

```jsx
<switch>
    <route exact path='/' component={Home}/>
    <route path='/posts/:id' component={Newpost}/>
    <route path='/posts'   component={Post}/>
</switch>
```

## React Router与常规路由有何不同？

|                   常规路由                   |            React路由             |
| :------------------------------------------: | :------------------------------: |
|            每个视图对应一个新文件            |       只涉及单个HTML也米娜       |
| HTTP请求被发送到服务器并且接收对应的HTML页面 |        进更改历史记录属性        |
|          用户实际在每个不同页面切换          | 用户认为自己正在不同的页面间切换 |

# react-router里的`<Link>`标签和`<a>`标签有什么区别

> 对比`<a>`,`Link`组件避免了不必要的重渲染

## 路由传参

### 标签

1、 使用props.params 传值

```jsx
<Route path="/path/:id" component={App} />

//Link组件，路由跳转，类似于a标签
<Link to="/path/id">list</Link>

//子组件中获取参数
this.props.match.params.id
```

**优点**:简单快捷,并且，在刷新页面的时候，参数不会丢失。

**缺点**:只能传字符串，并且，如果传的值太多的话，url会变得长而丑陋。



2、使用query定义传值方式

```jsx
<Route path="/query" component={App} />

const toParam ={
    pathname:"/query",
    query:"参数"
}
//在Link组件中定义参数
<Link to={toParam}>List</Link>

//在子组件中获取参数值
this.props.location.query
```

这种方式，可以直接传对象，单但是页面刷新后，参数丢失



3、state传值方式,和query相似：

```jsx
<Route path="/state" component={App} />

const toParam ={
    pathname:"/state",
    state:"参数"
}
//在Link组件中定义参数
<Link to={toParam}>List</Link>

//在子组件中获取参数值
this.props.location.state
```

可传对象，页面刷新，参数丢失。

### js

```jsx
第一种方式：在父组件中，设置路由标签：
<Link to="/about/:id">About</Link>

第二种方式：在父组件中，设置点击事件：
<div onClick={this.click.bind(this)}>About</div>

//js
click(){
    this.props.history.push({ pathname: "/about", state: { id } });
}

子组件中获取参数
this.props.location.state.id

```

