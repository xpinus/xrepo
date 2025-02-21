<script setup>
const items = [
  {
    name: '首页',
    href: 'www.baidu.com'
  },
  {
    name: '管理',
  },
  {
    name: '列表',
    cur: true
  },
]
</script>

<template>
  <yz-breadcrumb :items="items" />
</template>
