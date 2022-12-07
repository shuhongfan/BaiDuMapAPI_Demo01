package com.qingqi.utils;

import cn.hutool.core.util.StrUtil;

public class TimeUtils {

    /**
     * 将秒格式化成 HH:mm:ss 格式，不满两位补零
     *
     * @param seconds
     * @return
     */
    public static String formatTime(long seconds) {
        String time;
        if (seconds >= 3600) {
            long hour = seconds / 3600;
            long minute = seconds % 3600 / 60;
            long second = seconds % 3600 % 60;
            time = StrUtil.format("{}:{}:{}",
                    hour < 10 ? "0" + hour : hour,
                    minute < 10 ? "0" + minute : minute,
                    second < 10 ? "0" + second : second);
        } else if (seconds >= 60) {
            long minute = seconds / 60;
            long second = seconds % 60;
            time = StrUtil.format("{}:{}",
                    minute < 10 ? "0" + minute : minute,
                    second < 10 ? "0" + second : second);
        } else {
            long second = seconds % 60;
            time = StrUtil.format("00:{}", second < 10 ? "0" + second : second);
        }
        return time;
    }

}
