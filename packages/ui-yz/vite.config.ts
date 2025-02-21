import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import dts from 'vite-plugin-dts';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vite.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
        },
        rollupOptions: {
            external: ['vue', /\.less/, 'element-plus'],
            output: [
                {
                    format: 'es',
                    //打包后文件名
                    entryFileNames: '[name].mjs',
                    //让打包目录和我们目录对应
                    preserveModules: true,
                    preserveModulesRoot: './',
                    exports: 'named',
                    //配置打包根目录
                    dir: 'dist/es',
                },
                {
                    format: 'umd',
                    name: 'yzui',
                    entryFileNames: '[name].js',
                    exports: 'named',
                    dir: 'dist/umd',
                },
            ],
        },
        emptyOutDir: false,
    },
    plugins: [
        // ElementPlus({}),
        vue() as any,
        vueJsx(),
        dts({
            insertTypesEntry: true,
            copyDtsFiles: false,
            tsconfigPath: './tsconfig.json',
            outDir: 'dist/types',
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
