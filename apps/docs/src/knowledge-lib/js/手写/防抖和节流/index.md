## 防抖
> 仅执行一段时间内的最后一次操作

<run-script name='普通的js防抖'  codePath="knowledge-lib/js/手写/防抖和节流/debounce.js"></run-script>

**vue3中使用自定义ref实现防抖** 

<script setup>
import demo from './debounceRef.vue'
</script>

<preview codePath="knowledge-lib/js/手写/防抖和节流/debounceRef.vue">
  <demo />
</preview>

## 节流
> 防抖动和节流本质是不一样的。防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行

<run-script  codePath="knowledge-lib/js/手写/防抖和节流/throttle.js"></run-script>

