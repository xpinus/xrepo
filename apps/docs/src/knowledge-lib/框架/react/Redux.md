# Redux相关

## MVC框架的问题

以下是MVC框架的一些主要问题：

- 对 DOM 操作的代价非常高
- 程序运行缓慢且效率低下
- 内存浪费严重
- 由于循环依赖性，组件模型需要围绕 models 和 views 进行创建

## Flux思想

<img src="https://img-blog.csdnimg.cn/20190325160224109.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2V5ZW9mYW5nZWw=,size_16,color_FFFFFF,t_70" alt="flux" style="zoom:80%;" />

Flux 是一种强制单向数据流的架构模式。它控制派生数据，并使用具有所有数据权限的中心 store 实现多个组件之间的通信。整个应用中的数据更新必须只能在此处进行。 Flux 为应用提供稳定性并减少运行时的错误。

传统的MVC模式在分离数据（模型），UI（视图）和逻辑（控制器）的关注方面效果很好，但是MVC架构经常遇到两个主要问题：

- **数据流定义不佳：** 跨视图进行的级联更新通常会导致纠结的事件网，难以调试。
- **缺乏数据完整性：** 可以从任何地方对模型数据进行突变，从而在整个UI上产生不可预测的结果。

使用Flux模式，复杂的UI不再受到级联更新的困扰。任何给定的React组件都将能够根据store提供的数据重建其状态。Flux模式还通过限制对共享数据的直接访问来增强数据完整性。

## Redux

Redux 是当今最热门的前端开发库之一。它是 JavaScript 程序的可预测状态容器，用于整个应用的状态管理。使用 Redux 开发的应用易于测试，可以在不同环境中运行，并显示一致的行为。

遵循的三个原则是什么？
***单一事实来源：***整个应用的状态存储在单个 store 中的对象/状态树里。单一状态树可以更容易地跟踪随时间的变化，并调试或检查应用程序。
***状态是只读的：***改变状态的唯一方法是去触发一个动作。动作是描述变化的普通 JS 对象。就像 state 是数据的最小表示一样，该操作是对数据更改的最小表示。
***使用纯函数进行更改：***为了指定状态树如何通过操作进行转换，你需要纯函数。纯函数是那些返回值仅取决于其参数值的函数。
<img src="https://img-blog.csdnimg.cn/20190325160235928.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2V5ZW9mYW5nZWw=,size_16,color_FFFFFF,t_70" alt="Store" style="zoom:80%;" />

###  **列出 Redux 的组件。**

Redux 由以下组件组成：

1. **Action** – 这是一个用来描述发生了什么事情的对象。
2. **Reducer** – 这是一个确定状态将如何变化的地方。是纯函数，它规定应用程序的状态怎样因响应 ACTION 而改变。Reducers 通过接受先前的状态和 action 来工作，然后它返回一个新的状态。它根据操作的类型确定需要执行哪种更新，然后返回新的值。如果不需要完成任务，它会返回原来的状态。
3. **Store** – 整个程序的状态/对象树保存在Store中。是一个 JavaScript 对象，它可以保存程序的状态，并提供一些方法来访问状态、调度操作和注册侦听器。应用程序的整个状态/对象树保存在单一存储中。因此，Redux 非常简单且是可预测的。我们可以将中间件传递到 store 来处理数据，并记录改变存储状态的各种操作。所有操作都通过 reducer 返回一个新状态。
4. **View** – 只显示 Store 提供的数据。

<img src="https://img-blog.csdnimg.cn/20190325160247418.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2V5ZW9mYW5nZWw=,size_16,color_FFFFFF,t_70" alt="Data Flow in Redux" style="zoom: 67%;" />

如何在 Redux 中定义 Action？
React 中的 Action 必须具有 type 属性，该属性指示正在执行的 ACTION 的类型。必须将它们定义为字符串常量，并且还可以向其添加更多的属性。在 Redux 中，action 被名为 Action Creators 的函数所创建。以下是 Action 和Action Creator 的示例：

```js
function addTodo(text) {
   return {
        type: ADD_TODO,    
        text
    }
}
```

## Redux 有哪些优点？
* 结果的可预测性 - 由于总是存在一个真实来源，即 store ，因此不存在如何将当前状态与动作和应用的其他部分同步的问题。
* 可维护性 - 代码变得更容易维护，具有可预测的结果和严格的结构。
* 服务器端渲染 - 你只需将服务器上创建的 store 传到客户端即可。这对初始渲染非常有用，并且可以优化应用性能，从而提供更好的用户体验。
* 开发人员工具 - 从操作到状态更改，开发人员可以实时跟踪应用中发生的所有事情。
* 社区和生态系统 - Redux 背后有一个巨大的社区，这使得它更加迷人。一个由才华横溢的人组成的大型社区为库的改进做出了贡献，并开发了各种应用。
* 易于测试 - Redux 的代码主要是小巧、纯粹和独立的功能。这使代码可测试且独立。
* 组织 - Redux 准确地说明了代码的组织方式，这使得代码在团队使用时更加一致和简单。