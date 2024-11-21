import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      dts({
        insertTypesEntry: true,
        copyDtsFiles: false
      })
  ],
  // 配置别名
  resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
  },
  build: {
    lib: {
      entry: 'index.ts',
      formats: ['es']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: ['vue'],
      // output: {
      //   // Provide global variables to use in the UMD build
      //   // add the external deps here
      //   globals: {
      //     vue: 'Vue'
      //   }
      // }
    }
  }
})
