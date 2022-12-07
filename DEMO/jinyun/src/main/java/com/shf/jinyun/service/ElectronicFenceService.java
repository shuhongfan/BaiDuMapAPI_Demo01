package com.shf.jinyun.service;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.StrUtil;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.shf.jinyun.pojo.ElectronicFence;
import com.shf.jinyun.pojo.Vehicle;
import com.shf.jinyun.vo.ErrorResult;
import com.shf.jinyun.vo.PageResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ElectronicFenceService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private BaiduService baiduService;

    /**
     * 新增电子围栏
     *
     * @param electronicFence
     * @return
     */
    public Object createElectronicFence(ElectronicFence electronicFence) {
        //对数据做校验
        if (StrUtil.isEmpty(electronicFence.getName()) || CollUtil.isEmpty(electronicFence.getMutiPoints())) {
            return ErrorResult.builder()
                    .errCode("500")
                    .errMessage("电子围栏的名称或多边形的坐标为空！").build();
        }

        //调用百度地图的api创建电子围栏
        Long fenceId = this.baiduService.createElectronicFence(electronicFence);
        if (null == fenceId) {
            return ErrorResult.builder()
                    .errCode("501")
                    .errMessage("创建电子围栏失败！").build();
        }

        electronicFence.setFenceId(fenceId);
        electronicFence.setCreated(System.currentTimeMillis());
        this.mongoTemplate.save(electronicFence);

        return null;
    }

    /**
     * 电子围栏分页列表
     *
     * @param page
     * @param pageSize
     * @return
     */
    public Object queryElectronicFencePage(Integer page, Integer pageSize) {
        PageResult pageResult = new PageResult();
        pageResult.setPageNum(page);
        pageResult.setPagesize(pageSize);

        //分页查询数据
        PageRequest pageRequest = PageRequest.of(page - 1, pageSize, Sort.by(Sort.Order.desc("created")));

        List<ElectronicFence> electronicFenceList = this.mongoTemplate.find(new Query().with(pageRequest), ElectronicFence.class);
        pageResult.setItems(electronicFenceList);

        return pageResult;
    }

    /**
     * 电子围栏列表
     *
     * @return
     */
    public Object queryElectronicFenceAll() {
        List<ElectronicFence> electronicFenceList = this.mongoTemplate.find(new Query().with(Sort.by(Sort.Order.desc("created"))), ElectronicFence.class);
        if (CollUtil.isEmpty(electronicFenceList)) {
            return Collections.emptyList();
        }
        return electronicFenceList.stream()
                .map(electronicFence -> MapUtil.builder()
                        .put("id", electronicFence.getId().toString())
                        .put("name", electronicFence.getName()).build())
                .collect(Collectors.toList());
    }

    /**
     * 根据id查询电子围栏数据
     *
     * @param id
     * @return
     */
    public Object queryElectronicFenceById(String id) {
        return this.mongoTemplate.findById(new ObjectId(id), ElectronicFence.class);
    }

    /**
     * 更新电子围栏
     *
     * @param id
     * @param electronicFence
     * @return
     */
    public Object updateElectronicFence(String id, ElectronicFence electronicFence) {
        //根据id查询电子围栏数据
        ElectronicFence oldElectronicFence = (ElectronicFence) this.queryElectronicFenceById(id);

        //更新百度地图中的电子围栏数据
        Boolean result = this.baiduService.updateElectronicFence(oldElectronicFence.getFenceId(), electronicFence);
        if (!result) {
            return ErrorResult.builder()
                    .errCode("500")
                    .errMessage("更新百度地图电子围栏失败！").build();
        }

        //更新MongoDB中的数据
        Query query = Query.query(Criteria.where("id").is(new ObjectId(id)));
        Update update = Update.update("name", electronicFence.getName())
                .set("mutiPoints", electronicFence.getMutiPoints());

        UpdateResult updateResult = this.mongoTemplate.updateFirst(query, update, ElectronicFence.class);
        if (updateResult.getModifiedCount() == 1) {
            return null;
        }

        return ErrorResult.builder()
                .errCode("501")
                .errMessage("更新MongoDB电子围栏失败！").build();
    }

    /**
     * 根据id删除电子围栏
     *
     * @param id
     * @return
     */
    public Object deleteElectronicFence(String id) {
        //根据id查询电子围栏数据
        ElectronicFence oldElectronicFence = (ElectronicFence) this.queryElectronicFenceById(id);

        //删除百度地图中的电子围栏数据
        Boolean result = this.baiduService.deleteElectronicFence(oldElectronicFence.getFenceId());
        if (!result) {
            return ErrorResult.builder()
                    .errCode("500")
                    .errMessage("删除百度地图电子围栏失败！").build();
        }

        //删除MongoDB中的电子围栏数据
        Query query = Query.query(Criteria.where("id").is(new ObjectId(id)));
        DeleteResult deleteResult = this.mongoTemplate.remove(query, ElectronicFence.class);
        if (deleteResult.getDeletedCount() == 1) {
            return null;
        }

        return ErrorResult.builder()
                .errCode("501")
                .errMessage("删除MongoDB电子围栏失败！").build();
    }

    /**
     * 添加车辆到电子围栏中
     *
     * @param vehicle 车辆数据
     * @return
     */
    public Boolean addVehicleToElectronicFence(Vehicle vehicle) {
        //创建百度地图中的实体
        Boolean result = this.baiduService.createEntity(vehicle.getLicensePlate());
        if (!result) {
            return false;
        }

        //查询电子围栏数据
        ElectronicFence electronicFence = (ElectronicFence) this.queryElectronicFenceById(vehicle.getRailId());
        if (null == electronicFence) {
            return false;
        }

        //将车辆添加到电子围栏中
        return this.baiduService.addVehicleToElectronicFence(electronicFence.getFenceId(), vehicle.getLicensePlate());
    }

    /**
     * 校验车辆是否超出电子围栏
     *
     * @param railId       电子围栏id
     * @param licensePlate 车牌号
     * @return
     */
    public Boolean checkVehicleElectronicFence(String railId, String licensePlate) {
        //通过围栏id查询围栏对象
        ElectronicFence electronicFence = (ElectronicFence) this.queryElectronicFenceById(railId);
        Long fenceId = electronicFence.getFenceId();
        return this.baiduService.checkVehicleElectronicFence(fenceId, licensePlate);
    }
}
