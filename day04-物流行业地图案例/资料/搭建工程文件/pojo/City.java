package com.jinyun.pojo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.jinyun.utils.ObjectIdSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * 市
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "tb_city")
public class City {

    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;
    private Double lat; //纬度
    private Double lng; //经度
    @Indexed
    private String name; //名字

}
