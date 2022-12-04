package com.qingqi.controller;

import cn.hutool.core.map.MapUtil;
import com.qingqi.pojo.Route;
import com.qingqi.service.RouteService;
import com.qingqi.utils.DistanceUtils;
import com.qingqi.vo.ErrorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

/**
 * 路线相关的业务
 */
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
            //创建成功
            return MapUtil.builder("routeId", routeId).build();
        }
        //创建失败
        return ErrorResult.builder()
                .errCode("500")
                .errMessage("创建路线失败！").build();
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
        if (result) {
            //删除成功
            return null;
        }
        //删除失败
        return ErrorResult.builder()
                .errCode("500")
                .errMessage("删除路线失败！").build();
    }

    /**
     * 更新路线（结束运动）
     *
     * @param routeId 路线id
     * @param title   路线标题
     * @return
     */
    @PutMapping
    public Object updateRoute(@RequestParam("routeId") String routeId, @RequestParam("title") String title) {
        return this.routeService.updateRoute(routeId, title);
    }

    /**
     * 根据路线id查询路线数据
     *
     * @param routeId   路线id
     * @param longitude 当前用户的经度，用于计算当前用户与该路线的距离
     * @param latitude  当前用户的纬度，用于计算当前用户与该路线的距离
     * @return
     */
    @GetMapping("{routeId}")
    public Object queryRoute(@PathVariable("routeId") String routeId,
                             @RequestParam("longitude") Double longitude,
                             @RequestParam("latitude") Double latitude) {
        Route route = this.routeService.queryRouteById(routeId);
        if (null != route) {
            //计算当前用户与该路线的距离
            double distance = DistanceUtils.getDistance(longitude, latitude,
                    route.getLocation().getX(),
                    route.getLocation().getY());
            route.setRouteDistance(distance);
            return route;
        }
        return ErrorResult.builder()
                .errCode("404")
                .errMessage("路线不存在！").build();
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
                .errMessage("投稿路线失败！").build();
    }


    /**
     * 查询附近的路线
     *
     * @param longitude 当前用户所在位置的经度
     * @param latitude  当前用户所在位置的纬度
     * @param distance  查询的距离，单位：km，默认10km
     * @return
     */
    @GetMapping("near")
    public Object queryNearRoute(@RequestParam("longitude") Double longitude,
                                 @RequestParam("latitude") Double latitude,
                                 @RequestParam(value = "distance", defaultValue = "10") Double distance) {
        return this.routeService.queryNearRoute(longitude, latitude, distance);
    }

    /**
     * 路线同行的人
     *
     * @param routeId 路线id
     * @return
     */
    @GetMapping("nearUser/{routeId}")
    public Object queryRouteNearUser(@PathVariable("routeId") String routeId) {
        return this.routeService.queryRouteNearUser(routeId);

    }

    /**
     * 沿路线开始运动
     *
     * @param routeId 目标路线id
     * @return 新创建的路线id
     */
    @PostMapping("{routeId}")
    public Object runFromRoute(@PathVariable("routeId") String routeId) {
        String myRouteId = this.routeService.runFromRoute(routeId);
        if (null != myRouteId) {
            return MapUtil.builder("routeId", myRouteId).build();
        }
        return ErrorResult.builder()
                .errCode("500")
                .errMessage("沿路线开始运动失败！").build();
    }

    /**
     * 历史路线
     *
     * @param userId
     * @return
     */
    @GetMapping("history")
    public Object queryHistoryRoute(@RequestParam(value = "userId", required = false) Long userId,
                                    @RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum,
                                    @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize) {
        return this.routeService.queryHistoryRoute(userId, pageNum, pageSize);
    }

    /**
     * 历史路线(按照日期显示)
     *
     * @return
     */
    @GetMapping("history/date")
    public Object queryHistoryRouteByDate(@RequestParam(value = "userId", required = false) Long userId,
                                          @RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum,
                                          @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize) {
        return this.routeService.queryHistoryRouteByDate(userId, pageNum, pageSize);
    }

}
