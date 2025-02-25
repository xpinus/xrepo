## 防抖
> 仅执行一段时间内的最后一次操作

<run-script name='普通的js防抖'  :code="debounce"></run-script>

**vue3中使用自定义ref实现防抖** 

<script setup>
import demo from './debounceRef.vue';
import demoCode from './debounceRef.vue?raw';
import debounce from './debounce.js?raw';
import throttle from './throttle.js?raw';
</script>

<preview :code="demoCode">
  <demo />
</preview>

## 节流
> 防抖动和节流本质是不一样的。防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行

<run-script  :code="throttle"></run-script>

