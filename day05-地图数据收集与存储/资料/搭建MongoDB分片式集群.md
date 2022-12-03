## 搭建MongoDB分片式集群

~~~shell
#创建3个config节点
docker create --name configsvr01  -p 17000:27019 -v mongoconfigsvr-data-01:/data/configdb mongo:4.0.3 --configsvr --replSet "rs_configsvr"  --bind_ip_all

docker create --name configsvr02  -p 17001:27019 -v mongoconfigsvr-data-02:/data/configdb mongo:4.0.3 --configsvr --replSet "rs_configsvr"  --bind_ip_all

docker create --name configsvr03  -p 17002:27019 -v mongoconfigsvr-data-03:/data/configdb mongo:4.0.3 --configsvr --replSet "rs_configsvr"  --bind_ip_all

#启动服务
docker start configsvr01 configsvr02 configsvr03

#进去容器进行操作
docker exec -it configsvr01 /bin/bash
mongo 192.168.31.81:17000

#集群初始化
rs.initiate(
  {
    _id: "rs_configsvr",
    configsvr: true,
    members: [
      { _id : 0, host : "192.168.31.81:17000" },
      { _id : 1, host : "192.168.31.81:17001" },
      { _id : 2, host : "192.168.31.81:17002" }
    ]
  }
)

#创建2个shard分片，每个分片都有3个数据节点

#集群一
docker create --name shardsvr01  -p 37000:27018 -v mongoshardsvr-data-01:/data/db mongo:4.0.3 --replSet "rs_shardsvr1" --bind_ip_all --shardsvr
docker create --name shardsvr02  -p 37001:27018 -v mongoshardsvr-data-02:/data/db mongo:4.0.3 --replSet "rs_shardsvr1" --bind_ip_all --shardsvr
docker create --name shardsvr03  -p 37002:27018 -v mongoshardsvr-data-03:/data/db mongo:4.0.3 --replSet "rs_shardsvr1" --bind_ip_all --shardsvr

#集群二
docker create --name shardsvr04  -p 37003:27018 -v mongoshardsvr-data-04:/data/db mongo:4.0.3 --replSet "rs_shardsvr2" --bind_ip_all --shardsvr
docker create --name shardsvr05  -p 37004:27018 -v mongoshardsvr-data-05:/data/db mongo:4.0.3 --replSet "rs_shardsvr2" --bind_ip_all --shardsvr
docker create --name shardsvr06  -p 37005:27018 -v mongoshardsvr-data-06:/data/db mongo:4.0.3 --replSet "rs_shardsvr2" --bind_ip_all --shardsvr

#启动容器
docker start shardsvr01 shardsvr02 shardsvr03
docker start shardsvr04 shardsvr05 shardsvr06

#进去容器执行
docker exec -it shardsvr01 /bin/bash
mongo 192.168.31.81:37000

#初始化集群
rs.initiate(
  {
    _id: "rs_shardsvr1",
    members: [
      { _id : 0, host : "192.168.31.81:37000" },
      { _id : 1, host : "192.168.31.81:37001" },
      { _id : 2, host : "192.168.31.81:37002" }
    ]
  }
)

#初始化集群二
mongo 192.168.31.81:37003

rs.initiate(
  {
    _id: "rs_shardsvr2",
    members: [
      { _id : 0, host : "192.168.31.81:37003" },
      { _id : 1, host : "192.168.31.81:37004" },
      { _id : 2, host : "192.168.31.81:37005" }
    ]
  }
)

#创建mongos节点容器，需要指定config服务
docker create --name mongos -p 6666:27017 --entrypoint "mongos" mongo:4.0.3 --configdb rs_configsvr/192.168.31.81:17000,192.168.31.81:17001,192.168.31.81:17002 --bind_ip_all

docker start mongos

#进入容器执行
docker exec -it mongos bash
mongo 192.168.31.81:6666

#添加shard节点
sh.addShard("rs_shardsvr1/192.168.31.81:37000,192.168.31.81:37001,192.168.31.81:37002")
sh.addShard("rs_shardsvr2/192.168.31.81:37003,192.168.31.81:37004,192.168.31.81:37005")

#启用分片
sh.enableSharding("geoserver")

#设置分片规则，按照_id的hash进行区分
sh.shardCollection("geoserver.tb_route_point", {"userId": "hashed" })

#插入测试数据
use geoserver

for (i = 1; i <= 1000; i=i+1){
    db.tb_route_point.insert({"userId" : i, "speed" : 10.21, "longitude" : 121.612063, "latitude" : 31.034952, "routeId" : "abc1231", "created" : NumberLong("1626853471529")})
}

#分别在2个shard集群中查询数据进行测试
db.tb_route_point.count()


#集群操作（在mongos中执行）
use config
db.databases.find()  #列出所有数据库分片情况
db.collections.find() #查看分片的片键
sh.status()  #查询分片集群的状态信息

~~~

