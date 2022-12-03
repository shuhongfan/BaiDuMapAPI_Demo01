package com.qingqi.service;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.RandomUtil;
import cn.hutool.core.util.StrUtil;
import com.qingqi.controller.RouteController;
import com.qingqi.controller.RunController;
import com.qingqi.utils.UserThreadLocal;
import com.qingqi.vo.RunParamVo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.File;
import java.util.List;
import java.util.Map;

/**
 * 构造路线数据
 */
@SpringBootTest
@RunWith(SpringRunner.class)
public class TestRouteData {

    @Autowired
    private RouteController routeController;

    @Autowired
    private RunController runController;

    @Test
    public void testCreateData() {
        //读取数据文件
        String fileDirPath = "F:\\测试路线轨迹点坐标数据";
        File fileDir = new File(fileDirPath);
        if (!fileDir.isDirectory()) {
            System.out.println(fileDir + " 不是一个目录！");
            return;
        }

        UserThreadLocal.set(3L); //当前用户

        File[] files = fileDir.listFiles();//每一个文件是一个路线
        for (File file : files) {
            //创建路线
            Object route = this.routeController.createRoute();
            Map<String, Object> routeResult = (Map<String, Object>) route;
            String routeId = routeResult.get("routeId").toString();

            //开始上报位置
            List<String> lines = FileUtil.readLines(file, "UTF-8");
            for (String line : lines) {
                String[] array = StrUtil.splitToArray(line, ',');
                RunParamVo runParamVo = new RunParamVo();
                runParamVo.setLatitude(Convert.toDouble(array[0]));
                runParamVo.setLongitude(Convert.toDouble(array[1]));
                runParamVo.setSpeed(RandomUtil.randomDouble(5, 30));
                this.runController.run(routeId, runParamVo);

                System.out.println("routeId = " + routeId + " 上报位置：runParamVo = " + runParamVo);

                try {
                    Thread.sleep(RandomUtil.randomInt(2, 8) * 1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }

            //结束运动
            String title = StrUtil.subBefore(file.getName(), '.', true);
            this.routeController.updateRoute(routeId, title);

            //投稿路线
            this.routeController.shareRoute(routeId);

        }

        try {
            Thread.sleep(10000); //等待异步操作的完成
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
