# computed 和 watch 的区别和运用的场景？

* computed： 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值；

  * 用法

  * ```js
      data: {
        firstName: 'Foo',
        lastName: 'Bar'
      },
      computed: {
        // 默认get用法，直接使用就可以
        fullName: function () {
          return this.firstName + ' ' + this.lastName
        }
          
        // get 和 set 用法
        fullName2：{
       		get(){//回调函数 当需要读取当前属性值是执行，根据相关数据计算并返回当前属性的值
          		return this.firstName + ' ' + this.lastName
        	    },
       		
              set(val){//监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
           			//val就是fullName的最新属性值
           		console.log(val)
            	    const names = val.split(' ');
            		console.log(names)
            		this.firstName = names[0];
            		this.lastName = names[1];
       		}
       }
    }
    ```
    
    

* watch： 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；

  * ```js
    data(){
          return{
            'first':2,
             sencond: [2, 3, 4],
             third: {
                 name: 'xyf'
             }
          }
        },
        watch:{
          // 1 简单数据类型
          first(){
            console.log(this.first)
          }
            
          // 2 复杂数据类型，需要deep 
          sencond: {
            // 函数名必须为handler,否则无效果
            handler(oldVal, newVal){
              // 打印的结果,发现oldVal和newVal值是一样的,
              // 所以深度监听虽然可以监听到对象的变化,但是无法监听到具体对象里面那个属性的变化
              // 原因是它们索引同一个对象/数组
              console.log(oldVal)   
              console.log(newVal)
            },
            deep:true   // !
          }
            
          // 3 监听单个属性
          // 方法一：可以直接对用对象.属性的方法拿到属性
          third.name: function(newVal, oldVal) {....}
          // 方法二：利用computed作为中间件
          // computed:{
          //   thirdChange(){
          //       return this.first.second
          //   }
          // }
          // thirdChange() {...}
        }
    ```

* 区别：
  * computed计算值
    * 应用：就是简化tempalte里面{{}}计算和处理props或$emit的传值
    * 具有缓存性，页面重新渲染值不变化,计算属性会立即返回之前的计算结果，而不必再次执行函数
    * 当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
  * watch观察
    * 应用：监听props，$emit或本组件的值执行**异步**操作
    * 无缓存性，页面重新渲染时值不变化也会执行
    * 当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

