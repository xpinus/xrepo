<script lang="ts" setup>
import 'element-plus/dist/index.css';
import MyForm from './MyForm.vue';
import renderDialog from './renderDialog.js';

function open() {
    const { close, instance } = renderDialog(
        MyForm,
        {},
        {
            title: '命令式弹窗',
            width: '500',
        },
    );
}
</script>

<template>
    <div class="container">
        <x-button @click="open">打开</x-button>
    </div>
</template>

<style lang="less" scoped></style>
