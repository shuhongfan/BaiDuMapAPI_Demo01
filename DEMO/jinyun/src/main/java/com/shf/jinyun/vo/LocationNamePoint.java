package com.shf.jinyun.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocationNamePoint {

    private String name; //地址对应的名称
    private String lat; //纬度
    private String lng; //经度
}
