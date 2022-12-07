package com.shf.jinyun.controller;


import com.shf.jinyun.pojo.Vehicle;
import com.shf.jinyun.service.VehicleService;
import com.shf.jinyun.vo.VehicleQueryVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 车辆管理相关的业务功能
 */
@RequestMapping("vehicle")
@RestController
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    /**
     * 查询车辆列表
     *
     * @param vehicleQueryVo
     * @return
     */
    @GetMapping
    public Object queryVehicleList(VehicleQueryVo vehicleQueryVo){
        return this.vehicleService.queryVehicleList(vehicleQueryVo);
    }

    /**
     * 根据id查询车辆数据
     *
     * @param id 车辆id
     * @return
     */
    @GetMapping("details/{id}")
    public Object queryVehicleById(@PathVariable("id") String id){
        return this.vehicleService.queryVehicleById(id);
    }

    /**
     * 根据id删除车辆数据
     *
     * @param id 车辆id
     * @return
     */
    @DeleteMapping("{id}")
    public Object deleteVehicleById(@PathVariable("id") String id){
        return this.vehicleService.deleteVehicleById(id);
    }

    /**
     * 新增车辆
     *
     * @param vehicle 车辆数据
     * @return
     */
    @PostMapping
    public Object createVehicle(@RequestBody Vehicle vehicle){
        return this.vehicleService.createVehicle(vehicle);
    }
}
