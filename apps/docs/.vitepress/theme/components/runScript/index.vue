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
                        :code="props.code"
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
import 'highlight.js';

const props = defineProps({
    code: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: '',
    },
});

function runScript() {
    console.log('xx');
    window.eval(props.code);
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
