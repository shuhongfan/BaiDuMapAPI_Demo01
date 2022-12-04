package com.qingqi.service;

import com.qingqi.pojo.Route;
import com.qingqi.utils.UserThreadLocal;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class RouteService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private BaiDuService baiDuService;

    /**
     * 创建路线
     * @return
     */
    public String createRoute() {
        Route route = new Route();
        route.setId(ObjectId.get());
        route.setUserId(UserThreadLocal.get());
        route.setStatus(1);
        route.setIsShare(false);
        route.setStartTime(System.currentTimeMillis());

//        将数据保存到MongoDB
        this.mongoTemplate.save(route);

        String routerId = route.getId().toString();

//        百度地图鹰眼服务中创建Entity
        Boolean bool = this.baiDuService.createEntity(routerId);
        if (bool) { // 路线创建成功
            return routerId;
        } else {
            return null;
        }
    }

    /**
     * 删除路线
     * @param routeId  路线id
     * @return
     */
    public Boolean deleteRoute(String routeId) {
        //删除MongoDB中的数据
        Query query = this.createQuery(routeId);
        boolean result = this.mongoTemplate.remove(query, Route.class).getDeletedCount() == 1;
        if (result) {
            if (this.baiDuService.deleteEntity(routeId)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 构造查询对象，设置了2个条件，其中userId是确保只删除自己的数据
     * @param routeId
     * @return
     */
    private Query createQuery(String routeId) {
        return Query.query(
                Criteria.where("id").is(new ObjectId(routeId))
                        .and("userId").is(UserThreadLocal.get()));
    }
}
