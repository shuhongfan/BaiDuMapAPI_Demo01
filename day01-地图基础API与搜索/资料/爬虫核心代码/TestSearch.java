package cn.itcast.baidumap;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.RandomUtil;
import cn.hutool.core.util.StrUtil;
import cn.itcast.baidumap.pojo.BusinessCircle;
import cn.itcast.baidumap.pojo.Community;
import cn.itcast.baidumap.pojo.District;
import cn.itcast.baidumap.pojo.House;
import cn.itcast.baidumap.service.HouseSearchService;
import cn.itcast.baidumap.util.BaiduApiUtil;
import cn.itcast.baidumap.vo.HouseResultVo;
import cn.itcast.baidumap.wm.CommunityPageProcessor;
import org.bson.types.ObjectId;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.test.context.junit4.SpringRunner;
import us.codecraft.webmagic.Spider;

import java.util.List;

@SpringBootTest
@RunWith(SpringRunner.class)
public class TestSearch {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private HouseSearchService houseSearchService;

    @Test //构造上海市区数据
    public void testCreateDistrictData() {
        String data = "崇明,121.39758,31.62278,1016|奉贤,121.47412,30.9179,1015|青浦,121.12417,31.14974,1014|松江,121.22879,31.03222,1013|金山,121.34164,30.74163,1012|浦东,121.5447,31.22249,1011|嘉定,121.2655,31.37473,1010|宝山,121.4891,31.4045,1009|闵行,121.38162,31.11246,1008|杨浦,121.526,31.2595,1007|虹口,121.48162,31.27788,1006|普陀,121.39703,31.24951,1005|静安,121.4444,31.22884,1004|长宁,121.42462,31.22036,1003|徐汇,121.43676,31.18831,1002|黄浦,121.49295,31.22337,1001";
        String[] array = StrUtil.splitToArray(data, '|');
        for (String str : array) {
            String[] ss = StrUtil.splitToArray(str, ',');
            District district = new District();
            district.setId(ObjectId.get());
            district.setName(ss[0]);
            district.setCode(Convert.toInt(ss[3]));
            district.setLocation(new GeoJsonPoint(Convert.toDouble(ss[1]), Convert.toDouble(ss[2])));
            this.mongoTemplate.save(district);
            System.out.println(str);
        }
    }

