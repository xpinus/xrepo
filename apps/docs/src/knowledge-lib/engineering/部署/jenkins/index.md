# Jenkins

![logo](./asset/jenkins.png#pic_center)

[Jenkins操作手册 - 巨详细，一篇足矣！](https://www.cnblogs.com/gltou/p/15329634.html)

## 安装

[https://developer.aliyun.com/article/892646](https://developer.aliyun.com/article/892646)

### 安装并启动

```shell
docker pull jenkinsci/blueocean   # 包含了blueocean等插件的镜像

docker run --name jenkins -u root -d -p 8080:8080 -p 50000:50000 -v /var/jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock jenkinsci/blueocean

# 命令解释
# docker run 
#   --name jenkins jenkinsci/blueocean   # 启动后容器名 使用的镜像名
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