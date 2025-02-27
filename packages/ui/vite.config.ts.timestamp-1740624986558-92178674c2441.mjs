// vite.config.ts
import { defineConfig } from "file:///D:/project/_myself/xrepo/node_modules/.pnpm/vite@5.4.11_@types+node@22.10.5_less@4.2.1_sass-embedded@1.85.0/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/project/_myself/xrepo/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vite@5.4.11_vue@3.5.13/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import dts from "file:///D:/project/_myself/xrepo/node_modules/.pnpm/vite-plugin-dts@4.5.0_@types+node@22.10.5_typescript@5.6.3_vite@5.4.11/node_modules/vite-plugin-dts/dist/index.mjs";
import vueJsx from "file:///D:/project/_myself/xrepo/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.1.1_vite@5.4.11_vue@3.5.13/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import ElementPlus from "file:///D:/project/_myself/xrepo/node_modules/.pnpm/unplugin-element-plus@0.9.1/node_modules/unplugin-element-plus/dist/vite.js";
var __vite_injected_original_dirname = "D:\\project\\_myself\\xrepo\\packages\\ui";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: "src/index.ts"
    },
    rollupOptions: {
      external: ["vue", /\.less/, /^element-plus/],
      output: [
        {
          format: "es",
          //打包后文件名
          entryFileNames: "[name].mjs",
          //让打包目录和我们目录对应
          preserveModules: true,
          preserveModulesRoot: "./",
          exports: "named",
          //配置打包根目录
          dir: "dist/es"
        },
        {
          format: "umd",
          name: "xui",
          entryFileNames: "[name].js",
          exports: "named",
          dir: "dist/umd"
        }
      ]
    },
    emptyOutDir: false
  },
  plugins: [
    ElementPlus({
      // 导入scss而不是css
      useSource: false
    }),
    vue(),
    vueJsx(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: false,
      tsconfigPath: "./tsconfig.json",
      outDir: "dist/types"
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXF9teXNlbGZcXFxceHJlcG9cXFxccGFja2FnZXNcXFxcdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHByb2plY3RcXFxcX215c2VsZlxcXFx4cmVwb1xcXFxwYWNrYWdlc1xcXFx1aVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcHJvamVjdC9fbXlzZWxmL3hyZXBvL3BhY2thZ2VzL3VpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4JztcclxuXHJcbi8qIGVsZW1lbnQtcGx1c1x1NjMwOVx1OTcwMFx1NUYxNVx1NTE2NSAqL1xyXG5pbXBvcnQgRWxlbWVudFBsdXMgZnJvbSAndW5wbHVnaW4tZWxlbWVudC1wbHVzL3ZpdGUnO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICBidWlsZDoge1xyXG4gICAgICAgIGxpYjoge1xyXG4gICAgICAgICAgICBlbnRyeTogJ3NyYy9pbmRleC50cycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGV4dGVybmFsOiBbJ3Z1ZScsIC9cXC5sZXNzLywgL15lbGVtZW50LXBsdXMvXSxcclxuICAgICAgICAgICAgb3V0cHV0OiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAnZXMnLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vXHU2MjUzXHU1MzA1XHU1NDBFXHU2NTg3XHU0RUY2XHU1NDBEXHJcbiAgICAgICAgICAgICAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdbbmFtZV0ubWpzJyxcclxuICAgICAgICAgICAgICAgICAgICAvL1x1OEJBOVx1NjI1M1x1NTMwNVx1NzZFRVx1NUY1NVx1NTQ4Q1x1NjIxMVx1NEVFQ1x1NzZFRVx1NUY1NVx1NUJGOVx1NUU5NFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXNlcnZlTW9kdWxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwcmVzZXJ2ZU1vZHVsZXNSb290OiAnLi8nLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydHM6ICduYW1lZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9cdTkxNERcdTdGNkVcdTYyNTNcdTUzMDVcdTY4MzlcdTc2RUVcdTVGNTVcclxuICAgICAgICAgICAgICAgICAgICBkaXI6ICdkaXN0L2VzJyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAndW1kJyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAneHVpJyxcclxuICAgICAgICAgICAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ1tuYW1lXS5qcycsXHJcbiAgICAgICAgICAgICAgICAgICAgZXhwb3J0czogJ25hbWVkJyxcclxuICAgICAgICAgICAgICAgICAgICBkaXI6ICdkaXN0L3VtZCcsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW1wdHlPdXREaXI6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgICBFbGVtZW50UGx1cyh7XHJcbiAgICAgICAgICAgIC8vIFx1NUJGQ1x1NTE2NXNjc3NcdTgwMENcdTRFMERcdTY2MkZjc3NcclxuICAgICAgICAgICAgdXNlU291cmNlOiBmYWxzZSxcclxuICAgICAgICB9KSxcclxuICAgICAgICB2dWUoKSBhcyBhbnksXHJcbiAgICAgICAgdnVlSnN4KCksXHJcbiAgICAgICAgZHRzKHtcclxuICAgICAgICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcclxuICAgICAgICAgICAgY29weUR0c0ZpbGVzOiBmYWxzZSxcclxuICAgICAgICAgICAgdHNjb25maWdQYXRoOiAnLi90c2NvbmZpZy5qc29uJyxcclxuICAgICAgICAgICAgb3V0RGlyOiAnZGlzdC90eXBlcycsXHJcbiAgICAgICAgfSksXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBTLFNBQVMsb0JBQW9CO0FBQ3ZVLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFDakIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUduQixPQUFPLGlCQUFpQjtBQVB4QixJQUFNLG1DQUFtQztBQVV6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixPQUFPO0FBQUEsSUFDSCxLQUFLO0FBQUEsTUFDRCxPQUFPO0FBQUEsSUFDWDtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ1gsVUFBVSxDQUFDLE9BQU8sVUFBVSxlQUFlO0FBQUEsTUFDM0MsUUFBUTtBQUFBLFFBQ0o7QUFBQSxVQUNJLFFBQVE7QUFBQTtBQUFBLFVBRVIsZ0JBQWdCO0FBQUE7QUFBQSxVQUVoQixpQkFBaUI7QUFBQSxVQUNqQixxQkFBcUI7QUFBQSxVQUNyQixTQUFTO0FBQUE7QUFBQSxVQUVULEtBQUs7QUFBQSxRQUNUO0FBQUEsUUFDQTtBQUFBLFVBQ0ksUUFBUTtBQUFBLFVBQ1IsTUFBTTtBQUFBLFVBQ04sZ0JBQWdCO0FBQUEsVUFDaEIsU0FBUztBQUFBLFVBQ1QsS0FBSztBQUFBLFFBQ1Q7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLElBQ0EsYUFBYTtBQUFBLEVBQ2pCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxZQUFZO0FBQUE7QUFBQSxNQUVSLFdBQVc7QUFBQSxJQUNmLENBQUM7QUFBQSxJQUNELElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNBLGtCQUFrQjtBQUFBLE1BQ2xCLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLFFBQVE7QUFBQSxJQUNaLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDeEM7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
