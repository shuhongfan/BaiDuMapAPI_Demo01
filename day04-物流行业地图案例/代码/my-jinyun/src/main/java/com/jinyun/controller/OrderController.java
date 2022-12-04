package com.jinyun.controller;

import com.jinyun.service.OrderService;
import com.jinyun.vo.OrderQueryParam;
import com.jinyun.vo.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    /**
     * 查询订单列表
     *
     * @param orderQueryParam
     * @return
     */
    @GetMapping
    public PageResult queryOrderList(OrderQueryParam orderQueryParam){
        return this.orderService.queryOrderList(orderQueryParam);
    }

    /**
     * 根据订单号查询订单数据（前端会根据订单中的发件人和收件人的地址进行路线规划的展现）
     *
     * @param orderNumber
     * @return
     */
    @GetMapping("{orderId}")
    public Object queryOrderByOrderNumber(@PathVariable("orderId")String orderNumber ){
        return this.orderService.queryOrderByOrderNumber(orderNumber);
    }
}
