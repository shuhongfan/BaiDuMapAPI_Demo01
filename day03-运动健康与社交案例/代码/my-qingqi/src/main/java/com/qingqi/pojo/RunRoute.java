package com.qingqi.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * 沿着路线运动
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tb_run_route")
@JsonIgnoreProperties(ignoreUnknown = true)
public class RunRoute {

    @Id
    @JsonIgnore
    private ObjectId id; //主键id

    @Indexed
    private String runRouteId; //沿着跑的路线id
    @Indexed
    private String routeId; //自己的路线id
    @Indexed
    private Long userId; //自己的id
    @Indexed
    private Integer status; //状态，1-运动中，0-结束
    private Long created; //创建时间
    private Long updated; //更新时间
}
