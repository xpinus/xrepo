const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * internal that utilize VueJS.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
    extends: ['plugin:vue/recommended', 'eslint:recommended', 'prettier'],
    env: {
        browser: true, // browser global variables like document and navigator
        node: true,
        es2021: true,
    },
    plugins: ['prettier'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
    },
    settings: {
        'import/resolver': {
            typescript: {
                project,
            },
        },
    },
    ignorePatterns: ['node_modules/', 'dist/'],
    rules: {
        'import/no-default-export': 'off',
        'vue/multi-word-component-names': 'off',
        // add specific rules configurations here

        // eslint (http://eslint.cn/docs/rules)
        'no-var': 'error', // 要求使用 let 或 const 而不是 var
        'no-multiple-empty-lines': ['error', { max: 2 }], // 不允许多个空行

        'prettier/prettier': [
            'error',
            {
                endOfLine: false,
            },
        ],

        // typeScript (https://typescript-eslint.io/rules)
        '@typescript-eslint/no-inferrable-types': 'off', // 可以轻松推断的显式类型可能会增加不必要的冗长
        '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
        '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
        '@typescript-eslint/ban-ts-ignore': 'off', // 禁止使用 @ts-ignore
        '@typescript-eslint/ban-types': 'off', // 禁止使用特定类型
        '@typescript-eslint/explicit-function-return-type': 'off', // 不允许对初始化为数字、字符串或布尔值的变量或参数进行显式类型声明
        '@typescript-eslint/no-var-requires': 'off', // 不允许在 import 语句中使用 require 语句
        '@typescript-eslint/no-empty-function': 'off', // 禁止空函数
        '@typescript-eslint/no-non-null-assertion': 'off', // 不允许使用后缀运算符的非空断言(!)
        'vue/no-v-model-argument': 'off',
        'no-unused-vars': 'off',
    },
};
