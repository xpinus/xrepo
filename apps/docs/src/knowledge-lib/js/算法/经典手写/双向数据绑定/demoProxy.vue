<script setup>
import { onMounted, ref } from 'vue';

const data = {
    text: 1,
};
const input = ref();
const dataProxy = new Proxy(data, {
    get: function (target, propkey) {
        console.log('get');
        return target[propkey];
    },
    set: (target, propkey, value) => {
        // input.value = value;
        if (target[propkey] !== value) {
            console.log(`监听到${propkey}变化啦,值变为:${value}`);
            target[propkey] = value;
            input.value.value = value;
        }

        return true;
    },
});

onMounted(() => {
    input.value.addEventListener('change', function (e) {
        dataProxy.text = e.target.value;
    });
});

function clear() {
    dataProxy.text = '';
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