    @Test //构造商圈数据
    public void testCreateTownData() {
        String data = "/xiaoqu/beicai/,北蔡,101101|/xiaoqu/biyun/,碧云,101102|/xiaoqu/caolu/,曹路,101103|/xiaoqu/chuansha/,川沙,101104|/xiaoqu/datuanzhen/,大团镇,101105|/xiaoqu/gaodong/,高东,101106|/xiaoqu/gaohang/,高行,101107|/xiaoqu/geqing/,合庆,101108|/xiaoqu/hangtou/,航头,101109|/xiaoqu/huamu/,花木,101110|/xiaoqu/huinan/,惠南,101111|/xiaoqu/jinqiao/,金桥,101112|/xiaoqu/jinyang/,金杨,101113|/xiaoqu/kangqiao/,康桥,101114|/xiaoqu/laogangzhen/,老港镇,101115|/xiaoqu/lianyang/,联洋,101116|/xiaoqu/lingangxincheng/,临港新城,101117|/xiaoqu/lujiazui/,陆家嘴,101118|/xiaoqu/meiyuan1/,梅园,101119|/xiaoqu/nanmatou/,南码头,101120|/xiaoqu/nichengzhen/,泥城镇,101121|/xiaoqu/sanlin/,三林,101122|/xiaoqu/shibo/,世博,101123|/xiaoqu/shuyuanzhen/,书院镇,101124|/xiaoqu/tangqiao/,塘桥,101125|/xiaoqu/tangzhen/,唐镇,101126|/xiaoqu/waigaoqiao/,外高桥,101127|/xiaoqu/wanxiangzhen/,万祥镇,101128|/xiaoqu/weifang/,潍坊,101129|/xiaoqu/xinchang/,新场,101130|/xiaoqu/xuanqiao/,宣桥,101131|/xiaoqu/yangdong/,杨东,101132|/xiaoqu/yangjing/,洋泾,101133|/xiaoqu/yangsiqiantan/,杨思前滩,101134|/xiaoqu/yuanshen/,源深,101135|/xiaoqu/yuqiao1/,御桥,101136|/xiaoqu/zhangjiang/,张江,101137|/xiaoqu/zhoupu/,周浦,101138|/xiaoqu/zhuqiao/,祝桥,101139|/xiaoqu/chunshen/,春申,100801|/xiaoqu/gumei/,古美,100802|/xiaoqu/hanghua/,航华,100803|/xiaoqu/huacao/,华漕,100804|/xiaoqu/jinganxincheng/,静安新城,100805|/xiaoqu/jinhongqiao/,金虹桥,100806|/xiaoqu/jinhui/,金汇,100807|/xiaoqu/laominhang/,老闵行,100808|/xiaoqu/longbai/,龙柏,100809|/xiaoqu/maqiao/,马桥,100810|/xiaoqu/meilong/,梅陇,100811|/xiaoqu/minpu/,闵浦,100812|/xiaoqu/pujiang1/,浦江,100813|/xiaoqu/qibao/,七宝,100814|/xiaoqu/wujing/,吴泾,100815|/xiaoqu/xinzhuang5/,莘庄,100816|/xiaoqu/zhuanqiao/,颛桥,100817|/xiaoqu/dachangzhen/,大场镇,100901|/xiaoqu/dahua/,大华,100902|/xiaoqu/gaojing/,高境,100903|/xiaoqu/gongfu/,共富,100904|/xiaoqu/gongkang/,共康,100905|/xiaoqu/gucun/,顾村,100906|/xiaoqu/luodian/,罗店,100907|/xiaoqu/luojing/,罗泾,100908|/xiaoqu/shangda/,上大,100909|/xiaoqu/songbao/,淞宝,100910|/xiaoqu/songnan/,淞南,100911|/xiaoqu/tonghe/,通河,100912|/xiaoqu/yanghang/,杨行,100913|/xiaoqu/yuepu/,月浦,100914|/xiaoqu/zhangmiao/,张庙,100915|/xiaoqu/caohejing/,漕河泾,100201|/xiaoqu/changqiao/,长桥,100202|/xiaoqu/hengshanlu/,衡山路,100203|/xiaoqu/huadongligong/,华东理工,100204|/xiaoqu/huajing/,华泾,100205|/xiaoqu/jianguoxilu/,建国西路,100206|/xiaoqu/kangjian/,康健,100207|/xiaoqu/longhua/,龙华,100208|/xiaoqu/shanghainanzhan/,上海南站,100209|/xiaoqu/tianlin/,田林,100210|/xiaoqu/wantiguan/,万体馆,100211|/xiaoqu/xietulu/,斜土路,100212|/xiaoqu/xuhuibinjiang/,徐汇滨江,100213|/xiaoqu/xujiahui/,徐家汇,100214|/xiaoqu/zhiwuyuan/,植物园,100215|/xiaoqu/caoyang/,曹杨,100501|/xiaoqu/changfeng1/,长风,100502|/xiaoqu/changshoulu/,长寿路,100503|/xiaoqu/changzheng/,长征,100504|/xiaoqu/ganquanyichuan/,甘泉宜川,100505|/xiaoqu/guangxin/,光新,100506|/xiaoqu/taopu/,桃浦,100507|/xiaoqu/wanli/,万里,100508|/xiaoqu/wuning/,武宁,100509|/xiaoqu/zhenguang/,真光,100510|/xiaoqu/zhenru/,真如,100511|/xiaoqu/zhongyuanliangwancheng/,中远两湾城,100512|/xiaoqu/anshan/,鞍山,100701|/xiaoqu/dongwaitan/,东外滩,100702|/xiaoqu/huangxinggongyuan/,黄兴公园,100703|/xiaoqu/kongjianglu/,控江路,100704|/xiaoqu/wujiaochang/,五角场,100705|/xiaoqu/xinjiangwancheng/,新江湾城,100706|/xiaoqu/zhongyuan1/,中原,100707|/xiaoqu/zhoujiazuilu/,周家嘴路,100708|/xiaoqu/beixinjing/,北新泾,100301|/xiaoqu/gubei/,古北,100302|/xiaoqu/hongqiao1/,虹桥,100303|/xiaoqu/tianshan/,天山,100304|/xiaoqu/xianxia/,仙霞,100305|/xiaoqu/xijiao/,西郊,100306|/xiaoqu/xinhualu/,新华路,100307|/xiaoqu/zhenninglu/,镇宁路,100308|/xiaoqu/zhongshangongyuan/,中山公园,100309|/xiaoqu/chedun/,车墩,101301|/xiaoqu/jiuting/,九亭,101302|/xiaoqu/maogang/,泖港,101303|/xiaoqu/shenminbieshu/,莘闵别墅,101304|/xiaoqu/sheshan/,佘山,101305|/xiaoqu/shihudang/,石湖荡,101306|/xiaoqu/sijing/,泗泾,101307|/xiaoqu/songjiangdaxuecheng/,松江大学城,101308|/xiaoqu/songjianglaocheng/,松江老城,101309|/xiaoqu/songjiangxincheng/,松江新城,101310|/xiaoqu/xiaokunshan/,小昆山,101311|/xiaoqu/xinbang/,新浜,101312|/xiaoqu/xinqiao/,新桥,101313|/xiaoqu/yexie/,叶榭,101314|/xiaoqu/anting/,安亭,101001|/xiaoqu/fengzhuang/,丰庄,101002|/xiaoqu/huating/,华亭,101003|/xiaoqu/jiadinglaocheng/,嘉定老城,101004|/xiaoqu/jiadingxincheng/,嘉定新城,101005|/xiaoqu/jiangqiao/,江桥,101006|/xiaoqu/juyuanxinqu/,菊园新区,101007|/xiaoqu/malu/,马陆,101008|/xiaoqu/nanxiang/,南翔,101009|/xiaoqu/waigang/,外冈,101010|/xiaoqu/xinchenglu1/,新成路,101011|/xiaoqu/xuxing/,徐行,101012|/xiaoqu/dapuqiao/,打浦桥,100101|/xiaoqu/dongjiadu/,董家渡,100102|/xiaoqu/huaihaizhonglu/,淮海中路,100103|/xiaoqu/huangpubinjiang/,黄浦滨江,100104|/xiaoqu/laoximen/,老西门,100105|/xiaoqu/nanjingdonglu/,南京东路,100106|/xiaoqu/penglaigongyuan/,蓬莱公园,100107|/xiaoqu/renminguangchang/,人民广场,100108|/xiaoqu/shibobinjiang/,世博滨江,100109|/xiaoqu/wuliqiao/,五里桥,100110|/xiaoqu/xintiandi/,新天地,100111|/xiaoqu/yuyuan/,豫园,100112|/xiaoqu/buyecheng/,不夜城,100401|/xiaoqu/caojiadu/,曹家渡,100402|/xiaoqu/daning/,大宁,100403|/xiaoqu/jiangninglu/,江宁路,100404|/xiaoqu/jingansi/,静安寺,100405|/xiaoqu/nanjingxilu/,南京西路,100406|/xiaoqu/pengpu/,彭浦,100407|/xiaoqu/xizangbeilu/,西藏北路,100408|/xiaoqu/yangcheng/,阳城,100409|/xiaoqu/yonghe/,永和,100410|/xiaoqu/zhabeigongyuan/,闸北公园,100411|/xiaoqu/beiwaitan/,北外滩,100601|/xiaoqu/jiangwanzhen/,江湾镇,100602|/xiaoqu/liangcheng/,凉城,100603|/xiaoqu/linpinglu/,临平路,100604|/xiaoqu/luxungongyuan/,鲁迅公园,100605|/xiaoqu/quyang/,曲阳,100606|/xiaoqu/sichuanbeilu/,四川北路,100607|/xiaoqu/baihe/,白鹤,101401|/xiaoqu/chonggu/,重固,101402|/xiaoqu/huaxin/,华新,101403|/xiaoqu/jinze/,金泽,101404|/xiaoqu/liantang1/,练塘,101405|/xiaoqu/xianghuaqiao/,香花桥,101406|/xiaoqu/xiayang/,夏阳,101407|/xiaoqu/xujing/,徐泾,101408|/xiaoqu/yingpu/,盈浦,101409|/xiaoqu/zhaoxiang/,赵巷,101410|/xiaoqu/zhujiajiao/,朱家角,101411|/xiaoqu/fengcheng/,奉城,101501|/xiaoqu/fengxianjinhui/,奉贤金汇,101502|/xiaoqu/haiwan/,海湾,101503|/xiaoqu/nanqiao/,南桥,101504|/xiaoqu/qingcun/,青村,101505|/xiaoqu/situan/,四团,101506|/xiaoqu/xidu/,西渡,101507|/xiaoqu/zhelin/,柘林,101508|/xiaoqu/zhuanghang/,庄行,101509|/xiaoqu/jinshan5/,金山,101201|/xiaoqu/baozhen/,堡镇,101601|/xiaoqu/changxingdao21211/,长兴岛,101602|/xiaoqu/chenjiazhen/,陈家镇,101603|/xiaoqu/chongmingqita/,崇明其它,101604|/xiaoqu/chongmingxincheng/,崇明新城,101605|/xiaoqu/hengshadao/,横沙岛,101606";
        String[] array = StrUtil.splitToArray(data, '|');
        for (String str : array) {
            String[] ss = StrUtil.splitToArray(str, ',');
            BusinessCircle businessCircle = new BusinessCircle();
            businessCircle.setId(ObjectId.get());
            businessCircle.setCode(Convert.toInt(ss[2]));
            businessCircle.setName(ss[1]);
            businessCircle.setDistrictCode(Convert.toInt(StrUtil.sub(ss[2], 0, 4)));
            businessCircle.setLianJiaUrl("https://sh.lianjia.com" + ss[0]);

            //查询区
            Query query = Query.query(Criteria.where("code").is(businessCircle.getDistrictCode()));
            District district = this.mongoTemplate.findOne(query, District.class);

            double[] coordinate = BaiduApiUtil.queryCoordinateByAddress("上海市" + district.getName() + "区" + businessCircle.getName());
            businessCircle.setLocation(new GeoJsonPoint(coordinate[0], coordinate[1]));
            System.out.println(businessCircle);

            this.mongoTemplate.save(businessCircle);
        }
    }

