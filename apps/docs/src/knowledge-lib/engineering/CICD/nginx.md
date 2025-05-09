# Nginx

## 解决 413 Request Entity Too Large（请求实体太大）

可以看到请求的body的大小，在Content-Length后显示，Nginx默认的request body为1M，小于我们上传的大小

到自己主机的nginx.conf配置文件，打开
在http{}中加入 client_max_body_size 10m;
然后重启nginx
/etc/init.d/nginx restart