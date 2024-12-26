# Docker概述

[Docker](https://juejin.cn/post/6964289384845672478)是一种容器化技术，可以在镜像的基础上创建独立的容器，每个容器都类似一个单独的机器环境，使得不同项目之间的不会因为基础配置不同互项干扰。

Docker容器的七种状态。 created（已创建） restarting（重启中） running（运行中） removing（迁移中） paused（暂停） exited（停止） dead（死亡）

[Docker-compose](https://juejin.cn/post/6967598675820281870)一种自动化一键部署多个docker的技术，官方提供，方便在一台机器上同时部署管理多个项目，像是我的网站，前端的博客、中台、后端就是通过docker-compose实现一键部署。

更详细的介绍网上有很多，详细的指令参考官网，不在赘述。

## docker基础命令

```shell
docker search nginx		#搜索镜像
docker pull nginx		#安装镜像
docker images			#查看所有镜像
docker inspect 镜像ID	   #查看指定镜像的详情
docker tag 旧名称 新名称	#改名
docker rmi nginx		#删除指定镜像
docker save -o 文件名 镜像名		#将镜像导出到当前目录
docker load < 镜像名	   #载入镜像
docker push 镜像名称	  #上传镜像到仓库
docker create -it 镜像名 /bin/bash	#创建容器 i=让容器的标准输入保持打开 t=让Docker分配一个伪终端

docker ps -a			#容器查看
docker start 容器ID		#启动容器
docker run centos:7 /usr/bin/bash -c ls /	#启动执行命令查看系统目录
docker stop 容器ID		#终止容器
docker exec -it 容器ID /bin/bash			#启动容器
docker export 镜像ID		#容器导出
cat 文件名 | docker import - 镜像名		#容器导入
docker rm 容器ID			#删除容器

docker run -d -p 8080:80 nginx #开放主机8080端口映射到容器的80端口上  netstat -na |grep 8080查看到主机8080已被监听

docker logs -f container  # 实时跟踪容器日志
```

<a href='https://blog.csdn.net/wohu1104/article/details/121392741#:~:text=Docker%20%E9%85%8D%E7%BD%AE%E5%9B%BD%E5%86%85%E9%95%9C%E5%83%8F%E6%BA%90_wohu1104%E7%9A%84%E5%8D%9A%E5%AE%A2-CSDN%E5%8D%9A%E5%AE%A2_docker%E9%85%8D%E7%BD%AE%E9%95%9C%E5%83%8F%E6%BA%90%20%E7%94%B1%20Docker%20%E5%AE%98%E6%96%B9%E6%8F%90%E4%BE%9B%E7%9A%84%E5%9B%BD%E5%86%85%E9%95%9C%E5%83%8F%E6%BA%90%EF%BC%9Aregistry.docker-cn.com%E5%9C%A8%20Linux,%E7%8E%AF%E5%A2%83%E4%B8%8B%EF%BC%8C%E6%88%91%E4%BB%AC%E5%8F%AF%E4%BB%A5%E9%80%9A%E8%BF%87%E4%BF%AE%E6%94%B9%20%2Fetc%2Fdocker%2Fdaemon.json%20%28%E5%A6%82%E6%9E%9C%E6%96%87%E4%BB%B6%E4%B8%8D%E5%AD%98%E5%9C%A8%EF%BC%8C%E7%9B%B4%E6%8E%A5%E5%88%9B%E5%BB%BA%E5%AE%83%29%20%E8%BF%99%E4%B8%AA%20Docker%20%E6%9C%8D%E5%8A%A1%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E8%BE%BE%E5%88%B0%E6%95%88%E6%9E%9C%E3%80%82'>配置国内镜像源</a>

## Dockerfile

它告诉docker怎样制作我们的镜像,我们镜像的每一步操作分别是什么,写好Dockerfile后我们使用docker build命令执行Dockerfile里面的每一件事情。实现镜像构造自动化。

接下来分别贴上我的前台、中台、后端所用到的Dockerfile配置

```shell
COPY <源文件>  <目标目录>  # copy文件
ADD  会将文件自动解压，功能与COPY相同。
CMD  
```

**注意**

copy只能接相对路径，而且路径必须只能是子目录下，因此要将想复制内容必须放在该路径下

### 中台相关配置

> Dockerfile

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
# 换源（不太保证这句话起作用了吗，对于Dockerfile不够了解）
RUN yarn config set registry https://registry.npm.taobao.org/
# 安装依赖
RUN yarn

#拷贝当前终端文件夹内所有到builder的工作目录
COPY . .
RUN yarn build

# 在builder的基础上，构建一个nginx镜像，才能将/dist作为网页展示
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /webapp/dist /usr/share/nginx/html

# 向外暴露8000端口
EXPOSE 8000

CMD [ "nginx", "-g", "daemon off;" ]
```

> nginx配置


前端项目经过编译会生成静态文件，必须要利用nginx作为web服务器才能起作用。
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

前端项目大同小异，无非是一些接口不同，这里就补贴了。

### 后端配置

> Dockerfile
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

​	用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务。

​	通过编写 docker-compose.yml 配置文件，快速的部署分布式应用。文件中通常配置：镜像、端口映射、文件映射、容器间的依赖等。是对Dockerfile的自动化

* **问题**：`ERROR: Version in ".\docker-compose.yml" is invalid.`
  * 配置文件的第一行version设置问题，https://docs.docker.com/compose/compose-file/compose-versioning/，设置这的版本如`version: 3`,不是docker的版本、或docker-compose -v显示的版本
* docker-compose up是创建和启动容器，具我所知只有在三种情况下会重新创建容器（即先删除旧的容器，再生成一个新的）：
  1.当镜像有更新时，会重新创建容器；
  2.容器不存在（即被删除了）;
  3.当容器A重新创建时，其依赖此容器的容器将会重新创建（即docker-compose.yml文件中的容器设置了depends_on为容器A的容器）

> 我的docker-compose.yml

```dockerfile
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

其中的字段意义，不清楚的参考[官方](https://docs.docker.com/compose/compose-file/)

其中home、blog、qingyun分别是我的网站统一主页，博客项目、中台系统容器，backend是后端项目容器，db是mysql的容器。

你会发现还有一个proxy，它是用来干嘛的呢，下面介绍。

### proxy实现多子域名访问

proxy容器是一个nginx服务，其监听80端口，将不同的子域名进行转发

> dockerfile

```dockerfile
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
```

> nginx

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

效果如下：

<img src="https://imagehost-1311720054.cos.ap-nanjing.myqcloud.com/blog/%E7%9D%80%E6%89%8B%E6%90%AD%E5%BB%BA%E7%BD%91%E7%AB%99/new.jpg" alt="new" style="zoom:80%;" />

### 与nginx的结合使用

前端项目打包后的dist，是需要通过nginx作为服务器的，否则无法使用

* 注意点：
  * proxy：对于前后端分离项目，必然会遇到跨域的问题，像我在开发阶段，前端在项目中配置了proxy，此时当项目yarn start的方式运行时，其实内部启动了一个node服务器，帮我们做了反向代理的操作，将请求映射到后端所在的接口。但是，当项目build之后，生成的是静态资源，直接使用nginx启动是没有任何映射的，因此部署时，nginx也要配置合适的代理操作
  * docker中的host问题：如以下情景，egg中的sequlize需要配置一个mysql的host和port，或者nginx中proxy_pass要配置反向代理后的接口host，尤其是在本地实验时，注意这里不能直接是localhost，因为docker的每个容器都是独立的，localhost指向的是容器，而不是宿主机，解决方法是：host用docker-compose里的service里的每个配置的key代替；或者是networks配置，将几个容器放在同一个网络环境中。在服务器上，也可以直接使用公网ip代替host
* 根据域名访问不同页面https://www.jianshu.com/p/3378d2eacb3d
* `proxy_pass `https://www.jianshu.com/p/b010c9302cd0
* 前后端分离项目部署 https://blog.csdn.net/qq_45743005/article/details/119922465 采用了自己编写脚本进一步提高自动化





