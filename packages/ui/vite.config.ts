import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
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
