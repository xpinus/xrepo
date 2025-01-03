# Git

## tag
- 列出标签
```shell
git tag # 在控制台打印出当前仓库的所有标签
```
- 搜索标签
```shell
git tag -l ‘v0.1.*’ # 搜索符合模式的标签
```
- 推送标签到远程仓库
> git push并不会把tag标签传送到远端服务器上，只有通过显式命令才能分享标签到远端仓库
```shell
# push单个tag
git push origin v1.0 #将本地v1.0的tag推送到远端服务器

# push所有tag
git push [origin] --tags
```

## git 提交，文件名大小写的修改提交不上去

https://blog.csdn.net/weixin_44137575/article/details/112801991
```shell
# …or create a new repository on the command line
echo "# xrepo" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/xpinus/xrepo.git
git push -u origin main

# …or push an existing repository from the command line
git remote add origin https://github.com/xpinus/xrepo.git
git branch -M main
git push -u origin main
```

## git错误`fatal: unable to access`
1. 检查网络连接
2. 检查代理设置
```shell
git config --global http.proxy
git config --global https.proxy

# 如果代理设置不正确，你可以使用以下命令设置正确的代理（以HTTP代理为例）：
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy https://127.0.0.1:7890
# 如果你不需要使用代理，可以使用以下命令取消代理设置：
git config --global --unset http.proxy
git config --global --unset https.proxy

# https://developer.baidu.com/article/details/3291153
```

## git回滚操作

|命令|特点|应用|
|---|---|---|
|`git revert commit`|保留工作区、保留历史提交记录、安全性高 | 可用于撤销产品暂时不想要的功能,并且想要保留之后的提交的功能、生产环境中因新增内容产生严重bug时,也可以用此功能来进行稳定回滚|
|`git reset --hard commit`|清空工作、暂存区、删除历史提交记、稳定性低|可用于删除掉一些低效提交的代码,净化提交记录、因为会清空提交记录,这里不太建议使用(最好不要过度依赖reflog|
|`git checkout coomit -b <new_branch>`|保留工作区、暂存区、保留历史提交记录、安摘取功能点、新分支、新分支中无污染(只保留摘取功能点之前的提交记录)、安全性高|可以用于摘取功能点,如产品说要上新需求时,单独上某一个需求,但是当前分支已经提交了很多功能点,此时我们就可以用该命令单独拎出产品需要的功能进行单独发布|
