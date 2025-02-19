import { defineConfig } from 'vitepress';
import { generateSidebar, hash } from './utils';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Xrepo',
    description: '项目文档',
    srcDir: 'src',
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        // 右上头部导航栏
        nav: [
            { text: 'Home', link: '/' },
            // { text: '博客', link: '/knowledge-lib/blogs' },
            { text: '浏览器', link: '/knowledge-lib/browser' },
            { text: 'html&css', link: '/knowledge-lib/html&css' },
            { text: 'javascript', link: '/knowledge-lib/js/es6' },
            { text: '框架', link: '/knowledge-lib/框架' },
            { text: '工程化', link: '/knowledge-lib/engineering' },
            { text: '后端', link: '/knowledge-lib/backend' },
            { text: 'AI', link: '/knowledge-lib/AI' },
            { text: '大前端', link: '/knowledge-lib/大前端/' },
            { text: '组件库', link: '/components/button' },
        ],
        // 左侧边栏
        sidebar: generateSidebar([
            {
                text: '组件',
                path: 'components/',
            },
            {
                text: '博客',
                path: 'knowledge-lib/blogs',
            },
            {
                text: '浏览器',
                path: 'knowledge-lib/browser',
            },
            {
                text: 'HTML & CSS',
                path: 'knowledge-lib/html&css',
            },
            {
                text: 'JavaScript',
                path: 'knowledge-lib/js',
            },
            {
                text: '框架',
                path: 'knowledge-lib/框架',
            },
            {
                text: '工程化',
                path: 'knowledge-lib/engineering',
            },
            {
                text: '后端',
                path: 'knowledge-lib/backend',
            },
            {
                text: 'AI',
                path: 'knowledge-lib/AI',
            },
            {
                text: '大前端',
                path: 'knowledge-lib/大前端',
            },
        ]),

        socialLinks: [{ icon: 'github', link: 'https://github.com/xpinus/xrepo' }],
    },
    ignoreDeadLinks: true,
    vite: {
        server: {
            port: 4000,
        },
    },
});
