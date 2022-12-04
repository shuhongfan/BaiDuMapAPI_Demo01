package com.qingqi.service;

import cn.hutool.core.util.NumberUtil;
import com.qingqi.pojo.LocationPoint;
import com.qingqi.pojo.Route;
import com.qingqi.utils.TimeUtils;
import com.qingqi.utils.UserThreadLocal;
import org.bson.types.ObjectId;
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
public class RouteInfoService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private BaiduService baiduService;

    /**
     * 更新路线数据，查询鹰眼服务中的轨迹数据，更新到Mongodb中
     *
     * @param routeId
     * @param userId
     * @return
     */
    @Async //异步执行
    public CompletableFuture<String> updateRouteInfo(String routeId, Long userId) {
        //当前是异步执行，是在一个新的线程中，所以需要将用户id存储到当前的线程中，baiduService中才能获取到用户id
        UserThreadLocal.set(userId);
        //根据路线id查询路线数据
        Route route = this.mongoTemplate.findById(new ObjectId(routeId), Route.class);

        Long startTime = route.getStartTime() / 1000; //开始时间，精确到秒
        Long endTime = route.getEndTime() / 1000; //结束时间，精确到秒

        //查询轨迹数据
        Route routeEntity = this.baiduService.queryEntity(routeId, startTime, endTime);
        if (null == routeEntity) {
            return CompletableFuture.completedFuture("error");
        }

        //计算运动时间
        String time;
        try {
            time = TimeUtils.formatTime(routeEntity.getEndPoint().getLocTime() - routeEntity.getStartPoint().getLocTime());
        } catch (Exception e) {
            time = "00:00";
        }

        //计算平均速度，每个点速度总和 / 轨迹点总数
        Double speed;
        try {
            speed = routeEntity.getPoints().stream().mapToDouble(LocationPoint::getSpeed).sum() / routeEntity.getSize();
            speed = NumberUtil.round(speed, 2).doubleValue();
        } catch (Exception e) {
            speed = 0.00;
        }

        //更新数据
        Update update = Update.update("size", routeEntity.getSize())
                .set("distance", NumberUtil.round(routeEntity.getDistance(), 2).doubleValue())
                .set("startPoint", routeEntity.getStartPoint())
                .set("endPoint", routeEntity.getEndPoint())
                .set("endPoint", routeEntity.getEndPoint())
                .set("points", routeEntity.getPoints())
                .set("location", new GeoJsonPoint(routeEntity.getStartPoint().getLongitude(),
                        routeEntity.getStartPoint().getLatitude()))
                .set("time", time)
                .set("speed", speed);

        //更新数据到MongoDB
        Query query = Query.query(Criteria.where("id").is(routeId));
        this.mongoTemplate.updateFirst(query, update, Route.class);

        return CompletableFuture.completedFuture("ok");
    }
}
