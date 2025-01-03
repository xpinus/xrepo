<script setup>
import { ref, reactive } from 'vue';

let cat = ref();
let catPosition = reactive({
    left: 0,
    top: 0,
});
let rawLeft = 0;
let rawTop = 0;
let offsetX = 0; // 记录拖拽过程中的偏移
let offsetY = 0;

function onDragStart(e) {
    offsetX = e.pageX;
    offsetY = e.pageY;
    rawTop = catPosition.top;
    rawLeft = catPosition.left;
    console.log('cat开始移动');
}

function onDrag(e) {
    let x = e.pageX;
    let y = e.pageY;
    if (x === 0 && y === 0) {
        //不处理最后一刻x,y都为0 的情景
        return;
    }
    x -= offsetX;
    y -= offsetY;
    catPosition.left = rawLeft + x;
    catPosition.top = rawTop + y;
}

function onDragEnd(e) {
    console.log('cat源对象拖动结束');
}
</script>

<template>
    <div class="container">
        <h3>随着鼠标拖动而移动的小猫咪</h3>
        <div
            class="target"
            ref="cat"
            :style="{
                left: catPosition.left + 'px',
                top: catPosition.top + 'px',
            }"
            draggable="true"
            @dragstart="onDragStart"
            @drag="onDrag"
            @dragend="onDragEnd"
        ></div>
    </div>
</template>

<style scoped>
h3 {
    user-select: none;
}
.container {
    margin: 10px auto;
    width: 100%;
    height: 400px;
    position: relative;
}

.target {
    position: absolute;
    width: 120px;
    height: 120px;
    background: url('https://pic2.zhimg.com/v2-9d3619857f65f66fe0163f84481b0d38_r.jpg?source=1940ef5c') no-repeat center / 100%;
}
</style>
