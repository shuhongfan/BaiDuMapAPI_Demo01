package com.shf.baidumap.controller;


import com.shf.baidumap.service.HouseSearchService;
import com.shf.baidumap.vo.HouseResultVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("house")
@RestController
public class HouseSearchController {

    @Autowired
    private HouseSearchService houseSearchService;

    /**
     * 地图找房搜索服务
     * @param maxLongitude 最大精度
     * @param minLongitude 最小精度
     * @param maxLatitude  最大维度
     * @param minLatitude  最小维度
     * @param zoom      地图缩放比例值
     * @return
     */
    @GetMapping("search")
    public List<HouseResultVo> search(
            @RequestParam("maxLongitude") Double maxLongitude,
            @RequestParam("minLongitude") Double minLongitude,
            @RequestParam("maxLatitude") Double maxLatitude,
            @RequestParam("minLatitude") Double minLatitude,
            @RequestParam("zoom") Double zoom
    ) {
        return houseSearchService.houseSearchService(maxLongitude,minLongitude,maxLatitude,minLatitude,zoom);
    }
}
