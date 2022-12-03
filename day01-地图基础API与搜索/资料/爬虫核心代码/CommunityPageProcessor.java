package cn.itcast.baidumap.wm;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import cn.itcast.baidumap.pojo.BusinessCircle;
import cn.itcast.baidumap.pojo.Community;
import cn.itcast.baidumap.pojo.District;
import cn.itcast.baidumap.util.BaiduApiUtil;
import org.bson.types.ObjectId;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.processor.PageProcessor;

public class CommunityPageProcessor implements PageProcessor {

    private District district;

    private BusinessCircle businessCircle;

    private MongoTemplate mongoTemplate;

    public CommunityPageProcessor(District district, BusinessCircle businessCircle, MongoTemplate mongoTemplate) {
        this.district = district;
        this.businessCircle = businessCircle;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public void process(Page page) {
        Document html = Jsoup.parse(page.getRawText()); //解析html
        Elements elements = html.select("div.info div.title a"); //获取数据链接对象
        for (Element element : elements) {
            Community community = new Community();
            community.setId(ObjectId.get());
            community.setName(element.text()); //获取小区名称
            community.setLianJiaUrl(element.attr("href")); //获取链接

            community.setBusinessCircleCode(this.businessCircle.getCode());
            community.setDistrictCode(this.district.getCode());
            String address = StrUtil.format("上海市{}{}{}",
                    this.district.getName(),
                    this.businessCircle.getName(),
                    community.getName());
            //通过百度地图api查询地址对应的经纬度
            double[] coordinate = BaiduApiUtil.queryCoordinateByAddress(address);
            community.setLocation(new GeoJsonPoint(coordinate[0], coordinate[1]));

            this.mongoTemplate.save(community);
        }

        //设置分页
        String pageData = html.select("div[page-data]").attr("page-data");
        JSONObject pageJson = JSONUtil.parseObj(pageData);
        Integer totalPage = pageJson.getInt("totalPage", 1);
        Integer curPage = pageJson.getInt("curPage", 1);
        if (curPage < totalPage) {
            String url = businessCircle.getLianJiaUrl() + "pg" + (curPage + 1);
            page.addTargetRequest(url);
        }
    }

    @Override
    public Site getSite() {
        //失败重试3次，每次抓取休息200毫秒
        return Site.me().setRetryTimes(3).setSleepTime(200);
    }

}
