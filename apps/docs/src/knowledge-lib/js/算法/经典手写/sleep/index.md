# 实现sleep(1000)函数

<script setup>
import f1 from './f1.js?raw';
import f2 from './f2.js?raw';
</script>

<run-script name="基于promise" :code="f1"></run-script>

<run-script name="基于Date.now()" :code="f2"></run-script>