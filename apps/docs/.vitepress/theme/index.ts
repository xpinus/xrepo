// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';

// import XUI from '@xrepo/ui'

import { Button } from '@xrepo/ui';
import '@xrepo/ui/dist/es/src/style/button.css';

import 'highlight.js/styles/base16/summerfruit-light.css'; // 主题
import Preview from './preview/index.vue';
import hljsVuePlugin from '@highlightjs/vue-plugin';

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        });
    },
    enhanceApp({ app, router, siteData }) {
        // ...
        // app.use(XUI);
        app.component('x-button', Button);
        app.component('preview', Preview); // 注册预览功能的组件
        app.use(hljsVuePlugin);
    },
} satisfies Theme;
