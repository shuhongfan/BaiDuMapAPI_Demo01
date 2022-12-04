package com.qingqi.service;

import com.qingqi.pojo.UserLocation;
import com.sun.xml.internal.ws.util.CompletedFuture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import java.util.concurrent.CompletableFuture;


@Service
public class UserLocationService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Async // 异步方法
    public CompletableFuture<String> uploadLocation(Long userId, Double longitude, Double latitude) {
        Query query = Query.query(Criteria.where("userId").is(userId));

//        更新数据
        Update update = Update.update("userId", userId)
                .set("location", new GeoJsonPoint(longitude, latitude))
                .set("updated", System.currentTimeMillis());

//        如果数据存在就更新，否则插入新的数据
        this.mongoTemplate.upsert(query, update, UserLocation.class);

        return CompletableFuture.completedFuture("ok");
    }
}
