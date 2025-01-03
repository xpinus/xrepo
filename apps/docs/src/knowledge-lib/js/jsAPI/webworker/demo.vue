<script setup>
import { ref } from 'vue';

const worker = new Worker('/worker.js');

worker.addEventListener('message', (e) => {
    msg.value += '接收：' + e.data + '\n';
});

const send = ref('');
const msg = ref('');

function send2worker() {
    worker.postMessage(send.value);
    msg.value += '发送：' + send.value + '\n';
}
</script>

<template>
    <div class="example">
        <div>
            <input
                type="text"
                v-model="send"
            />
            <button @click="send2worker">发送</button>
        </div>
        <textarea
            placeholder="来自worker的信息"
            :value="msg"
        ></textarea>
    </div>
</template>

<style scoped>
.example {
    display: flex;
    flex-direction: column;
}
.example input {
    height: 32px;
    width: 200px;
    border-bottom: 1px solid #333;
}

.example button {
    width: 64px;
    height: 32px;
    border-radius: 4px;
    background: #4a7cfe;
    color: #fff;
    cursor: pointer;
}

.example textarea {
    height: 300px;
    margin-top: 10px;
}
</style>
