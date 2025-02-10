<script setup>
import { performChunk } from './performChunk';
const datas = new Array(100000).fill(0).map((_, i) => i);

function add() {
    const list = document.getElementById('list');
    performChunk(
        datas,
        (data, i) => {
            const li = document.createElement('li');
            li.innerHTML = datas[i];
            list.appendChild(li);
        },
        (task) => {
            setTimeout(() => {
                const now = performance.now();
                task(() => performance.now() - now < 10);
            }, 2000);
        },
    );
}
</script>

<template>
    <x-button @click="add">追加元素</x-button>
    <ul id="list"></ul>
</template>

<style scoped>
#list {
    max-height: 800px;
    overflow: scroll;
}
</style>
