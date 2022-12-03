package com.qingqi.service;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.convert.Convert;
import com.mongodb.client.result.UpdateResult;
import com.qingqi.config.RSAConfig;
import com.qingqi.pojo.User;
import com.qingqi.utils.JwtUtils;
import com.qingqi.utils.UserThreadLocal;
import com.qingqi.vo.MyInfoVo;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private IdService idService;

    @Autowired
    private RSAConfig rsaConfig;

    /**
     * 根据openid查询用户
     *
     * @param openId
     * @return
     */
    public User queryByOpenId(String openId) {
        Query query = Query.query(Criteria.where("openId").is(openId));
        return this.mongoTemplate.findOne(query, User.class);
    }

    /**
     * 新用户注册操作
     *
     * @param openId
     * @return
     */
    public User createUser(String openId) {
        User user = new User();
        user.setId(ObjectId.get());
        user.setUserId(this.idService.createUserId());
        user.setOpenId(openId);
        user.setCreated(System.currentTimeMillis());
        user.setUpdated(user.getCreated());
        this.mongoTemplate.save(user);
        return user;
    }

    /**
     * 通过公钥校验token，校验成功后返回用户id
     *
     * @param token
     * @return
     */
    public Long checkToken(String token) {
        Map<String, Object> map = JwtUtils.checkToken(token, this.rsaConfig.getPublishStr());
        if (CollUtil.isNotEmpty(map)) {
            return Convert.toLong(map.get("userId"));
        }
        return null;
    }

    /**
     * 更新用户信息
     *
     * @param user
     * @return
     */
    public boolean update(User user) {
        //更新的字段
        Update update = Update.update("nickName", user.getNickName())
                .set("logo", user.getLogo())
                .set("gender", user.getGender())
                .set("country", user.getCountry())
                .set("province", user.getProvince())
                .set("city", user.getCity())
                .set("updated", System.currentTimeMillis());

        //条件
        Query query = Query.query(Criteria.where("userId").is(UserThreadLocal.get()));

        UpdateResult updateResult = this.mongoTemplate.updateFirst(query, update, User.class);
        return updateResult.getMatchedCount() > 0;
    }

    /**
     * 查询我的信息
     *
     * @param userId
     * @return
     */
    public MyInfoVo queryMyInfo(Long userId) {
        if (userId == null) {
            userId = UserThreadLocal.get();
        }

        Query query = Query.query(Criteria.where("userId").is(userId));
        User user = this.mongoTemplate.findOne(query, User.class);
        if (null == user) {
            return null;
        }
        //拷贝基础信息
        MyInfoVo myInfoVo = BeanUtil.toBeanIgnoreError(user, MyInfoVo.class);

        //返回默认值
        myInfoVo.setCount(0);
        myInfoVo.setTotalDistance(0.00);
        myInfoVo.setAverageSpeed(0.00);
        myInfoVo.setTotalTime("00:00");

        return myInfoVo;
    }

}
