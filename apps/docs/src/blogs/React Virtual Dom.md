# Virtual DOM是什么

是一种编程理念，将真实UI节点抽象成对象，与真实DOM进行同步，比如ReactDOM

* UI节点抽象：因为提供了对DOM的抽象，所以在web开发中，通常不需要调用DOM API。也因为抽象，所以Reac也可以开发Native(RN)
  * ![image-20220902104703498](https://imagehost-1311720054.cos.ap-nanjing.myqcloud.com/blog/%E5%8D%9A%E5%AE%A2%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/image-20220902104703498.png)
* Virtual DOM渲染页面
  * ![image-20220902104028761](https://imagehost-1311720054.cos.ap-nanjing.myqcloud.com/blog/%E5%8D%9A%E5%AE%A2%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/image-20220902104028761.png)
  * 原生DOM更新：DOM API调用更新UI
  * Virtual DOM更新：
    * 每次render都会产生一份新的 react dom
    * 新旧reactn dom比较，从而确定进行多少变更
    * 确定最优策略后调用dom api更新UI
    * *?* 虽然看似步骤多，但在实际复杂项目，频繁操作原生DOM，引起重绘等问题
  * 优势：
    * 高效的diff实现更新
    * 可维护性和编程思维上，数据驱动视图

# VDOM Diff

> 组件级别的比较

![image-20220902105001230](https://imagehost-1311720054.cos.ap-nanjing.myqcloud.com/blog/%E5%8D%9A%E5%AE%A2%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/image-20220902105001230.png)

直接删除D组件，不判断子组件EF是否相同，因为实际相同的可能性很小，不如直接删掉重新创建


> 元素级别的比较

**创建节点**

![image-20220902105157117](https://imagehost-1311720054.cos.ap-nanjing.myqcloud.com/blog/%E5%8D%9A%E5%AE%A2%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/image-20220902105157117.png)

![image-20220902105231533](https://imagehost-1311720054.cos.ap-nanjing.myqcloud.com/blog/%E5%8D%9A%E5%AE%A2%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/image-20220902105231533.png)

**删除子节点**

![image-20220902105256898](https://imagehost-1311720054.cos.ap-nanjing.myqcloud.com/blog/%E5%8D%9A%E5%AE%A2%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/image-20220902105256898.png)

![image-20220902105312186](https://imagehost-1311720054.cos.ap-nanjing.myqcloud.com/blog/%E5%8D%9A%E5%AE%A2%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/image-20220902105312186.png)

**移动节点**

![image-20220902105331992](https://imagehost-1311720054.cos.ap-nanjing.myqcloud.com/blog/%E5%8D%9A%E5%AE%A2%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/image-20220902105331992.png)

将子节点3前每个都向后移动，而不是将3移动到前面

![image-20220902105353422](https://imagehost-1311720054.cos.ap-nanjing.myqcloud.com/blog/%E5%8D%9A%E5%AE%A2%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/image-20220902105353422.png)

## 如何看源码

动态注入：在源码中只是声明，具体实现在其它包中如react-dom或react-native

reac-dom渲染节点：嵌套方式



# React Reconciliation协调

react利用virtual DOM将内存中的虚拟dom转换成真实dom的过程，最重要，最核心

## stack Reconciler 栈协调

![image-20220902110646321](https://imagehost-1311720054.cos.ap-nanjing.myqcloud.com/blog/%E5%8D%9A%E5%AE%A2%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/image-20220902110646321.png)

示例：

![image-20220902111458621](https://imagehost-1311720054.cos.ap-nanjing.myqcloud.com/blog/%E5%8D%9A%E5%AE%A2%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/image-20220902111458621.png)

![image-20220902111611402](https://imagehost-1311720054.cos.ap-nanjing.myqcloud.com/blog/%E5%8D%9A%E5%AE%A2%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/image-20220902111611402.png)

第一次render

![image-20220902112125100](https://imagehost-1311720054.cos.ap-nanjing.myqcloud.com/blog/%E5%8D%9A%E5%AE%A2%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/image-20220902112125100.png)

![image-20220902112222071](https://imagehost-1311720054.cos.ap-nanjing.myqcloud.com/blog/%E5%8D%9A%E5%AE%A2%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/image-20220902112222071.png)

![image-20220902112242039](https://imagehost-1311720054.cos.ap-nanjing.myqcloud.com/blog/%E5%8D%9A%E5%AE%A2%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/image-20220902112242039.png)

 ![image-20220902112412296](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902112412296.png)

更新

![image-20220902112456068](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902112456068.png)

![image-20220902112813234](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902112813234.png)

![image-20220902112832826](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902112832826.png)

![image-20220902112926545](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902112926545.png)

组件更新时一气呵成，不可阻断，当组件比较复杂，这时发生用户输入、点击，因为浏览器优先处理渲染或更新，会让用户感到卡顿

![image-20220902113002653](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902113002653.png)

setState在大部分情况下是异步的，当setState时在更新会立即执行，否则放入dirty队列，因为react执行的代码都是宏任务，如果是微任务promise中调用setState会立即执行 *？*

## Fiber Reconciler

实现连续的更新，stack是断断续续的更新

![image-20220902113622739](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902113622739.png)

![image-20220902114127969](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902114127969.png)

![image-20220902114406284](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902114406284.png)

![image-20220902114529610](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902114529610.png)

![image-20220902114632915](D:\PigGo\image-20220902114632915.png)

![image-20220902114911907](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902114911907.png)

![image-20220902115046553](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902115046553.png)

stack和Fiber

![image-20220902115505416](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902115505416.png)

![image-20220902120000349](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902120000349.png)

![image-20220902120225210](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902120225210.png)





# React new Component Lifecycle

老

![image-20220902135502774](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902135502774.png)

新

因为fiber,要求组件渲染之前需要是纯函数行为不能setState或异步，willcomponentMount滥用

 ![image-20220902140339148](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902140339148.png)

![image-20220902141403330](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902141403330.png)

![image-20220902141413176](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902141413176.png)

![image-20220902141346719](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902141346719.png)

![image-20220902141433196](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902141433196.png)

## 新版组件升级

![image-20220902141916622](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902141916622.png)

![image-20220902142008185](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902142008185.png)

![image-20220902142101880](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902142101880.png)

![image-20220902143232766](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902143232766.png)

17之后不行

# HOOKs

## Hooks使命

![image-20220902145305753](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902145305753.png)

![image-20220902145555106](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902145555106.png)

![image-20220902150056674](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902150056674.png)

![image-20220902150302862](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902150302862.png)

## Hooks原理

no magic, just arrays

![image-20220902150444605](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902150444605.png)

![image-20220902150558203](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902150558203.png)

![image-20220902150632990](C:\Users\pinus\AppData\Roaming\Typora\typora-user-images\image-20220902150632990.png)

