<template>
    <div class="run-script-wrapper">
        <p
            class="name"
            v-if="props.name"
        >
            {{ props.name }}
        </p>
        <div class="code">
            <div class="code__reference">
                <div class="code_content">
                    <highlightjs
                        autodetect
                        :code="sourceCode"
                    />
                </div>
            </div>
        </div>
        <div class="run-script">
            <x-button @click="runScript">执行</x-button>
            <p class="run-tip">点击执行，可以在控制台中查看可能的执行结果</p>
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
    name: {
        type: String,
        default: '',
    },
});

const sourceCode = ref('');

onMounted(() => {
    loadSourceCode();
});

async function loadSourceCode() {
    console.log(props.codePath);
    const data = await import(`@/${props.codePath}?raw`);
    sourceCode.value = data.default;
}

function runScript() {
    window.eval(sourceCode.value);
}
</script>

<style scoped>
.run-script-wrapper {
    margin: 20px 0;

    overflow: hidden;
}
.code {
    border: 1px solid #efefef;
    border-radius: 4px 4px 0 0;
}
.code .code__reference {
    overflow: hidden;
}

.name {
    font-size: 18px;
    margin: 4px 0 10px 0;
    font-weight: 600;
    background: #eee;
    width: fit-content;
    padding: 0 8px;
    border-radius: 2px;
}

.run-tip {
    margin: 0;
    font-size: 12px;
    color: gray;
}

.run-script {
    border: 1px solid #efefef;
    border-top: none;
    border-radius: 4px 4px 0 0;
    padding: 10px;
    display: flex;
    gap: 10px;
}
</style>
