// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';

import XUI from '@xrepo/ui';
import '@xrepo/ui/dist/style.css';

import 'highlight.js/styles/base16/summerfruit-light.css'; // 主题
import hljsVuePlugin from '@highlightjs/vue-plugin';
// import RelationGraph from 'relation-graph/vue3';

import PhotoSwipe from './components/PhotoSwipe.vue';
import Preview from './components/preview/index.vue';
import RunScript from './components/runScript/index.vue';

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
            'layout-bottom': () => h(PhotoSwipe),
        });
    },
    enhanceApp({ app, router, siteData }) {
        // ...
        app.use(XUI);
        // app.component('x-button', Button);
        app.component('preview', Preview); // 注册预览功能的组件
        app.component('runScript', RunScript);
        app.use(hljsVuePlugin);
        // app.use(RelationGraph);  // ssr有问题
    },
} satisfies Theme;
