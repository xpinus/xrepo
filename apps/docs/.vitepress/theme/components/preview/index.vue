<template>
    <div class="preview-wrapper">
        <div class="preview_box">
            <ClientOnly>
                <slot />
            </ClientOnly>
        </div>
        <div class="code_box">
            <div
                class="operate_btn"
                @click="showCode = !showCode"
            >
                {{ showCode ? '隐藏' : '显示' }}代码
            </div>
            <div
                class="code"
                :class="{ show_code: showCode }"
            >
                <div class="code__reference">
                    <div class="code_content">
                        <ClientOnly>
                            <x-highlight :code="props.code" />
                        </ClientOnly>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    code: {
        type: String,
        default: '',
    },
    show: {
        type: Boolean,
        default: false,
    },
});

const showCode = ref(props.show);
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
    z-index: 1;
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
