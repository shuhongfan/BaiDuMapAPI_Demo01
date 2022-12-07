package com.qingqi.service;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.core.util.ObjectUtil;
import com.mongodb.client.result.UpdateResult;
import com.qingqi.config.RSAConfig;
import com.qingqi.pojo.User;
import com.qingqi.pojo.UserLocation;
import com.qingqi.utils.JwtUtils;
import com.qingqi.utils.UserThreadLocal;
import com.qingqi.vo.MyInfoVo;
import com.qingqi.vo.NearUserVo;
import com.qingqi.vo.PageResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Metrics;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.NearQuery;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private IdService idService;

    @Autowired
    private RSAConfig rsaConfig;

    @Autowired
    private RouteService routeService;

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
    public PageResult queryNearUser(Double longitude, Double latitude, Double distance, Integer pageNum, Integer pageSize) {
        PageResult pageResult = new PageResult();
        pageResult.setPageNum(pageNum);
        pageResult.setPageSize(pageSize);

//        构造分页条件
        PageRequest pageRequest = PageRequest.of(pageNum - 1, pageSize);

//        构建查询对象
        NearQuery nearQuery = NearQuery.near(longitude, latitude, Metrics.KILOMETERS)
                .with(pageRequest)
                .maxDistance(distance);

        GeoResults<UserLocation> geoResults = this.mongoTemplate.geoNear(nearQuery, UserLocation.class);
        if (CollUtil.isEmpty(geoResults.getContent())) {
            return pageResult;
        }

        Long userId = UserThreadLocal.get();

//        本月的时间范围
        Date today = new Date();
        long minTime = DateUtil.beginOfMonth(today).getTime();
        long maxTime = DateUtil.endOfMonth(today).getTime();

        List<NearUserVo> nearUserVoList = geoResults.getContent().stream()
                .filter(result -> !ObjectUtil.equal(result.getContent().getUserId(), userId))
                .map(result -> {
                    UserLocation userLocation = result.getContent();
                    NearUserVo nearUserVo = new NearUserVo();
                    nearUserVo.setUserId(userLocation.getUserId());
                    nearUserVo.setLongitude(userLocation.getLocation().getX());
                    nearUserVo.setLatitude(userLocation.getLocation().getY());

//                    距离
                    nearUserVo.setDistance(NumberUtil.round(result.getDistance().getValue(), 2).doubleValue()*1000);
                    nearUserVo.setRunCount(0);

//                    查询该用户本月的运动次数
                    Integer runCount = this.routeService.queryRouteCountByDate(nearUserVo.getUserId(),minTime,maxTime);
                    nearUserVo.setRunCount(runCount);

                    return nearUserVo;
                }).collect(Collectors.toList());

        Map<Long, User> userMap = this.queryUserMap(CollUtil.getFieldValues(nearUserVoList, "userId"));
        nearUserVoList.forEach(nearUserVo -> {
            User user = userMap.get(nearUserVo.getUserId());
            nearUserVo.setLogo(user.getLogo());
            nearUserVo.setNickName(user.getNickName());
        });

        pageResult.setRecords(nearUserVoList);
        return pageResult;
    }

    /**
     * 根据用户id的列表查询用户列表
     * @param userIdList
     * @return
     */
    public Map<Long, User> queryUserMap(List<Object> userIdList) {
        Query query = Query.query(Criteria.where("userId").in(userIdList));
        return this.mongoTemplate.find(query, User.class)
                .stream().collect(Collectors.toMap(User::getUserId, user -> user));
    }
}
