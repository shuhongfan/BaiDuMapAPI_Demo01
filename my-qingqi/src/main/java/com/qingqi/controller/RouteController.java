package com.qingqi.controller;

import cn.hutool.core.map.MapUtil;
import com.qingqi.service.RouteService;
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
}
