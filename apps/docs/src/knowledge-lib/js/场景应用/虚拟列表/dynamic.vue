<script setup>
import { ref, computed, useTemplateRef, onMounted, onUpdated, nextTick } from 'vue';
import { faker } from '@faker-js/faker';

const data = new Array(1000).fill(0).map((_, i) => faker.lorem.sentences());

const container = useTemplateRef('container');
const phantom = useTemplateRef('phantom');
const content = useTemplateRef('content');
const items = ref([]); // 需要 v3.5 及以上版本

const containerSize = ref(0); // 容器高度
const startIndex = ref(0); // 要渲染的起始索引
const endIndex = ref(0); // 要渲染的结束索引：奴要用computed,因为有时startIndex不变但item实际高度变化

let positions = []; // 每个元素的位置信息
onMounted(() => {
    containerSize.value = container.value.clientHeight;
    initPositions();
    endIndex.value = getEndIndex();
    createObserver();
});

onUpdated(() => {
    nextTick(() => {
        if (!items.value || !items.value.length) return;

        // 1. 更新列表项高度
        updatePositions();
        // 2. 更新虚拟列表的高度
        phantom.value.style.height = positions[positions.length - 1].end + 'px';
        // 3. 更新偏移量
        updateOffset();
        // 4. 观察已渲染的列表项
        observeItems();
    });
});

function initPositions() {
    positions = data.map((item, index) => {
        return {
            index,
            size: 100,
            start: index * 100,
            end: (index + 1) * 100,
        };
    });
}

function updatePositions() {
    for (let i = 0; i < items.value.length; i++) {
        const node = items.value[0];
        const index = startIndex.value + i;
        // 获取列表项实际的高度
        let height = node.getBoundingClientRect().height;
        // 计算预估高度和真实高度的差值
        let oldHeight = positions[index].height; // 拿到该项的预估高度
        let dValue = oldHeight - height;
        if (dValue) {
            // 如果存在差值，那么就需要更新位置信息
            positions[index].bottom -= dValue;
            positions[index].height = height;
            // 接下来需要更新后续所有列表项的位置
            for (let i = index + 1; i < positions.length; i++) {
                positions[i].top = positions[i - 1].bottom;
                positions[i].bottom -= dValue;
            }
        }
    }
}

let enterSectionObserver = null;
function createObserver() {
    enterSectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startIndex.value = getStartIndex();
                    endIndex.value = getEndIndex();
                    updateOffset();
                }
            });
        },
        {
            root: container.value, // 交叉时，用作边界盒的元素
            rootMargin: '0px', // 计算交叉时添加到根边界盒的矩形偏移量，可以有效的缩小或扩大根的判定范围从而满足计算需要
            threshold: 0.1, // 阈值都是监听对象的交叉区域与边界区域的比率
        },
    );
}

function observeItems() {
    items.value.forEach((item) => {
        enterSectionObserver.observe(item);
    });
}

function getStartIndex() {
    const scrollTop = container.value.scrollTop;

    // positions中的位置必然是有序递增的，因此采用二分查找
    let start = 0;
    let end = positions.length - 1;
    let tempIndex = null;
    while (start <= end) {
        const middle = Math.floor((start + end) / 2);
        const middleValue = positions[middle].end; // 必须让第一个元素之前没有空白，如果看start不能处理元素一般在边界的情况
        if (middleValue < scrollTop) {
            start = middle + 1;
        } else if (middleValue > scrollTop) {
            if (tempIndex === null || tempIndex > middle) {
                tempIndex = middle;
            }
            end = end - 1;
        } else {
            return middle + 1;
        }
    }

    console.log(tempIndex);

    return tempIndex;
}

function getEndIndex() {
    let endIndex = startIndex.value;
    let size = 0;
    while (containerSize.value && size <= containerSize.value) {
        // 累加计算要渲染的结束索引
        size += positions[endIndex].size;
        endIndex++;
    }

    return Math.min(endIndex + (endIndex - startIndex.value), positions.length);
}

function updateOffset() {
    let offset = 0;
    if (startIndex.value > 0) {
        // todo 有缓冲区时用来截掉缓冲区的高度
        let size = positions[startIndex.value].start - (positions[startIndex.value] ? positions[startIndex.value].start : 0);

        offset = positions[startIndex.value - 1].end - size;
    } else {
        // 此时当前列表项是第一个列表项
        offset = 0;
    }

    // 设置偏移量
    content.value.style.transform = `translate3d(0, ${offset}px, 0)`; // translate3d 触发 GPU 加速：translate 可能使用 CPU 渲染：
}
</script>

<template>
    <div
        ref="container"
        class="infinite-list-container"
    >
        <div
            ref="phantom"
            class="infinite-list-phantom"
        ></div>
        <div
            ref="content"
            class="infinite-list-content"
        >
            <div
                ref="items"
                class="infinite-list-item"
                v-for="item in data.slice(startIndex, endIndex)"
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
