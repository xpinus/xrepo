# Docker

[Docker](https://juejin.cn/post/6964289384845672478)是一种容器化技术，可以在镜像的基础上创建独立的容器，每个容器都类似一个单独的机器环境，使得不同项目之间的不会因为基础配置不同互项干扰。

Docker容器的七种状态。 created（已创建） restarting（重启中） running（运行中） removing（迁移中） paused（暂停） exited（停止） dead（死亡）

[配置国内镜像源](https://blog.csdn.net/wohu1104/article/details/121392741#:~:text=Docker%20%E9%85%8D%E7%BD%AE%E5%9B%BD%E5%86%85%E9%95%9C%E5%83%8F%E6%BA%90_wohu1104%E7%9A%84%E5%8D%9A%E5%AE%A2-CSDN%E5%8D%9A%E5%AE%A2_docker%E9%85%8D%E7%BD%AE%E9%95%9C%E5%83%8F%E6%BA%90%20%E7%94%B1%20Docker%20%E5%AE%98%E6%96%B9%E6%8F%90%E4%BE%9B%E7%9A%84%E5%9B%BD%E5%86%85%E9%95%9C%E5%83%8F%E6%BA%90%EF%BC%9Aregistry.docker-cn.com%E5%9C%A8%20Linux,%E7%8E%AF%E5%A2%83%E4%B8%8B%EF%BC%8C%E6%88%91%E4%BB%AC%E5%8F%AF%E4%BB%A5%E9%80%9A%E8%BF%87%E4%BF%AE%E6%94%B9%20%2Fetc%2Fdocker%2Fdaemon.json%20%28%E5%A6%82%E6%9E%9C%E6%96%87%E4%BB%B6%E4%B8%8D%E5%AD%98%E5%9C%A8%EF%BC%8C%E7%9B%B4%E6%8E%A5%E5%88%9B%E5%BB%BA%E5%AE%83%29%20%E8%BF%99%E4%B8%AA%20Docker%20%E6%9C%8D%E5%8A%A1%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E8%BE%BE%E5%88%B0%E6%95%88%E6%9E%9C%E3%80%82)

```shell
docker version             #查看docker版本号信息
docker info
docker --help              #docker命令提示
```

## 基础命令

### 镜像images

```shell
docker images  #查看镜像

#从服务器拉取镜像拉取镜像
docker pull 镜像名       #拉取最新版本的镜像
docker pull 镜像名:tag   #拉取镜像，指定版本
#推送镜像到服务
docker push 镜像名
docker push 镜像名:tag

docker save -o 保存的目标文件名称 镜像名 #保存镜像为一个压缩包
docker load -i 文件名                #加载压缩包为镜像

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

### 容器container

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

### Dockerfile

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

**注意：**copy只能接相对路径，而且路径必须只能是子目录下，因此要将想复制内容必须放在该路径下

### 前端项目Dockerfile配置示例
```dockerfile
# 使用node的基础镜像，将生成的临时容器命名为builder
FROM node:16.15.0-alpine as builder   

LABEL maintainer = "xueyunfeng<pinus0716@163.com>"
LABEL version="1.0"

# 设置builder中现在执行的工作目录（当前目录）
WORKDIR /webapp    

# 先拷贝这两个，可以让yarn最大程度利用缓存，性能考量
COPY ./package.json .
COPY ./yarn.lock    .
# 安装生产环境的依赖(看情况，临时指定源)
RUN yarn --production --registry https://registry.npm.taobao.org/

#拷贝当前终端文件夹内所有到builder的工作目录
COPY . .
RUN yarn build

# 在builder的基础上，构建一个nginx镜像，才能将打包结果/dist作为网页展示
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /webapp/dist /usr/share/nginx/html

# 向外暴露8000端口
EXPOSE 8000

CMD [ "nginx", "-g", "daemon off;" ]
```

> nginx配置
> 前端项目经过编译会生成静态文件，必须要利用nginx作为web服务器才能起作用
```nginx
server {
    listen       8000;
    server_name  qingyun.xueyunfeng.top;

    root   /usr/share/nginx/html;
    index  index.html index.htm;

    location / {
        # 解决单页应用服务端路由的问题
        try_files  $uri $uri/ /index.html;

        # 非带 hash 的资源，需要配置 Cache-Control: no-cache，避免浏览器默认为强缓存
        expires -1;
    }

    location /api/ {
        proxy_pass http://xx.xxx.xxx.xxx:7001;  # 后端的接口
    }

    location /static {
        # 带 hash 的资源，需要配置长期缓存
        expires 1y;
    }
}
```

### 后端项目Dockerfile配置示例
```dockerfile
FROM node:16.15.0-alpine as builder

LABEL name="backend-server"
LABEL maintainer = "xueyunfeng<pinus0716@163.com>"

WORKDIR /app

COPY ./backend-service/package.json .
COPY ./backend-service/yarn.lock  .
RUN yarn --production --registry https://registry.npm.taobao.org/

COPY ./backend-service .
EXPOSE 7001

CMD yarn start
```

## Docker Compose

用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务。

- `docker-compose up`是创建和启动容器，具我所知只有在三种情况下会重新创建容器（即先删除旧的容器，再生成一个新的）：
  - 当镜像有更新时，会重新创建容器
  - 容器不存在（即被删除了）
  - 当容器A重新创建时，其依赖此容器的容器将会重新创建（即docker-compose.yml文件中的容器设置了depends_on为容器A的容器）

### 示例

> 个人博客后端的部署架构（那时我还是个孩子）
> 其中home、blog、qingyun分别是我的网站统一主页，博客项目、中台系统容器，backend是后端项目容器，db是mysql的容器。

![架构](/structure.jpg)

```yaml
version: "3"
services:
  proxy:
    container_name: proxy_nginx
    build: ./proxy
    image: proxy_nginx
    ports: 
      - 80:80
    restart: always

  db:
    container_name: mysql_backend
    image: mysql:5.7
    ports:
      - 3306:3306
    volumes:
      - /home/work/mysql:/var/lib/mysql #必须，数据挂在本地防止容器重启数据丢失
    restart: always
    environment:
      MYSQL_DATABASE: db_name
      MYSQL_ROOT_PASSWORD: password

  backend:
    container_name: backend_server
    build: ./backend
    image: backend:$BACKEND_COMMIT
    ports:
      - 7001:7001
    restart: always
    depends_on:
      - db
  
  qingyun:
    container_name: qingyun_middle
    build: ./middle
    image: qingyun:$MIDDLE_COMMIT
    ports:
      - 8000:8000
    restart: always

  blog:
    container_name: blog_front
    build: ./frontend
    image: blog:$BLOG_COMMIT
    ports:
      - 3000:3000
    restart: always
  
  home:
    container_name: web_home
    build: ./home
    image: home:$HOME_COMMIT
    ports:
      - 3001:3001
    restart: always
```

其中的字段意义，不清楚的参考[官方文档](https://docs.docker.com/compose/compose-file/)

### proxy实现多子域名访问
> proxy容器是一个nginx服务，其监听80端口，将不同的子域名进行转发
> [Docker nginx部署二级域名访问多个web项目](https://www.jianshu.com/p/3378d2eacb3d)

- dockerfile
```dockerfile
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
```
- nginx
```nginx
server {
    listen       80;         
    server_name  *.xueyunfeng.top;    #home

    location / {
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://xx.xxx.xxx.xxx:3001;
    }
}
server {
    listen       80;         #监听的端口
    server_name  blog.xueyunfeng.top;    #博客

    location / {
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://xx.xxx.xxx.xxx:3000;
    }
}
server {
    listen       80;         
    server_name  qingyun.xueyunfeng.top;  # 中台 

    location / {
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://xx.xxx.xxx.xxx:8000;
    }
}
```

## 其它
- **问题**：`ERROR: Version in ".\docker-compose.yml" is invalid.`
  - 配置文件的第一行version设置问题，https://docs.docker.com/compose/compose-file/compose-versioning/，设置这的版本如`version: 3`,不是docker的版本、或docker-compose -v显示的版本
- proxy：对于前后端分离项目，必然会遇到跨域的问题，
  - 在开发阶段，前端在项目中配置了proxy，此时当项目yarn start的方式运行时，其实内部启动了一个node服务器，帮我们做了反向代理的操作，将请求映射到后端所在的接口。
  - 但是，当项目build之后，生成的是静态资源，直接使用nginx启动是没有任何映射的，因此部署时，nginx也要配置合适的代理操作
- [nginx 之 proxy_pass详解](https://www.jianshu.com/p/b010c9302cd0)
- [Docker部署前后端分离项目（超详细）个人总结](https://blog.csdn.net/qq_45743005/article/details/119922465)
  - 采用了自己编写脚本进一步提高自动化