package com.qingqi.vo;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class HistoryRouteVo {

    private String date;
    private String year;
    private String totalTime;
    private List<RouteVo> routeList = new ArrayList<>();

}
