package com.qingqi.controller;

import com.qingqi.pojo.User;
import com.qingqi.service.UserService;
import com.qingqi.service.WeiXinService;
import com.qingqi.utils.NoAuthorization;
import com.qingqi.vo.ErrorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("wx")
@RestController
public class WeiXinController {

    @Autowired
    private WeiXinService weiXinService;

    @Autowired
    private UserService userService;

    /**
     * 微信小程序用户登录
     *
     * @param code 小程序端获取的临时登录凭证
     * @return
     */
    @PostMapping("login")
    @NoAuthorization //无需认证
    public Object wxLogin(@RequestParam("code") String code) {
        return this.weiXinService.login(code);
    }

    /**
     * 更新用户信息
     *
     * @return
     */
    @PutMapping("userInfo")
    public Object updateUser(User user) {
        if (!this.userService.update(user)) {
            return ErrorResult.builder()
                    .errCode("500")
                    .errMessage("更新用户信息失败！").build();
        }
        //成功
        return null;
    }

}
