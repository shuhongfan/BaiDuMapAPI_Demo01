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

/**
 * 商圈
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tb_business_circle")
public class BusinessCircle {

    @Id
    private ObjectId id; //主键id

    private String name; //名称

    @Indexed
    private Integer code; //编号

    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private GeoJsonPoint location; //x:经度 y:纬度

    @Indexed
    private Integer districtCode; //所属区

    private String lianJiaUrl; //链家网url

}
