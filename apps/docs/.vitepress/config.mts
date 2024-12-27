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
            {
                text: '知识库',
                items: [
                    { text: '博客', link: '/knowledge-lib/blogs' },
                    { text: '浏览器', link: '/knowledge-lib/browser' },
                    { text: 'html&css', link: '/knowledge-lib/html&css' },
                    { text: 'javascript', link: '/knowledge-lib/js/es6' },
                    { text: '工程化', link: '/knowledge-lib/engineering' },
                ],
            },
            { text: '组件', link: '/components/button' },
        ],

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
                text: '工程化',
                path: 'knowledge-lib/engineering',
            },
        ]),

        socialLinks: [{ icon: 'github', link: 'https://github.com/xpinus/xrepo' }],
    },
});
