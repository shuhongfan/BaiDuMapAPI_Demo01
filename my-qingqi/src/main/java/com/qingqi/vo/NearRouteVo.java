package com.qingqi.vo;

import cn.hutool.core.annotation.Alias;
import lombok.Data;

/**
 * 用于附近的路线响应数据结构
 */
@Data
public class NearRouteVo {

    @Alias("id")
    private String routeId; //路线id
    private String title; //路线标题
    private Double distance; //此段轨迹的里程数，单位：米
    private Double latitude; //路线的纬度
    private Double longitude; //路线的经度
    private Long userId; //创建路线的用户id
    @Alias("endTime")
    private Long date; //创建路线时间戳
    private Double range;// 与当前的距离：单位km
    
}
