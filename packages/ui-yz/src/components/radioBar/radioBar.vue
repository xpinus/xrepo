<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { ElRadioGroup, ElRadioButton } from 'element-plus';

defineOptions({
    name: 'YzRadioBar',
});

type ItemType = {
    label: string;
    value: string;
};

const props = defineProps<{
    items: ItemType[];
}>();
const emits = defineEmits(['change']);

const modelValue = defineModel();
const current = ref();

watch(current, (val) => {
    const value = props.items.find((item: ItemType) => item.label === val)?.value;
    modelValue.value = value;
    emits('change', value);
});

onMounted(() => {
    current.value = props.items.find((item: ItemType) => item.value === modelValue.value)?.label;
});
</script>

<template>
    <el-radio-group
        v-model="current"
        class="yz-radio-bar"
    >
        <!-- value 属性在element-plus 2.6.0后才支持-->
        <el-radio-button
            v-for="item in props.items"
            :key="item.value"
            :label="item.label"
        />
    </el-radio-group>
</template>
