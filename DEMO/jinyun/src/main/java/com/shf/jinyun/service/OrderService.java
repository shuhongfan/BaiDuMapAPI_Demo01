package com.shf.jinyun.service;


import com.shf.jinyun.pojo.Order;
import com.shf.jinyun.vo.OrderQueryParam;
import com.shf.jinyun.vo.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 查询订单列表（暂时简单的实现，不做多条件查询）
     *
     * @param orderQueryParam
     * @return
     */
    public PageResult queryOrderList(OrderQueryParam orderQueryParam) {
        PageRequest pageRequest = PageRequest.of(orderQueryParam.getPage() - 1,
                orderQueryParam.getPagesize(), Sort.by(Sort.Order.desc("orderTime")));

        PageResult pageResult = new PageResult();
        pageResult.setPageNum(orderQueryParam.getPage());
        pageResult.setPagesize(orderQueryParam.getPagesize());

        List<Order> orderList = this.mongoTemplate.find(new Query().with(pageRequest), Order.class);
        pageResult.setItems(orderList);

        return pageResult;
    }

    /**
     * 根据订单号查询订单数据
     *
     * @param orderNumber
     * @return
     */
    public Object queryOrderByOrderNumber(String orderNumber) {
        Query query = Query.query(Criteria.where("orderNumber").is(orderNumber));
        return this.mongoTemplate.findOne(query, Order.class);
    }
}
