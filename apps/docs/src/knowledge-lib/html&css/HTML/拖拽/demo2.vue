<script setup>
import { ref } from 'vue';

const dragArea = ref();

function onDragOver(e) {
    console.log(e);
    e.preventDefault();
}

function onDrop(e) {
    const file = e.dataTransfer.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function () {
        console.log('读取文件完成');
        console.log(fileReader.result);
        const img = new Image();
        img.src = fileReader.result;
        dragArea.value.appendChild(img);
    };
}

document.ondrop = function (e) {
    e.preventDefault();
};
document.ondragover = function (e) {
    e.preventDefault();
};
</script>

<template>
    <div class="container">
        <h1>拖放API的扩展知识</h1>
        <h3>请拖动您的照片到下方方框区域</h3>
        <div
            ref="dragArea"
            id="drag-area"
            @dragover="onDragOver"
            @drop="onDrop"
        ></div>
    </div>
</template>

<style scoped>
.container {
    text-align: center;
}

h* {
    user-select: none;
}

#drag-area {
    border: 1px solid #aaa;
    border-radius: 3px;
    padding: 10px;
    margin: 10px;
    min-height: 400px;
}
</style>
