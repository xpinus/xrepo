<script lang="ts" setup>
import { onMounted, reactive, nextTick } from 'vue';
import 'photoswipe/style.css';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import $ from 'jquery';

const photo = reactive({
    src: '',
    width: 0,
    height: 0,
});

onMounted(() => {
    const lightbox = new PhotoSwipeLightbox({
        gallery: '#gallery--getting-started',
        children: 'a',
        showHideAnimationType: 'fade',
        pswpModule: () => import('photoswipe'),
        bgOpacity: 0.5,
    });
    lightbox.init();

    $(document).on('click', 'main.main img', function () {
        const image = new Image();
        image.onload = () => {
            photo.width = image.naturalWidth;
            photo.height = image.naturalHeight;
            nextTick(() => {
                $('#trigger').click();
            });
        };
        photo.src = $(this).attr('src');
        image.src = photo.src;
    });

    // });
});
</script>

<template>
    <div
        class="pswp-gallery pswp-gallery--single-column"
        id="gallery--getting-started"
    >
        <a
            :href="photo.src"
            target="_blank"
            :data-pswp-width="photo.width"
            :data-pswp-height="photo.height"
        >
            <img
                id="trigger"
                :src="photo.src"
                alt=""
            />
        </a>
    </div>
</template>

<style>
.VPDoc img:hover {
    cursor: url(/pre.ico), zoom-in;
}

#gallery--getting-started {
    display: none;
}
</style>
