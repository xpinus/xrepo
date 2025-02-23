// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';

import XUi from '../../../src/index';
import '../../../src/style.less';

import 'highlight.js/styles/base16/summerfruit-light.css'; // 主题
import hljsVuePlugin from '@highlightjs/vue-plugin';
import Preview from './preview/index.vue';

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        });
    },
    enhanceApp({ app, router, siteData }) {
        // ...
        app.component('preview', Preview); // 注册预览功能的组件
        app.use(hljsVuePlugin);
        app.use(XUi);
    },
} satisfies Theme;
