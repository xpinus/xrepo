import { defineConfig } from 'vitepress';
import { generateSidebar } from './utils';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Xrepo',
    description: '项目文档',
    srcDir: 'src',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Examples', link: '/markdown-examples' },
            { text: '组件', link: '/components/button' },
            { text: '博客', link: '/blogs' },
            { text: '面经', link: '/interview-experience' },
        ],

        sidebar: generateSidebar(),

        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
    },
});
