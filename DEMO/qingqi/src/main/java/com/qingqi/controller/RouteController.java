package com.qingqi.controller;

import cn.hutool.core.map.MapUtil;
import com.qingqi.pojo.Route;
import com.qingqi.service.RouteService;
import com.qingqi.utils.DistanceUtils;
import com.qingqi.vo.ErrorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("route")
public class RouteController {

    @Autowired
    private RouteService routeService;

    /**
     * 创建路线
     *
     * @return
     */
    @PostMapping
    public Object createRoute() {
        String routeId = this.routeService.createRoute();
        if (null != routeId) {
            // 创建成功
            return MapUtil.builder("routerId", routeId).build();
        }

//        创建失败
        return ErrorResult.builder()
                .errCode("500")
                .errMessage("创建线路失败！！！")
                .build();
    }

    /**
     * 删除路线
     *
     * @param routeId
     * @return
     */
    @DeleteMapping("{routeId}")
    public Object deleteRoute(@PathVariable("routeId") String routeId) {
        Boolean result = this.routeService.deleteRoute(routeId);
        if (result) { // 删除成功
            return null;
        }

        return ErrorResult.builder()
                .errCode("500")
                .errMessage("删除路线失败")
                .build();
    }

    /**
     * 更新路线（结束运动）
     *
     * @param routeId 路线id
     * @param title   路线标题
     * @return
     */
    @PutMapping
    public Object updateRoute(String routeId, String title) {
//        判断路线是否已经结束，如果已经结束就不能再次结束
        return this.routeService.updateRoute(routeId, title);
    }

    /**
     * 根据路线id查询路线数据
     *
     * @param routeId   路线id
     * @param longitude 当前用户的经纬度，用户计算当前用户与该路线的距离
     * @param latitude  当前用户的纬度，用户计算当前用户与该路线的距离
     * @return
     */
    @GetMapping("{routeId}")
    public Object queryRoute(
            @PathVariable("routeId") String routeId,
            @RequestParam("longitude") Double longitude,
            @RequestParam("latitude") Double latitude) {
        Route route = this.routeService.queryRouteById(routeId);
        if (null != route) {
//            计算当前用户与该路线的距离
            double distance = DistanceUtils.getDistance(longitude, latitude,
                    route.getLocation().getX(),
                    route.getLocation().getY());
            route.setRouteDistance(distance);
            return route;
        }
        return ErrorResult.builder()
                .errCode("404")
                .errMessage("路线不存在")
                .build();
    }

    /**
     * 投稿路线
     *
     * @param routeId
     * @return
     */
    @PutMapping("share/{routeId}")
    public Object shareRoute(@PathVariable("routeId") String routeId) {
        Boolean result = this.routeService.shareRoute(routeId);
        if (result) {
            return null;
        }
        return ErrorResult.builder()
                .errCode("500")
                .errMessage("投稿路线失败！")
                .build();
    }

    /**
     * 查询附近的路线
     *
     * @param longitude 当前用户所在位置的经度
     * @param latitude  纬度
     * @param distance  查询的距离，单位km，默认10km
     * @return
     */
    @GetMapping("near")
    public Object queryNearRoute(@RequestParam("longitude") Double longitude,
                                 @RequestParam("latitude") Double latitude,
                                 @RequestParam(value = "distance", defaultValue = "10") Double distance) {
        return this.routeService.queryNearRoute(longitude, latitude, distance);
    }

    /**
     * 沿路线开始运动
     * @param routeId
     * @return
     */
    @PostMapping({"routeId"})
    public Object runFromRoute(String routeId) {
        String myRouteId = this.routeService.runFromRoute(routeId);
        if (null != myRouteId) {
            return MapUtil.builder("routerId", myRouteId).build();
        }
        return ErrorResult.builder()
                .errCode("500")
                .errMessage("沿路线开始运动失败！").build();
    }
}
