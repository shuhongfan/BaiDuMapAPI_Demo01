package com.qingqi.service;

import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.qingqi.config.RSAConfig;
import com.qingqi.config.WeiXinConfig;
import com.qingqi.pojo.User;
import com.qingqi.utils.JwtUtils;
import com.qingqi.vo.ErrorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

@Service
public class WeiXinService {

    @Autowired
    private WeiXinConfig weiXinConfig;

    @Autowired
    private RSAConfig rsaConfig;

    @Autowired
    private UserService userService;

    public Object login(@RequestParam("code") String code) {
        Map<String, Object> result = new HashMap<>();
        String url = StrUtil.format("{}/sns/jscode2session?appid={}&secret={}&js_code={}&grant_type=authorization_code",
                this.weiXinConfig.getUrl(),
                this.weiXinConfig.getAppId(),
                this.weiXinConfig.getSecret(),
                code);

        //请求微信服务端获取openid
        HttpResponse response = HttpRequest.get(url).timeout(20000)
                .execute();
        JSONObject jsonObject = JSONUtil.parseObj(response.body());
        if (jsonObject.get("errcode") != null) {
            return ErrorResult.builder().errCode("500")
                    .errMessage("传入的code错误，登录失败！").build();
        }

        String openId = jsonObject.getStr("openid");
        User user = this.userService.queryByOpenId(openId);
        if (null == user) {
            //该用户是新用户，需要新增数据到MongoDB
            user = this.userService.createUser(openId);
            result.put("isNew", true);
        } else {
            result.put("isNew", false);
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getUserId()); //将用户id存入到token中
        //生成token，算法采用RSA非对称加密
        String token = JwtUtils.createToken(claims, this.rsaConfig.getPrivateStr(), 720);
        result.put("token", token);
        return result;
    }

}
