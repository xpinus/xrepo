# FLIP
> 一种实现动画的思想

- First: 记录元素的初始位置
- Last: 记录元素的最终位置
- Inver: 记录元素的反向位置
- Play: 记录元素的当前位置

<script setup>
import flip from './flip.vue';
import flipCode from './flip.vue?raw';
</script>

<preview :code="flipCode">
  <flip />
</preview>