package com.qingqi.vo;

import lombok.Data;

/**
 * 用于附近的人响应数据结构
 */
@Data
public class NearUserVo {

    private Long userId; //用户id
    private String logo; //头像
    private String nickName; //昵称
    private Double latitude; //用户的纬度
    private Double longitude; //用户的经度
    private Integer runCount; //本月完成的运动次数
    private Double distance; //距离，单位：米

}
