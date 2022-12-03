package com.qingqi.controller;

import com.qingqi.service.BaiduService;
import com.qingqi.service.UserLocationService;
import com.qingqi.utils.UserThreadLocal;
import com.qingqi.vo.ErrorResult;
import com.qingqi.vo.RunParamVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 运动中上报地理位置
 */
@RequestMapping("run")
@RestController
public class RunController {

    @Autowired
    private BaiduService baiduService;

    @Autowired
    private UserLocationService userLocationService;

    /**
     * 上报位置 app中15秒会上报一次
     *
     * @param routeId    路线id
     * @param runParamVo 请求参数，其中包含了经纬度和速度
     * @return
     */
    @PostMapping("{routeId}")
    public Object run(@PathVariable("routeId") String routeId, RunParamVo runParamVo) {
        //上报数据到鹰眼服务
        Boolean result = this.baiduService.uploadLocation(routeId, runParamVo);
        if (result) {
            //异步更新自己的位置数据
            Long userId = UserThreadLocal.get();
            Double longitude = runParamVo.getLongitude();
            Double latitude = runParamVo.getLatitude();
            this.userLocationService.uploadLocation(userId, longitude, latitude);
            return null;
        }
        return ErrorResult.builder()
                .errCode("500")
                .errMessage("上报地理位置失败！").build();
    }

}
