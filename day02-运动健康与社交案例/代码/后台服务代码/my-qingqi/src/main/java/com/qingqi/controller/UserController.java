package com.qingqi.controller;

import com.qingqi.service.UserService;
import com.qingqi.vo.MyInfoVo;
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

}
