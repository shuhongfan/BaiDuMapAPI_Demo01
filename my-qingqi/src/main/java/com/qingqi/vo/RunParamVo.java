package com.qingqi.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RunParamVo {

    private Double longitude; //经度
    private Double latitude; //纬度
    private Double speed; //速度，单位：km/h

}
