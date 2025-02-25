<script lang="ts" setup>
import { ElButton } from 'element-plus';

defineOptions({
    name: 'XButton',
});
</script>

<template>
    <div class="x-button">
        <el-button
            v-bind="$attrs"
            @click.stop
        >
            <template v-for="(_, slot) in $slots">
                <slot :name="slot" />
            </template>
        </el-button>
    </div>
</template>
