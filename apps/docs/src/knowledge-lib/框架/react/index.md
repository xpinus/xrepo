# React 相关

https://7km.top/main/object-structure 图解rect

## React有什么特点

1. 它使用**虚拟DOM**而不是真正的DOM。
2. 它可以用**服务器端渲染**。
3. 它遵循**单向数据流**或数据绑定。

## Real DOM 和 Virtual DOM

|   **Real DOM**   |     **Virtual DOM**      |
|:----------------:| :----------------------: |
|       更新缓慢       |         更新更快         |
| 可以直接更新 HTML      |    无法直接更新 HTML     |
|  如果元素更新，则创建新DOM  | 如果元素更新，则更新 JSX |
|    DOM操作代价很高     |     DOM 操作非常简单     |
|     消耗的内存较多      |      很少的内存消耗      |

* JSX:
    * 是JavaScript XML 的简写。是 React 使用的一种文件，它利用 JavaScript 的表现力和类似 HTML 的模板语法。这使得 HTML 文件非常容易理解。此文件能使应用非常可靠，并能够提高其性能。
    * 浏览器无法读取JSX？浏览器只能处理 JavaScript 对象，而不能读取常规 JavaScript 对象中的 JSX。所以为了使浏览器能够读取 JSX，首先，需要用像 Babel 这样的 JSX 转换器将 JSX 文件转换为 JavaScript 对象，然后再将其传给浏览器。

## state 和 props 和 变量的区别

* `state`: 状态是 React 组件的核心，是数据的来源，必须尽可能简单。基本上状态是确定组件呈现和行为的对象。与props 不同，它们是可变的，并创建动态和交互式组件。可以通过 `this.state()` 访问它们，通过`this.setState()`更改。
* `props`: 组件内不能更改
* `variables`:

## 设计组件注意

设计组件时，重要的是确定组件是受控组件还是非受控组件。

不要直接复制（mirror） props 的值到 state 中，而是去实现一个**受控**的组件，然后在父组件里合并两个值。比如，不要在子组件里被动的接受 `props.value` 并跟踪一个临时的 `state.value`，而要在父组件里管理 `state.draftValue` 和 `state.committedValue`，直接控制子组件里的值。这样数据才更加明确可预测。

对于**不受控**的组件，当你想在 prop 变化（通常是 ID ）时重置 state 的话，可以选择以下几种方式：

- **建议: 重置内部所有的初始 state，使用 `key` 属性**
- 选项一：仅更改某些字段，观察特殊属性的变化（比如 `props.userID`）。
- 选项二：使用 ref 调用实例方法。
- https://react.docschina.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

## 组件内函数调用传参

```jsx
<MyInput onChange = { (e)=>this.handleOnChange(e) } />      // 通过箭头函数调用
```

## 类组件的生命周期

