package com.shf.jinyun.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WaybillTrack {

    private String licensePlate; //车牌号

    @JsonProperty("items")
    private List<LocationPoint> locationPointList; //线路集合

    private LocationPoint vehicleInformation; //车辆当前位置
}
