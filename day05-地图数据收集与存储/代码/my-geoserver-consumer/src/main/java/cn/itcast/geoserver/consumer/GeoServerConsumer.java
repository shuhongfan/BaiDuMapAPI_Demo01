package cn.itcast.geoserver.consumer;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import cn.itcast.geoserver.pojo.RoutePoint;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GeoServerConsumer {

    @Autowired
    private MongoTemplate mongoTemplate;

    // 消费监听
    @KafkaListener(topics = {"MY-GEO-SERVER"}) //指定topic的名称
    public void onMessage(List<ConsumerRecord<String, String>> records) {
        System.out.println(StrUtil.format("接收到{}条消息，内容为：{}", records.size(), records));
        for (ConsumerRecord<String, String> record : records) {
            JSONObject jsonObject = JSONUtil.parseObj(record.value());

            RoutePoint routePoint = new RoutePoint();
            routePoint.setId(ObjectId.get());
            routePoint.setLongitude(jsonObject.getDouble("longitude"));
            routePoint.setLatitude(jsonObject.getDouble("latitude"));
            routePoint.setSpeed(jsonObject.getDouble("speed"));
            routePoint.setRouteId(jsonObject.getStr("routeId"));
            routePoint.setUserId(jsonObject.getLong("userId"));
            routePoint.setCreated(System.currentTimeMillis());

            this.mongoTemplate.save(routePoint);
        }
    }
}
