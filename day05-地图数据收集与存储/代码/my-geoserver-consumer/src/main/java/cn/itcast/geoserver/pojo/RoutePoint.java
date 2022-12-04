package cn.itcast.geoserver.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * 路线坐标点
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tb_route_point")
public class RoutePoint {

    @Id
    private ObjectId id; //主键id
    @Indexed
    private Long userId; //创建路线的用户id
    private Double speed; //平均速度，单位：km/h
    private Double longitude; //经度
    private Double latitude; //维度
    private String routeId; //路线id
    private Long created; //创建时间
}
