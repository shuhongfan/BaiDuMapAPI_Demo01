package com.jinyun.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.jinyun.utils.ObjectIdSerializer;
import com.jinyun.vo.LocationNamePoint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tb_vehicle")
public class Vehicle {

    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;
    private String allowableLoad; //准载重量
    private String allowableVolume; //准载体积
    private String licensePlate; //车牌号码
    private String truckType; //车辆类型
    private String railName; //关联电子围栏名字
    private String railId; //关联电子围栏id
    private String gps; //gps

    @JsonIgnore
    private LocationNamePoint currentPosition; //车辆的位置
    @JsonIgnore
    private Long created; //创建时间
    @JsonIgnore
    private Long updated; //更新时间

}
