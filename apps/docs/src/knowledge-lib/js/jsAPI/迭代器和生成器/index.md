# 生成器和迭代器
- 生成器是一个函数，用来返回迭代器的，当调用生成器后不会立即执行，而是通过返回的迭代器来控制这个生成器的一步一步执行的
- 调用迭代器的 next 方法来请求一个一个的值，返回的对象有两个属性，一个是 value，也就是值；另一个是 done，是个布尔类型，done 为 true 说明生成器函数执 行完毕，没有可返回的值了
- 每当执行到 yield 属性的时候，都会返回一个对象，这时候生成器处于一个非阻塞的挂起状态
- 调用迭代器的 next 方法的时候，生成器又从挂起状态改为执行状态，继续上一次的执 行位置执行


> 面试题: 让下列代码成立
```js
const [a, b] = {
    a: 3,
    b: 4
}  // error:  {(intermediate value)(intermediate value)} is not iterable
```

<script setup>
import f1 from './src/f1.js?raw';
</script>

<run-script :code="f1"></run-script>