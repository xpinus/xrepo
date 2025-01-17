# Vite JS API

## build
```ts
async function build(
  inlineConfig?: InlineConfig
): Promise<RollupOutput | RollupOutput[]>
```
```js
import path from 'path'
import { fileURLToPath } from 'url'
import { build } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

;(async () => {
  await build({
    root: path.resolve(__dirname, './project'),
    base: '/foo/',
    build: {
      rollupOptions: {
        // ...
      }
    }
  })
})()
```
其它：
- createServer：创建一个开发服务器
- resolveConfig: 解析InlineConfig配置
- mergeConfig： 深度合并两份配置
- searchForWorkspaceRoot：搜索工作空间的根目录，menorepo中用到
- loadEnv：加载 envDir 中的 .env 文件
- normalizePath：规范化路径，以便在 Vite 插件之间互操作
- transformWithEsbuild： 通过 esbuild 转换 JavaScript 或 TypeScript 文件。对于更想要匹配 Vite 内部 esbuild 转换的插件很有用
- loadConfigFromFile：手动通过 esbuild 加载一份 Vite 配置