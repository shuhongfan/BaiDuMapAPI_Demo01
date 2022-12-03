package com.qingqi.vo;

import cn.hutool.core.annotation.Alias;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

/**
 * 用于历史路线响应数据结构
 */
@Data
public class RouteVo {

    @Alias("id")
    private String routeId; //路线id
    private String title; //路线标题
    private Double distance; //此段轨迹的里程数，单位：米
    private Long userId; //创建路线的用户id
    @Alias("endTime")
    private Long date; //创建路线时间戳
    private String time; //运动时间
    @JsonIgnore
    private Long timeValue; //运动时间数值
    private Double speed; //平均速度，单位：km/h
    private Boolean isShare; //是否投稿

}
