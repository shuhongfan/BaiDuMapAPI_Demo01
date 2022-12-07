package com.shf.jinyun;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.retry.annotation.EnableRetry;

@SpringBootApplication
@EnableRetry //开启重试的支持
public class JinyunApplication {

    public static void main(String[] args) {
        SpringApplication.run(JinyunApplication.class, args);
    }

}
