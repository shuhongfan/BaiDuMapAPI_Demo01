package com.jinyun.service;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.convert.Convert;
import com.jinyun.pojo.Vehicle;
import com.jinyun.vo.*;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VehicleService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private ElectronicFenceService electronicFenceService;

    @Autowired
    private BaiduService baiduService;

    /**
     * 查询车辆列表
     *
     * @param vehicleQueryVo
     * @return
     */
    public Object queryVehicleList(VehicleQueryVo vehicleQueryVo) {
        PageResult pageResult = new PageResult();
        pageResult.setPageNum(vehicleQueryVo.getPage());
        pageResult.setPagesize(vehicleQueryVo.getPagesize());

        //查询MongoDB
        PageRequest pageRequest = PageRequest.of(vehicleQueryVo.getPage() - 1,
                vehicleQueryVo.getPagesize(), Sort.by(Sort.Order.desc("created")));
        Query query = new Query().with(pageRequest);
        List<Vehicle> vehicleList = this.mongoTemplate.find(query, Vehicle.class);
        if (CollUtil.isEmpty(vehicleList)) {
            return pageResult;
        }

        //TODO 查询百度地图接口服务，车辆是否超出电子围栏范围
        List<VehicleVo> vehicleVoList = new ArrayList<>();
        vehicleList.forEach(vehicle -> {
            VehicleVo vehicleVo = VehicleVo.convert(vehicle);

            //查询是否超出电子围栏范围
            Boolean result = this.electronicFenceService.checkVehicleElectronicFence(vehicleVo.getRailId(), vehicleVo.getLicensePlate());
            vehicleVo.setWarn(result ? "1" : "0");

            vehicleVoList.add(vehicleVo);
        });


        pageResult.setItems(vehicleVoList);
        return pageResult;
    }

    /**
     * 新增车辆
     *
     * @param vehicle 车辆数据
     * @return
     */
    public Object createVehicle(Vehicle vehicle) {
        //校验车辆是否存在，通过车牌号进行校验
        Query query = Query.query(Criteria.where("licensePlate").is(vehicle.getLicensePlate()));
        if (this.mongoTemplate.count(query, Vehicle.class) > 0) {
            return ErrorResult.builder()
                    .errCode("500")
                    .errMessage("该车牌的车辆已经存在，请勿重复添加！").build();
        }

        //将车辆注册到百度鹰眼服务中，并且将其添加到电子围栏中
        Boolean result = this.electronicFenceService.addVehicleToElectronicFence(vehicle);
        if (!result) {
            return ErrorResult.builder()
                    .errCode("501")
                    .errMessage("添加车辆到百度地图服务中失败！").build();
        }

        //将数据保存到MongoDB中
        vehicle.setCreated(System.currentTimeMillis());
        vehicle.setUpdated(vehicle.getCreated());
        this.mongoTemplate.save(vehicle);

        return null;
    }

    /**
     * 更新车辆位置
     *
     * @param id              车辆id
     * @param currentPosition 当前车辆的位置
     * @return
     */
    public Boolean updateLocation(String id, LocationNamePoint currentPosition) {
        Vehicle vehicle = this.queryVehicleById(id);

        //将位置上报给百度鹰眼服务
        RunParamVo runParamVo = new RunParamVo();
        runParamVo.setSpeed(100d);//TODO 速度
        runParamVo.setLongitude(Convert.toDouble(currentPosition.getLng()));
        runParamVo.setLatitude(Convert.toDouble(currentPosition.getLat()));
        Boolean result = this.baiduService.uploadLocation(vehicle.getLicensePlate(), runParamVo);
        if (!result) {
            return false;
        }

        //位置数据存储到车辆表中
        Query query = Query.query(Criteria.where("id").is(new ObjectId(id)));
        Update update = Update.update("currentPosition", currentPosition)
                .set("updated", System.currentTimeMillis());
        UpdateResult updateResult = this.mongoTemplate.updateFirst(query, update, Vehicle.class);

        return updateResult.getModifiedCount() == 1;
    }

    /**
     * 根据id查询车辆数据
     *
     * @param id
     * @return
     */
    public Vehicle queryVehicleById(String id) {
        return this.mongoTemplate.findById(new ObjectId(id), Vehicle.class);
    }

    /**
     * 根据id删除车辆数据
     *
     * @param id 车辆id
     * @return
     */
    public Object deleteVehicleById(String id) {
        Vehicle vehicle = this.queryVehicleById(id);
        //删除百度鹰眼服务中的数据
        boolean result = this.baiduService.deleteEntity(vehicle.getLicensePlate());
        if (result) {
            //删除MongoDB中的数据
            Query query = Query.query(Criteria.where("id").is(new ObjectId(id)));
            DeleteResult deleteResult = this.mongoTemplate.remove(query, Vehicle.class);
            return deleteResult.getDeletedCount() == 1;
        }

        return ErrorResult.builder()
                .errCode("500")
                .errMessage("删除车辆失败！").build();
    }
}
