package com.qingqi.pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class LocationPoint {

    private Double longitude; //经度
    private Double latitude; //纬度
    private Long locTime; //时间
    private Double speed = 0d; //速度，单位：千米/小时
}
