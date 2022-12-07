package com.shf.mynettygeoserver.service;

import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.shf.mynettygeoserver.config.MyConfig;
import com.shf.mynettygeoserver.handler.Request;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;

import java.util.Properties;

public class KafkaService {
    private KafkaProducer<String, String> producer;

    public KafkaService() {
//        完成kafka消息的发送者初始化工作

//        配置
        Properties properties = new Properties();

//        集群地址
        properties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, MyConfig.setting.get("kafka.servers"));

//        消息key的序列化方式
        properties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);

//        消息value的序列化方式
        properties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);

        producer = new KafkaProducer<String, String>(properties);
    }

    /**
     * 发送消息
     * @param request
     * @return
     */
    public Boolean sendMsg(Request request) {
//        获取请求中的参数
        Double longitude = request.getDoubleParam("longitude", 0d);
        Double latitude = request.getDoubleParam("latitude", 0d);
        Double speed = request.getDoubleParam("speed", 0d);
        Double userId = request.getDoubleParam("userId", 0d);
        String routeId = request.getParam("routeId");
        
//        将参数封装成JSON发送到kafka
        String msgJson = JSONUtil.toJsonStr(MapUtil.builder()
                .put("longitude", longitude)
                .put("latitude", latitude)
                .put("speed", speed)
                .put("userId", userId)
                .put("routeId", routeId).build());

        String topic = MyConfig.setting.get("kafka.topic");

        System.out.println(StrUtil.format("向 【{}】 发送消息 【{}】", topic, msgJson));

        producer.send(new ProducerRecord<>(topic, msgJson), ((recordMetadata, e) -> {
            if (null != e) {
                System.out.println(StrUtil.format("发送消息失败 msg= {}", msgJson, e));
            }
        }));
        return true;
    }
}
