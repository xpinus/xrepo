<script setup>
import { ref, computed } from 'vue';

const itemSize = 100;
const items = new Array(1000).fill(0).map((_, i) => i);

const startIndex = ref(0);
const visibleCount = ref(6);
const endIndex = ref(6);
const offset = ref(0);

function onScroll(e) {
    const scrollTop = e.target.scrollTop;
    startIndex.value = Math.floor(scrollTop / itemSize);
    endIndex.value = Math.min(startIndex.value + visibleCount.value, items.length);
    offset.value = startIndex.value * itemSize; //scrollTop - (scrollTop % itemSize);
}

const getTransform = computed(() => `translate3d(0, ${offset.value}px, 0)`); // translate3d 触发 GPU 加速：translate 可能使用 CPU 渲染：
</script>

<template>
    <div
        class="infinite-list-container"
        @scroll="onScroll"
    >
        <div
            class="infinite-list-phantom"
            :style="{ height: itemSize * items.length + 'px' }"
        ></div>
        <div
            class="infinite-list-content"
            :style="{ transform: getTransform }"
        >
            <div
                class="infinite-list-item"
                :style="{ height: itemSize + 'px' }"
                v-for="item in items.slice(startIndex, endIndex)"
            >
                {{ item }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.infinite-list-container {
    height: 400px;
    overflow: auto;
    position: relative;
}
.infinite-list-phantom {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
}
.infinite-list-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
.infinite-list-item {
    box-sizing: border-box;
    border: 1px solid #339af0cc;
}
</style>
