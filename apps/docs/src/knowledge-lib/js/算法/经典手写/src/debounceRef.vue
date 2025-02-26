<script setup>
import { ref, customRef } from 'vue';

function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
        let context = this;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}

function debounceRef(value, delay = 1000) {
    return customRef((track, trigger) => {
        let _value = value;

        const _debounce = debounce((val) => {
            _value = val;
            trigger();
        }, delay);

        return {
            get() {
                track();
                return _value;
            },
            set(val) {
                _debounce(val);
            },
        };
    });
}

const text = debounceRef('');
</script>

<template>
    <div class="container">
        <input
            v-model="text"
            type="text"
        />
        <p class="result">输入：{{ text }}</p>
    </div>
</template>

<style scoped>
.container {
    width: 80%;
    margin: 1em auto;
}
.result {
    color: #333;
}
.container input {
    width: 100%;
    height: 30px;
    border: 1px solid #333;
}
</style>
