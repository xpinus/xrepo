# 组件库封装

> 原因：
> 1. 统一的UI体验
> 2. 组件复用：减少重复的逻辑和样式的代码，提高开发效率
> 3. 提高项目的内聚性：让不同的子应用只用聚焦于自身的逻辑

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
        withTaskName('buildComponent', () => run('npm run build:vite')),  // 利用vite打包
    ),
);
```

> buildStyle.js: 编译样式文件
```js
import { src, dest } from 'gulp';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import { ROOT_PATH, PKG_OUTPUT } from '../utils/index.js';

export function buildStyle() {
    return src(`${ROOT_PATH}/src/**/**.less`)
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(dest(`${PKG_OUTPUT}`))
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

