package com.qingqi.service;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.RandomUtil;
import cn.hutool.core.util.StrUtil;
import com.qingqi.utils.UserThreadLocal;
import com.qingqi.vo.RunParamVo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class TestBaiduService {

    @Autowired
    private BaiduService baiduService;

    @Test
    public void testUploadLocation() {
        String routeId = "613969fce7b2621a27f1bf79";
        Long userId = 3L;
        String point = "121.61931,31.041449|121.618851,31.041441|121.617953,31.041363|121.617531,31.041286|121.617531,31.041286|121.616444,31.041232|121.616013,31.041209|121.615348,31.04117|121.615132,31.041139|121.615061,31.041131|121.614719,31.041363|121.614674,31.041835|121.614656,31.042044|121.61462,31.042346|121.614602,31.042655|121.614495,31.043545|121.614342,31.045045|121.61427,31.045981|121.614665,31.046105|121.615725,31.046051|121.617378,31.045989|121.617378,31.045486|121.617531,31.042214|121.61763,31.041363|121.619328,31.041464";
        //百度坐标系的值 bd09ll

        UserThreadLocal.set(userId);
        StrUtil.split(point, '|').forEach(s -> {
            String[] ss = s.split(",");
            Boolean result = this.baiduService.uploadLocation(routeId, new RunParamVo(Convert.toDouble(ss[0]), Convert.toDouble(ss[1]), RandomUtil.randomDouble(5, 20)));
            System.out.println(s + " -> " + result);
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
    }

    @Test
    public void testUploadLocation2() {
        String routeId = "614004dff0bfcf6ac034e17b";
        Long userId = 3L;
        //gcj02
        String point = "31.035713,121.612241|31.035587,121.611068|31.035492,121.609797|31.035349,121.608167|31.0352,121.606199|31.03499,121.603075";

        UserThreadLocal.set(userId);
        StrUtil.split(point, '|').forEach(s -> {
            String[] ss = s.split(",");
            Boolean result = this.baiduService.uploadLocation(routeId, new RunParamVo(Convert.toDouble(ss[1]), Convert.toDouble(ss[0]), RandomUtil.randomDouble(5, 20)));
            System.out.println(s + " -> " + result);
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
    }

}
