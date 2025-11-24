import { defineConfig } from 'vitepress';
import { generateSidebar, hash } from './utils';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import { XrepoUIResolver } from '@xrepo/utils';

const nav = [
    // { text: '博客', link: '/knowledge-lib/blogs' },
    { text: '浏览器', link: '/knowledge-lib/browser' },
    { text: 'html&css', link: '/knowledge-lib/html&css' },
    {
        text: 'javascript',
        items: [
            { text: 'jsAPI', link: '/knowledge-lib/js/jsAPI' },
            { text: 'js机制', link: '/knowledge-lib/js/js机制' },
            { text: 'typescript', link: '/knowledge-lib/js/typescript' },
            { text: 'node', link: '/knowledge-lib/js/nodejs' },
            { text: '算法', link: '/knowledge-lib/js/算法' },
            { text: '设计模式', link: '/knowledge-lib/js/设计模式' },
            { text: '工具库', link: '/knowledge-lib/js/工具库' },
            { text: '场景应用', link: '/knowledge-lib/js/场景应用' },
        ],
    },
    {
        text: '框架',
        items: [
            { text: 'vue', link: '/knowledge-lib/框架/vue' },
            { text: 'react', link: '/knowledge-lib/框架/react' },
            { text: 'jquery', link: '/knowledge-lib/框架/jquery' },
        ],
    },
    {
        text: '工程化',
        items: [
            { text: '开发', link: '/knowledge-lib/engineering/开发' },
            { text: '构建', link: '/knowledge-lib/engineering/构建' },
            { text: '测试', link: '/knowledge-lib/engineering/测试' },
            { text: 'CICD', link: '/knowledge-lib/engineering/CICD' },
        ],
    },
    { text: '后端', link: '/knowledge-lib/backend' },
    { text: 'AI', link: '/knowledge-lib/AI' },
    { text: '大前端', link: '/knowledge-lib/大前端/' },
    { text: '组件库', link: '/components/' },
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Xrepo',
    description: '项目文档',
    srcDir: 'src',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        // ['script', { src: 'https://cdn.bootcdn.net/ajax/libs/vue/3.5.13/vue.global.prod.min.js' }],
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        // 右上头部导航栏
        nav: [{ text: 'Home', link: '/' }, ...nav],
        // 左侧边栏
        sidebar: generateSidebar(nav),

        socialLinks: [{ icon: 'github', link: 'https://github.com/xpinus/xrepo' }],
        footer: {
            message:
                '<a href="https://beian.miit.gov.cn/">苏ICP备2025160170号-1</a> | 前端进化之路 | Released under the MIT License.',
            copyright: 'Copyright © 2024-present xpinus',
        },
    },
    ignoreDeadLinks: true,
    sitemap: {
        hostname: 'https://xrepo.top',
    },
    vite: {
        // build: {
        //     rollupOptions: {
        //         external: ['vue'],
        //         output: {
        //             globals: {
        //                 vue: 'Vue',
        //             },
        //         },
        //     },
        // },
        plugins: [
            Components({
                resolvers: [XrepoUIResolver()],
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '../src'),
            },
        },
        server: {
            port: 4000,
        },
        ssr: {
            noExternal: ['element-plus'],
        },
    },
});
