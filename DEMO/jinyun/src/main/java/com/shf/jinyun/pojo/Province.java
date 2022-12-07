package com.shf.jinyun.pojo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.shf.jinyun.utils.ObjectIdSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * 省
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tb_province")
@Builder
public class Province {

    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;
    private Double lat; //纬度
    private Double lng; //经度
    @Indexed
    private String name; //名字

}
