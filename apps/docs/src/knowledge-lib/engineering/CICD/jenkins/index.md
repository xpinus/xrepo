# Jenkins

![logo](./asset/jenkins.png)

[Jenkins操作手册 - 巨详细，一篇足矣！](https://www.cnblogs.com/gltou/p/15329634.html)

## 安装

[https://developer.aliyun.com/article/892646](https://developer.aliyun.com/article/892646)

### 安装并启动

```shell
docker run --name jenkins -u root -d -p 8080:8080 -p 50000:50000 -v /var/jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v /usr/bin/docker:/usr/bin/docker -v /usr/bin/docker-compose:/usr/bin/docker-compose  jenkins/jenkins:lts --memory=4g

# 命令解释
# docker run 
#   --name jenkins jenkins/jenkins:lts   # 启动后容器名 使用的镜像名
#   -u root      # 可选，指定容器内运行进程的用户，默认就是root
#   --rm         # 可选，表示容器停止后会自动删除
#   -d           # 容器在后台运行
#   -p 8080:8080      # 端口映射   Jenkins 的 Web UI 默认会在 8080 端
#   -p 50000:50000    # Jenkins 用这个端口与构建代理进行通信，通常是用于 Jenkins 代理节点与主节点之间的连接
#   -v /var/jenkins_home:/var/jenkins_home   # Jenkins 的所有配置、插件、作业和数据都会存储在这个目录中
#   -v /var/run/docker.sock:/var/run/docker.sock # 将宿主机的 Docker 套接字文件 /var/run/docker.sock 挂载到容器的 /var/run/docker.sock，这样 Jenkins 就可以通过宿主机的 Docker 来控制容器和镜像。这是为了让 Jenkins 可以在其构建过程中启动和管理 Docker 容器，通常用于 Jenkins Pipeline 中需要动态创建容器的场景
```

### 初始化Jenkins

安装完成后访问地址-> http://{部署Jenkins所在服务IP}:8080

1. 镜像加速

[看这个](https://blog.csdn.net/myhop/article/details/135388256#:~:text=%E6%9C%AC%E6%96%87%E8%AE%B2%E8%BF%B0%E4%BA%86%E5%9C%A8%E8%85%BE%E8%AE%AF%E4%BA%91%E7%8E%AF%E5%A2%83%E4%B8%8B%E4%BD%BF%E7%94%A8Jenkins%E5%AE%B9%E5%99%A8%E6%97%B6%E9%81%87%E5%88%B0%E6%8F%92%E4%BB%B6%E5%AE%89%E8%A3%85%E9%97%AE%E9%A2%98%E7%9A%84%E8%A7%A3%E5%86%B3%E6%AD%A5%E9%AA%A4%EF%BC%8C%E6%B6%89%E5%8F%8A%E4%BF%AE%E6%94%B9%E5%8D%87%E7%BA%A7%E7%AB%99%E7%82%B9%E7%9A%84URL%E4%BB%8E%E9%BB%98%E8%AE%A4%E6%BA%90%E5%88%87%E6%8D%A2%E5%88%B0%E6%97%A5%E6%9C%ACesuni.jp%E9%95%9C%E5%83%8F%E7%AB%99%E4%BB%A5%E9%81%BF%E5%85%8D%E5%AE%89%E8%A3%85%E9%94%99%E8%AF%AF%E3%80%82%20%E8%85%BE%E8%AE%AF%E4%BA%91%E7%8E%AF%E5%A2%83%E4%B8%8B%E5%AE%89%E8%A3%85%20Jenkins%20%E5%AE%B9%E5%99%A8%E4%BC%9A%E5%87%BA%E7%8E%B0%E5%AE%89%E8%A3%85%E6%8F%92%E4%BB%B6%E6%8A%A5%E9%94%99%E7%9A%84%E9%97%AE%E9%A2%98%EF%BC%8C,%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95%E4%B8%BAJenkins%20%E6%9B%B4%E6%8D%A2%E6%BA%90%EF%BC%9A%201%E3%80%81%E7%82%B9%E5%87%BBJenkins%E4%B8%BB%E9%A1%B5%E9%9D%A2%E5%B7%A6%E4%BE%A7%E5%88%97%E8%A1%A8%E4%B8%AD%E3%80%90%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86%E3%80%91%202%E3%80%81%E4%B8%8B%E6%8B%89%E6%89%BE%E5%88%B0%E3%80%90%E7%AE%A1%E7%90%86%E6%8F%92%E4%BB%B6%E3%80%91%203%E3%80%81%E9%80%89%E6%8B%A9%E3%80%90%E9%AB%98%E7%BA%A7%E3%80%91%E9%80%89%E9%A1%B9%E5%8D%A1)

```shell
vim /var/jenkins_home/hudson.model.UpdateCenter.xml

# 也可以在登录 Jenkins 后在插件的高级设置里进行配置镜像加速
```

```xml
<?xml version='1.1' encoding='UTF-8'?>
<sites>
  <site>
    <id>default</id>
    <!-- <url>https://updates.jenkins.io/update-center.json</url>-->
    <url>https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json</url>
  </site>
</sites>
```
2. 解锁，查看密码：`cat /var/jenkins_home/secrets/initialAdminPassword`
3. 安装插件 安装推荐的插件
4. 创建管理员用户

### 配置

1. 安装需要的插件，进入【首页】–【系统管理】–【插件管理】–【可选插件】

2. 配置Maven
   进入【首页】–【系统管理】–【全局配置】，拉到最下面maven–maven安装

### 创建任务

https://juejin.cn/post/6844903992481284104

1. 新建任务  点击【新建任务】，输入任务名称，点击构建一个自由风格的软件项目
2. 点击【源码管理】–【Git】，输入仓库地址，添加凭证，选择好凭证即可。
3. 点击【构建触发器】–【构建】–【增加构建步骤】–【调用顶层Maven目标】–【填写配置】–【保存】
4. 保存

### 测试
该功能测试是否能正常打包
1. 构建
   点击构建按钮
2. 查看日志
   点击正在构建的任务，或者点击任务名称，进入详情页面，查看控制台输出，看是否能成功打成jar包。
   该处日志第一次可能下载依赖jar包失败，再次点击构建即可成功。

3. 查看项目位置
   cd /var/jenkins_home/workspace
   ll 即可查看是否存在

### 运行项目

因为我们项目和jenkins在同一台服务器，所以我们用shell脚本运行项目，原理既是通过dockerfile 打包镜像，然后docker运行即可。

1. Dockerfile
   在springboot项目根目录新建一个名为Dockerfile的文件，注意没有后缀名，其内容如下:（大致就是使用jdk8，把jar包添加到docker然后运行prd配置文件。详细可以查看其他教程）

2. 修改jenkins任务配置 
   构建环境 - 增加构建器：执行shell
3. 保存并构建
4. 验证 
      docker ps 查看是否有自己的容器
      docker logs 自己的容器名 查看日志是否正确
      浏览器访问项目试一试

```js
echo $PATH
export NODE_OPTIONS="--max-old-space-size=4096"
npm config set registry https://registry.npmmirror.com
pnpm config set registry https://registry.npmmirror.com
pnpm install
pnpm run docs:build
docker-compose up -d
```