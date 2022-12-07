package com.qingqi.vo;

import lombok.Data;

import java.util.Collections;
import java.util.List;

@Data
public class PageResult {

    private Integer pageNum = 0;
    private Integer pageSize = 0;
    private Long total = 0L;
    private List<?> records = Collections.emptyList();
}
