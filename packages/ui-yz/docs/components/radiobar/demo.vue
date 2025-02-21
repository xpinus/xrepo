<script setup>
const items = [
  {
    label: '类目一',
    value: 'cls1'
  },
  {
    label: '类目二',
    value: 'cls2'
  },
  {
    label: '类目三',
    value: 'cls3'
  },
]
</script>

<template>
  <yz-radio-bar :items="items" />
</template>
