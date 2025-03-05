<script lang="ts" setup>
import { useHighlight } from './useHighlight';

defineOptions({
    name: 'XHighlight',
});

const props = withDefaults(
    defineProps<{
        code: string;
        language?: string;
    }>(),
    {
        code: '',
    },
);

const { html } = useHighlight(props.code, props.language);
</script>

<template>
    <div class="x-highlight">
        <pre v-html="html"></pre>
    </div>
</template>
