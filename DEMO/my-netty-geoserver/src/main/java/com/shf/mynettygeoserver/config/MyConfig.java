package com.shf.mynettygeoserver.config;

import cn.hutool.setting.Setting;

public class MyConfig {

    public static Setting setting;

    static {
        //读取配置文件，读取文件的路径是在classpath下
        setting = new Setting("my.setting");
    }

}
