export default {
  pages: [
    "pages/index/index",
    "pages/riding/index",
    "pages/time/index",
    "pages/contribute/index",
    "pages/contribute/finish",
    "pages/contribute/succeed",
    "pages/path_plan/index",
    "pages/my_center/index",
    "pages/history/index",
    "pages/history_detail/index",
    "pages/nearby/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
    navigationStyle: "custom", //隐藏系统自带导航
  },

  permission: {
    "scope.userLocationBackend": {
      desc: "您的位置信息将用于绘制您的运动轨迹",
    },
    "scope.userLocation": {
      desc: "你的位置信息将用于小程序位置接口的效果展示",
    },
    "scope.userInfo": {
      desc: "用户信息",
    },
  },
  requiredBackgroundModes: ["location"],
  // "permission": {
  //   "scope.userLocation": {
  //     "desc": "你的位置信息将用于小程序位置接口的路线查询" // 高速公路行驶持续后台定位
  //   }
  // }
  // subpackages: [
  //   // 开始跑步
  //   {
  //     root: "pages/riding/",
  //     pages: ["index"],
  //   },
  //   // 倒计时
  //   {
  //     root: "pages/time/",
  //     pages: ["index"],
  //   },
  //   // 投稿
  //   {
  //     root: "pages/contribute/",
  //     pages: ["index"],
  //   },
  //   // 投稿完成
  //   {
  //     root: "pages/contribute/",
  //     pages: ["finish"],
  //   },
  //   // 轨迹
  //   {
  //     root: "pages/path_plan/",
  //     pages: ["index"],
  //   },
  //   // 个人中心
  //   {
  //     root: "pages/my_center/",
  //     pages: ["index"],
  //   },
  // ],
};
