# Redis

## 镜像启动

```shell
docker run -p 6379:6379 -v D:\project\_myself\xrepo\ops\redis:/usr/local/etc/redis --name myredis redis redis-server /usr/local/etc/redis/redis.conf
```

**docker版本如何添加配置文件**
https://github.com/redis/redis/releases
在官网下载对应版本的源代码版本，其中有redis.conf,将其放在电脑的对应文件夹下

**配置文件修改**
配置文件中`requirepass`字段设置密码
bind 0.0.0.0  允许远程访问

**测试**
启动服务 redis-server
启动客户端 redis-cli  
auth password  验证密码
quit 退出
以二进制存储，默认不支持中文， redis-cli  --raw (显示原始值，用于显示中文)


## 基础

### 字符串 String
> 默认格式
```shell
SET namevalue  # 键名区分大小写   
GET name  # 获取
DEL name  # 删除
EXISTS keyname  # 是否存在
KEYS  *   # 查找所有的键 
FLUSHALL  # 删除所有
TTL name  # 查询过期时间  -1标识未设置  -2表示过期
EXPIRE name 10       # 设置过期时间10s
SETEX name 10 value  # 设置键值和过期时间
SETNX name value  # 只有当name不存在时才设置

INCR 自增
```

### 列表 List
> 有顺序的一组
```shell
LPUSH  arr a ...   # 从后添加一个值
RPUSH arr b        # 从前面添加
LRANGE arr  0  -1  # 获取第一个到最后一个的值
LPOP arr 1 # 从后pop出1个值
RPOP 
LLEN arr # 获取长度
RPOPLPUSH source des   # 一个简单的消息队列？
LTRIM start  stop  # 删除[start, stop]之外的元素

```

### 集合 Set
> 无序集合
```shell
SADD   setname [m1, ....]
SMEMBERS setname  # 查看成员
SISMEMBER setname m1  # 判断是否存在
SREM setname  m1  # 删除

# 集合交并差集
SINTER
SUNION
SDIFF
```

### 有序集合 SortedSet
> 每一个成员关联一个float数，根据其大小排序
```shell
ZADD  zset   10 A  20 B  30 C  30 D  # 插入
ZRANGE zset  start end  [WITHSCORES] # 查看
ZSCORE zset A # 查看分数
ZRANK zset A  # 查看排序（从大到小）
ZREVRANK zset A  #    （从小到大）
```

### 哈希 hash
> 映射表
```shell
HSET hname  key value
HGET hname key
HGETALL hname  # 获取所有key value
HDEL hname  key  
HEXISTS hname  key
HKEYS
HLEN    
```

### 发布订阅
> 消息无法持久化
```shell
PUBLISH  channel   message
SUBSCRIBE  channel
```

### 消息队列 Stream    
> redis5.0
```shell
XADD  channel  *  course  redis  # *表示生成随机ID
XLEN channel  # 查看队列中的消息数
XRANGE channel  start  end 产看所有消息   # (-)   (+) 表示所有消息
XDEL channel id   # 删除指定id消息
XTRIM channel  MAXLEN 0  # 删除所有

XREAD COUNT 2 BLOCK 1000  STREAMS channel 0       # 可以重复读取
#     读两条   如果没有阻塞1000ms     从channel中的位置0开始读

# 消费者组
XGROUP CREATE  channel  group1   0
#              消息名     组名     id

XINFO GROUPS channel
XGROUP CREATECONSUMER  channel  group1  c1   # 添加消费者
XREADGROUP  GROUP group1 c1 COUNT 2  BLOCK 1000 STREAMS channnel  > 
# 消费者c1消费最新的消息
```

### 地理空间 Geospatial   
> 存储地理位置信息及各种操作 redis3.2
```shell
GEOADD  city 116.405285  39.904989 beijing  121.472644 31.231706 shanghai
#返回值表示成功添加的位置数
GEOPOS city beijing  # 获取 [经度，纬度]
GEODIST city beijing shanghai    [KM]千米单位
#返回值默认单位m
GEOSEARCH  city  FROMMEMBER shanghai  BYRADIUS 1000 KM # 附近的位置
```

### HyperLogLog
> 基数
```shell
PFADD course git  docker redis 
PFCOUNT course
PFMERGER  result h1  h2  合并
```

### 位图Bitmap
> 0 1
```shell
SETBIT dianzan 0 1 设置名为点赞的位图在位置1处的值为1
GETBIT dianzan 0  
SET dianzan "\xF0"  设置一个位图11110000
BITCOUNT dianzan  统计有几个1
BITPOS dianzan 0   返回第一个出现0/1的位置
```

### 位域Bitfield
> 将很多小的整数存储到一个较大的位图中
```shell
BITFIEL  palyer  set   u8     #0        1
#                     U8类型  第一个位置   值
BITFIEL  palyer  get   u8      #0       1
BITFIEL  palyer  set   u32     #1        100
BITFIEL  palyer  incrby  u32   #1       100   # 增加100，执行后变为200
```

### 事务
> 一次请求中执行多个命令
```shell
MULTI
EXEC/DISCARD
先把所有命令都放到一个队列中缓存
EXEC触发执行，任何一个失败其他命令仍然会执行
不会在中途插入新命令
```

### 持久化
RDB: 在指定时间间隔内将快照存放进磁盘    
save/bgsave命令手动触发   
更适合来备份
AOF：追加文件，日志形式存储每一条快照
appendonly yes

### 主从复制
将一台redis的数据复制到另一台
主节点（负责写操作）   ===（单向）===》  从节点（负责读操作）
![配置方式tips](/redis-role.png)
redis.config     
    port
    pidfile
    dbfilename
    replicaof  

### 哨兵模式

运行在redis集群中
监控，查看节点是否正常
通知，如果发现某个节点问题，通过发布订阅通知其它节点
自动的故障转移，将一个从节点升为主节点，并将其它节点关系进行转移

sentinel.config
sentinel monitor master host  port  mastername

redis-sentinel  sentinel.config

为防止哨兵自己出问题，一般使用3个哨兵节点进程