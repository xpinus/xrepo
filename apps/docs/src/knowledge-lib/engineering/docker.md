# Docker

```shell
docker version             #查看docker版本号信息
docker info
docker --help              #docker命令提示
```

## 安装

## 镜像images

```shell
docker images  #查看镜像


#从服务器拉取镜像拉取镜像
docker pull 镜像名       #拉取最新版本的镜像
docker pull 镜像名:tag   #拉取镜像，指定版本
#推送镜像到服务
docker push 镜像名
docker push 镜像名:tag


docker save -o 保存的目标文件名称 镜像名 #保存镜像为一个压缩包
docker load -i 文件名    #加载压缩包为镜像

#从Docker Hub查找/搜索镜像
docker search [options] TERM      
docker search -f STARS=9000 mysql  #搜索stars收藏数不小于10以上的mysql镜像

#删除镜像。当前镜像没有被任何容器使用 才可以删除
docker rmi 镜像名/镜像ID     #删除镜像 
docker rmi -f 镜像名/镜像ID  #强制删除
docker rmi -f 镜像名 镜像名 镜像名     #删除多个 其镜像ID或镜像用用空格隔开即可 
docker rmi -f $(docker images -aq)  #删除全部镜像，-a 意思为显示全部, -q 意思为只显示ID

docker image rm 镜像名称/镜像ID  #强制删除镜像

#给镜像打标签【有时候根据业务需求 需要对一个镜像进行分类或版本迭代操作，此时就需要给镜像打上标签】
docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
```

## 容器container

```shell
docker ps      #显示正在运行的容器
docker ps -a   # -a,--all  显示全部容器，包括已停止的（默认只显示运行中的容器）

# 容器怎么来？ docker run 创建并运行一个容器，处于运行状态。
# --name 给要运行的容器起的名字；   
# -p 将宿主机端口与容器端口映射，冒号左侧是宿主机端口，右侧是容器端口；   
# -d 表示可后台运行容器 （守护式运行）。具体样例见下
docker run --name containerName -p 80:80 -d nginx   

docker run --name aigennerator -it -p 9000:9000 -v D:\project\aigenerator:/code node:lts-bullseye

docker pause 容器名/容器ID    # 让一个运行的容器暂停
docker unpause name  # 让一个容器从暂停状态恢复运行
docker stop name     # 停止一个运行的容器（杀死进程、回收内存，仅剩文件系统）
docker start name    # 让一个停止的容器再次运行
docker restart name  # 重启容器
#docker stop与docker kill的区别：都可以终止运行中的docker容器。
# 类似于linux中的kill和kill -9这两个命令，docker stop与kill相似，docker kill与kill -9类似
docker kill 容器名    # 杀掉一个运行中的容器
docker rename 容器名 新容器名  # 更换容器名

# 删除容器
docker rm 容器名/容器ID            # 删除容器  
docker rm -f CONTAINER           # 强制删除
docker rm -f 容器名 容器名 容器名   # 删除多个容器 空格隔开要删除的容器名或容器ID
docker rm -f $(docker ps -aq)    # 删除全部容器


docker logs 容器名        # 查看容器运行日志         
docker logs -f 容器名     # 持续跟踪日志
docker logs -f --tail=20 容器名  # 查看末尾多少行


# 进入容器执行命令，两种方式 docker exec 和 docker attach，推荐docker exec
# 方式一 docker exec。
docker exec -it 容器名/容器ID bash
# 方式二 docker attach，推荐使用docker exec
docker attach 容器名/容器ID

# 从容器退到自己服务器中（不能用ctrl+C）
exit   # 直接退出。未添加-d(持久化运行容器)时，执行此参数 容器会被关闭
ctrl+p+q  # 优雅退出。无论是否添加-d参数，执行此命令容器都不会被关闭

docker inspect # 获取容器/镜像的元数据。

docker cp  localpath   containerID:containerPath  # 拷贝文件，反之亦可
```

## Dockerfile

Dockerfile 是一个用来构建镜像的文本文件，文本内容包含了一条条构建镜像所需的指令和说明。

```shell
docker  build  -t  imageName  .
```

| 命令 | 描述 |
| --- | --- |
| FROM | 指定基础镜像 |
| MAINTAINER | 指定镜像的作者（已弃用，推荐使用LABEL指令） |
| LABEL | 指定镜像的元数据，使用键值对的形式 |
| ENV | 设置环境变量 |
| RUN | 在构建过程中在镜像中执行命令 |
| CMD | 指定容器创建时的默认命令。（可以被覆盖） |
| ENTRYPOINT | 设置容器创建时的主要命令。（不可被覆盖） |
| EXPOSE | 声明容器运行时监听的特定网络端口 |
| VOLUME | 为容器创建挂载点或声明卷 |
| WORKDIR | 设置后续指令的工作目录 |
| COPY | 拷贝文件 |
| ADD | 拷贝文件 |

### Docker Compose

定义和运行多容器 Docker 应用程序的工具

Compose 使用的三个步骤：
- 使用 Dockerfile 定义应用程序的环境。
- 使用 docker-compose.yml 定义构成应用程序的服务，这样它们可以在隔离环境中一起运行。
- 最后，执行 docker-compose up 命令来启动并运行整个应用程序。

