import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
    input: 'index.ts',
    output: {
        format: 'es',
        dir: 'dist',
    },
    plugins: [nodeResolve(), typescript(), terser()],
};
