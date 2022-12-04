package com.jinyun.service;

import com.jinyun.vo.LocationNamePoint;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class VehicleServiceTest {

    @Autowired
    private VehicleService vehicleService;

    @Test
    public void updateLocation() {
        String id = "614de7e315834847d35cf655";
        LocationNamePoint locationNamePoint = new LocationNamePoint();
        locationNamePoint.setLng("116.306021");
        locationNamePoint.setLat("40.138062");
        locationNamePoint.setName("北京市昌平区沙河镇南门大道(巩华城地铁站东侧)");

        Boolean result = this.vehicleService.updateLocation(id, locationNamePoint);
        System.out.println(result);
    }
}