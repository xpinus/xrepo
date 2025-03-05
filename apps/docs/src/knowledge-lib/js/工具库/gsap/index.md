---
head:
  - - script
    - src: https://cdn.bootcdn.net/ajax/libs/gsap/3.12.5/gsap.min.js
---
# GSAP

https://gsap.framer.wiki/

GSAP是前端业内非常有名的一个动效库，有大量的优秀的网站都在使用它。它不仅能在原生JS的环境下使用，也能配合各种当前流行的框架进行使用。

通过使用它，非常多原本实现起来很有难度的交互动画效果，都能快速高效的实现。

<script setup>
import d1 from './src/d1.vue'
import d1Code from './src/d1.vue?raw'
</script>

## 基础
> Tween（补间动画是一种动画的类型，就是我们常见的两个状态之间的变化的动画方式，中间的变化过程都是计算机计算出来的，比如我们常见的匀速、缓入缓出动画就是Tween类型的动画。

<preview name="简单的tween动画" :code="d1Code">
<d1 />
</preview>

**动画方法 Methods**
- to：就是让元素从当前状态变化到目标状态
- from：有点像to方法的逆向变化，就是让元素从目标状态变化到当前状态
- fromTo： 需要自己定义两个状态的数据，然后从前一个变化到后一个
- set：直接设置成想要的状态，没有任何过度与动画效果。本质上就是duration为0的 .to 方法

**目标元素（们）target**

GSAP在底层实际上是使用了document.querySelector( )去选择元素，所以你可以用任何css选择器进行元素的选择。或者你也可以直接传入一个DOM元素或者一个数组

**变化数据对象（variables）**

设置任意的你想要发生变化的属性和值，或者一些特殊的会影响动画过程的一些属性，比如duration（动画时长），onComplete（动画完成时触发事件）或者repeat（动画重复的次数）

> 什么属性是可以变化的？

GSAP基本上可以说是什么都能变：它没有一个清单规定什么能变，什么不能变。包括像CSS属性、自定义的对象属性，甚至CSS变量和复杂的字符串都可以！我们最常变化的属性其实是transform和opacity。

