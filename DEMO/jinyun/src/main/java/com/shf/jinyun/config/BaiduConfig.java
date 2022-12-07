package com.shf.jinyun.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:baidu.properties")
@ConfigurationProperties(prefix = "baidu")
@Data
public class BaiduConfig {

    @Value("${baidu.web.url}")
    private String webUrl;
    @Value("${baidu.yingyan.url}")
    private String yingYanUrl;
    private String ak;
    private String serverId;

}