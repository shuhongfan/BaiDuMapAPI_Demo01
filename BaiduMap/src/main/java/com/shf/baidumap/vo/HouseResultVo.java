package com.shf.baidumap.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class HouseResultVo {

    @JsonIgnore
    @Field("_id")
    private String code; //用于MongoDB聚合查询结果的映射

    private String name; //显示的名称，可能是区、商业圈、小区
    private String price; //均价
    private String total; //房源数量
    private Double longitude; //位置经度
    private Double latitude; //位置维度

}
