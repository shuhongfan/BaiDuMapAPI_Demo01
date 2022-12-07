package com.shf.jinyun.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleQueryVo {

    private Integer page = 1;
    private Integer pagesize = 10;
    private String typeId; //车辆类型
    private String licensePlate; //车牌号

}
