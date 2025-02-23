# 数组相关手写

## 数组扁平化

<run-script codePath="knowledge-lib/js/算法/经典手写/数组相关/f1.js">
</run-script>

## 数组去重
> 两个属性相同的对象也认为是相同的

<run-script codePath="knowledge-lib/js/算法/经典手写/数组相关/f2.js">
</run-script>

## 数组打乱顺序

<run-script codePath="knowledge-lib/js/算法/经典手写/数组相关/f3.js">
</run-script>

> 为什么不用sort, 如`arr.sort((a, b) => Math.random() - 0.5)`
> 
> sort算法会导致程序不稳定，极端条件下可能不会打乱顺序