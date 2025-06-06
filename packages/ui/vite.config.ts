import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import dts from 'vite-plugin-dts';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { vite as vidstack } from 'vidstack/plugins';

/* element-plus按需引入 */
import ElementPlus from 'unplugin-element-plus/vite';

// https://vite.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
        },
        rollupOptions: {
            external: ['vue', /\.less/, /^element-plus/],
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
            ],
        },
        emptyOutDir: false,
    },
    plugins: [
        ElementPlus({
            // 导入scss而不是css
            useSource: false,
        }),
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.startsWith('media-'),
                },
            },
        }) as any,
        vueJsx(),
        dts({
            insertTypesEntry: true,
            copyDtsFiles: false,
            tsconfigPath: './tsconfig.json',
            outDir: 'dist/types',
        }),
        vidstack(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
