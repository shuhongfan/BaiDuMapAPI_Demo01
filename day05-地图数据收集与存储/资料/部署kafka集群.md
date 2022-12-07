## 1、部署单节点ZooKeeper

~~~shell
#拉取zk镜像
docker pull zookeeper:3.6
#创建容器
docker create --name zk --restart=always -p 2181:2181 zookeeper:3.6
#启动容器
docker start zk
~~~

## 2、部署kafka

下面部署3个节点的kafka服务

~~~shell
#拉取镜像
docker pull bitnami/kafka:2.8.0

#创建kafka容器
docker run -d --network=host --privileged=true \
--name kafka-node1 -p 9092:9092 \
-e KAFKA_BROKER_ID=1 \
-e KAFKA_CFG_ZOOKEEPER_CONNECT=192.168.120.20:2181 \
-e KAFKA_ZOOKEEPER_PROTOCOL=PLAINTEXT \
-e KAFKA_CFG_LISTENERS=PLAINTEXT://:9092 \
-e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://192.168.120.20:9092 \
-e ALLOW_PLAINTEXT_LISTENER=yes \
-v kafka-node1-data:/bitnami/kafka/data \
-v kafka-node1-config:/bitnami/kafka/config \
bitnami/kafka:2.8.0

docker run -d --network=host --privileged=true \
--name kafka-node2 -p 9093:9092 \
-e KAFKA_BROKER_ID=2 \
-e KAFKA_CFG_ZOOKEEPER_CONNECT=192.168.120.20:2181 \
-e KAFKA_ZOOKEEPER_PROTOCOL=PLAINTEXT \
-e KAFKA_CFG_LISTENERS=PLAINTEXT://:9093 \
-e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://192.168.120.20:9093 \
-e ALLOW_PLAINTEXT_LISTENER=yes \
-v kafka-node2-data:/bitnami/kafka/data \
-v kafka-node2-config:/bitnami/kafka/config \
bitnami/kafka:2.8.0

docker run -d --network=host --privileged=true \
--name kafka-node3 -p 9094:9092 \
-e KAFKA_BROKER_ID=3 \
-e KAFKA_CFG_ZOOKEEPER_CONNECT=192.168.120.20:2181 \
-e KAFKA_ZOOKEEPER_PROTOCOL=PLAINTEXT \
-e KAFKA_CFG_LISTENERS=PLAINTEXT://:9094 \
-e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://192.168.120.20:9094 \
-e ALLOW_PLAINTEXT_LISTENER=yes \
-v kafka-node3-data:/bitnami/kafka/data \
-v kafka-node3-config:/bitnami/kafka/config \
bitnami/kafka:2.8.0
~~~

## 3、部署kafka manager

~~~shell
#创建容器，指定ZK地址以及端口映射
docker run -d --name kf-manager -p 9000:9000 -e ZK_HOSTS="192.168.120.20:2181" -e APPLICATION_SECRET=itcast sheepkiller/kafka-manager:1.3.1.8
~~~

通过http://192.168.31.81:9000/访问即可。