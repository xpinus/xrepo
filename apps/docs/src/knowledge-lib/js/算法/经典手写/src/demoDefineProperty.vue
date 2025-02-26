<script setup>
import { onMounted, ref } from 'vue';

const data = {
    text: 1,
};
const input = ref();
Object.defineProperty(data, 'text', {
    set(value) {
        input.value.value = value;
        this.value = value;
    },
    get() {
        return this.value;
    },
});

onMounted(() => {
    input.value.addEventListener('change', function (e) {
        data.text = e.target.value;
    });
});

function clear() {
    data.text = '';
}
</script>

<template>
    <input ref="input" />
    <x-button @click="clear">清空</x-button>
</template>

<style scoped>
input {
    color: #1a1d24;
    border: 1px solid #292d35;
    margin-right: 20px;
}
</style>
