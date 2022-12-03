package cn.itcast.baidumap.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tb_house")
public class House {

    @Id
    private ObjectId id; //主键id
    private String title; //房源标题
    private Double price; //总价
    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private GeoJsonPoint location; //x:经度 y:纬度

    @Indexed
    private Integer districtCode; //所属行政区
    @Indexed
    private ObjectId communityId; //所属小区
    @Indexed
    private Integer businessCircleCode; //商圈

    private Long created; //创建时间

}
