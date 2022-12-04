package cn.itcast.geoserver.service;

import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import cn.itcast.geoserver.config.MyConfig;
import cn.itcast.geoserver.handler.Request;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;

import java.util.Properties;

@Slf4j
public class KafkaService {

    private KafkaProducer<String, String> producer;

    public KafkaService() {
        //完成kafka消息的发送者初始化工作

        //配置
        Properties properties = new Properties();
        //集群地址，格式：host1:port1,host2:port2
        properties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, MyConfig.setting.get("kafka.servers"));
        //消息key的序列化方式
        properties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        //消息value的序列化方式
        properties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);

        this.producer = new KafkaProducer<String, String>(properties);
    }

    /**
     * 发送消息到kafka
     *
     * @param request
     * @return
     */
    public Boolean sendMsg(Request request) {
        //获取请求中的参数
        Double longitude = request.getDoubleParam("longitude", 0d);
        Double latitude = request.getDoubleParam("latitude", 0d);
        Double speed = request.getDoubleParam("speed", 0d);
        Long userId = request.getLongParam("userId", 0L);
        String routeId = request.getParam("routeId");

        //将参数封装成json发送到kafka
        String msgJson = JSONUtil.toJsonStr(MapUtil.builder()
                .put("longitude", longitude)
                .put("latitude", latitude)
                .put("speed", speed)
                .put("userId", userId)
                .put("routeId", routeId).build());

        String topic = MyConfig.setting.get("kafka.topic");

        System.out.println(StrUtil.format("向【{}】发送消息【{}】", topic, msgJson));

        this.producer.send(new ProducerRecord<>(topic, msgJson), (metadata, exception) -> {
            if (null != exception) {
                //发送失败
                log.error("发送消息失败 msg = {}", msgJson, exception);
            }
        });

        return true;
    }
}
