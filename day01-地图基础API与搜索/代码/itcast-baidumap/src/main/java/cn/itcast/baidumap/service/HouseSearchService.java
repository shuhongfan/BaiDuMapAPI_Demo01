package cn.itcast.baidumap.service;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.NumberUtil;
import cn.itcast.baidumap.pojo.BusinessCircle;
import cn.itcast.baidumap.pojo.Community;
import cn.itcast.baidumap.pojo.District;
import cn.itcast.baidumap.pojo.House;
import cn.itcast.baidumap.vo.HouseResultVo;
import com.mongodb.internal.operation.AggregateOperation;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Box;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class HouseSearchService {

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 地图找房搜索服务
     *
     * @param maxLongitude 最大经度
     * @param minLongitude 最小经度
     * @param maxLatitude  最大纬度
     * @param minLatitude  最小纬度
     * @param zoom         地图缩放比例值
     * @return
     */
    public List<HouseResultVo> search(Double maxLongitude,
                                      Double minLongitude,
                                      Double maxLatitude,
                                      Double minLatitude,
                                      Double zoom) {

        //收集聚合查询条件
        List<AggregationOperation> operationList = new ArrayList<>();

        //在可视范围内搜索
        Box box = new Box(new double[]{maxLongitude, maxLatitude}, new double[]{minLongitude, minLatitude});
        MatchOperation matchOperation = Aggregation.match(Criteria.where("location").within(box));
        operationList.add(matchOperation);

        int type;
        GroupOperation groupOperation;
        //根据地图的缩放比例进行分组
        if (zoom < 13.5) { //2公里以上
            //按照行政区分组
            groupOperation = Aggregation.group("districtCode");
            type = 1;
        } else if (zoom < 15.5) { //200米以上
            //按照商圈分组
            groupOperation = Aggregation.group("businessCircleCode");
            type = 2;
        } else { //200以下
            //按照小区分组
            groupOperation = Aggregation.group("communityId");
            type = 3;
        }

        groupOperation = groupOperation.count().as("total")
                .avg("price").as("price");
        operationList.add(groupOperation);

        //生成最终的聚合条件
        Aggregation aggregation = Aggregation.newAggregation(operationList);

        //执行查询
        AggregationResults<HouseResultVo> aggregationResults = this.mongoTemplate.aggregate(aggregation, House.class, HouseResultVo.class);

        List<HouseResultVo> houseResultVoList = aggregationResults.getMappedResults();
        if (CollUtil.isEmpty(houseResultVoList)) {
            return Collections.emptyList();
        }

        //填充数据
        switch (type) {
            case 1: {
                //查询行政区数据
                for (HouseResultVo houseResultVo : houseResultVoList) {
                    District district = this.queryDistrictByCode(Convert.toInt(houseResultVo.getCode()));
                    houseResultVo.setName(district.getName());
                    houseResultVo.setLongitude(district.getLocation().getX());
                    houseResultVo.setLatitude(district.getLocation().getY());
                    //价格保留2位小数
                    houseResultVo.setPrice(NumberUtil.roundStr(houseResultVo.getPrice(), 2));
                }
                break;
            }
            case 2: {
                //查询商圈数据
                for (HouseResultVo houseResultVo : houseResultVoList) {
                    BusinessCircle businessCircle = this.queryBusinessCircleByCode(Convert.toInt(houseResultVo.getCode()));
                    houseResultVo.setName(businessCircle.getName());
                    houseResultVo.setLongitude(businessCircle.getLocation().getX());
                    houseResultVo.setLatitude(businessCircle.getLocation().getY());
                    //价格保留2位小数
                    houseResultVo.setPrice(NumberUtil.roundStr(houseResultVo.getPrice(), 2));
                }
                break;
            }
            case 3: {
                //查询小区数据
                for (HouseResultVo houseResultVo : houseResultVoList) {
                    Community community = this.queryCommunityById(new ObjectId(houseResultVo.getCode()));
                    houseResultVo.setName(community.getName());
                    houseResultVo.setLongitude(community.getLocation().getX());
                    houseResultVo.setLatitude(community.getLocation().getY());
                    //价格保留2位小数
                    houseResultVo.setPrice(NumberUtil.roundStr(houseResultVo.getPrice(), 2));
                }
                break;
            }
            default: {
                return Collections.emptyList();
            }
        }

        return houseResultVoList;
    }

    /**
     * 根据code查询行政区数据
     *
     * @param code
     * @return
     */
    private District queryDistrictByCode(Integer code) {
        Query query = Query.query(Criteria.where("code").is(code));
        return this.mongoTemplate.findOne(query, District.class);
    }

    /**
     * 根据code查询商圈数据
     *
     * @param code
     * @return
     */
    private BusinessCircle queryBusinessCircleByCode(Integer code) {
        Query query = Query.query(Criteria.where("code").is(code));
        return this.mongoTemplate.findOne(query, BusinessCircle.class);
    }

    /**
     * 根据code查询小区数据
     *
     * @return
     */
    private Community queryCommunityById(ObjectId id) {
        return this.mongoTemplate.findById(id, Community.class);
    }
}
