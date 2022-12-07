package com.qingqi.vo;

import lombok.Data;

@Data
public class MyInfoVo {

    private String nickName; //昵称
    private String logo; //头像
    private String country; //国家
    private String city; //城市
    private String province; //省份
    private Double totalDistance; //总里程
    private String totalTime; //累计时间
    private Double averageSpeed; //平均速度
    private Integer count; //运动次数(当月)

}
