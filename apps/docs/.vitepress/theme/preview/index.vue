<template>
    <div class="preview-wrapper">
        <div class="preview_box">
            <slot />
        </div>
        <div class="code_box">
            <div
                class="code"
                :class="{ show_code: showCode }"
            >
                <div class="code__reference">
                    <div class="code_content">
                        <highlightjs
                            autodetect
                            :code="sourceCode"
                        />
                    </div>
                </div>
            </div>
            <div
                class="operate_btn"
                @click="showCode = !showCode"
            >
                {{ showCode ? '隐藏' : '显示' }}代码
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import 'highlight.js';

const props = defineProps({
    codePath: {
        type: String,
        default: '',
    },
    show: {
        type: Boolean,
        default: false,
    },
});

onMounted(() => {
    loadSourceCode();
});

const showCode = ref(props.show);
const sourceCode = ref('');

async function loadSourceCode() {
    const data = await import(`../../../src/${props.codePath}?raw`);
    sourceCode.value = data.default;
}
</script>

<style scoped>
.preview-wrapper {
    margin: 20px 0;
    border: 1px solid #efefef;
    border-radius: 6px;
    overflow: hidden;
}
.preview_box {
    padding: 20px;
}
.operate_btn {
    position: relative;
    height: 46px;
    line-height: 46px;
    color: #666;
    text-align: center;
    background: #f7f7f7;
    cursor: pointer;
    z-index: 100;
}
.operate_btn:hover {
    background: #f2f2f2;
}
.code {
    border-top: 1px solid #efefef;
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease;
}
.code .code__reference {
    overflow: hidden;
}
.show_code {
    grid-template-rows: 1fr;
}
</style>
