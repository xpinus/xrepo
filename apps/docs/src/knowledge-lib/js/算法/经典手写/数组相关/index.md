# 数组相关手写

<script setup>
import f1 from './f1.js?raw';
import f2 from './f2.js?raw';
import f3 from './f3.js?raw';
</script>

## 数组扁平化

<run-script :code="f1">
</run-script>

## 数组去重
> 两个属性相同的对象也认为是相同的

<run-script :code="f2">
</run-script>

## 数组打乱顺序

<run-script :code="f3">
</run-script>

> 为什么不用sort, 如`arr.sort((a, b) => Math.random() - 0.5)`
> 
> sort算法会导致程序不稳定，极端条件下可能不会打乱顺序