## docker安装MongoDB

~~~shell
#拉取镜像
docker pull mongo:4.0.3

#创建容器
docker create --name mongodb-qingqi-server -p 27018:27017 -v mongodb-qingqi-server-data:/data/db mongo:4.0.3 --auth

#启动容器
docker start mongodb-qingqi-server

#进入容器
docker exec -it mongodb-qingqi-server /bin/bash

#进入admin数据库
mongo
use admin

#添加管理员，其拥有管理用户和角色的权限
db.createUser({ user: 'root', pwd: 'root', roles: [ { role: "root", db: "admin" } ] })
#退出后进行认证

#进行认证
mongo -u "root" -p "root" --authenticationDatabase "admin"

#通过admin添加普通用户
use admin
db.createUser({ user: 'qingqi', pwd: 'oudqBFGmGY8pU6WS', roles: [ { role: "readWrite", db: "qingqi" } ] });

#通过tanhua用户登录进行测试
mongo -u "qingqi" -p "oudqBFGmGY8pU6WS" --authenticationDatabase "admin"

#发现可以正常进入控制台进行操作
~~~

## docker安装Redis

~~~shell
docker create --name redis-server -p 6399:6379 --restart=always -v redis-server-data:/data redis:5.0.2 --appendonly yes

docker start redis-server

#进入容器进行测试
docker exec -it redis-server /bin/bash

#测试
root@0bd11c170b43:/data# redis-cli 
127.0.0.1:6379> set abc 123
OK
127.0.0.1:6379> get abc
"123"
127.0.0.1:6379> del abc
~~~

