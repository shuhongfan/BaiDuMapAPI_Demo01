package cn.itcast.baidumap.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class HouseSearchServiceTest {

    @Autowired
    private HouseSearchService houseSearchService;

    @Test
    public void search() {
        Double maxLongitude = 121.84924835674687;
        Double minLongitude = 121.11335648297293;
        Double maxLatitude = 31.27516459194276;
        Double minLatitude = 31.195131967625237;
        Double zoom = 12d;
        this.houseSearchService.search(maxLongitude, minLongitude, maxLatitude, minLatitude, zoom)
                .forEach(houseResultVo -> System.out.println(houseResultVo));
    }
}