package com.jinyun.vo;

import cn.hutool.core.bean.BeanUtil;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinyun.pojo.Vehicle;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleVo {

    private String id;
    private String allowableLoad; //准载重量
    private String allowableVolume; //准载体积
    private String licensePlate; //车牌号码
    private String truckType; //车辆类型
    private String railName; //关联电子围栏名字
    private String railId; //关联电子围栏id
    private String gps; //gps
    private LocationNamePoint currentPosition; //车辆的位置
    private String warn;//电子围栏警告：0正常，1超出

    public static VehicleVo convert(Vehicle vehicle) {
        return BeanUtil.toBeanIgnoreError(vehicle, VehicleVo.class);
    }

}
