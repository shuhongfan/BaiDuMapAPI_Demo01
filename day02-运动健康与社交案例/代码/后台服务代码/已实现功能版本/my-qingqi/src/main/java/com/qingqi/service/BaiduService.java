package com.qingqi.service;

import cn.hutool.core.map.MapUtil;
import cn.hutool.http.Method;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.qingqi.config.BaiduConfig;
import com.qingqi.utils.UserThreadLocal;
import com.qingqi.vo.RunParamVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class BaiduService {

    @Autowired
    private BaiduApiService baiduApiService;

    @Autowired
    private BaiduConfig baiduConfig;


    /**
     * 创建鹰眼服务中的实体
     *
     * @param routeId 路线id
     * @return
     */
    public Boolean createEntity(String routeId) {
        String url = this.baiduConfig.getUrl() + "/entity/add";
        return this.baiduApiService.execute(url, Method.POST,
                this.createParam(routeId), response -> {
                    if (response.isOk()) {
                        String body = response.body();
                        JSONObject jsonObject = JSONUtil.parseObj(body);
                        return jsonObject.getInt("status") == 0;
                    }
                    return false;
                });
    }

    /**
     * 构建创建实体的参数
     *
     * @param routeId
     * @return
     */
    private Map<String, Object> createParam(String routeId) {
        return MapUtil.builder("entity_name", this.createEntityName(routeId)).build();
    }

    /**
     * 创建实体名称
     *
     * @param routeId
     * @return
     */
    private Object createEntityName(String routeId) {
        return "route_" + routeId + "_" + UserThreadLocal.get();
    }

    /**
     * 删除百度鹰眼服务中的实体
     *
     * @param routeId
     * @return
     */
    public boolean deleteEntity(String routeId) {
        String url = this.baiduConfig.getUrl() + "/entity/delete";
        return this.baiduApiService.execute(url, Method.POST,
                this.createParam(routeId), response -> {
                    if (response.isOk()) {
                        String body = response.body();
                        JSONObject jsonObject = JSONUtil.parseObj(body);
                        return jsonObject.getInt("status") == 0;
                    }
                    return false;
                });
    }

    /**
     * 给实体添加轨迹点
     *
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

        return this.baiduApiService.execute(url, Method.POST,
                paramMap, response -> {
                    if (response.isOk()) {
                        String body = response.body();
                        JSONObject jsonObject = JSONUtil.parseObj(body);
                        return jsonObject.getInt("status") == 0;
                    }
                    return false;
                });
    }
}
