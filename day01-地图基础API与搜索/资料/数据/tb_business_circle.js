db.getCollection("tb_business_circle").drop();
db.createCollection("tb_business_circle");
db.getCollection("tb_business_circle").createIndex({
    code: NumberInt("1")
}, {
    name: "code"
});
db.getCollection("tb_business_circle").createIndex({
    location: "2dsphere"
}, {
    name: "location"
});
db.getCollection("tb_business_circle").createIndex({
    districtCode: NumberInt("1")
}, {
    name: "districtCode"
});

// ----------------------------
// Documents of tb_business_circle
// ----------------------------
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d1cd97ac65a7a42957"),
    name: "北蔡",
    code: NumberInt("101101"),
    location: {
        type: "Point",
        coordinates: [
            121.560234099597,
            31.1835077858217
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/beicai/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d1cd97ac65a7a42958"),
    name: "碧云",
    code: NumberInt("101102"),
    location: {
        type: "Point",
        coordinates: [
            121.906588365246,
            30.9111106906634
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/biyun/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d1cd97ac65a7a42959"),
    name: "曹路",
    code: NumberInt("101103"),
    location: {
        type: "Point",
        coordinates: [
            121.480538860177,
            31.235929042252
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/caolu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d1cd97ac65a7a4295a"),
    name: "川沙",
    code: NumberInt("101104"),
    location: {
        type: "Point",
        coordinates: [
            121.371887101964,
            31.4768344746039
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/chuansha/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d1cd97ac65a7a4295b"),
    name: "大团镇",
    code: NumberInt("101105"),
    location: {
        type: "Point",
        coordinates: [
            121.743858615333,
            30.9722700629453
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/datuanzhen/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d1cd97ac65a7a4295c"),
    name: "高东",
    code: NumberInt("101106"),
    location: {
        type: "Point",
        coordinates: [
            121.629299420426,
            31.3319902536332
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/gaodong/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d1cd97ac65a7a4295d"),
    name: "高行",
    code: NumberInt("101107"),
    location: {
        type: "Point",
        coordinates: [
            121.620089094032,
            31.2956978540723
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/gaohang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d1cd97ac65a7a4295e"),
    name: "合庆",
    code: NumberInt("101108"),
    location: {
        type: "Point",
        coordinates: [
            121.729988508767,
            31.243208518641
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/geqing/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a4295f"),
    name: "航头",
    code: NumberInt("101109"),
    location: {
        type: "Point",
        coordinates: [
            121.599367880834,
            31.036557643002
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/hangtou/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42960"),
    name: "花木",
    code: NumberInt("101110"),
    location: {
        type: "Point",
        coordinates: [
            121.480538860177,
            31.235929042252
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/huamu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42961"),
    name: "惠南",
    code: NumberInt("101111"),
    location: {
        type: "Point",
        coordinates: [
            121.821788864087,
            30.9780604738955
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/huinan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42962"),
    name: "金桥",
    code: NumberInt("101112"),
    location: {
        type: "Point",
        coordinates: [
            121.795868869445,
            30.9889052362179
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/jinqiao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42963"),
    name: "金杨",
    code: NumberInt("101113"),
    location: {
        type: "Point",
        coordinates: [
            121.603653876083,
            31.2558097165998
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/jinyang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42964"),
    name: "康桥",
    code: NumberInt("101114"),
    location: {
        type: "Point",
        coordinates: [
            121.430112749866,
            31.3736095325289
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/kangqiao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42965"),
    name: "老港镇",
    code: NumberInt("101115"),
    location: {
        type: "Point",
        coordinates: [
            121.846198699371,
            31.0452184170899
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/laogangzhen/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42966"),
    name: "联洋",
    code: NumberInt("101116"),
    location: {
        type: "Point",
        coordinates: [
            121.563721321587,
            31.2319105298486
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/lianyang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42967"),
    name: "临港新城",
    code: NumberInt("101117"),
    location: {
        type: "Point",
        coordinates: [
            121.896139365385,
            30.9473354153354
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/lingangxincheng/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42968"),
    name: "陆家嘴",
    code: NumberInt("101118"),
    location: {
        type: "Point",
        coordinates: [
            121.530908916224,
            31.2348809325437
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/lujiazui/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42969"),
    name: "梅园",
    code: NumberInt("101119"),
    location: {
        type: "Point",
        coordinates: [
            121.186424204002,
            31.0787754003929
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/meiyuan1/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a4296a"),
    name: "南码头",
    code: NumberInt("101120"),
    location: {
        type: "Point",
        coordinates: [
            121.519601046464,
            31.1941817653063
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/nanmatou/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a4296b"),
    name: "泥城镇",
    code: NumberInt("101121"),
    location: {
        type: "Point",
        coordinates: [
            121.822963218881,
            30.9099458683441
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/nichengzhen/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a4296c"),
    name: "三林",
    code: NumberInt("101122"),
    location: {
        type: "Point",
        coordinates: [
            121.520201114545,
            31.1586040597648
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/sanlin/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a4296d"),
    name: "世博",
    code: NumberInt("101123"),
    location: {
        type: "Point",
        coordinates: [
            121.461579224083,
            31.2290534353063
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/shibo/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a4296e"),
    name: "书院镇",
    code: NumberInt("101124"),
    location: {
        type: "Point",
        coordinates: [
            121.877705507506,
            30.9880989978022
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/shuyuanzhen/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a4296f"),
    name: "塘桥",
    code: NumberInt("101125"),
    location: {
        type: "Point",
        coordinates: [
            121.259414889045,
            31.4528733987043
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/tangqiao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42970"),
    name: "唐镇",
    code: NumberInt("101126"),
    location: {
        type: "Point",
        coordinates: [
            121.661543557723,
            31.2142274263638
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/tangzhen/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42971"),
    name: "外高桥",
    code: NumberInt("101127"),
    location: {
        type: "Point",
        coordinates: [
            121.593744218849,
            31.3483289977523
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/waigaoqiao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42972"),
    name: "万祥镇",
    code: NumberInt("101128"),
    location: {
        type: "Point",
        coordinates: [
            121.822008140462,
            30.979053553411
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/wanxiangzhen/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42973"),
    name: "潍坊",
    code: NumberInt("101129"),
    location: {
        type: "Point",
        coordinates: [
            121.523629228032,
            31.2216463988201
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/weifang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42974"),
    name: "新场",
    code: NumberInt("101130"),
    location: {
        type: "Point",
        coordinates: [
            121.653712669271,
            31.0297261423409
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xinchang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42975"),
    name: "宣桥",
    code: NumberInt("101131"),
    location: {
        type: "Point",
        coordinates: [
            121.706033575394,
            31.0230171595586
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xuanqiao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42976"),
    name: "杨东",
    code: NumberInt("101132"),
    location: {
        type: "Point",
        coordinates: [
            121.511944788603,
            31.1679522291968
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/yangdong/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42977"),
    name: "洋泾",
    code: NumberInt("101133"),
    location: {
        type: "Point",
        coordinates: [
            121.558519234378,
            31.245100620421
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/yangjing/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42978"),
    name: "杨思前滩",
    code: NumberInt("101134"),
    location: {
        type: "Point",
        coordinates: [
            121.480538860177,
            31.235929042252
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/yangsiqiantan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a42979"),
    name: "源深",
    code: NumberInt("101135"),
    location: {
        type: "Point",
        coordinates: [
            121.543900929153,
            31.2362818831419
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/yuanshen/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a4297a"),
    name: "御桥",
    code: NumberInt("101136"),
    location: {
        type: "Point",
        coordinates: [
            121.564117833639,
            31.1623293022053
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/yuqiao1/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a4297b"),
    name: "张江",
    code: NumberInt("101137"),
    location: {
        type: "Point",
        coordinates: [
            121.617810092953,
            31.2032816063429
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/zhangjiang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a4297c"),
    name: "周浦",
    code: NumberInt("101138"),
    location: {
        type: "Point",
        coordinates: [
            121.585929230404,
            31.1180696217985
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/zhoupu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d2cd97ac65a7a4297d"),
    name: "祝桥",
    code: NumberInt("101139"),
    location: {
        type: "Point",
        coordinates: [
            121.648973478892,
            30.9584423442482
        ]
    },
    districtCode: NumberInt("1011"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/zhuqiao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a4297e"),
    name: "春申",
    code: NumberInt("100801"),
    location: {
        type: "Point",
        coordinates: [
            121.411798097128,
            31.1128756966007
        ]
    },
    districtCode: NumberInt("1008"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/chunshen/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a4297f"),
    name: "古美",
    code: NumberInt("100802"),
    location: {
        type: "Point",
        coordinates: [
            121.400798346158,
            31.1517296524578
        ]
    },
    districtCode: NumberInt("1008"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/gumei/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42980"),
    name: "航华",
    code: NumberInt("100803"),
    location: {
        type: "Point",
        coordinates: [
            121.35960025886,
            31.1788009941137
        ]
    },
    districtCode: NumberInt("1008"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/hanghua/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42981"),
    name: "华漕",
    code: NumberInt("100804"),
    location: {
        type: "Point",
        coordinates: [
            121.285114562583,
            31.2296193648012
        ]
    },
    districtCode: NumberInt("1008"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/huacao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42982"),
    name: "静安新城",
    code: NumberInt("100805"),
    location: {
        type: "Point",
        coordinates: [
            121.390410970055,
            31.1667278504677
        ]
    },
    districtCode: NumberInt("1008"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/jinganxincheng/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42983"),
    name: "金虹桥",
    code: NumberInt("100806"),
    location: {
        type: "Point",
        coordinates: [
            121.41042728292,
            31.2151161003713
        ]
    },
    districtCode: NumberInt("1008"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/jinhongqiao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42984"),
    name: "金汇",
    code: NumberInt("100807"),
    location: {
        type: "Point",
        coordinates: [
            121.377325623183,
            31.1866812225745
        ]
    },
    districtCode: NumberInt("1008"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/jinhui/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42985"),
    name: "老闵行",
    code: NumberInt("100808"),
    location: {
        type: "Point",
        coordinates: [
            121.43193289649,
            31.0087532608132
        ]
    },
    districtCode: NumberInt("1008"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/laominhang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42986"),
    name: "龙柏",
    code: NumberInt("100809"),
    location: {
        type: "Point",
        coordinates: [
            121.372410095432,
            31.1857174402859
        ]
    },
    districtCode: NumberInt("1008"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/longbai/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42987"),
    name: "马桥",
    code: NumberInt("100810"),
    location: {
        type: "Point",
        coordinates: [
            121.365795063487,
            31.0348704298164
        ]
    },
    districtCode: NumberInt("1008"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/maqiao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42988"),
    name: "梅陇",
    code: NumberInt("100811"),
    location: {
        type: "Point",
        coordinates: [
            121.419491185516,
            31.1383471414353
        ]
    },
    districtCode: NumberInt("1008"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/meilong/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42989"),
    name: "闵浦",
    code: NumberInt("100812"),
    location: {
        type: "Point",
        coordinates: [
            121.38861193361,
            31.1188425800874
        ]
    },
    districtCode: NumberInt("1008"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/minpu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a4298a"),
    name: "浦江",
    code: NumberInt("100813"),
    location: {
        type: "Point",
        coordinates: [
            121.477987492867,
            31.1096475893062
        ]
    },
    districtCode: NumberInt("1008"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/pujiang1/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a4298b"),
    name: "七宝",
    code: NumberInt("100814"),
    location: {
        type: "Point",
        coordinates: [
            121.357602427406,
            31.155259628485
        ]
    },
    districtCode: NumberInt("1008"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/qibao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a4298c"),
    name: "吴泾",
    code: NumberInt("100815"),
    location: {
        type: "Point",
        coordinates: [
            121.470182565444,
            31.0466411503989
        ]
    },
    districtCode: NumberInt("1008"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/wujing/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a4298d"),
    name: "莘庄",
    code: NumberInt("100816"),
    location: {
        type: "Point",
        coordinates: [
            121.384257846803,
            31.1135860137295
        ]
    },
    districtCode: NumberInt("1008"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xinzhuang5/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a4298e"),
    name: "颛桥",
    code: NumberInt("100817"),
    location: {
        type: "Point",
        coordinates: [
            121.407486949325,
            31.0740130197431
        ]
    },
    districtCode: NumberInt("1008"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/zhuanqiao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a4298f"),
    name: "大场镇",
    code: NumberInt("100901"),
    location: {
        type: "Point",
        coordinates: [
            121.423427290769,
            31.2930550872056
        ]
    },
    districtCode: NumberInt("1009"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/dachangzhen/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42990"),
    name: "大华",
    code: NumberInt("100902"),
    location: {
        type: "Point",
        coordinates: [
            121.422569678498,
            31.2862567428839
        ]
    },
    districtCode: NumberInt("1009"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/dahua/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42991"),
    name: "高境",
    code: NumberInt("100903"),
    location: {
        type: "Point",
        coordinates: [
            121.484474606107,
            31.3272420413815
        ]
    },
    districtCode: NumberInt("1009"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/gaojing/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42992"),
    name: "共富",
    code: NumberInt("100904"),
    location: {
        type: "Point",
        coordinates: [
            121.434745041889,
            31.3554588646448
        ]
    },
    districtCode: NumberInt("1009"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/gongfu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42993"),
    name: "共康",
    code: NumberInt("100905"),
    location: {
        type: "Point",
        coordinates: [
            121.444133412435,
            31.3317753423765
        ]
    },
    districtCode: NumberInt("1009"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/gongkang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42994"),
    name: "顾村",
    code: NumberInt("100906"),
    location: {
        type: "Point",
        coordinates: [
            121.364155116948,
            31.3701022862881
        ]
    },
    districtCode: NumberInt("1009"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/gucun/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42995"),
    name: "罗店",
    code: NumberInt("100907"),
    location: {
        type: "Point",
        coordinates: [
            121.359065767081,
            31.4143799837881
        ]
    },
    districtCode: NumberInt("1009"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/luodian/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42996"),
    name: "罗泾",
    code: NumberInt("100908"),
    location: {
        type: "Point",
        coordinates: [
            121.336406010592,
            31.4756972978948
        ]
    },
    districtCode: NumberInt("1009"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/luojing/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42997"),
    name: "上大",
    code: NumberInt("100909"),
    location: {
        type: "Point",
        coordinates: [
            121.387707878945,
            31.3197248678973
        ]
    },
    districtCode: NumberInt("1009"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/shangda/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42998"),
    name: "淞宝",
    code: NumberInt("100910"),
    location: {
        type: "Point",
        coordinates: [
            121.504807751326,
            31.3957581964145
        ]
    },
    districtCode: NumberInt("1009"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/songbao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d3cd97ac65a7a42999"),
    name: "淞南",
    code: NumberInt("100911"),
    location: {
        type: "Point",
        coordinates: [
            121.49108433805,
            31.3440402217877
        ]
    },
    districtCode: NumberInt("1009"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/songnan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a4299a"),
    name: "通河",
    code: NumberInt("100912"),
    location: {
        type: "Point",
        coordinates: [
            121.453561218592,
            31.3386853354216
        ]
    },
    districtCode: NumberInt("1009"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/tonghe/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a4299b"),
    name: "杨行",
    code: NumberInt("100913"),
    location: {
        type: "Point",
        coordinates: [
            121.440851992237,
            31.3801662839107
        ]
    },
    districtCode: NumberInt("1009"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/yanghang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a4299c"),
    name: "月浦",
    code: NumberInt("100914"),
    location: {
        type: "Point",
        coordinates: [
            121.433236158124,
            31.4190633522629
        ]
    },
    districtCode: NumberInt("1009"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/yuepu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a4299d"),
    name: "张庙",
    code: NumberInt("100915"),
    location: {
        type: "Point",
        coordinates: [
            121.453923235713,
            31.3435922582107
        ]
    },
    districtCode: NumberInt("1009"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/zhangmiao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a4299e"),
    name: "漕河泾",
    code: NumberInt("100201"),
    location: {
        type: "Point",
        coordinates: [
            121.409692469013,
            31.1737904033433
        ]
    },
    districtCode: NumberInt("1002"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/caohejing/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a4299f"),
    name: "长桥",
    code: NumberInt("100202"),
    location: {
        type: "Point",
        coordinates: [
            121.436906634438,
            31.1593356623596
        ]
    },
    districtCode: NumberInt("1002"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/changqiao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429a0"),
    name: "衡山路",
    code: NumberInt("100203"),
    location: {
        type: "Point",
        coordinates: [
            121.449677780991,
            31.2066684475378
        ]
    },
    districtCode: NumberInt("1002"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/hengshanlu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429a1"),
    name: "华东理工",
    code: NumberInt("100204"),
    location: {
        type: "Point",
        coordinates: [
            121.430039088814,
            31.1481894993877
        ]
    },
    districtCode: NumberInt("1002"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/huadongligong/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429a2"),
    name: "华泾",
    code: NumberInt("100205"),
    location: {
        type: "Point",
        coordinates: [
            121.457452678062,
            31.1256489912691
        ]
    },
    districtCode: NumberInt("1002"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/huajing/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429a3"),
    name: "建国西路",
    code: NumberInt("100206"),
    location: {
        type: "Point",
        coordinates: [
            121.457675226964,
            31.2093335989581
        ]
    },
    districtCode: NumberInt("1002"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/jianguoxilu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429a4"),
    name: "康健",
    code: NumberInt("100207"),
    location: {
        type: "Point",
        coordinates: [
            121.428324852409,
            31.1703703495441
        ]
    },
    districtCode: NumberInt("1002"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/kangjian/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429a5"),
    name: "龙华",
    code: NumberInt("100208"),
    location: {
        type: "Point",
        coordinates: [
            121.457120305023,
            31.1808817743006
        ]
    },
    districtCode: NumberInt("1002"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/longhua/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429a6"),
    name: "上海南站",
    code: NumberInt("100209"),
    location: {
        type: "Point",
        coordinates: [
            121.435865139029,
            31.1594388742623
        ]
    },
    districtCode: NumberInt("1002"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/shanghainanzhan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429a7"),
    name: "田林",
    code: NumberInt("100210"),
    location: {
        type: "Point",
        coordinates: [
            121.417734099938,
            31.176747974193
        ]
    },
    districtCode: NumberInt("1002"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/tianlin/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429a8"),
    name: "万体馆",
    code: NumberInt("100211"),
    location: {
        type: "Point",
        coordinates: [
            121.44710150367,
            31.189946609189
        ]
    },
    districtCode: NumberInt("1002"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/wantiguan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429a9"),
    name: "斜土路",
    code: NumberInt("100212"),
    location: {
        type: "Point",
        coordinates: [
            121.472541100696,
            31.2063445762205
        ]
    },
    districtCode: NumberInt("1002"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xietulu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429aa"),
    name: "徐汇滨江",
    code: NumberInt("100213"),
    location: {
        type: "Point",
        coordinates: [
            121.470435977428,
            31.1875516996866
        ]
    },
    districtCode: NumberInt("1002"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xuhuibinjiang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429ab"),
    name: "徐家汇",
    code: NumberInt("100214"),
    location: {
        type: "Point",
        coordinates: [
            121.444013129327,
            31.1980908514819
        ]
    },
    districtCode: NumberInt("1002"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xujiahui/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429ac"),
    name: "植物园",
    code: NumberInt("100215"),
    location: {
        type: "Point",
        coordinates: [
            121.443396352764,
            31.1945567728227
        ]
    },
    districtCode: NumberInt("1002"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/zhiwuyuan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429ad"),
    name: "曹杨",
    code: NumberInt("100501"),
    location: {
        type: "Point",
        coordinates: [
            121.412289470242,
            31.2491727468125
        ]
    },
    districtCode: NumberInt("1005"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/caoyang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429ae"),
    name: "长风",
    code: NumberInt("100502"),
    location: {
        type: "Point",
        coordinates: [
            121.403703017025,
            31.2302788524586
        ]
    },
    districtCode: NumberInt("1005"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/changfeng1/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429af"),
    name: "长寿路",
    code: NumberInt("100503"),
    location: {
        type: "Point",
        coordinates: [
            121.441816608863,
            31.2445681421303
        ]
    },
    districtCode: NumberInt("1005"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/changshoulu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429b0"),
    name: "长征",
    code: NumberInt("100504"),
    location: {
        type: "Point",
        coordinates: [
            121.385321440527,
            31.2433701445603
        ]
    },
    districtCode: NumberInt("1005"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/changzheng/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429b1"),
    name: "甘泉宜川",
    code: NumberInt("100505"),
    location: {
        type: "Point",
        coordinates: [
            121.450622771439,
            31.2619865156985
        ]
    },
    districtCode: NumberInt("1005"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/ganquanyichuan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429b2"),
    name: "光新",
    code: NumberInt("100506"),
    location: {
        type: "Point",
        coordinates: [
            121.438092397711,
            31.2595637378879
        ]
    },
    districtCode: NumberInt("1005"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/guangxin/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429b3"),
    name: "桃浦",
    code: NumberInt("100507"),
    location: {
        type: "Point",
        coordinates: [
            121.38709739052,
            31.2753918804546
        ]
    },
    districtCode: NumberInt("1005"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/taopu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429b4"),
    name: "万里",
    code: NumberInt("100508"),
    location: {
        type: "Point",
        coordinates: [
            121.428271762553,
            31.2668254009558
        ]
    },
    districtCode: NumberInt("1005"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/wanli/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429b5"),
    name: "武宁",
    code: NumberInt("100509"),
    location: {
        type: "Point",
        coordinates: [
            121.403569349165,
            31.2549733682796
        ]
    },
    districtCode: NumberInt("1005"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/wuning/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429b6"),
    name: "真光",
    code: NumberInt("100510"),
    location: {
        type: "Point",
        coordinates: [
            121.392739647428,
            31.2596779521082
        ]
    },
    districtCode: NumberInt("1005"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/zhenguang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429b7"),
    name: "真如",
    code: NumberInt("100511"),
    location: {
        type: "Point",
        coordinates: [
            121.401605024506,
            31.2611310843616
        ]
    },
    districtCode: NumberInt("1005"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/zhenru/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d4cd97ac65a7a429b8"),
    name: "中远两湾城",
    code: NumberInt("100512"),
    location: {
        type: "Point",
        coordinates: [
            121.447698876834,
            31.2580550166753
        ]
    },
    districtCode: NumberInt("1005"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/zhongyuanliangwancheng/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429b9"),
    name: "鞍山",
    code: NumberInt("100701"),
    location: {
        type: "Point",
        coordinates: [
            121.519060356378,
            31.2812770554576
        ]
    },
    districtCode: NumberInt("1007"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/anshan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429ba"),
    name: "东外滩",
    code: NumberInt("100702"),
    location: {
        type: "Point",
        coordinates: [
            121.532519937325,
            31.2655241446571
        ]
    },
    districtCode: NumberInt("1007"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/dongwaitan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429bb"),
    name: "黄兴公园",
    code: NumberInt("100703"),
    location: {
        type: "Point",
        coordinates: [
            121.534357511076,
            31.294540717418
        ]
    },
    districtCode: NumberInt("1007"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/huangxinggongyuan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429bc"),
    name: "控江路",
    code: NumberInt("100704"),
    location: {
        type: "Point",
        coordinates: [
            121.535966009736,
            31.2853558139417
        ]
    },
    districtCode: NumberInt("1007"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/kongjianglu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429bd"),
    name: "五角场",
    code: NumberInt("100705"),
    location: {
        type: "Point",
        coordinates: [
            121.532934595149,
            31.3094080597243
        ]
    },
    districtCode: NumberInt("1007"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/wujiaochang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429be"),
    name: "新江湾城",
    code: NumberInt("100706"),
    location: {
        type: "Point",
        coordinates: [
            121.515212824048,
            31.3368979916648
        ]
    },
    districtCode: NumberInt("1007"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xinjiangwancheng/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429bf"),
    name: "中原",
    code: NumberInt("100707"),
    location: {
        type: "Point",
        coordinates: [
            121.538404377399,
            31.3249262227371
        ]
    },
    districtCode: NumberInt("1007"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/zhongyuan1/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429c0"),
    name: "周家嘴路",
    code: NumberInt("100708"),
    location: {
        type: "Point",
        coordinates: [
            121.519598345259,
            31.2700448112579
        ]
    },
    districtCode: NumberInt("1007"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/zhoujiazuilu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429c1"),
    name: "北新泾",
    code: NumberInt("100301"),
    location: {
        type: "Point",
        coordinates: [
            121.381175850429,
            31.2244245115079
        ]
    },
    districtCode: NumberInt("1003"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/beixinjing/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429c2"),
    name: "古北",
    code: NumberInt("100302"),
    location: {
        type: "Point",
        coordinates: [
            121.406914908376,
            31.2031951218584
        ]
    },
    districtCode: NumberInt("1003"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/gubei/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429c3"),
    name: "虹桥",
    code: NumberInt("100303"),
    location: {
        type: "Point",
        coordinates: [
            121.402401821494,
            31.2154102642792
        ]
    },
    districtCode: NumberInt("1003"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/hongqiao1/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429c4"),
    name: "天山",
    code: NumberInt("100304"),
    location: {
        type: "Point",
        coordinates: [
            121.391297956915,
            31.2199090039048
        ]
    },
    districtCode: NumberInt("1003"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/tianshan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429c5"),
    name: "仙霞",
    code: NumberInt("100305"),
    location: {
        type: "Point",
        coordinates: [
            121.39309366963,
            31.2136550726002
        ]
    },
    districtCode: NumberInt("1003"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xianxia/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429c6"),
    name: "西郊",
    code: NumberInt("100306"),
    location: {
        type: "Point",
        coordinates: [
            121.365457749768,
            31.2053660899178
        ]
    },
    districtCode: NumberInt("1003"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xijiao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429c7"),
    name: "新华路",
    code: NumberInt("100307"),
    location: {
        type: "Point",
        coordinates: [
            121.426110612869,
            31.2113992379293
        ]
    },
    districtCode: NumberInt("1003"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xinhualu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429c8"),
    name: "镇宁路",
    code: NumberInt("100308"),
    location: {
        type: "Point",
        coordinates: [
            121.443103894134,
            31.2257230109266
        ]
    },
    districtCode: NumberInt("1003"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/zhenninglu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429c9"),
    name: "中山公园",
    code: NumberInt("100309"),
    location: {
        type: "Point",
        coordinates: [
            121.42551100023,
            31.227830858432
        ]
    },
    districtCode: NumberInt("1003"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/zhongshangongyuan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429ca"),
    name: "车墩",
    code: NumberInt("101301"),
    location: {
        type: "Point",
        coordinates: [
            121.287811994369,
            31.0254140201094
        ]
    },
    districtCode: NumberInt("1013"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/chedun/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429cb"),
    name: "九亭",
    code: NumberInt("101302"),
    location: {
        type: "Point",
        coordinates: [
            121.322997004245,
            31.1358890953167
        ]
    },
    districtCode: NumberInt("1013"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/jiuting/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429cc"),
    name: "泖港",
    code: NumberInt("101303"),
    location: {
        type: "Point",
        coordinates: [
            121.218288178407,
            30.9470091311301
        ]
    },
    districtCode: NumberInt("1013"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/maogang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429cd"),
    name: "莘闵别墅",
    code: NumberInt("101304"),
    location: {
        type: "Point",
        coordinates: [
            121.358343170129,
            31.0943328979587
        ]
    },
    districtCode: NumberInt("1013"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/shenminbieshu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429ce"),
    name: "佘山",
    code: NumberInt("101305"),
    location: {
        type: "Point",
        coordinates: [
            121.196709802091,
            31.1179912513101
        ]
    },
    districtCode: NumberInt("1013"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/sheshan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429cf"),
    name: "石湖荡",
    code: NumberInt("101306"),
    location: {
        type: "Point",
        coordinates: [
            121.123518204732,
            30.9922030937678
        ]
    },
    districtCode: NumberInt("1013"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/shihudang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429d0"),
    name: "泗泾",
    code: NumberInt("101307"),
    location: {
        type: "Point",
        coordinates: [
            121.286670427727,
            31.1200821906508
        ]
    },
    districtCode: NumberInt("1013"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/sijing/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429d1"),
    name: "松江大学城",
    code: NumberInt("101308"),
    location: {
        type: "Point",
        coordinates: [
            121.196435908741,
            31.0574418219562
        ]
    },
    districtCode: NumberInt("1013"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/songjiangdaxuecheng/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429d2"),
    name: "松江老城",
    code: NumberInt("101309"),
    location: {
        type: "Point",
        coordinates: [
            121.256956008576,
            31.016892862095
        ]
    },
    districtCode: NumberInt("1013"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/songjianglaocheng/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429d3"),
    name: "松江新城",
    code: NumberInt("101310"),
    location: {
        type: "Point",
        coordinates: [
            121.23983987505,
            31.0388975367098
        ]
    },
    districtCode: NumberInt("1013"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/songjiangxincheng/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429d4"),
    name: "小昆山",
    code: NumberInt("101311"),
    location: {
        type: "Point",
        coordinates: [
            121.138625906799,
            31.0353450896981
        ]
    },
    districtCode: NumberInt("1013"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xiaokunshan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d5cd97ac65a7a429d5"),
    name: "新浜",
    code: NumberInt("101312"),
    location: {
        type: "Point",
        coordinates: [
            121.073664584523,
            30.9310233891171
        ]
    },
    districtCode: NumberInt("1013"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xinbang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429d6"),
    name: "新桥",
    code: NumberInt("101313"),
    location: {
        type: "Point",
        coordinates: [
            121.321814744363,
            31.0724536783959
        ]
    },
    districtCode: NumberInt("1013"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xinqiao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429d7"),
    name: "叶榭",
    code: NumberInt("101314"),
    location: {
        type: "Point",
        coordinates: [
            121.329998038067,
            30.9564669677418
        ]
    },
    districtCode: NumberInt("1013"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/yexie/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429d8"),
    name: "安亭",
    code: NumberInt("101001"),
    location: {
        type: "Point",
        coordinates: [
            121.167526371327,
            31.3011801725142
        ]
    },
    districtCode: NumberInt("1010"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/anting/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429d9"),
    name: "丰庄",
    code: NumberInt("101002"),
    location: {
        type: "Point",
        coordinates: [
            121.36872524623,
            31.2528379719974
        ]
    },
    districtCode: NumberInt("1010"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/fengzhuang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429da"),
    name: "华亭",
    code: NumberInt("101003"),
    location: {
        type: "Point",
        coordinates: [
            121.291602843621,
            31.4625677864066
        ]
    },
    districtCode: NumberInt("1010"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/huating/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429db"),
    name: "嘉定老城",
    code: NumberInt("101004"),
    location: {
        type: "Point",
        coordinates: [
            121.262262299223,
            31.3879916977443
        ]
    },
    districtCode: NumberInt("1010"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/jiadinglaocheng/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429dc"),
    name: "嘉定新城",
    code: NumberInt("101005"),
    location: {
        type: "Point",
        coordinates: [
            121.262196812752,
            31.3527533402152
        ]
    },
    districtCode: NumberInt("1010"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/jiadingxincheng/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429dd"),
    name: "江桥",
    code: NumberInt("101006"),
    location: {
        type: "Point",
        coordinates: [
            121.352174775684,
            31.2653585443524
        ]
    },
    districtCode: NumberInt("1010"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/jiangqiao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429de"),
    name: "菊园新区",
    code: NumberInt("101007"),
    location: {
        type: "Point",
        coordinates: [
            121.252154296134,
            31.3983939669449
        ]
    },
    districtCode: NumberInt("1010"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/juyuanxinqu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429df"),
    name: "马陆",
    code: NumberInt("101008"),
    location: {
        type: "Point",
        coordinates: [
            121.296380211984,
            31.3455120869443
        ]
    },
    districtCode: NumberInt("1010"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/malu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429e0"),
    name: "南翔",
    code: NumberInt("101009"),
    location: {
        type: "Point",
        coordinates: [
            121.321750156197,
            31.3052382846363
        ]
    },
    districtCode: NumberInt("1010"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/nanxiang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429e1"),
    name: "外冈",
    code: NumberInt("101010"),
    location: {
        type: "Point",
        coordinates: [
            121.174326544038,
            31.3708138898154
        ]
    },
    districtCode: NumberInt("1010"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/waigang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429e2"),
    name: "新成路",
    code: NumberInt("101011"),
    location: {
        type: "Point",
        coordinates: [
            121.271790842259,
            31.395606451046
        ]
    },
    districtCode: NumberInt("1010"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xinchenglu1/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429e3"),
    name: "徐行",
    code: NumberInt("101012"),
    location: {
        type: "Point",
        coordinates: [
            121.280896838553,
            31.4250875934311
        ]
    },
    districtCode: NumberInt("1010"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xuxing/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429e4"),
    name: "打浦桥",
    code: NumberInt("100101"),
    location: {
        type: "Point",
        coordinates: [
            121.474892381232,
            31.2134391168177
        ]
    },
    districtCode: NumberInt("1001"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/dapuqiao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429e5"),
    name: "董家渡",
    code: NumberInt("100102"),
    location: {
        type: "Point",
        coordinates: [
            121.50906032961,
            31.2200935997856
        ]
    },
    districtCode: NumberInt("1001"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/dongjiadu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429e6"),
    name: "淮海中路",
    code: NumberInt("100103"),
    location: {
        type: "Point",
        coordinates: [
            121.462842975546,
            31.2219617465132
        ]
    },
    districtCode: NumberInt("1001"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/huaihaizhonglu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429e7"),
    name: "黄浦滨江",
    code: NumberInt("100104"),
    location: {
        type: "Point",
        coordinates: [
            121.509339612793,
            31.211648370969
        ]
    },
    districtCode: NumberInt("1001"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/huangpubinjiang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429e8"),
    name: "老西门",
    code: NumberInt("100105"),
    location: {
        type: "Point",
        coordinates: [
            121.493832254605,
            31.2232558382197
        ]
    },
    districtCode: NumberInt("1001"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/laoximen/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429e9"),
    name: "南京东路",
    code: NumberInt("100106"),
    location: {
        type: "Point",
        coordinates: [
            121.49022906317,
            31.24286665289
        ]
    },
    districtCode: NumberInt("1001"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/nanjingdonglu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429ea"),
    name: "蓬莱公园",
    code: NumberInt("100107"),
    location: {
        type: "Point",
        coordinates: [
            121.499077190986,
            31.2124429496592
        ]
    },
    districtCode: NumberInt("1001"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/penglaigongyuan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429eb"),
    name: "人民广场",
    code: NumberInt("100108"),
    location: {
        type: "Point",
        coordinates: [
            121.483150503786,
            31.2381785248532
        ]
    },
    districtCode: NumberInt("1001"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/renminguangchang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429ec"),
    name: "世博滨江",
    code: NumberInt("100109"),
    location: {
        type: "Point",
        coordinates: [
            121.502386997637,
            31.2061328469779
        ]
    },
    districtCode: NumberInt("1001"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/shibobinjiang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429ed"),
    name: "五里桥",
    code: NumberInt("100110"),
    location: {
        type: "Point",
        coordinates: [
            121.490469897081,
            31.2102394847622
        ]
    },
    districtCode: NumberInt("1001"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/wuliqiao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429ee"),
    name: "新天地",
    code: NumberInt("100111"),
    location: {
        type: "Point",
        coordinates: [
            121.480908333233,
            31.2288118855818
        ]
    },
    districtCode: NumberInt("1001"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xintiandi/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429ef"),
    name: "豫园",
    code: NumberInt("100112"),
    location: {
        type: "Point",
        coordinates: [
            121.498730804381,
            31.2327126559422
        ]
    },
    districtCode: NumberInt("1001"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/yuyuan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429f0"),
    name: "不夜城",
    code: NumberInt("100401"),
    location: {
        type: "Point",
        coordinates: [
            121.464305581306,
            31.251770834401
        ]
    },
    districtCode: NumberInt("1004"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/buyecheng/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429f1"),
    name: "曹家渡",
    code: NumberInt("100402"),
    location: {
        type: "Point",
        coordinates: [
            121.440344449624,
            31.2360689128318
        ]
    },
    districtCode: NumberInt("1004"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/caojiadu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429f2"),
    name: "大宁",
    code: NumberInt("100403"),
    location: {
        type: "Point",
        coordinates: [
            121.445015997598,
            31.2817028667661
        ]
    },
    districtCode: NumberInt("1004"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/daning/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429f3"),
    name: "江宁路",
    code: NumberInt("100404"),
    location: {
        type: "Point",
        coordinates: [
            121.454923050644,
            31.2451126658718
        ]
    },
    districtCode: NumberInt("1004"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/jiangninglu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429f4"),
    name: "静安寺",
    code: NumberInt("100405"),
    location: {
        type: "Point",
        coordinates: [
            121.452858743684,
            31.2295182372883
        ]
    },
    districtCode: NumberInt("1004"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/jingansi/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d6cd97ac65a7a429f5"),
    name: "南京西路",
    code: NumberInt("100406"),
    location: {
        type: "Point",
        coordinates: [
            121.463078995437,
            31.2344990189183
        ]
    },
    districtCode: NumberInt("1004"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/nanjingxilu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a429f6"),
    name: "彭浦",
    code: NumberInt("100407"),
    location: {
        type: "Point",
        coordinates: [
            121.452010114468,
            31.2896557454918
        ]
    },
    districtCode: NumberInt("1004"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/pengpu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a429f7"),
    name: "西藏北路",
    code: NumberInt("100408"),
    location: {
        type: "Point",
        coordinates: [
            121.474715777064,
            31.2616547155327
        ]
    },
    districtCode: NumberInt("1004"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xizangbeilu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a429f8"),
    name: "阳城",
    code: NumberInt("100409"),
    location: {
        type: "Point",
        coordinates: [
            121.453431772769,
            31.2338449304017
        ]
    },
    districtCode: NumberInt("1004"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/yangcheng/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a429f9"),
    name: "永和",
    code: NumberInt("100410"),
    location: {
        type: "Point",
        coordinates: [
            121.438014784115,
            31.2353187656308
        ]
    },
    districtCode: NumberInt("1004"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/yonghe/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a429fa"),
    name: "闸北公园",
    code: NumberInt("100411"),
    location: {
        type: "Point",
        coordinates: [
            121.46677619095,
            31.2755747465011
        ]
    },
    districtCode: NumberInt("1004"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/zhabeigongyuan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a429fb"),
    name: "北外滩",
    code: NumberInt("100601"),
    location: {
        type: "Point",
        coordinates: [
            121.50910434658,
            31.2586037155456
        ]
    },
    districtCode: NumberInt("1006"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/beiwaitan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a429fc"),
    name: "江湾镇",
    code: NumberInt("100602"),
    location: {
        type: "Point",
        coordinates: [
            121.511586454535,
            31.2697466989314
        ]
    },
    districtCode: NumberInt("1006"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/jiangwanzhen/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a429fd"),
    name: "凉城",
    code: NumberInt("100603"),
    location: {
        type: "Point",
        coordinates: [
            121.476276670023,
            31.2975469286645
        ]
    },
    districtCode: NumberInt("1006"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/liangcheng/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a429fe"),
    name: "临平路",
    code: NumberInt("100604"),
    location: {
        type: "Point",
        coordinates: [
            121.503199956938,
            31.2675707069193
        ]
    },
    districtCode: NumberInt("1006"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/linpinglu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a429ff"),
    name: "鲁迅公园",
    code: NumberInt("100605"),
    location: {
        type: "Point",
        coordinates: [
            121.490155041,
            31.2774758377485
        ]
    },
    districtCode: NumberInt("1006"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/luxungongyuan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a42a00"),
    name: "曲阳",
    code: NumberInt("100606"),
    location: {
        type: "Point",
        coordinates: [
            121.498031922695,
            31.2795011876503
        ]
    },
    districtCode: NumberInt("1006"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/quyang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a42a01"),
    name: "四川北路",
    code: NumberInt("100607"),
    location: {
        type: "Point",
        coordinates: [
            121.489621597544,
            31.2629410698975
        ]
    },
    districtCode: NumberInt("1006"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/sichuanbeilu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a42a02"),
    name: "白鹤",
    code: NumberInt("101401"),
    location: {
        type: "Point",
        coordinates: [
            121.148193938447,
            31.260151013575
        ]
    },
    districtCode: NumberInt("1014"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/baihe/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a42a03"),
    name: "重固",
    code: NumberInt("101402"),
    location: {
        type: "Point",
        coordinates: [
            121.192039332084,
            31.2000978436186
        ]
    },
    districtCode: NumberInt("1014"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/chonggu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a42a04"),
    name: "华新",
    code: NumberInt("101403"),
    location: {
        type: "Point",
        coordinates: [
            121.234313589383,
            31.2434967281798
        ]
    },
    districtCode: NumberInt("1014"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/huaxin/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a42a05"),
    name: "金泽",
    code: NumberInt("101404"),
    location: {
        type: "Point",
        coordinates: [
            120.92386010344,
            31.0426354909736
        ]
    },
    districtCode: NumberInt("1014"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/jinze/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a42a06"),
    name: "练塘",
    code: NumberInt("101405"),
    location: {
        type: "Point",
        coordinates: [
            121.058726033384,
            31.0058662367985
        ]
    },
    districtCode: NumberInt("1014"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/liantang1/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a42a07"),
    name: "香花桥",
    code: NumberInt("101406"),
    location: {
        type: "Point",
        coordinates: [
            121.139136952804,
            31.1921794345338
        ]
    },
    districtCode: NumberInt("1014"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xianghuaqiao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a42a08"),
    name: "夏阳",
    code: NumberInt("101407"),
    location: {
        type: "Point",
        coordinates: [
            121.139973993878,
            31.1583608605112
        ]
    },
    districtCode: NumberInt("1014"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xiayang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a42a09"),
    name: "徐泾",
    code: NumberInt("101408"),
    location: {
        type: "Point",
        coordinates: [
            121.282217527314,
            31.1749274068832
        ]
    },
    districtCode: NumberInt("1014"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xujing/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a42a0a"),
    name: "盈浦",
    code: NumberInt("101409"),
    location: {
        type: "Point",
        coordinates: [
            121.120995942522,
            31.1517639562124
        ]
    },
    districtCode: NumberInt("1014"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/yingpu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a42a0b"),
    name: "赵巷",
    code: NumberInt("101410"),
    location: {
        type: "Point",
        coordinates: [
            121.203533151084,
            31.1580138292267
        ]
    },
    districtCode: NumberInt("1014"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/zhaoxiang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a42a0c"),
    name: "朱家角",
    code: NumberInt("101411"),
    location: {
        type: "Point",
        coordinates: [
            121.060310015489,
            31.1161142044827
        ]
    },
    districtCode: NumberInt("1014"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/zhujiajiao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a42a0d"),
    name: "奉城",
    code: NumberInt("101501"),
    location: {
        type: "Point",
        coordinates: [
            121.639232882755,
            30.9183876012494
        ]
    },
    districtCode: NumberInt("1015"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/fengcheng/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d7cd97ac65a7a42a0e"),
    name: "奉贤金汇",
    code: NumberInt("101502"),
    location: {
        type: "Point",
        coordinates: [
            121.508052161336,
            30.9948212975715
        ]
    },
    districtCode: NumberInt("1015"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/fengxianjinhui/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d8cd97ac65a7a42a0f"),
    name: "海湾",
    code: NumberInt("101503"),
    location: {
        type: "Point",
        coordinates: [
            121.516656490833,
            30.8630765834352
        ]
    },
    districtCode: NumberInt("1015"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/haiwan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d8cd97ac65a7a42a10"),
    name: "南桥",
    code: NumberInt("101504"),
    location: {
        type: "Point",
        coordinates: [
            121.471276791385,
            30.9372314649718
        ]
    },
    districtCode: NumberInt("1015"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/nanqiao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d8cd97ac65a7a42a11"),
    name: "青村",
    code: NumberInt("101505"),
    location: {
        type: "Point",
        coordinates: [
            121.58116803154,
            30.9304673551239
        ]
    },
    districtCode: NumberInt("1015"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/qingcun/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d8cd97ac65a7a42a12"),
    name: "四团",
    code: NumberInt("101506"),
    location: {
        type: "Point",
        coordinates: [
            121.736483257604,
            30.9556735538769
        ]
    },
    districtCode: NumberInt("1015"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/situan/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d8cd97ac65a7a42a13"),
    name: "西渡",
    code: NumberInt("101507"),
    location: {
        type: "Point",
        coordinates: [
            121.435550193117,
            30.9958460076871
        ]
    },
    districtCode: NumberInt("1015"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/xidu/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d8cd97ac65a7a42a14"),
    name: "柘林",
    code: NumberInt("101508"),
    location: {
        type: "Point",
        coordinates: [
            121.491673626464,
            30.8398232114235
        ]
    },
    districtCode: NumberInt("1015"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/zhelin/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d8cd97ac65a7a42a15"),
    name: "庄行",
    code: NumberInt("101509"),
    location: {
        type: "Point",
        coordinates: [
            121.38788969598,
            30.8998739500536
        ]
    },
    districtCode: NumberInt("1015"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/zhuanghang/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d8cd97ac65a7a42a16"),
    name: "金山",
    code: NumberInt("101201"),
    location: {
        type: "Point",
        coordinates: [
            121.370129297742,
            30.7450890786414
        ]
    },
    districtCode: NumberInt("1012"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/jinshan5/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d8cd97ac65a7a42a17"),
    name: "堡镇",
    code: NumberInt("101601"),
    location: {
        type: "Point",
        coordinates: [
            121.624895926816,
            31.5422416649173
        ]
    },
    districtCode: NumberInt("1016"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/baozhen/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d8cd97ac65a7a42a18"),
    name: "长兴岛",
    code: NumberInt("101602"),
    location: {
        type: "Point",
        coordinates: [
            121.740589232429,
            31.3859525202048
        ]
    },
    districtCode: NumberInt("1016"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/changxingdao21211/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d8cd97ac65a7a42a19"),
    name: "陈家镇",
    code: NumberInt("101603"),
    location: {
        type: "Point",
        coordinates: [
            121.83914412654,
            31.5323043494477
        ]
    },
    districtCode: NumberInt("1016"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/chenjiazhen/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d8cd97ac65a7a42a1a"),
    name: "崇明其它",
    code: NumberInt("101604"),
    location: {
        type: "Point",
        coordinates: [
            121.398698018046,
            31.6260446099288
        ]
    },
    districtCode: NumberInt("1016"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/chongmingqita/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d8cd97ac65a7a42a1b"),
    name: "崇明新城",
    code: NumberInt("101605"),
    location: {
        type: "Point",
        coordinates: [
            121.433990016108,
            31.6306419481161
        ]
    },
    districtCode: NumberInt("1016"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/chongmingxincheng/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
db.getCollection("tb_business_circle").insert([ {
    _id: ObjectId("60dd24d8cd97ac65a7a42a1c"),
    name: "横沙岛",
    code: NumberInt("101606"),
    location: {
        type: "Point",
        coordinates: [
            121.860604645174,
            31.3429561616506
        ]
    },
    districtCode: NumberInt("1016"),
    lianJiaUrl: "https://sh.lianjia.com/xiaoqu/hengshadao/",
    _class: "cn.itcast.baidumap.pojo.BusinessCircle"
} ]);
