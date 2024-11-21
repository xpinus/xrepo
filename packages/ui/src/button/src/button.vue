<script lang="ts" setup>
defineOptions({
  name: 'x-button'
})

const props = defineProps({
  type: {
    type: String,
    default: 'primary'
  }
})
</script>

<template>
  <button class="x-button" :data-type="props.type">
    <slot></slot>
  </button>
</template>
