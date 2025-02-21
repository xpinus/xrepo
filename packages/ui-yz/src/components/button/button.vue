<script lang="ts" setup>
defineOptions({
	name: "YzButton",
});

const props = defineProps({
	type: {
		type: String,
		default: "default",
	},
});
</script>

<template>
	<div :class="`yz-button yz-button--${props.type}`">
    <slot name="prefix-icon"></slot>
		<slot></slot>
    <slot name="suffix-icon"></slot>
	</div>
</template>
