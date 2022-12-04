package com.qingqi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableRetry //启用重试机制
@EnableAsync //启用异步机制
public class QingQiApplication {

    public static void main(String[] args) {
        SpringApplication.run(QingQiApplication.class, args);
    }
}
