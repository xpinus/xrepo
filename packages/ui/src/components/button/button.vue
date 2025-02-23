<script lang="ts" setup>
import { ElButton } from 'element-plus';

console.log(ElButton);

defineOptions({
    name: 'XButton',
});
</script>

<template>
    <div class="x-button">
        <el-button v-bind="$attrs">
            <template v-for="(_, slot) in $slots">
                <slot :name="slot" />
            </template>
        </el-button>
    </div>
</template>
