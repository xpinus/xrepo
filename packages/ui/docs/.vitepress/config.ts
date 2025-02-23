import { defineConfig } from 'vitepress'
import { getComponentsMenu } from './utils'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "云舟UI",
  description: "云舟通用组件库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: getComponentsMenu(),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
