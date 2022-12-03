package com.qingqi.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tb_user")
public class User {

    @Id
    private ObjectId id; //主键id
    @Indexed //索引，默认正序
    private Long userId; //用户id
    @Indexed
    private String openId; //微信中用户唯一id
    private String nickName; //昵称
    private String logo; //头像
    private Integer gender; //性别
    private String country; //国家
    private String city; //城市
    private String province; //省份
    private Long created; //创建时间
    private Long updated; //更新时间

}
