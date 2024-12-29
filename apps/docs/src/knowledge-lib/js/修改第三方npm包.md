# 如何修改第三方npm包

1. patch方案
  - `patch-package` 一个可以帮你自动更新node_modules下依赖的包的工具
```shell
pnpm i patch-package postinstall -D
```
package.json钩子
```json
{
  "scripts": {
    "postinstall": "patch-package"
  }
}
```
创建补丁
```shell
npx patch-package rspack
# 这时会在根目录生成一个 /rspack+1.0.0.patch 文件

```

2. fork方案
修改源码，源码修改完后，构建，发布npm私服

