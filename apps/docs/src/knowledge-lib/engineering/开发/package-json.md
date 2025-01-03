# package.json

## 包版本

- 版本号基本是由三位数字组成`[MAJOR].[MINOR].[PATCH]`
  - 主版本号：当你做了不兼容的 API 修改
  - 次版本号：当你做了向下兼容的功能性新增
  - 修订号：当你做了向下兼容的问题修正
```shell
# npm version会自动修改package.json中的version并创建git tag
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]

# 示例
npm version major -m "版本更新至%s"
# v1.0.0

git log
# commit 7b9e3102111f8f86fc70d1b1fcab96bb9389df9b (HEAD -> master, tag: v1.0.0)
# Author: Packy <lpreterite@126.com>
# Date:   Wed Apr 7 17:01:36 2021 +0800

#    版本更新至1.0.0

# commit eda4316722a9d03f2fd5e60f61507a6e272ddc1b
# Author: Packy <lpreterite@126.com>
# Date:   Wed Apr 7 11:01:20 2021 +0800

    chore: 更新package

```
- 波浪符号（~）：他会更新到当前minor version（也就是中间的那位数字）中最新的版本。放到我们的例子中就是：body-parser:~1.15.2，这个库会去匹配更新到1.15.x的最新版本，如果出了一个新的版本为1.16.0，则不会自动升级。波浪符号是曾经npm安装时候的默认符号，现在已经变为了插入符号。
- 插入符号（^）：这个符号就显得非常的灵活了，他将会把当前库的版本更新到当前major version（也就是第一位数字）中最新的版本。放到我们的例子中就是：bluebird:^3.3.4，这个库会去匹配3.x.x中最新的版本，但是他不会自动更新到4.0.0。

```shell
npm info package-name   // 查看包的信息
npm view package-name versions // 查看包所有可支持版本
```


# 版本号

版本号 major minor patch

Alpha - 软件的初级版本，表示该软件在此阶段以实现软件功能为主，通常只在软件开发者 内部交流，一般而言，该版本软件的Bug较多，需要继续修改，是测试版本。测试 人员提交Bug经开发人员修改确认之后，发布到测试网址让测试人员测试，此时可 将软件版本标注为alpha版。

Beta - 该版本相对于Alpha 版已经有了很大的进步，消除了严重错误，但还需要经过多次 测试来进一步消除，此版本主要的修改对象是软件的UI。修改的的Bug 经测试人 员测试确认后可发布到外网上，此时可将软件版本标注为 beta版。

RC - 稳定


**package.json中版本号详解~和^和*的区别**

指定版本：比如1.2.2，遵循“大版本.次要版本.小版本”的格式规定，安装时只安装指定版本。

波浪号（tilde）+指定版本：
^号（caret）+指定版本：比如ˆ1.2.2，表示安装1.x.x的最新版本（不低于1.2.2），但是不安装2.x.x，也就是说安装时不改变大版本号。需要注意的是，如果大版本号为0，则号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。

`~` 会匹配最近的小版本依赖包，比如~1.2.2，表示安装1.2.x的最新版本（不低于1.2.2），但是不安装1.3.x，也就是说安装时不改变大版本号和次要版本号。

`^` 会匹配最新的大版本依赖包，比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0

`*`，这意味着安装最新版本的依赖包，但缺点同上，可能会造成版本不兼容，慎用！
