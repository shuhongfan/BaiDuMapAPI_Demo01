package com.shf.jinyun.service;

import cn.hutool.core.date.DateUtil;
import com.shf.jinyun.pojo.City;
import com.shf.jinyun.pojo.County;
import com.shf.jinyun.pojo.Province;
import com.shf.jinyun.pojo.WayBill;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

@SpringBootTest
@RunWith(SpringRunner.class)
public class TestWayBillService {
    @Autowired
    private MongoTemplate mongoTemplate;

    // @Autowired
    // private WayBillService wayBillService;

    @Test
    public void testCreateWayBill() {
        //插入订单的测试数据
        WayBill wayBill = new WayBill();
        wayBill.setOrderTime(DateUtil.formatDateTime(new Date()));
        wayBill.setOrderNumber("O202108161001");
        wayBill.setDeliverytype("2");
        wayBill.setEstimatedArrivalTime("2021-08-20");
        wayBill.setPaymentStatus("2");
        wayBill.setPayType("1");
        wayBill.setReceiverAdress("航头镇航都路18号");
        wayBill.setReceiverProvince(this.mongoTemplate.findOne(Query.query(Criteria.where("name").is("上海")), Province.class));
        wayBill.setReceiverCity(this.mongoTemplate.findOne(Query.query(Criteria.where("name").is("上海")), City.class));
        wayBill.setReceiverCounty(this.mongoTemplate.findOne(Query.query(Criteria.where("name").is("浦东新区")), County.class));
        wayBill.setReceiverName("张三");
        wayBill.setReceiverPhone("13888888888");
        wayBill.setSenderAddress("建材城西路金燕龙办公楼");
        wayBill.setSenderName("李四");
        wayBill.setSenderPhone("13999999999");
        wayBill.setSenderProvince(this.mongoTemplate.findOne(Query.query(Criteria.where("name").is("北京")), Province.class));
        wayBill.setSenderCity(this.mongoTemplate.findOne(Query.query(Criteria.where("name").is("北京")), City.class));
        wayBill.setSenderCounty(this.mongoTemplate.findOne(Query.query(Criteria.where("name").is("昌平区")), County.class));
        wayBill.setWaybillNumber("Y202108161001");
        wayBill.setStatus("1");
        this.mongoTemplate.save(wayBill);

        wayBill = new WayBill();
        wayBill.setOrderTime(DateUtil.formatDateTime(new Date()));
        wayBill.setOrderNumber("O202108161002");
        wayBill.setDeliverytype("2");
        wayBill.setEstimatedArrivalTime("2021-08-20");
        wayBill.setPaymentStatus("2");
        wayBill.setPayType("1");
        wayBill.setReceiverAdress("青龙路传智教育科创园");
        wayBill.setReceiverProvince(this.mongoTemplate.findOne(Query.query(Criteria.where("name").is("湖北")), Province.class));
        wayBill.setReceiverCity(this.mongoTemplate.findOne(Query.query(Criteria.where("name").is("武汉")), City.class));
        wayBill.setReceiverCounty(this.mongoTemplate.findOne(Query.query(Criteria.where("name").is("长江新城区")), County.class));
        wayBill.setReceiverName("王五");
        wayBill.setReceiverPhone("13666666666");
        wayBill.setSenderAddress("建材城西路金燕龙办公楼");
        wayBill.setSenderName("李四");
        wayBill.setSenderPhone("13999999999");
        wayBill.setSenderProvince(this.mongoTemplate.findOne(Query.query(Criteria.where("name").is("北京")), Province.class));
        wayBill.setSenderCity(this.mongoTemplate.findOne(Query.query(Criteria.where("name").is("北京")), City.class));
        wayBill.setSenderCounty(this.mongoTemplate.findOne(Query.query(Criteria.where("name").is("昌平区")), County.class));
        wayBill.setWaybillNumber("Y202108161002");
        wayBill.setStatus("1");
        this.mongoTemplate.save(wayBill);

        wayBill = new WayBill();
        wayBill.setOrderTime(DateUtil.formatDateTime(new Date()));
        wayBill.setOrderNumber("O202108161003");
        wayBill.setDeliverytype("2");
        wayBill.setEstimatedArrivalTime("2021-08-20");
        wayBill.setPaymentStatus("2");
        wayBill.setPayType("1");
        wayBill.setReceiverAdress("青龙路传智教育科创园");
        wayBill.setReceiverProvince(this.mongoTemplate.findOne(Query.query(Criteria.where("name").is("湖北")), Province.class));
        wayBill.setReceiverCity(this.mongoTemplate.findOne(Query.query(Criteria.where("name").is("武汉")), City.class));
        wayBill.setReceiverCounty(this.mongoTemplate.findOne(Query.query(Criteria.where("name").is("长江新城区")), County.class));
        wayBill.setReceiverName("王五");
        wayBill.setReceiverPhone("13666666666");
        wayBill.setSenderAddress("航头镇航都路18号");
        wayBill.setSenderName("张三");
        wayBill.setSenderPhone("1311111111");
        wayBill.setSenderProvince(this.mongoTemplate.findOne(Query.query(Criteria.where("name").is("上海")), Province.class));
        wayBill.setSenderCity(this.mongoTemplate.findOne(Query.query(Criteria.where("name").is("上海")), City.class));
        wayBill.setSenderCounty(this.mongoTemplate.findOne(Query.query(Criteria.where("name").is("浦东新区")), County.class));
        wayBill.setWaybillNumber("Y202108161003");
        wayBill.setStatus("1");
        this.mongoTemplate.save(wayBill);
    }


    @Test
    public void testQueryWaybillTrack(){
        // this.wayBillService.queryWaybillTrack("Y202108161001");
    }
}
