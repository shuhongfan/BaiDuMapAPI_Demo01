package com.shf.jinyun.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WayBillQueryParam {

    private Integer page = 1;
    private Integer pagesize = 10;
    private String orderNumber;
    private String status;
    private String paymentStatus;
    private String senderName;
    private String senderphone;
    private String receiptName;
    private String receiptPhone;
    private String senderProvince;
    private String senderCity;
    private String senderDistrict;
    private String receiptProvince;
    private String receiptCity;
    private String receiptDistrict;

}
