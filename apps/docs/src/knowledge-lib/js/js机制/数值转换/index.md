# js机制-原始值强制转化

强制（显式）转换：Number() String() Boolean()

在如下面场景[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%BC%BA%E5%88%B6%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2)，会执行(隐式)类型转换
- Date()接收到不是预期的参数
- ±： 如果某个操作数是字符串，执行字符串串联；否则，执行数字相加
- ==：如果某个操作数是原始值，而另一个操作数是对象（object），则该对象将转换为没有首选类型的原始值
- if等预期为boolen值的地方
- `* /`转换为数字

## 转换过程
- 如果值已经是原始值，则此操作不会进行任何转换
- **number**强制转换
  - undefined转换为NaN
  - null转换为0
  - boolean转换为1或0
  - string尝试转化为数字，失败返回NaN
    - 首尾空格被忽略
    - +-符号出现在开头被看作符号
    - Infinity被当作字面量
    - 空字符串或字符串中只包含空格时，返回0
    - 不允许数字分隔符
      - 正常数字中，可以使用下划线（_，U+005F）作为分隔符以增强数字字面量的可读性
    - 与`parseInt`尽可能转换不同
  - BigInt直接报错TypeError，防止导致精度误差
  - Symbol直接报错TypeError
- **string**强制转换
  - undefined转换为'undefined'
  - null转换为'null'
  - boolean转换为'false'或'true'
  - 数字使用toString(10)方法转换为字符串
  - Symbol直接报错TypeError
  - 对象是先调用toString()方法，再调用valueOf()方法
- **boolean**强制转换
  - ±0、null、false、NaN、undefined、''空字符串转换为false
  - 任何对象转换为true
- **对象**会依次调用下列方法尝试转换为原始值，如需要再继续转换
  - `[Symbol.toPrimitive]()`: 如果存在，则必须返回原始值——返回对象，会导致 TypeError, 没有默认的实现，是用来自定义原始值转换行为的
  - `valueOf()`: 如果返回对象，则忽略其返回值
    - `[]`的`valueOf()`返回`[]`
  - `toString()`: 如果仍然返回对象则报错：TypeError
    - 对象默认返回`[object Object]`
    - `[]`的`toString()`返回空字符串，默认`join(',')`

<script setup>
import q1 from './questions/q1.js?raw';
</script>

<run-script :code="q1">
</run-script>

