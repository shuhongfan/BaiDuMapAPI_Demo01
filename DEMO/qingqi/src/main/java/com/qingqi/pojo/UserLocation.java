package com.qingqi.pojo;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * 存储用户地理位置
 */
@Data
@Document(collection = "tb_user_location")
public class UserLocation {

    @Id
    private ObjectId id;
    @Indexed
    private Long userId; //用户id
    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private GeoJsonPoint location; //x:经度 y:纬度
    private Long updated; //更新时间

}
