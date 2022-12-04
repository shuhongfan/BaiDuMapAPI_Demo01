package com.qingqi.controller;

import com.qingqi.pojo.UserLocation;
import com.qingqi.service.BaiDuService;
import com.qingqi.service.UserLocationService;
import com.qingqi.utils.UserThreadLocal;
import com.qingqi.vo.ErrorResult;
import com.qingqi.vo.RunParamVo;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("run")
public class RunController {

    @Autowired
    private BaiDuService baiDuService;

    @Autowired
    private UserLocationService userLocationService;

    /**
     * 上报位置 app会15秒上报一次
     *
     * @param routeId
     * @return
     */
    @PostMapping("{routeId}")
    public Object run(@PathVariable("routerId") String routeId, RunParamVo runParamVo) {
//        上报数据到鹰眼
        Boolean result = this.baiDuService.uploadLocation(routeId, runParamVo);

        if (result) {
//            异步更新自己的位置
            Long userId = UserThreadLocal.get();
            Double longitude = runParamVo.getLongitude();
            Double latitude = runParamVo.getLatitude();
            this.userLocationService.uploadLocation(userId, longitude, latitude);
            return null;
        }
        return ErrorResult.builder()
                .errCode("500")
                .errMessage("上报地理位置失败！")
                .build();
    }
}
