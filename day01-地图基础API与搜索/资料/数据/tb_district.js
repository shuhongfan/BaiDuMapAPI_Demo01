db.getCollection("tb_district").drop();
db.createCollection("tb_district");
db.getCollection("tb_district").createIndex({
    code: NumberInt("1")
}, {
    name: "code"
});
db.getCollection("tb_district").createIndex({
    location: "2dsphere"
}, {
    name: "location"
});

// ----------------------------
// Documents of tb_district
// ----------------------------
db.getCollection("tb_district").insert([ {
    _id: ObjectId("60dc19e70ab5dd76ece3e23f"),
    name: "崇明",
    code: NumberInt("1016"),
    location: {
        type: "Point",
        coordinates: [
            121.39758,
            31.62278
        ]
    },
    _class: "cn.itcast.baidumap.pojo.District"
} ]);
db.getCollection("tb_district").insert([ {
    _id: ObjectId("60dc19e70ab5dd76ece3e240"),
    name: "奉贤",
    code: NumberInt("1015"),
    location: {
        type: "Point",
        coordinates: [
            121.47412,
            30.9179
        ]
    },
    _class: "cn.itcast.baidumap.pojo.District"
} ]);
db.getCollection("tb_district").insert([ {
    _id: ObjectId("60dc19e70ab5dd76ece3e241"),
    name: "青浦",
    code: NumberInt("1014"),
    location: {
        type: "Point",
        coordinates: [
            121.12417,
            31.14974
        ]
    },
    _class: "cn.itcast.baidumap.pojo.District"
} ]);
db.getCollection("tb_district").insert([ {
    _id: ObjectId("60dc19e80ab5dd76ece3e242"),
    name: "松江",
    code: NumberInt("1013"),
    location: {
        type: "Point",
        coordinates: [
            121.22879,
            31.03222
        ]
    },
    _class: "cn.itcast.baidumap.pojo.District"
} ]);
db.getCollection("tb_district").insert([ {
    _id: ObjectId("60dc19e80ab5dd76ece3e243"),
    name: "金山",
    code: NumberInt("1012"),
    location: {
        type: "Point",
        coordinates: [
            121.34164,
            30.74163
        ]
    },
    _class: "cn.itcast.baidumap.pojo.District"
} ]);
db.getCollection("tb_district").insert([ {
    _id: ObjectId("60dc19e80ab5dd76ece3e244"),
    name: "浦东",
    code: NumberInt("1011"),
    location: {
        type: "Point",
        coordinates: [
            121.5447,
            31.22249
        ]
    },
    _class: "cn.itcast.baidumap.pojo.District"
} ]);
db.getCollection("tb_district").insert([ {
    _id: ObjectId("60dc19e80ab5dd76ece3e245"),
    name: "嘉定",
    code: NumberInt("1010"),
    location: {
        type: "Point",
        coordinates: [
            121.2655,
            31.37473
        ]
    },
    _class: "cn.itcast.baidumap.pojo.District"
} ]);
db.getCollection("tb_district").insert([ {
    _id: ObjectId("60dc19e80ab5dd76ece3e246"),
    name: "宝山",
    code: NumberInt("1009"),
    location: {
        type: "Point",
        coordinates: [
            121.4891,
            31.4045
        ]
    },
    _class: "cn.itcast.baidumap.pojo.District"
} ]);
db.getCollection("tb_district").insert([ {
    _id: ObjectId("60dc19e80ab5dd76ece3e247"),
    name: "闵行",
    code: NumberInt("1008"),
    location: {
        type: "Point",
        coordinates: [
            121.38162,
            31.11246
        ]
    },
    _class: "cn.itcast.baidumap.pojo.District"
} ]);
db.getCollection("tb_district").insert([ {
    _id: ObjectId("60dc19e80ab5dd76ece3e248"),
    name: "杨浦",
    code: NumberInt("1007"),
    location: {
        type: "Point",
        coordinates: [
            121.526,
            31.2595
        ]
    },
    _class: "cn.itcast.baidumap.pojo.District"
} ]);
db.getCollection("tb_district").insert([ {
    _id: ObjectId("60dc19e80ab5dd76ece3e249"),
    name: "虹口",
    code: NumberInt("1006"),
    location: {
        type: "Point",
        coordinates: [
            121.48162,
            31.27788
        ]
    },
    _class: "cn.itcast.baidumap.pojo.District"
} ]);
db.getCollection("tb_district").insert([ {
    _id: ObjectId("60dc19e80ab5dd76ece3e24a"),
    name: "普陀",
    code: NumberInt("1005"),
    location: {
        type: "Point",
        coordinates: [
            121.39703,
            31.24951
        ]
    },
    _class: "cn.itcast.baidumap.pojo.District"
} ]);
db.getCollection("tb_district").insert([ {
    _id: ObjectId("60dc19e80ab5dd76ece3e24b"),
    name: "静安",
    code: NumberInt("1004"),
    location: {
        type: "Point",
        coordinates: [
            121.4444,
            31.22884
        ]
    },
    _class: "cn.itcast.baidumap.pojo.District"
} ]);
db.getCollection("tb_district").insert([ {
    _id: ObjectId("60dc19e80ab5dd76ece3e24c"),
    name: "长宁",
    code: NumberInt("1003"),
    location: {
        type: "Point",
        coordinates: [
            121.42462,
            31.22036
        ]
    },
    _class: "cn.itcast.baidumap.pojo.District"
} ]);
db.getCollection("tb_district").insert([ {
    _id: ObjectId("60dc19e80ab5dd76ece3e24d"),
    name: "徐汇",
    code: NumberInt("1002"),
    location: {
        type: "Point",
        coordinates: [
            121.43676,
            31.18831
        ]
    },
    _class: "cn.itcast.baidumap.pojo.District"
} ]);
db.getCollection("tb_district").insert([ {
    _id: ObjectId("60dc19e80ab5dd76ece3e24e"),
    name: "黄浦",
    code: NumberInt("1001"),
    location: {
        type: "Point",
        coordinates: [
            121.49295,
            31.22337
        ]
    },
    _class: "cn.itcast.baidumap.pojo.District"
} ]);
