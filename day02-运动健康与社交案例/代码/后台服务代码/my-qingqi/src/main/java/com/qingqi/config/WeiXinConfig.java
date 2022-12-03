package com.qingqi.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:weixin.properties")
@ConfigurationProperties(prefix = "wx")
@Data
public class WeiXinConfig {

    private String url;
    private String appId;
    private String secret;

}