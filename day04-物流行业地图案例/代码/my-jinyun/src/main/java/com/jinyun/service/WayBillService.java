package com.jinyun.service;

import cn.hutool.core.util.StrUtil;
import com.jinyun.pojo.Order;
import com.jinyun.pojo.WayBill;
import com.jinyun.vo.LocationPoint;
import com.jinyun.vo.PageResult;
import com.jinyun.vo.WayBillQueryParam;
import com.jinyun.vo.WaybillTrack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WayBillService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private BaiduService baiduService;

    /**
     * 查询运单列表
     *
     * @param wayBillQueryParam
     * @return
     */
    public PageResult queryWayBillList(WayBillQueryParam wayBillQueryParam) {
        PageRequest pageRequest = PageRequest.of(wayBillQueryParam.getPage() - 1,
                wayBillQueryParam.getPagesize(), Sort.by(Sort.Order.desc("orderTime")));

        PageResult pageResult = new PageResult();
        pageResult.setPageNum(wayBillQueryParam.getPage());
        pageResult.setPagesize(wayBillQueryParam.getPagesize());

        List<WayBill> wayBillList = this.mongoTemplate.find(new Query().with(pageRequest), WayBill.class);
        pageResult.setItems(wayBillList);

        return pageResult;
    }

    /**
     * 根据运单号查询运单数据
     *
     * @param waybillNumber 运单号
     * @return
     */
    public WayBill queryWayBillByWayNumber(String waybillNumber) {
        Query query = Query.query(Criteria.where("waybillNumber").is(waybillNumber));
        return this.mongoTemplate.findOne(query, WayBill.class);
    }

    /**
     * 查询运单的轨迹数据
     *
     * @param waybillNumber
     * @return
     */
    public Object queryWayBillTrack(String waybillNumber) {
        //根据运单号查询运单详情
        WayBill wayBill = this.queryWayBillByWayNumber(waybillNumber);

        //获取发件人的详细地址
        String senderAddress = StrUtil.format("{}{}{}{}",
                wayBill.getSenderProvince().getName(),
                wayBill.getSenderCity().getName(),
                wayBill.getSenderCounty().getName(),
                wayBill.getSenderAddress());

        //通过百度地图的api查询地址对应的经纬度数据
        double[] senderLocationPoint = this.baiduService.queryGeoByAddress(senderAddress);
        if (senderLocationPoint == null) {
            return null;
        }

        // 获取收件人的详细地址
        String receiverAdress = StrUtil.format("{}{}{}{}",
                wayBill.getReceiverProvince().getName(),
                wayBill.getReceiverCity().getName(),
                wayBill.getReceiverCounty().getName(),
                wayBill.getReceiverAdress());
        double[] receiverLocationPoint = this.baiduService.queryGeoByAddress(receiverAdress);
        if (receiverLocationPoint == null) {
            return null;
        }

        //根据收件人、发件人的坐标数据，路线规划
        String wayPoints = "32.069058,118.797248"; //途经点

        List<LocationPoint> locationPointList = this.baiduService
                .queryTrackRoute(senderLocationPoint, receiverLocationPoint, wayPoints);
        if (null == locationPointList) {
            return null;
        }

        WaybillTrack waybillTrack = new WaybillTrack();
        waybillTrack.setLocationPointList(locationPointList);
        waybillTrack.setLicensePlate("沪A12345");
        waybillTrack.setVehicleInformation(new LocationPoint("39.559386", "116.673904"));

        return waybillTrack;

    }
}
