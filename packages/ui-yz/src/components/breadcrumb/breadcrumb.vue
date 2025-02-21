<script setup lang="ts">
defineOptions({
	name: "YzBreadcrumb",
});

type ItemType = {
	name: string;
	href?: string;
	cur?: boolean;
};

const props = defineProps<{
	items: ItemType[];
}>();
</script>

<template>
	<div class="yz-breadcrumb">
		<span class="yz-breadcrumb-item" v-for="(item, index) in props.items">
			<a
				class="yz-breadcrumb-item-name"
				:class="{ cur: item.cur, 'is-link': item.href }"
				:href="item.href || '#'"
				>{{ item.name }}</a
			>
			<span
				class="yz-breadcrumb-item-separator"
				v-if="index !== props.items.length - 1"
				>/</span
			>
		</span>
	</div>
</template>
