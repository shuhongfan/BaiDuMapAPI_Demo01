package com.jinyun.controller;

import com.jinyun.service.WayBillService;
import com.jinyun.vo.PageResult;
import com.jinyun.vo.WayBillQueryParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("waybill")
@RestController
public class WayBillController {

    @Autowired
    private WayBillService wayBillService;

    /**
     * 查询运单列表
     *
     * @param wayBillQueryParam
     * @return
     */
    @GetMapping
    public PageResult queryWayBillList(WayBillQueryParam wayBillQueryParam) {
        return this.wayBillService.queryWayBillList(wayBillQueryParam);
    }

    /**
     * 根据运单号查询运单数据
     *
     * @param waybillNumber 运单号
     * @return
     */
    @GetMapping("{waybillNumber}")
    public Object queryWayBillByOrderNumber(@PathVariable("waybillNumber") String waybillNumber) {
        return this.wayBillService.queryWayBillByWayNumber(waybillNumber);
    }

    /**
     * 查询运单的轨迹数据
     *
     * @param waybillNumber
     * @return
     */
    @GetMapping("track/{waybillNumber}")
    public Object queryWayBillTrack(@PathVariable("waybillNumber") String waybillNumber) {
        return this.wayBillService.queryWayBillTrack(waybillNumber);
    }

}
