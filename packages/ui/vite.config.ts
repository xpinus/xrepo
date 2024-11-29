import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    build: {
        minify: false,
        lib: {
            entry: 'index.ts',
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled into your library
            // 忽略打包vue和.less文件
            external: ['vue', /\.less/],
            input: ['index.ts'],
            // output: {
            //     // Provide global variables to use in the UMD build
            //     // add the external deps here
            //     globals: {
            //         vue: 'Vue',
            //     },
            //     dir: 'dist',
            // },
            output: [
                {
                    //打包格式
                    format: 'es',
                    //打包后文件名
                    entryFileNames: '[name].mjs',
                    //让打包目录和我们目录对应
                    preserveModules: true,
                    exports: 'named',
                    //配置打包根目录
                    dir: 'dist/es',
                },
                {
                    format: 'cjs',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    exports: 'named',
                    dir: 'dist/lib',
                },
                {
                    format: 'umd',
                    name: 'xui',
                    entryFileNames: '[name].js',
                    exports: 'named',
                    dir: 'dist/umd',
                },
            ],
        },
        emptyOutDir: false,
    },
    plugins: [
        vue(),
        dts({
            insertTypesEntry: true,
            copyDtsFiles: false,
            outDir: 'dist/types',
        }),
        {
            name: 'style',
            generateBundle(config, bundle) {
                //这里可以获取打包后的文件目录以及代码code
                const keys = Object.keys(bundle);

                for (const key of keys) {
                    const bundler: any = bundle[key as any];
                    //rollup内置方法,将所有输出文件code中的.less换成.css,因为我们当时没有打包less文件
                    // this.emitFile({
                    //     type: 'asset',
                    //     fileName: key, //文件名名不变
                    //     source: bundler.code.replace(/\.less/g, '.css'),
                    // });
                    if (bundler.type === 'chunk') {
                        bundler.code = bundler.code.replace(/\.less/g, '.css');
                    }
                }
            },
        },
    ],
    // 配置别名
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
