<template>
    <div class="run-script-wrapper">
        <p
            class="name"
            v-if="props.name"
        >
            {{ props.name }}
        </p>
        <div class="view">
            <iframe :src="props.src" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    src: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: '',
    },
});
</script>

<style scoped>
.run-script-wrapper {
    margin: 20px 0;
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
</style>
