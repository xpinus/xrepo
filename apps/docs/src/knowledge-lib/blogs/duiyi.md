# 入学

https://duyiedu.yuque.com/fmi7t1/fwfys4/qy05sy?singleDoc# 《ev播放器下载教程》



EV上的课程都已经都开通了，下面是EV的账号和密码，EV只能登录两个设备，多了会影响账号使用，所以要选好长期使用的设备哈

账号：0145中语强笔037
密码：15195862833（你的手机号）



课程所需资料都在资料文件链接里，链接自动更新，保存好即可，不需要权限！

1、先将链接复制到浏览器，看下能不能打开
2、如果不能打开，用自己手机号登陆即可
3、登陆后仍打不开，刷新/重新进就可以了

https://duyiedu.yuque.com/fmi7t1/nwhh7g/bcqyd9mdraozmatp?singleDoc# 《前端-语言基础文件资料》

https://duyiedu.yuque.com/fmi7t1/nwhh7g/gtucggflr4xxpp6m?singleDoc# 《前端-中枢课文件资料》

https://duyiedu.yuque.com/fmi7t1/nwhh7g/tfd9blexuk02ggqr?singleDoc# 《前端-强化课文件资料》

https://duyiedu.yuque.com/fmi7t1/nwhh7g/ohf2y7sggobkm47p?singleDoc# 《前端-笔面试甄选文件资料》



https://duyiedu.yuque.com/hghs2q/ybli0a/kgbr16?singleDoc# 《前端课程目录（新）》这是对着ev上课程的目录，也是学习目录。可在这个界面通过Ctrl+F 进行检索所需要的课程内容



# 技术应用阶段



## html + css



### 补充重要知识

- box-sizing: content-box;   // border-box
- alpha通道  rgba   #00000080
- 尺寸的百分比：相对于参考系
  - 普通元素为父元素的`内容区域`
  - 绝对/固定定位元素，相对于父级定位元素的 `conten+padding 区域`
  - height % 当高度受本身影响时无效
  - padding\border\margin: 不管方向，参考系的`宽度`

- 最大最小宽度
  - 往往将min-width其设置为设计稿的宽度

### 表单进阶

- form中input type="submit"点击才有提交页面刷新操作，内部任意input中回车会自动触发form的提交
- button默认就是一个submit
  - type="button" 指明这只是一个普通按钮
  - type="reset" 会把form重置
- select元素设置multiple="multiple", 多选列表
  - 布尔属性
- textarea的col row一般没用，用css去调整大小

### 精灵图 sprite

### 绝对定位

- fixed参考视口viewport

### 属性值的计算过程

无属性

||

1. 确定声明值
   - 参考样式表中没有冲突的声明，作为css属性值
2. 层叠冲突
   - 处理层叠样式表的冲突
     - 比较重要性，作者样式表直接替代浏览器默认样式表
     - 比较特殊性（选择器权重）
     - 比较原次序，后面覆盖前面
3. 使用继承
   - 对仍然没有值的属性，若可以继承，则继承父元素的值
     - color\font
4. 使用默认值
   - 对仍然没有值的属性，使用默认值

||

computed style 最终每个属性都有值 （都会换算成绝对单位）

### 拓展知识

- 伪类选择器
- contenteditble
- table
  - 为什么效率低？ 



## js

命令式编程语言，本质是`处理数据`

### 数据的表达

- 变量  var a;

  - 允许数字、字母、下划线、$
  - 不得已数字开头
  - 避免关键字

- 字面量  a = 123

- 表达式 a + b

- 数据类型：基本 + 原始

  - object的属性名`一定是字符串`

  - 数组，本质也是一个对象

    - ```js
      {
       '0': "ceshi"，
       ‘1’： “cc”,
       'length': 2
      }
      ```



### 数据的运算

- 类型的隐式转换
  - page = +page || 1   // 将page转成数字

- 布尔判定
  - false null undefined 0 NaN ''  判定为 false



### 数据的存储和传递



### 数据的作用域

- js有两种作用域：全局作用域和函数作用域        ？？ 那所谓块级作用域是什么， {} 内定义的函数为什么外部无法使用 
  - 内部的作用域能访问外部，反之不行
  - 如果内部引用外部的变量，会产生闭包
  - 内部访问外部，取决于函数定义的位置，和调用无关
- 作用域内定义的变量、函数声明会提升到作用域顶部
  - undefined   [Function: xxx]

### 全局对象

- 浏览器 window
- node global



所有的全局变量、函数都会挂在全局对象上，

- 这被称之为全局污染
- 如果要避免，利用立即执行函数IIFE

  

### 构造函数



### 原型

- 每个函数都自动附带一个属性prototype

  - 函数 === 》 prototype

      ||                              ||

    new ==》 实例 ==》\__proto__  [[Prototype]]

- 原型链
  - 当读取对象成员时，先看自身成员是否存在，如果没有会在其原型链上查找
  - `Object.prototype`指向null
  - 函数也是对象，所有函数的 \__proto__ 指向`Function.prototype` , Function的\__proto__指向自身的原型
  - Function的原型和Object的原型是特殊的
  - Function的原型的[[Protorype]]指向Object的原型

- 利用原型链判断类型

- 学会创建空原型对象

  - Object.create()
  - `obj.__proto__`= null
  - Object.setPrototypeOf(obj, null)

- 继承

  ```js
  function inherit(Child, Parent) {
      Object.setPrototypeOf(Child.prototype, Parent.prototype)
  }
  ```

  

### this

- 在全局代码中，this指向全局对象
- 在函数中，他的指向取决于函数是被如何调用的
  - new    =====    新对象
  - 直接调用 =====  全局对象
  - 通过对象调用   ===== 调用的对象
  - call\apply  =====  绑定的目标参数

