package com.qingqi.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tb_route")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Route {

    @Id
    @JsonIgnore
    private ObjectId id; //主键id
    private String title; //路线标题
    @Indexed
    private Long userId; //创建路线的用户id
    private Boolean isShare; //是否投稿
    private Integer size; //轨迹点数量
    private Double distance; //此段轨迹的里程数，单位：米
    private String time; //运动时间，格式：mm:ss
    private Double speed; //平均速度，单位：km/h
    @Indexed
    private Long startTime; //创建路线时间戳
    private Long endTime; //结束路线时间戳
    private LocationPoint startPoint; //起点信息
    private LocationPoint endPoint; //终点信息
    private List<LocationPoint> points; //历史轨迹点列表

    //路线的位置，使用起点坐标作为路线坐标
    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    @JsonIgnore
    private GeoJsonPoint location; //x:经度 y:纬度

    @JsonIgnore
    @Indexed
    private Integer status; //状态，1：开始，0：已结束

    @Transient //不存储到MongoDB，仅用于前端显示
    private Double routeDistance; //路线与我的距离


}
