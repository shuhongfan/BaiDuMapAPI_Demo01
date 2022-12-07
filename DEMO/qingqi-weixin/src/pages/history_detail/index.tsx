/** 历史轨迹-详情 ***/
// 4 我的列表页
// 5 附近路线列表页
// 6 历史记录列表页
import { Component } from "react";
import { View, Text, Image, Button } from "@tarojs/components";
import Taro, { getCurrentInstance, eventCenter } from "@tarojs/taro";
import MapComp from "./../../components/MapComp/index";
import { bMapToQQMap, GetDistance } from "./../../utils/mapTool";
import { connect } from "react-redux";
import { AtButton, AtModal, AtModalContent, AtModalAction } from "taro-ui";
import { formatTimeData, formatYearData } from ".././../utils/common";
import { Thread_DETAIL_NAVIGATE } from "../../utils";
// ts
import { HistoryInterfaces } from "../../interfaces/interfaces";
// 接口
import {
  routeDetails,
  routeData,
  getUserData,
  newUserData,
  contribute,
  createPath,
} from "../../actions/api";
import "./index.scss";
// 组件
import NavBar from "../../components/navBar";
import startIcon from "../../assets/images/start.png";
import endIcon from "../../assets/images/maker.png";

interface IState {
  baseData: HistoryInterfaces;
}
const mapStateToProps = (state, ownProps) => {
  return {
    counter: state.counter,
  };
};
class historDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeId: "",
      routerParams: null,
      baseData: null,
      markers: [],
      polyLineData: [],
      userData: null,
      nearByData: null,
      distance: 0,
      gpsInfo: null,
      isOpened: false,
    };
  }

  onLoad() {
    // const { counter } = this.props;
    // console.log(counter, 77);
    // const { gpsInfo } = this.state;
    // const _this = this;
    // // gpsInfo 使用存储到redux里
    // gpsInfo == null &&
    //   Taro.getLocation({
    //     success(res) {
    //       console.log("GPS获取成功：", res);
    //       _this.setState({ gpsInfo: res });
    //     },
    //     fail(err) {
    //       console.log("GPS获取失败：", err);
    //     },
    //   });
  }

  // 生命周期
  // 第一次渲染后调用
  componentDidMount() {
    this.info();
  }
  info = async () => {
    const {
      counter: { MotionInfoData },
    } = this.props as any;
    const routerParams = getCurrentInstance().router!.params;
    this.setState({
      routeId: routerParams.routeId ?? "",
    });
    // 获取路线详情
    const { data } = await routeDetails(
      // (routerParams.userId || routerParams.routeId) ?? ""
      routerParams.routeId ?? ""
    );
    data.distance = (Number(data.distance) / 1000).toFixed(2);

    if (data.time === null) {
      data.distance = MotionInfoData.distanceData;
      data.time = MotionInfoData.timeData;
      data.speed = MotionInfoData.speedData;
    }

    // 个人数据
    const userData = await getUserData(data!.userId);
    // 路线同行人
    const nearByData = await newUserData(routerParams.routeId ?? "");
    console.log(nearByData, 566995);
    // 从redux中获取当前地理位置
    const {
      counter: { GpsInfo },
    } = this.props;
    const gpsInfo = GpsInfo;
    let polyLineData: any = [
      {
        points: [],
        color: "#FCD700",
        width: 4,
        dottedLine: false,
      },
    ];
    let points: object[] = [];
    if (data.points) {
      data.points.map((n) => {
        let obj = { longitude: "", latitude: "" };
        let point = bMapToQQMap(n.longitude, n.latitude);
        obj.latitude = Number(point[0]);
        obj.longitude = Number(point[1]);
        points.push(obj);
      });
      polyLineData[0].points = points;
    }
    console.log(polyLineData, 111);
    console.log(markers, 222);
    let markers = [{}];
    let stPint = [] as any;
    let endPint = [] as any;
    let endPint0 = null;
    let endPint1 = null;
    let stPint0 = null;
    let stPint1 = null;
    if (data.startPoint && data.endPoint) {
      // 百度地图转腾讯地图
      stPint = bMapToQQMap(data.startPoint.longitude, data.startPoint.latitude);
      endPint = bMapToQQMap(data.endPoint.longitude, data.endPoint.latitude);
      endPint0 = endPint[0];
      endPint1 = endPint[1];
      stPint0 = stPint[0];
      stPint1 = stPint[1];
    } else {
      endPint0 = GpsInfo.latitude;
      endPint1 = GpsInfo.longitude;
      stPint0 = GpsInfo.latitude;
      stPint1 = GpsInfo.longitude;
    }
    console.log(polyLineData, 111);
    // 计算两点之间的距离 单位米
    const distance = gpsInfo
      ? GetDistance(gpsInfo.latitude, gpsInfo.longitude, endPint0, endPint1)
      : 0;
    console.log(startIcon, userData.data.logo, 4444555);
    markers[0] = {
      latitude: endPint0,
      longitude: endPint1,
      iconPath: startIcon,
      id: 0,
      width: 30,
      height: 30,
      rotate: 0,
      anchor: {
        x: 0.5,
        y: 0.5,
      },
    };
    markers[1] = {
      latitude: stPint0,
      longitude: stPint1,
      iconPath: userData.data.logo || endIcon,
      id: 1,
      width: 30,
      height: 30,
      borderRadius: 15,
      rotate: 0,
      anchor: {
        x: 0.5,
        y: 0.5,
      },
      callout: {},
    };

    // points.unshift({
    //   latitude: markers[0].latitude,
    //   longitude: markers[0].longitude,
    // });
    // points.push({
    //   latitude: markers[1].latitude,
    //   longitude: markers[1].longitude,
    // });
    if (data.speed === null) {
      data.speed = "0.00";
    } else if (data.time === null) {
      data.time = "0:00";
    }
    this.setState({
      baseData: data,
      nearByData: nearByData.data,
      markers,
      polyLineData,
      userData: userData.data,
      routerParams,
      distance,
    });

    const { dispatch } = this.props;
    dispatch({ type: "SAVE_EARKERS", data: markers });
    dispatch({ type: "SAVE_POLYLINE", data: polyLineData });
  };
  // 开始运动
  goMotionTap = async () => {
    // type=1 是正常开始运动; 2 走别人的路
    if (this.state.distance > 500) {
      this.setState({
        isOpened: true,
      });
    } else {
      console.log(this.state.routeId, 456);
      // 沿着路线开始运行
      const { data } = await routeData(this.state.routeId);
      // console.log(neadData, 4444);
      // 创建路线
      // const { data } = await createPath();
      Taro.redirectTo({
        url: "/pages/contribute/index?type=2&routeId=" + data.routeId,
      });
    }
  };
  handleCancel = () => {
    this.setState(() => ({
      isOpened: false,
    }));
  };
  // 确定
  handleConfirm = async () => {
    this.setState({
      isOpened: false,
    });
    // 沿着路线开始运行
    console.log(this.state.routeId, 123);
    const { data } = await routeData(this.state.routeId);
    // console.log(neadData, 4444);
    // 创建路线
    // const { data } = await createPath();
    Taro.redirectTo({
      url: "/pages/contribute/index?type=2&routeId=" + data.routeId,
    });
  };
  // 投稿
  handleFinish = async () => {
    this.handleClear();
    const { data } = await contribute(this.state.routerParams.routeId);
    Taro.redirectTo({
      url: "/pages/contribute/succeed",
    });
    if (data.code === 200) {
      // Taro.redirectTo({
      //   url: "pages/contribute/succeed",
      // });
    }
  };
  handleBack = () => {
    this.handleClear();
    if (this.state.routerParams.type === "5") {
      Taro.redirectTo({
        url: "/pages/nearby/index",
      });
    } else if (this.state.routerParams.type === "6") {
      Taro.redirectTo({
        url: "/pages/history/index",
      });
    } else {
      Taro.redirectTo({
        url: "/pages/my_center/index",
      });
    }
  };
  handleNead = () => {
    Taro.redirectTo({
      url: `/pages/nearby/index?runUser=users&routeId=${this.state.routerParams.routeId}&current=1`,
    });
  };
  handleClear = () => {
    const { dispatch } = this.props;
    let motionInfoData = {
      distanceData: "0.00",
      timeData: "0:00",
      speedData: "0.00",
    };
    dispatch({
      type: "SAVE_MOTIONINFODATA",
      data: motionInfoData,
    });
    eventCenter.trigger(Thread_DETAIL_NAVIGATE, motionInfoData);
  };
  // 页面渲染
  render() {
    const {
      baseData,
      markers,
      polyLineData,
      userData,
      nearByData,
      routerParams,
      distance,
    } = this.state;
    console.log(routerParams, 555);
    const GoMotionBut = () => (
      <View className="goMotion" onClick={this.goMotionTap}>
        开始运动
      </View>
    );
    return baseData ? (
      <View className="historDetails">
        {/* {routerParams.type === "3" ? (
          <NavBar
            fixed
            isBackMy
            title="完成的路线"
            handleBack={this.handleBack}
          />
        ) : (
          <NavBar fixed isBack title="完成的路线" />
        )} */}
        <NavBar
          fixed
          isBackMy
          title="完成的路线"
          handleBack={this.handleBack}
        />

        <View className="at-row at-row--wrap product-list">
          <MapComp polyLineData={polyLineData} markers={markers}></MapComp>
          {/* 3 我的详情 4投稿页面*/}
          {routerParams.type === "3" || routerParams.type === "4" ? (
            <View className="main">
              {/* 公里 */}
              <View className=" boxBg">
                <View className="headInfo">
                  <View className="lHead">
                    <Image src={userData.logo} />
                  </View>
                  <View className="rText">
                    <Text className="title">
                      {userData.nickName}
                      {baseData.isShare === true ? (
                        <Text className="isShare textR">已投稿</Text>
                      ) : null}
                    </Text>
                    <Text className="address">{baseData.title}</Text>
                  </View>
                </View>
                <View className="timeInfo">
                  {formatTimeData(new Date(Number(baseData.endTime)))}
                  <text>
                    <text className="icon" />
                    {baseData.time}
                  </text>
                </View>
                <View className="kilometre">
                  <View className="info">
                    <Text>里程</Text>
                    <Text className="num">{baseData.distance}</Text>
                    <Text>km</Text>
                  </View>
                  <View className="info">
                    <Text>运动时间</Text>
                    <Text className="num">
                      {baseData.time !== "null" ? (
                        <Text>{baseData.time}</Text>
                      ) : (
                        "0:00"
                      )}
                    </Text>
                    <Text>mm:ss</Text>
                  </View>
                  <View className="info">
                    <Text>平均速度</Text>
                    <Text className="num">{baseData.speed}</Text>
                    <Text>km/h</Text>
                  </View>
                </View>
              </View>
              {/* end */}
              {/* 按钮 */}
              {routerParams.type === "3" ? (
                <View className="btnBox">
                  <AtButton onClick={this.handleFinish}>确定投稿</AtButton>
                </View>
              ) : null}

              {/* end */}
            </View>
          ) : (
            <View className="contBox">
              {routerParams.type === "6" ? (
                <View>
                  <View className="title">{baseData.title}</View>
                  <View className="desc">
                    <Text>全程 {baseData.distance} km</Text>
                  </View>
                </View>
              ) : (
                <View>
                  <View className="title">{baseData.title}</View>
                  <View className="desc">
                    <Text>全程 {baseData.distance} km</Text>
                    <Text>距离 {distance} 米</Text>
                  </View>
                  <View>
                    <View className="nearbyList">
                      <View className="iconList">
                        {nearByData.records.map((item, index) => (
                          <Image
                            className="icon"
                            src={item.logo}
                            style={{ left: `${index * 36}rpx` }}
                            onClick={this.handleNead}
                          ></Image>
                        ))}
                      </View>
                      <View className="descCont">
                        <Text className="descText">
                          附近{nearByData.count}个人在同一条路上骑行
                        </Text>
                      </View>
                    </View>
                    <View className="userInfo">
                      <Image className="icon" src={userData.logo}></Image>
                      <Text className="name">{userData.nickName}</Text>
                      <Text className="desc">
                        于{formatYearData(new Date(Number(baseData.endTime)))}
                        创建
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              <GoMotionBut />
            </View>
          )}
        </View>
        {/* <AtModal
          isOpened={this.state.isOpened}
          title="无法保存轨迹"
          cancelText="知道了"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          content="`当前位置距离路线${distance/1000}km，是否现在开始运动？`"
        /> */}
        <AtModal isOpened={this.state.isOpened}>
          <AtModalContent>
            当前位置距离路线{(distance / 1000).toFixed(2)}km，是否现在开始运动？
          </AtModalContent>
          <AtModalAction>
            {" "}
            <Button onClick={this.handleCancel}>放弃</Button>{" "}
            <Button onClick={this.handleConfirm}>开始</Button>{" "}
          </AtModalAction>
        </AtModal>
      </View>
    ) : null;
  }
}
export default connect(mapStateToProps)(historDetails);
