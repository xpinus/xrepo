<script lang="ts" setup>
import 'vidstack/bundle';

defineOptions({
    name: 'XMedia',
});
</script>

<template>
    <media-player
        title="Sprite Fight"
        src="https://files.vidstack.io/sprite-fight/720p.mp4"
    >
        <media-provider></media-provider>
    </media-player>
</template>