    /**
     * 抓取链家网小区数据
     */
    @Test
    public void testCreateCommunityData() {
        List<District> districtList = this.mongoTemplate.findAll(District.class);
        for (District district : districtList) {
            Query query = Query.query(Criteria.where("districtCode").is(district.getCode()));
            List<BusinessCircle> businessCircleList = this.mongoTemplate.find(query, BusinessCircle.class);
            for (BusinessCircle businessCircle : businessCircleList) {
                Spider.create(new CommunityPageProcessor(district, businessCircle, this.mongoTemplate))
                        .addUrl(businessCircle.getLianJiaUrl())
                        .thread(3)
                        .run();
            }
        }
    }


    @Test
    public void testCreateHouseData() {
        //获取所有的小区数据
        List<Community> communityList = this.mongoTemplate.findAll(Community.class);
        for (Community community : communityList) {
            //每个小区随机构造1~20个房源数据
            for (int i = 0; i < RandomUtil.randomInt(1, 20); i++) {
                House house = new House();
                house.setId(ObjectId.get());
                house.setLocation(community.getLocation());
                house.setDistrictCode(community.getDistrictCode());
                house.setCreated(System.currentTimeMillis());
                house.setCommunityId(community.getId());
                house.setTitle(community.getName() + "房源" + i);
                house.setPrice(Convert.toDouble(RandomUtil.randomInt(50, 2000)));
                house.setBusinessCircleCode(community.getBusinessCircleCode());
                System.out.println(house);
                this.mongoTemplate.save(house);
            }
        }
    }

    @Test
    public void testSearch(){
        Double maxLongitude = 121.84924835674687;
        Double minLongitude = 121.11335648297293;
        Double maxLatitude = 31.27590531475994;
        Double minLatitude = 31.19439060496152;
        Double zoom = 12d;
        this.houseSearchService
                .search(maxLongitude, minLongitude, maxLatitude, minLatitude, zoom)
        .forEach(houseResultVo -> System.out.println(houseResultVo));

    }


}
