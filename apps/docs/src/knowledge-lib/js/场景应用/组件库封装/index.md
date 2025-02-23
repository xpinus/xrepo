# 组件库封装

> 原因：
> 1. 统一的UI体验
> 2. 组件复用：减少重复的逻辑和样式的代码，提高开发效率
> 3. 提高项目的内聚性：让不同的子应用只用聚焦于自身的逻辑

> 组件的设计原则：
> - 单一职责原则
> - 封装和抽象
> - 依赖注入：解耦依赖关系，提高代码的可测试性和可扩展性
> - 看重使用成本，忽视开发复杂度

参考的方案：
vant: 
- 封装了一个cli工具用来实现打包工作流，根据不同文件调用不同的compiler，如less有compilerLess,里面再使用less进行文件打包，vue使用compilerSFC内部用vue/compiler-sfc, script用compilerScript内部用esbuild
- 组件相关文件都在一个文件夹下

element-plus: 
- 使用gulp实现打包工作流，rollup + esbuild打包
- 样式文件是单独放在theme-chalk中

## 目录
```text
├─hooks
│  ├─use-xxx.ts
│  ├─index.ts     // 导出所有hooks
│  └─package.json
├─directives
│  ├─...
│  ├─index.ts     // 导出所有自定义指令
│  └─package.json
├─components
│   ├─button
│   │  ├─_tests
│   │  ├─src
│   │  ├─style  
│   │  └─index.ts
│   ├─ index.ts    // 导出所有组件
│   └─ package.json
├─utils
│   ├─index.ts    // 导出所有工具函数
│   └─package.json
```


## gulp打包
`"build": "gulp --gulpfile scripts/gulpfile.js"`

```text
│  gulpfile.js
│
├─tasks
│      buildStyle.js
│      index.js
│      logo.js
│
└─utils
        constant.js
        index.js
        run.js
```
> gulpfile.js: gulp的入口文件，确定任务，任务的执行顺序
```js
import { parallel, series } from 'gulp';
import { withTaskName, run, runTask } from './utils/index.js';

export * from './tasks/index.js';

export default series(
    runTask('logo'),
    withTaskName('clean', () => run('npm run clean')),
    parallel(
        runTask('buildStyle'),
        withTaskName('buildComponent', () => run('npm run build:vite')),  // 利用vite打包，也可以写一个js调用viteAPI，一样的
    ),
);
```

> buildStyle.js: 编译样式文件
```js
import { src, dest } from 'gulp';
import { ROOT_PATH, PKG_OUTPUT } from '../utils/index.js';

import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export function buildStyle() {
    const plugins = [autoprefixer(), cssnano()];

    return src(`${ROOT_PATH}/src/**/**.less`)
        .pipe(less())
        .pipe(postcss(plugins))
        .pipe(dest(`${PKG_OUTPUT}`));
}

```

> run.js: 辅助函数，用来执行任务
```js
import { spawn } from 'child_process';
import chalk from 'chalk';
import consola from 'consola';
import { ROOT_PATH } from './index.js';

// 创建子进程来执行命令行语句
export const run = async (command, cwd = ROOT_PATH) =>
    new Promise((resolve, reject) => {
        const [cmd, ...args] = command.split(' ');
        consola.info(`cmd: ${chalk.green(`${cmd} ${args.join(' ')}`)}`); // 打印美化的控制台输出
        const app = spawn(cmd, args, {
            cwd,
            stdio: 'inherit',
            shell: process.platform === 'win32',
        });

        const onProcessExit = () => app.kill('SIGHUP');

        app.on('close', (code) => {
            process.removeListener('exit', onProcessExit);

            if (code === 0) resolve();
            else reject(new Error(`Cmd failed! \n Command: ${command} \n Code: ${code}`));
        });
        process.on('exit', onProcessExit);
    });

// 指定函数的优先显示名称
export const withTaskName = (name, fn) => Object.assign(fn, { displayName: name });

// 执行一个指定名称的gulp任务
export const runTask = (name) => withTaskName(`shellTask:${name}`, () => run(`npm run build ${name}`));
```

> constant.js: 常量
```js
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const ROOT_PATH = path.resolve(__dirname, '../../');
export const PKG_OUTPUT = path.resolve(ROOT_PATH, 'dist');
```

## UI组件二次封装
- `$attrs`：实现参数透传
```vue
<div class="my-input">
  <el-input v-bind="$attrs"></el-input>
</div>
```
- `$slots`: 实现插槽透传
> scopeData不存在时可能会报错
```vue
<div class="my-input">
    <el-input v-bind="$attrs">
    <template v-for="(value, name) in $slots" #[name]="scopeData">
      <slot :name="name" v-bind="scopeData"></slot>
    </template>
  </el-input>
</div>
```
- ref: 没好办法，手动暴露
- 组件上原来的方法：使用proxy暴露
```js
const inputRef = ref(null); // 原组件的实例

defineExpose(new Proxy({}, {
    get(target, key) {
        return inputRef.value?.[key];
    },
    has(target, key) {  // vue内会调用这个判断属性是否存在，非原理性问题
        return key in inputRef.value;  
    }
}))
```
