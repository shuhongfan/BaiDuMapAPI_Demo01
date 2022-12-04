package com.qingqi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

/**
 * 自己维护自增长id
 */
@Service
public class IdService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    private static final String REDIS_KEY = "USER_ID";

    /**
     * 生成用户id
     *
     * @return
     */
    public Long createUserId() {
        return this.redisTemplate.opsForValue().increment(REDIS_KEY);
    }

}
