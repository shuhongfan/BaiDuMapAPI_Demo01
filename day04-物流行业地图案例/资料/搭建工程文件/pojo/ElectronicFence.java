package com.jinyun.pojo;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.jinyun.utils.ObjectIdSerializer;
import com.jinyun.vo.LocationPoint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


/**
 * 电子围栏
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "tb_electronic_fence")
public class ElectronicFence {

    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;
    private String name; //名称
    private List<LocationPoint> mutiPoints; //多边形坐标

    @JsonIgnore
    private Long fenceId; //百度地图电子围栏id，唯一标识
    @JsonIgnore
    private Long created; // 创建时间
}
