import { Component } from "react";
import { View, Text, Icon, Button } from "@tarojs/components";
import Taro, { eventCenter, getCurrentInstance } from "@tarojs/taro";
import { AtModal, AtModalContent, AtModalHeader } from "taro-ui";
import {
  GlobalState,
  Thread_DETAIL_TOKEN,
  Thread_DETAIL_USER,
} from "../../utils";
import { connect } from "react-redux";
// ts
import { MyData } from "../../interfaces/interfaces";
// 接口
import {
  logins,
  updateUserInfo,
  getUserData,
  createPath,
} from "../../actions/api";
// 组件
import NavBar from "../../components/navBar";
import Gps from "../../components/gps";
// 样式
import "./index.scss";
const mapStateToProps = (state, ownProps) => {
  return {
    counter: state.counter,
  };
};
interface IState {
  baseData: MyData;
  selectHeight: number;
  isRun: any;
  gpsInfo: any;
  type: any;
  routeId: any;
}

class Index extends Component<{}, IState> {
  private timeLocal: any | undefined;
  current = getCurrentInstance();
  // // 变量状态
  // state = {
  //   baseData: {
  //     totalDistance: "",
  //   },
  //   selectHeight: 0,
  //   isRun: "",
  //   gpsInfo: null,
  // };

  constructor(props) {
    super(props);
    this.state = {
      baseData: {
        totalDistance: 0,
      },
      selectHeight: 0,
      isRun: "",
      gpsInfo: null,
      type: "",
      routeId: "",
      reservedState: false,
      showInfo: {
        title: "",
        desc: "",
        but: "",
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    const {
      counter: { MotionInfoData },
    } = nextProps;
    console.log(MotionInfoData, 258);
  }
  // 生命周期
  onLoad() {
    const { dispatch } = this.props as any;
    const { gpsInfo } = this.state;
    const _this = this;
    // gpsInfo 使用存储到redux里
    gpsInfo == null &&
      Taro.getLocation({
        type: "gcj02",
        success(res) {
          console.log("GPS获取成功：", res);
          _this.setState({ gpsInfo: res });
        },
        fail(err) {
          console.log("GPS获取失败：", err);
        },
      });

    // 15秒钟监听一次地里位置变化
    // this.timeLocal = setInterval(() => {
    Taro.startLocationUpdate({
      success: (res) => {
        Taro.onLocationChange((res) => {
          console.log("GPS获取成功：1", res);
          dispatch({ type: "SAVE_GPSINFO", data: res });
        });
      },
      fail: (res) => {
        console.log(res);
      },
    });
    // }, 15000);
  }
  async componentDidMount() {}
  // 在render之前调用
  async componentWillMount() {
    const { gpsInfo } = this.state;

    const params = this.current.router?.params as any;

    this.isRun = params.name;
    this.setState({
      routeId: params.routeId ?? "",
    });
    if (params.type !== undefined && params.type !== "") {
      this.setState({
        type: params.type,
      });
    }

    // TODO 暂时隐藏
    if (this.isRun === undefined && GlobalState.thread === "") {
      // console.log(GlobalState.thread, 5555);
      this.init();
      this.getData();
    } else {
      this.getUserDatea();
    }
  }
  // 个人信息
  getUserDatea = async () => {
    const routerParams = getCurrentInstance().router!.params;
    // console.log(routerParams.userId, 11233);
    const { data } = await getUserData(routerParams.userId ?? "");
    console.log(data, 1);
    this.setState({
      baseData: data,
    });
  };
  // 获取code、token，然后存储token
  init = async () => {
    const { code } = await Taro.login();
    // console.log(code, 5555);
    // if (code) {
    const { data } = await logins(code);
    // // 存token

    eventCenter.trigger(Thread_DETAIL_TOKEN, data.token);
    this.getUserDatea();
    const { gpsInfo } = this.state;
    const { dispatch } = this.props as any;
    dispatch({ type: "SAVE_GPSINFO", data: gpsInfo });

    // }
  };
  // 授权登录
  async getData() {
    let _this = this;
    let res = Taro.getMenuButtonBoundingClientRect();
    this.setState({
      selectHeight: res.height,
    });
    Taro.showModal({
      title: "温馨提示",
      content: "亲，授权微信登录后才能骑行！",
      showCancel: false,
      success(res) {
        if (res.confirm) {
          Taro.getUserProfile({
            lang: "zh_CN",
            desc: "登录",
            success(userInfo) {
              eventCenter.trigger(Thread_DETAIL_USER, userInfo);
              const params = {
                nickName: userInfo.userInfo.nickName,
                logo: userInfo.userInfo.avatarUrl,
                gender: userInfo.userInfo.gender,
                country: userInfo.userInfo.country,
                province: userInfo.userInfo.province,
                city: userInfo.userInfo.city,
              };
              updateUserInfo(params).then(async (success) => {
                // console.log(success);
                // eventCenter.trigger(Thread_DETAIL_USER, success.data);
              });
            },
            fail: function (err) {
              // uni.showToast({title: "授权失败", icon: 'error',})
              _this.setState({
                reservedState: true,
                showInfo: {
                  title: "授权失败",
                  desc: "请重新授权",
                  but: "知道了",
                },
              });
              console.log("获取失败: ", err);
            },
          });
        }
      },
    });
    console.log(this.state.reservedState);

    // const { confirm } = await Taro.showModal({
    //   title: "温馨提示",
    //   content: "亲，授权后才能骑行！",
    //   showCancel: false,
    // });
    // if (confirm) {
    //   // console.log(res);
    //   Taro.getUserProfile({
    //     lang: "zh_CN",
    //     desc: "登录",
    //     success(userInfo) {
    //       eventCenter.trigger(Thread_DETAIL_USER, userInfo);
    //       const params = {
    //         nickName: userInfo.userInfo.nickName,
    //         logo: userInfo.userInfo.avatarUrl,
    //         gender: userInfo.userInfo.gender,
    //         country: userInfo.userInfo.country,
    //         province: userInfo.userInfo.province,
    //         city: userInfo.userInfo.city,
    //       };
    //       updateUserInfo(params).then(async (success) => {
    //         // console.log(success);
    //         // eventCenter.trigger(Thread_DETAIL_USER, success.data);
    //       });
    //     },
    //     fail: function (err) {
    //       console.log(err);
    //     },
    //   });
    // }
  }
  // 创建路线
  createRoute = async () => {};
  // 开始跑步
  handleStart = async () => {
    if (this.type === "2") {
      Taro.redirectTo({
        url: `/pages/contribute/index?type=${this.type}&routeId=${this.state.routeId}`,
      });
    } else {
      if (this.isRun !== "back") {
        // 创建路线
        const { data } = await createPath();
        Taro.redirectTo({
          // TODO 暂时隐藏
          url: `/pages/time/index?routeId=${data.routeId}`,
        });
      } else {
        Taro.redirectTo({
          // TODO 暂时隐藏
          url: `/pages/riding/index?routeId=${this.state.routeId}`,
        });
      }
    }
  };
  // 路线
  handleSearchAround = () => {
    if (this.isRun === "back") {
      Taro.redirectTo({
        url: `/pages/contribute/index?type=${this.state.type}&routeId=${this.state.routeId}`,
      });
    } else {
      Taro.redirectTo({
        url: "/pages/path_plan/index",
      });
    }
  };
  bindGetUserInfo = (e) => {};
  // 个人中心
  handleMyCenter = () => {
    Taro.redirectTo({
      url: "/pages/my_center/index",
    });
  };
  // 页面渲染
  render() {
    const { baseData, showInfo, reservedState } = this.state;

    return (
      <View className="index">
        <NavBar fixed leftIcon="logo" />
        <View className="topbgGradient">
          {/* GPS */}
          <Gps />
          {/* end */}
          {/* 公里 */}
          <View
            className="kilometre"
            onClick={this.handleMyCenter}
            open-type="getUserInfo"
            bindgetuserinfo="bindGetUserInfo"
          >
            <Text className="text">本月累计骑行 km</Text>
            <Text className="num">
              {(Number(baseData.totalDistance) / 1000).toFixed(2)}
            </Text>
          </View>
        </View>
        {/* end */}
        <View className="botbgGradient">
          {/* 导航 */}
          <View className="bottomBox">
            {this.isRun === "back" ? (
              <View className="myBox isRun">
                <Icon></Icon>
                <Text className="col">我的</Text>
              </View>
            ) : (
              <View className="myBox" onClick={this.handleMyCenter}>
                <Icon></Icon>
                <Text>我的</Text>
              </View>
            )}

            <View className="goExercise" onClick={this.handleStart}>
              {this.isRun === undefined ? (
                <Icon className="icon startIcon" />
              ) : (
                <Icon className="icon backIcon" />
              )}
            </View>
            <View className="pathBox" onClick={this.handleSearchAround}>
              <Icon></Icon>
              <Text>路线</Text>
            </View>
          </View>
          {/* end */}
        </View>
        <AtModal isOpened={reservedState}>
          <AtModalHeader>{showInfo.title}</AtModalHeader>
          <AtModalContent>{showInfo.desc}</AtModalContent>
          <View>
            <navigator open-type="exit" class="define" target="miniProgram">
              {showInfo.but}
            </navigator>
          </View>
        </AtModal>
        {/* {reservedState ? (
          <View>
            <View>{showInfo.desc}</View>
            <View>{showInfo.desc}</View>
            <View>
              <navigator open-type="exit" class="define" target="miniProgram">
                {showInfo.but}
              </navigator>
            </View>
          </View>
        ) : null} */}
      </View>
    );
  }
}
export default connect(mapStateToProps)(Index);
