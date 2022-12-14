package com.qingqi.service;

import cn.hutool.core.map.MapUtil;
import cn.hutool.http.Method;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.qingqi.config.BaiduConfig;
import com.qingqi.pojo.Route;
import com.qingqi.utils.UserThreadLocal;
import com.qingqi.vo.RunParamVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class BaiDuService {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    static {
//        设置驼峰转化的参数
        MAPPER.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
    }

    @Autowired
    private BaiduConfig baiduConfig;

    @Autowired
    private BaiduApiService baiduApiService;

    /**
     * 创建鹰眼服务中的实体
     * @param routerId
     * @return
     */
    public Boolean createEntity(String routerId) {
        String url = this.baiduConfig.getUrl() + "/entity/add";
        return this.baiduApiService.execute(
                url,
                Method.POST,
                this.createParam(routerId),
                httpResponse -> {
                    if (httpResponse.isOk()) {
                        String body = httpResponse.body();
                        JSONObject jsonObject = JSONUtil.parseObj(body);
                        return jsonObject.getInt("status") == 0;
                    }
                    return false;
                });
    }

    /**
     * 创建实体的参数
     * @param routeId
     * @return
     */
    private Map<String, Object> createParam(String routeId) {
        return MapUtil.builder("entity_name", this.createEntityName(routeId)).build();
    }

    /**
     * 创建实体名称
     * @param routeId
     * @return
     */
    private Object createEntityName(String routeId) {
        return "route_" + routeId + "_" + UserThreadLocal.get();
    }

    /**
     * 删除实体
     * @param routeId
     * @return
     */
    public boolean deleteEntity(String routeId) {
        String url = this.baiduConfig.getUrl() + "/entity/delete";
        return this.baiduApiService.execute(
                url,
                Method.POST,
                this.createParam(routeId),
                httpResponse -> {
                    if (httpResponse.isOk()) {
                        String body = httpResponse.body();
                        JSONObject jsonObject = JSONUtil.parseObj(body);
                        return jsonObject.getInt("status") == 0;
                    }
                    return false;
                });
    }


    /**
     * 给实体添加轨迹
     * @param routeId
     * @param runParamVo
     * @return
     */
    public Boolean uploadLocation(String routeId, RunParamVo runParamVo) {
        String url = this.baiduConfig.getUrl() + "/track/addpoint";
        Map<String, Object> paramMap = MapUtil.builder(new HashMap<String, Object>())
                .put("entity_name", this.createEntityName(routeId))
                .put("latitude", runParamVo.getLatitude()) //纬度
                .put("longitude", runParamVo.getLongitude()) //经度
                .put("loc_time", System.currentTimeMillis() / 1000) //定位时间戳，精确到秒
                .put("coord_type_input", "gcj02") //gcj02 坐标类型 app中使用的是腾讯地图
                .put("speed", runParamVo.getSpeed()).build();//速度

        return this.baiduApiService.execute(
                url,
                Method.POST,
                paramMap,
                httpResponse -> {
                    if (httpResponse.isOk()) {
                        String body = httpResponse.body();
                        JSONObject jsonObject = JSONUtil.parseObj(body);
                        return jsonObject.getInt("status") == 0;
                    }
                    return false;
                });
    }


    public Route queryEntity(String routeId, Long startTime, Long endTime) {
        String url = this.baiduConfig.getUrl() + "/track/gettrack";

        Map<String, Object> paramMap = MapUtil.builder(new HashMap<String, Object>())
                .put("entity_name", this.createEntityName(routeId))
                .put("start_time", startTime)
                .put("end_time", endTime)
                .put("is_processed", 1)
                .put("coord_type_output", "gcj02")
                .build();

        return this.baiduApiService.execute(url,Method.POST,paramMap,httpResponse -> {
            if (httpResponse.isOk()) {
                String body = httpResponse.body();
                try {
                    return MAPPER.readValue(body, Route.class);
                } catch (JsonProcessingException e) {
                    log.error("查询鹰眼服务出错，查询到的数据为：{}", body, e);
                }
            }
            return null;
        });
    }
}
