package com.jinyun.pojo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.jinyun.utils.ObjectIdSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tb_order")
public class Order {

    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;
    private String orderNumber; //订单编号
    private String waybillNumber;//运单编号
    //订单状态: 0为待取件,1为已取件，2为网点自寄，3为网点入库，4为待装车，5为运输中，6为网点出库，7为待派送，8为派送中，9为已签收，10为拒收，11为已取消
    private String status;
    private String orderTime; //下单时间
    private String estimatedArrivalTime; //预计到达时间
    private String senderName; //发件人姓名
    private String senderPhone; //发件人电话
    private String senderAddress; //发件人地址
    private Province senderProvince; //发件人省
    private City senderCity; //发件人市
    private County senderCounty; //发件人区、县

    private String receiverName; //收件人姓名
    private Province receiverProvince; //收件人省
    private City receiverCity; //收件人市
    private County receiverCounty; //收件人县
    private String receiverPhone; //收件人电话
    private String receiverAdress; //收件人地址
    private String deliverytype; //取件类型，1为网点自寄，2为上门取件
    private String payType; //付款方式,1.预结2到付
    private String paymentStatus; //付款状态,1.未付2已付
    private String amount; //运费


}
