import { defineConfig } from 'vitepress';
import { generateSidebar, hash } from './utils';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Xrepo',
    description: '项目文档',
    srcDir: 'src',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: '组件', link: '/components/button' },
            { text: '博客', link: '/blogs' },
            {
                text: '面经',
                items: [
                    { text: '浏览器', link: '/interview-experience/browser' },
                    { text: 'html&css', link: '/interview-experience/html&css' },
                    { text: 'javascript', link: '/interview-experience/js' },
                    { text: '工程化', link: '/interview-experience/engineering' },
                ],
            },
        ],

        sidebar: generateSidebar([
            {
                text: '博客',
                path: 'blogs/',
            },
            {
                text: '组件',
                path: 'components/',
            },
            {
                text: '浏览器',
                path: 'interview-experience/browser',
            },
            {
                text: 'HTML & CSS',
                path: 'interview-experience/html&css',
            },
            {
                text: 'JavaScript',
                path: 'interview-experience/js',
            },
            {
                text: '工程化',
                path: 'interview-experience/engineering',
            },
        ]),

        socialLinks: [{ icon: 'github', link: 'https://github.com/xpinus/xrepo' }],
    },
});
