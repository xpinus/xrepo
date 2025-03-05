<script lang="ts" setup>
function to() {
    gsap.to('.box', { x: 200 }); // 在200-400间移动
}

function from() {
    gsap.from('.box', { x: -100, background: 'pink' });
}

function fromTo() {
    gsap.fromTo('.box', { x: -80, background: 'blue' }, { x: 80, background: 'green' });
}

function set() {
    gsap.set('.box', { x: -40, background: 'blue' });
}
</script>

<template>
    <div class="container">
        <div class="tween-operations">
            <x-button @click="to">to</x-button>
            <x-button @click="from">from</x-button>
            <x-button @click="fromTo">fromTo</x-button>
            <x-button @click="set">set</x-button>
        </div>
        <div class="box"></div>
    </div>
</template>

<style lang="less" scoped>
.container {
    width: 100%;
    height: 120px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tween-operations {
    display: flex;
    gap: 6px;
    margin-bottom: 10px;
}

.box {
    width: 80px;
    height: 80px;
    background-color: #00c918;
    border-radius: 8px;
}
</style>
