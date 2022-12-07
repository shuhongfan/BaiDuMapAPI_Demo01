package com.shf.jinyun.controller;

import com.shf.jinyun.pojo.ElectronicFence;
import com.shf.jinyun.service.ElectronicFenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 电子围栏管理相关的业务功能
 */
@RequestMapping("electronicFence")
@RestController
public class ElectronicFenceController {

    @Autowired
    private ElectronicFenceService electronicFenceService;

    /**
     * 新增电子围栏
     *
     * @param electronicFence
     * @return
     */
    @PostMapping
    public Object createElectronicFence(@RequestBody ElectronicFence electronicFence) {
        return this.electronicFenceService.createElectronicFence(electronicFence);
    }

    /**
     * 更新电子围栏
     *
     * @param electronicFence
     * @return
     */
    @PutMapping("{id}")
    public Object updateElectronicFence(@PathVariable("id") String id,
                                        @RequestBody ElectronicFence electronicFence) {
        return this.electronicFenceService.updateElectronicFence(id, electronicFence);
    }

    /**
     * 删除电子围栏
     *
     * @return
     */
    @DeleteMapping("{id}")
    public Object deleteElectronicFence(@PathVariable("id") String id) {
        return this.electronicFenceService.deleteElectronicFence(id);
    }

    /**
     * 电子围栏分页列表
     *
     * @param page
     * @param pageSize
     * @return
     */
    @GetMapping("page")
    public Object queryElectronicFencePage(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                           @RequestParam(value = "pagesize", defaultValue = "1") Integer pageSize) {
        return this.electronicFenceService.queryElectronicFencePage(page, pageSize);
    }

    /**
     * 电子围栏列表
     *
     * @return
     */
    @GetMapping("all")
    public Object queryElectronicFenceAll() {
        return this.electronicFenceService.queryElectronicFenceAll();
    }

    /**
     * 查询电子围栏详情
     *
     * @param id
     * @return
     */
    @GetMapping("details/{id}")
    public Object queryElectronicFenceById(@PathVariable("id") String id) {
        return this.electronicFenceService.queryElectronicFenceById(id);
    }

}
