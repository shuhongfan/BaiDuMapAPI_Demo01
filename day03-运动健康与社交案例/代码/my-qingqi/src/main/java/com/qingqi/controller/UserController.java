package com.qingqi.controller;

import com.qingqi.service.UserService;
import com.qingqi.vo.MyInfoVo;
import com.qingqi.vo.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 查询我的信息
     *
     * @param userId
     * @return
     */
    @GetMapping("myinfo")
    public MyInfoVo queryMyInfo(@RequestParam(value = "userId", required = false) Long userId) {
        return this.userService.queryMyInfo(userId);
    }

    /**
     * 查询附近的人
     *
     * @param longitude 当前用户所在位置的经度
     * @param latitude  当前用户所在位置的纬度
     * @param distance  查询的距离，单位：km，默认10km
     * @param pageNum   页数
     * @param pageSize  页面大小
     * @return
     */
    @GetMapping("/user/near")
    public PageResult queryNearUser(@RequestParam("longitude") Double longitude,
                                    @RequestParam("latitude") Double latitude,
                                    @RequestParam(value = "distance", defaultValue = "10") Double distance,
                                    @RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum,
                                    @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize) {
        return this.userService.queryNearUser(longitude, latitude, distance, pageNum, pageSize);
    }

}
