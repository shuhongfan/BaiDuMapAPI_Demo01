## 通过docker安装MongoDB

~~~shell
#拉取镜像
docker pull mongo:4.0.3

#创建容器
docker create --name mongodb-server -p 27017:27017 -v mongodb-data:/data/db mongo:4.0.3 --auth

#启动容器
docker start mongodb-server

#进入容器
docker exec -it mongodb-server /bin/bash

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
db.createUser({ user: 'house', pwd: 'oudqBFGmGY8pU6WS', roles: [ { role: "readWrite", db: "house" } ] });

#通过tanhua用户登录进行测试
mongo -u "house" -p "oudqBFGmGY8pU6WS" --authenticationDatabase "admin"

#发现可以正常进入控制台进行操作
~~~