![image-20211217111544311](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7d8676f379d4d96bbf0ebd9a8528594~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

* 挂载：当组件实例被创建并插入DOM时，其生命周期调用顺序如下
    * `constructor()`构造函数：
        * **如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。**
        * 内部首先调用`super(props)`，否则可能出现`this.props`未定义错误
        * 要避免在构造函数中引入任何副作用或订阅。如遇到此场景，请将对应的操作放置在 `componentDidMount` 中。例如把props的值赋给state，及毫无必要，又在props更新时state不改变，除非你需要这样
    * `static getDerivedStateFromProps()`
        * 存在只有一个目的：让组件在 **props 变化**时更新 state。
        * 误解：认为该方法只在props改变时才会调用，实际只要父级重新渲染就会调用，**直接复制 prop 到 state 是一个非常糟糕的想法**
    * `render()` class 组件中唯一必须实现的方法
        * 为纯函数，这意味着在不修改组件 state 的情况下，每次调用时都返回相同的结果，并且它不会直接与浏览器交互
        * 如果 `shouldComponentUpdate()` 返回 false，则不会调用 `render()`。
    * `componentDidMount()`会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。
* 更新：当组件的 props 或 state 发生变化时会触发更新。
    * `static getDerivedStateFromProps()`
    * `shouldComponentUpdate(nextProps, nextState)`
        * 根据返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染
        * 此方法仅作为**[性能优化的方式](https://react.docschina.org/docs/optimizing-performance.html)**而存在。不要企图依靠此方法来“阻止”渲染，因为这可能会产生 bug。
        * **考虑使用内置的 `PureComponent` 组件**，而不是手动编写。`PureComponent` 会对 props 和 state 进行浅层比较，并减少了跳过必要更新的可能性。
        * 不建议进行深层比较或使用 `JSON.stringify()`。这样非常影响效率，且会损害性能。
    * `render()`
    * `getSnapshotBeforeUpdate()`在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 `componentDidUpdate()`。
        * 应返回 snapshot 的值（或 `null`）。
    * `componentDidUpdate()`
        * 会在更新后会被立即调用。首次渲染不会执行此方法。
        * 你也可以在 `componentDidUpdate()` 中**直接调用 `setState()`**，但请注意**它必须被包裹在一个条件语句里**，正如上述的例子那样进行处理，否则会导致死循环。
        * 它还会导致额外的重新渲染，虽然用户不可见，但会影响组件性能。
        * 不要将 props “镜像”给 state，请考虑直接使用 props。
* 卸载：当组件从 DOM 中移除时会调用如下方法
    * `componentWillUnmount()`
        * 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除 timer，取消网络请求或清除在 `componentDidMount()` 中创建的订阅等。

* 其它
    * 错误处理
        * `static getDerivedStateFromError()`
        * `componentDidCatch()`
    * 其它APIs
        * `setState()`
        * `forceUpdate()`
    * class属性
        * `defaultProps`
        * `displayName()`
    * 实例属性
        * `state`
        * `props`

## 函数组件和Hooks

*Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用

* 没有破坏性的完全兼容
* 没有计划溢出class
* 不影响已有的API：props, state, context, refs 以及生命周期，还提供了更强大的方式组合它们
* **Hook 使你在无需修改组件结构的情况下复用状态逻辑。**
* **Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）**，而并非强制按照生命周期划分。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测。
* **Hook 使你在非 class 的情况下可以使用更多的 React 特性。** 从概念上讲，React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。
* Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：
    - 只能在**函数最外层**调用 Hook。不要在循环、条件判断或者子函数中调用。
    - 只能在 **React 的函数组件**中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）

### useState

通过在函数组件里调用它来给组件添加一些内部 state。返回一对值：**当前**状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。

```jsx
// 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);
```

* 不能局部更新，配合 ...解析 使用

* 参数是一个obj（对象）时，如果obj地址不变，那么React就认为数据没有变化，因此必须创建一个新的对象

```jsx
  const [state,setState] = useState(()=>{return initialState})
  ```

  JS引擎每次都会解析初始值，写成箭头函数，函数不会立即执行，里面的内容不用每次都加载。减少计算过程，只在第一次初始化用到函数的时候解析返回值，减少计算过程。

* 修改state后，如果直接调用此state，会发现state的值未发生改变。当调用setState时，react是**异步更新state**的，如果setState后立即获取state的值，此时state尚未更新，因此为旧的状态。
    * 解决方法一：通过useEffect方法监听该state，再去触发获取最新的值
    * 法二：使用`useRef`, newStr = "现在数字是" + numRef.current

### useEffect

之前可能已经在 React 组件中执行过数据获取、订阅或者手动修改过 DOM。我们统一把这些操作称为“副作用”。

`useEffect` 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，只不过被合并成了一个 API。

* 当你调用 `useEffect` 时，就是在告诉 React 在完成对 DOM 的更改后运行你的“副作用”函数。由于副作用函数是在组件内声明的，所以它们可以访问到组件的 props 和 state。默认情况下，React 会在每次渲染后调用副作用函数 —— **包括**第一次渲染的时候。

* 副作用函数还可以通过返回一个函数来指定如何“清除”副作用。例如，在下面的组件中使用副作用函数来订阅好友的在线状态，并通过取消订阅来进行清除操作

```jsx
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

* 跳过Effect进行性能优化

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新

// 在 class 组件中，我们可以通过在 componentDidUpdate 中添加对 prevProps 或 prevState 的比较逻辑解决：
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

### useContext

```jsx
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` prop 决定。

当组件上层最近的 `<MyContext.Provider>` 更新时，该 Hook 会触发重渲染，并使用最新传递给 `MyContext` provider 的 context `value` 值。即使祖先使用 [`React.memo`](https://react.docschina.org/docs/react-api.html#reactmemo) 或 [`shouldComponentUpdate`](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate)，也会在组件本身使用 `useContext` 时重新渲染。

### useReducer

```jsx
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

### useCallback

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 `shouldComponentUpdate`）的子组件时，它将非常有用。

### useMemo

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

把“创建”函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

* `useMemo`和`useCallback`的<span style="color:red;">异同</span>
    * `useMemo`和`useCallback`接收的参数都是一样，都是在其依赖项发生变化后才执行，都是返回缓存的值，区别在于`useMemo`返回的是函数运行的结果，`useCallback`返回的是函数。
    * `useCallback(fn，deps)`相当于`useMemo( ()=>fn, deps)`

### useRef

* `useRef` 返回一个可变的 ref 对象，该对象只有个 current 属性，其 `.current` 属性被初始化为传入的参数（`initialValue`）。
* 返回的 ref 对象在组件的整个生命周期内保持不变。
* 当更新 current 值时并不会 re-render ，这是与 useState 不同的地方，用来保存一些变化的信息
* 更新 useRef 是 side effect (副作用)，所以一般写在 useEffect 或 event handler 里
* useRef 类似于类组件的 this

```jsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素，点击button选中文本框
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

* 为什么使用`useRef`? **跨渲染周期取到状态值**。state更新是异步的。

* 在函数组件中的一个**全局变量**，不会因为重复 `render` 重复申明， 类似于类组件的 `this.xxx`

    * 有些情况下，我们需要保证函数组件每次 render 之后，某些变量不会被重复申明，比如说 Dom 节点，定时器的 id 等等。

    * 在类组件中，我们完全可以通过给类添加一个自定义属性来保留，比如说 this.xxx， 但是函数组件没有 this，我们就需要使用 **useRef** 来实现。

* 与`createRef`的区别

    * 挂载阶段，useRef与createRef没有差别
    * **更新阶段，**createRef每次都会返回个新的引用;而useRef不会随着组件的更新而重新创建
    * 销毁阶段，两者都会销毁

> https://blog.csdn.net/u011705725/article/details/115634265  必看

### useImperativeHandle

```jsx
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

`useImperativeHandle` 可以让你在使用 `ref` 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。`useImperativeHandle` 应当与 [`forwardRef`](https://react.docschina.org/docs/react-api.html#reactforwardref) 一起使用

### useLayoutEffect

其函数签名与 `useEffect` 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，`useLayoutEffect` 内部的更新计划将被同步刷新。

尽可能使用标准的 `useEffect` 以避免阻塞视觉更新。

### useDebugValue

```jsx
useDebugValue(value)
```

`useDebugValue` 可用于在 React 开发者工具中显示自定义 hook 的标签。

### 自定义Hook

有时候我们会想要在组件之间重用一些状态逻辑。目前为止，有两种主流方案来解决这个问题：[高阶组件](https://react.docschina.org/docs/higher-order-components.html)和 [render props](https://react.docschina.org/docs/render-props.html)。自定义 Hook 可以让你在不增加组件的情况下达到同样的目的。



hook怎么实现生命周期

## React的Refs，获取DOM

Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。

* 何时使用Refs
    * 管理焦点，文本选择或媒体播放。
    * 触发强制动画。
    * 集成第三方 DOM 库。
    * 勿过度使用

- 创建Refs

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef(); // 创建
  }
  render() {
    return <div ref={this.myRef} />;   // 通过ref属性附加到React元素
  }
}

// 或者  ref={(input) => this.input = input}
```

* 访问

    * ref 的值根据节点的类型而有所不同：

        - 当 `ref` 属性用于 HTML 元素时，构造函数中使用 `React.createRef()` 创建的 `ref` 接收底层 DOM 元素作为其 `current` 属性。

        - 当 `ref` 属性用于自定义 class 组件时，`ref` 对象接收组件的挂载实例作为其 `current` 属性。

        - **你不能在函数组件上使用 `ref` 属性**，因为他们没有实例

        - ```jsx
      class CustomTextInput extends React.Component {
        constructor(props) {
          super(props);
          // 创建一个 ref 来存储 textInput 的 DOM 元素
          this.textInput = React.createRef();
          this.focusTextInput = this.focusTextInput.bind(this);
        }
      
        focusTextInput() {
          // 直接使用原生 API 使 text 输入框获得焦点
          // 注意：我们通过 "current" 来访问 DOM 节点
          this.textInput.current.focus();
        }
      
        render() {
          // 告诉 React 我们想把 <input> ref 关联到
          // 构造器里创建的 `textInput` 上
          return (
            <div>
              <input
                type="text"
                ref={this.textInput} />
              <input
                type="button"
                value="Focus the text input"
                onClick={this.focusTextInput}
              />
            </div>
          );
        }
      }
      ```

* 函数组件

    * 默认情况下，**你不能在函数组件上使用 `ref` 属性**，因为它们没有实例：

    * 如果要在函数组件中使用 `ref`，你可以使用 `forwardRef`（可与 `useImperativeHandle` 结合使用），或者可以将该组件转化为 class 组件。

    * ```jsx
    function CustomTextInput(props) {
      // textInput must be declared here so the ref can refer to it
      const textInput = useRef(null);
      
      function handleClick() {
        textInput.current.focus();
      }
    
      return (
        <div>
          <input
            type="text"
            ref={textInput} />
          <input
            type="button"
            value="Focus the text input"
            onClick={handleClick}
          />
        </div>
      );
    }
    ```

* 不可以在render访问refs，render 阶段 DOM 还没有生成，无法获取 DOM。DOM 的获取需要在 pre-commit 阶段和 commit 阶段：

# 9 高阶组件HOC、Render props、hooks有什么区别

这三者是目前react解决代码复用的主要方式：

- 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。具体而言，高阶组件是参数为组件，返回值为新组件的函数。
- render props是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术，更具体的说，render prop 是一个用于告知组件需要渲染什么内容的函数 prop。
- 通常，render props 和高阶组件只渲染一个子节点。让 Hook 来服务这个使用场景更加简单。这两种模式仍有用武之地，（例如，一个虚拟滚动条组件或许会有一个 renderltem 属性，或是一个可见的容器组件或许会有它自己的 DOM 结构）。但在大部分场景下，Hook 足够了，并且能够帮助减少嵌套。

## HOC

高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。HOC 是纯函数，没有副作用。

```js
// hoc的定义
function withSubscription(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: selectData(DataSource, props)
      };
    }
    // 一些通用的逻辑处理
    render() {
      // ... 并使用新数据渲染被包装的组件!
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
 
// 使用
const BlogPostWithSubscription = withSubscription(BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id));
```

- HOC的优缺点∶
    - 优点∶ 逻辑服用、不影响被包裹组件的内部逻辑。
    - 缺点∶ hoc传递给被包裹组件的props容易和被包裹后的组件重名，进而被覆盖

## Render props

指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术

```jsx
// DataProvider组件内部的渲染逻辑如下
class DataProvider extends React.Components {
     state = {
    name: 'Tom'
  }
 
    render() {
    return (
        <div>
          <p>共享数据组件自己内部的渲染逻辑</p>
          { this.props.render(this.state) }
      </div>
    );
  }
}
 
// 调用方式
<DataProvider render={data => (
  <h1>Hello {data.name}</h1>
)}/>
```

由此可以看到，render props的优缺点也很明显∶

- 优点：数据共享、代码复用，将组件内的state作为props传递给调用者，将渲染逻辑交给调用者。
- 缺点：无法在 return 语句外访问数据、嵌套写法不够优雅

## Hooks

Hook是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。通过自定义hook，可以复用代码逻辑。

```jsx
// 自定义一个获取订阅数据的hook, 自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook。
function useSubscription() {
  const data = DataSource.getComments();
  return [data];
}
// 
function CommentList(props) {
  const {data} = props;
  const [subData] = useSubscription();
    ...
}
// 使用
<CommentList data='hello' />
```

以上可以看出，hook解决了hoc的prop覆盖的问题，同时使用的方式解决了render props的嵌套地狱的问题。hook的优点如下∶

- 使用直观；
- 解决hoc的prop 重名问题；
- 解决render props 因共享数据 而出现嵌套地狱的问题；
- 能在return之外使用数据的问题。

需要注意的是：hook只能在组件顶层使用，不可在分支语句中使用。



## key的重要性

key 用于识别唯一的 Virtual DOM 元素及其驱动 UI 的相应数据。它们通过回收 DOM 中当前所有的元素来帮助 React 优化渲染。这些 key 必须是唯一的数字或字符串，React 只是重新排序元素而不是重新渲染它们。这可以提高应用程序的性能。


## 事件机制

```jsx
<div onClick={this.handleClick.bind(this)}>点我</div>
```

JSX 上写的事件并没有绑定在对应的真实 DOM 上，而是通过事件代理的方式，将所有的事件都统一绑定在了 `document` 上。这样的方式不仅减少了内存消耗，还能在组件挂载销毁时统一订阅和移除事件。

另外冒泡到 `document` 上的事件也不是原生浏览器事件，而是 React 自己实现的合成事件（SyntheticEvent）。因此我们如果不想要事件冒泡的话，调用 `event.stopPropagation` 是无效的，而应该调用 `event.preventDefault`。

实现合成事件的目的如下：

- 合成事件首先抹平了浏览器之间的兼容问题，另外这是一个跨浏览器原生事件包装器，赋予了跨浏览器开发的能力；
- 对于原生浏览器事件来说，浏览器会给监听器创建一个事件对象。如果你有很多的事件监听，那么就需要分配很多的事件对象，造成高额的内存分配问题。但是对于合成事件来说，有一个事件池专门来管理它们的创建和销毁，当事件需要被使用时，就会从池子中复用对象，事件回调结束后，就会销毁事件对象上的属性，从而便于下次复用事件对象。

<img src="https://img-blog.csdnimg.cn/img_convert/d5b152ea4a844d8947864a31e7b7acba.png" alt="d5b152ea4a844d8947864a31e7b7acba.png" style="zoom:80%;" />

### React的事件和普通的HTML事件有什么不同？

区别：

- 对于事件名称命名方式，原生事件为全小写，react 事件采用小驼峰；
- 对于事件函数处理语法，原生事件为字符串，react 事件为函数；
- react 事件不能采用 return false 的方式来阻止浏览器的默认行为，而必须要地明确地调用`preventDefault()`来阻止默认行为。

合成事件是 react 模拟原生 DOM 事件所有能力的一个事件对象，其优点如下：

- 兼容所有浏览器，更好的跨平台；
- 将事件统一存放在一个数组，避免频繁的新增与删除（垃圾回收）。
- 方便 react 统一管理和事务机制。

事件的执行顺序为原生事件先执行，合成事件后执行，合成事件会冒泡绑定到 document 上，所以尽量避免原生事件与合成事件混用，如果原生事件阻止冒泡，可能会导致合成事件不执行，因为需要冒泡到document 上合成事件才会执行。

# 12 React.Component 和 React.PureComponent 的区别

`PureComponent`表示一个纯组件，可以用来优化React程序，减少render函数执行的次数，从而提高组件的性能。

在React中，当prop或者state发生变化时，可以通过在`shouldComponentUpdate`生命周期函数中执行`return false`来阻止页面的更新，从而减少不必要的render执行。`React.PureComponent`会自动执行 `shouldComponentUpdate`。

不过，`pureComponent`中的 `shouldComponentUpdate()` 进行的是浅比较，也就是说如果是引用数据类型的数据，只会比较不是同一个地址，而不会比较这个地址里面的数据是否一致。浅比较会忽略属性和或状态突变情况，其实也就是数据引用指针没有变化，而数据发生改变的时候render是不会执行的。如果需要重新渲染那么就需要重新开辟空间引用数据。`PureComponent`一般会用在一些纯展示组件上。

使用`pureComponent`的好处：当组件更新时，如果组件的props或者state都没有改变，render函数就不会触发。省去虚拟DOM的生成和对比过程，达到提升性能的目的。这是因为react自动做了一层浅比较。

# 13 Component, Element, Instance 之间有什么区别和联系？

- **元素：**一个元素`element`是一个普通对象(plain object)，描述了对于一个DOM节点或者其他组件`component`，你想让它在屏幕上呈现成什么样子。元素`element`可以在它的属性`props`中包含其他元素(译注:用于形成元素树)。创建一个React元素`element`成本很低。元素`element`创建之后是不可变的。
- **组件：**一个组件`component`可以通过多种方式声明。可以是带有一个`render()`方法的类，简单点也可以定义为一个函数。这两种情况下，它都把属性`props`作为输入，把返回的一棵元素树作为输出。
- **实例：**一个实例`instance`是你在所写的组件类`component class`中使用关键字`this`所指向的东西(译注:组件实例)。它用来存储本地状态和响应生命周期事件很有用。

函数式组件(`Functional component`)根本没有实例`instance`。类组件(`Class component`)有实例`instance`，但是永远也不需要直接创建一个组件的实例，因为React帮我们做了这些。

# 14 React.createClass和extends Component的区别有哪些？

React.createClass和extends Component的bai区别主要在于：

（1）语法区别

- createClass本质上是一个工厂函数，extends的方式更加接近最新的ES6规范的class写法。两种方式在语法上的差别主要体现在方法的定义和静态属性的声明上。
- createClass方式的方法定义使用逗号，隔开，因为creatClass本质上是一个函数，传递给它的是一个Object；而class的方式定义方法时务必谨记不要使用逗号隔开，这是ES6 class的语法规范。

（2）propType 和 getDefaultProps

- React.createClass：通过proTypes对象和getDefaultProps()方法来设置和获取props.
- React.Component：通过设置两个属性propTypes和defaultProps

（3）状态的区别

- React.createClass：通过getInitialState()方法返回一个包含初始值的对象
- React.Component：通过constructor设置初始状态

（4）this区别

- React.createClass：会正确绑定this
- React.Component：由于使用了 ES6，这里会有些微不同，属性并不会自动绑定到 React 类的实例上。

（5）Mixins

- React.createClass：使用 React.createClass 的话，可以在创建组件时添加一个叫做 mixins 的属性，并将可供混合的类的集合以数组的形式赋给 mixins。
- 如果使用 ES6 的方式来创建组件，那么 `React mixins` 的特性将不能被使用了。

```js
import React from 'react';

const Contacts = React.createClass({  
  propTypes: {
    name: React.PropTypes.string
  },  // 必须使用‘,’分割
  getDefaultProps() {
    return {

    };
  },
    
  getInitialState(){ 
        return {
            isEditing: false   // 返回一个包含初始值的对象
        }
    },
    
  handleClick() {
    console.log(this); // React Component instance, 自动绑定正确的this
  },
    
  render() {
    return (
      <div></div>
    );
  }
});

export default Contacts;  
```

```js
import React form 'react';
class TodoItem extends React.Component{
    static propTypes = { // as static property
        name: React.PropTypes.string
    }

    static defaultProps = { // as static property
        name: ''
    }

    constructor(props){
        super(props)
        this.state = { // define this.state in constructor
            isEditing: false
        } 
        // this.handleClick = this.handleClick.bind(this);   // 法一
    }

	// const handle = () => {...}  // 法二
	handleClick() {
  	  console.log(this); // null
  	}
      
    render(){
        return <div></div>
    }
}
```

# 15 性能优化

developtools React Profile

## 避免不必要的render?

* shouldComponentUpdate 和 PureComponent

* 利用高阶组件

* React.memo：是 React 16.6 新的一个 API，用来缓存组件的渲染，避免不必要的更新，其实也是一个高阶组件，与 PureComponent 十分类似，但不同的是， React.memo只能用于函数组件。

    * ```jsx
    const MyComponent = React.memo(function MyComponent(props) {
      /* 使用 props 渲染 */
    });
    ```

    * 仅检查 props 变更，默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。
    * 此方法仅作为**[性能优化](https://zh-hans.reactjs.org/docs/optimizing-performance.html)**的方式而存在

# 16 哪些方法会触发 React 重新渲染？重新渲染 render 会做些什么？

* `setState()`被调用时，传入null例外
* 父组件重新渲染，哪怕props没有改变，子组件也会重新渲染
* `render`做些什么？
    * 会对新旧 VNode 进行对比，也就是我们所说的Diff算法
    * 对新旧两棵树进行一个深度优先遍历，这样每一个节点都会一个标记，在到深度遍历的时候，每遍历到一和个节点，就把该节点和新的节点树进行对比，如果有差异就放到一个对象里面
    * 遍历差异对象，根据差异的类型，根据对应对规则更新VNode

React 的处理 render 的基本思维模式是每次一有变动就会去重新渲染整个应用。在 Virtual DOM 没有出现之前，最简单的方法就是直接调用 innerHTML。Virtual DOM厉害的地方并不是说它比直接操作 DOM 快，而是说不管数据怎么变，都会尽量以最小的代价去更新 DOM。React 将 render 函数返回的虚拟 DOM 树与老的进行比较，从而确定 DOM 要不要更新、怎么更新。当 DOM 树很大时，遍历两棵树进行各种比对还是相当耗性能的，特别是在顶层 setState 一个微小的修改，默认会去遍历整棵树。尽管 React 使用高度优化的 Diff 算法，但是这个过程仍然会损耗性能.

# 17 对React中Fragment的理解，它的使用场景是什么？

在React中，组件返回的元素只能有一个根元素。为了不添加多余的DOM节点，我们可以使用Fragment标签来包裹所有的元素，Fragment标签不会渲染出任何元素。React官方对Fragment的解释：

*React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。*

```jsx
// 一般形式
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
// 也可以写成以下形式
render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
}
```

# 18 React Portals

Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。

```
ReactDOM.createPortal(child, container)
```

第一个参数（`child`）是任何[可渲染的 React 子元素](https://zh-hans.reactjs.org/docs/react-component.html#render)，例如一个元素，字符串或 fragment。第二个参数（`container`）是一个 DOM 元素。

* 尽管 portal 可以被放置在 DOM 树中的任何地方，但在任何其他方面，其行为和普通的 React 子节点行为一致。

# 19 为什么建议传递给 setState 的参数是一个 callback 而不是一个对象

因为 this.props 和 this.state 的更新可能是异步的，不能依赖它们的值去计算下一个 state。

# 20 虚拟DOM

虚拟DOM（VDOM）它是真实DOM的内存表示,一种编程概念，一种模式。它会和真实的DOM同步，比如通过ReactDOM这种库，这个同步的过程叫做调和(reconcilation)。

# 21 Diff算法

- 把树形结构按照层级分解，只比较同级元素。
- 给列表结构的每个单元添加唯一的 key 属性，方便比较。
- React 只会匹配相同 class 的 component（这里面的 class 指的是组件的名字）
- 合并操作，调用 component 的 setState 方法的时候, React 将其标记为 dirty.到每一个事件循环结束, React 检查所有标记 dirty 的 component 重新绘制.
- 选择性子树渲染。开发人员可以重写 shouldComponentUpdate 提高 diff 的性能。

# 22 React的StrictMode是什么

React的StrictMode是一种帮助程序组件，可以帮助您编写更好的react组件，您可以使用包装一些组件， `<StrictMode />` 并且基本上可以：

- 验证[内部组件](https://www.zhihu.com/search?q=内部组件&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A91725031})是否遵循某些推荐做法，如果不在控制台中，则会发出警告。
- 验证不赞成使用的方法，如果使用了严格模式，则会在控制台中警告您。
- 通过识别潜在风险来帮助您预防某些副作用。


## Fiber

https://segmentfault.com/a/1190000043888674