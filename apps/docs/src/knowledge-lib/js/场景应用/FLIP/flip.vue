<script setup>

function raf(callback) {
  requestAnimationFrame(
      () => requestAnimationFrame(callback())
  )
}

function play() {
  const el = document.getElementById('el');

  const getTop = () => {
    const { top } = el.getBoundingClientRect();
    return top
  }

  // F: 记录初始位置
  const fromTop = getTop();

  // T: 记录目标位置
  const list = document.getElementById('list');
  list.insertBefore(el, null); // 插入到list末尾
  const toTop = getTop();

  // I: 视觉上返回初始位置
  const distance = toTop - fromTop;
  el.style.transform = `translateY(-${distance}px)`;

  // P: 播放移动到目标位置的动画
  raf(() => {
    el.style.transition = 'transform .5s ease-in-out';
    el.style.removeProperty('transform');
  })

}
</script>

<template>
  <x-button @click="play">改变第一个元素位置</x-button>

  <ul id="list">
    <li id="el">1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
  </ul>
</template>

<style scoped lang="less">
ul {
  margin: 20px 0;
}

li {
  box-sizing: border-box;
  border-radius: 32px;
  height: 32px;
  width: 240px;
  padding: 0 12px;
  list-style: none;
  background: #a5eaa3;
  line-height: 32px;
}

#el {
  background: #f1f1f1;
}
</style>
