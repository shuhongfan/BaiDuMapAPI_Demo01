import { Component } from "react";
import { View, Text } from "@tarojs/components";
import Taro, { getCurrentInstance, eventCenter } from "@tarojs/taro";
import { Thread_DETAIL_NAVIGATE } from "../../utils";
import { GetDistance, bMapToQQMap } from "./../../utils/mapTool";
import { AtModal } from "taro-ui";
import { connect } from "react-redux";
// js
import setTimer from "../../utils/timer";
import lebu from "../../utils/lebu-core";
// 接口
import { createPath, reportPath, deletePath } from "../../actions/api";
// 组件
import NavBar from "../../components/navBar";
import Gps from "../../components/gps";
import PerTable from "../../components/perTable";
// import RunInfo from "../../components/interval";
// 样式
import "./index.scss";
const mapStateToProps = (state, ownProps) => {
  return {
    counter: state.counter,
  };
};
class Index extends Component {
  // 变量状态
  // private timer: any | undefined;
  // private timeLocal: any | undefined;
  // state = {};
  private timeLocal: any | undefined;
  private paramTime: any | undefined;
  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      motionInfoData: {
        distanceData: Number(0.0), //里程
        timeData: "00:00", //时间
        speedData: "0.00", //速度
      } as any,

      realTimeSpeedData: "0.00", //实时速度
      km_speed_data: [],
      km_distance_data: 0,
      suspendShow: false,
      checkAll: false,
      longClick: 0, // 长按标志
      timeOutEvent: 0, // 计时器
      isOpened: false,
      time_id: 0,
      longStopShow: false,
      routeId: "",
      errorNum: 0,
      distanceaData: null as any,
      myTimer: 0,
      timeLocal: null,
      paramTime: null,
      gpsInfo: null,
      type: "",
      // motionInfoData: {} as any,
    };

    this.handleStop = this.handleStop.bind(this);
  }
  // 生命周期
  componentWillUnmount() {
    // setTimer.end();
    // clearInterval(this.myTimer);
    // clearInterval(this.timeLocal);
  }
  //获取正在运动的时间、公里、平均速度
  // componentWillReceiveProps(nextProps) {
  //   const params = this.current.router!.params;
  //   const {
  //     counter: { RunStop },
  //   } = this.props as any;

  //   if (params.type === "2" && RunStop) {
  //     const {
  //       counter: { MotionInfoData },
  //     } = nextProps;
  //     this.setState({
  //       motionInfoData: {
  //         distanceData: MotionInfoData.distanceData,
  //         speedData: MotionInfoData.speedData,
  //         timeData: MotionInfoData.timeData,
  //       },
  //     });
  //   }
  // }
  componentDidMount() {}
  componentDidShow() {}
  componentWillMount() {
    let {
      Times,
      counter: { RunStop, MotionInfoData },
    } = this.props;
    let { motionInfoData } = this.state;

    // setTimer.end();
    // // setTimer.reset();
    // clearInterval(this.myTimer);
    // clearInterval(this.timeLocal);
    const routerParams = getCurrentInstance().router!.params;
    this.setState({
      type: routerParams.type ?? "",
      routeId: routerParams.routeId,
    });
    if (!RunStop || RunStop === undefined) {
      // 获取经纬度
      this.getLocation(routerParams.routeId);
      // 骑行计时开始
      // Taro.startLocationUpdateBackground({
      //   success: (res) => {},
      //   fail: (res) => {
      //     console.log(res);
      //   },
      // });
      Taro.startAccelerometer({
        interval: "normal",
        success() {
          setTimer.start();
        },
      });
      this.setIntervalTime();
      Taro.onAccelerometerChange((res) => {
        const {
          dispatch,
          counter: { GpsInfo, MapNewPolyLine },
        } = this.props as any;

        let objArr = MapNewPolyLine.points;
        const end = objArr[objArr.length - 1];
        // const endPint = bMapToQQMap(end.longitude, end.latitude); //百度坐标转腾讯坐标
        // console.log(endPint[0], endPint[1], 1);
        // console.log(end.latitude.toString(), end.longitude.toString(), 2);
        // // 计算两点之间的距离 单位米 里程
        const distance = GpsInfo
          ? GetDistance(
              GpsInfo.latitude,
              GpsInfo.longitude,
              end.latitude, //endPint[0]
              end.longitude //endPint[1]
            )
          : 0;
        // let times = setTimer.getTime();

        const runData = lebu.calSpeed(
          this.state.motionInfoData.distanceData,
          this.state.motionInfoData.timeData
        );
        let speedNum = GpsInfo.speed;
        if (speedNum === -1) {
          GpsInfo.speed = 0;
        }
        let distanceData = 0.0;
        if (distance === 0) {
          distanceData = 0.0;
        } else {
          distanceData =
            parseFloat(motionInfoData.distanceData) + distance / 1000;
        }

        this.setState({
          // realTimeSpeedData: (distance / 1000).toFixed(2),
          realTimeSpeedData: ((GpsInfo.speed * (60 * 60)) / 1000).toFixed(2),
          motionInfoData: {
            timeData: this.state.motionInfoData.timeData,
            speedData: runData,
            distanceData: distanceData.toFixed(2),
          },
        });
        dispatch({
          type: "SAVE_MOTIONINFODATA",
          data: this.state.motionInfoData,
        });
        // dispatch({
        //   type: "SAVE_TIMER",
        //   data: this.state.myTimer,
        // });
      });

      // 上报位置
      this.LocalsetInterval();
    } else {
      this.setState({
        motionInfoData: MotionInfoData,
      });
    }
  }
  // 生命周期
  onLoad = () => {
    const routerParams = getCurrentInstance().router!.params;
    // 上报位置
    // 获取经纬度
    this.getLocation(routerParams.routeId);
    // 骑行计时开始
    this.LocalsetInterval();
  };
  LocalsetInterval = async () => {
    let _this = this;
    this.timeLocal = setInterval(() => {
      _this.getLocation(this.state.routeId);
    }, 15000);
    // const { dispatch } = this.props;
    // dispatch({ type: "SAVE_EARKERS", data: this.timeLocal });
  };
  getLocation = async (routeId) => {
    const {
      counter: { GpsInfo },
    } = this.props as any;
    // this.distanceaData = distance;
    // 从redux获取当前位置

    const latitude = GpsInfo.latitude;
    const longitude = GpsInfo.longitude;
    this.setState(
      {
        latitude: latitude,
        longitude: longitude,
      },
      () => {
        this.refs.per.getPer();
      }
    );
    // GPS中断次数，判断轨迹异常
    if (
      (!latitude || latitude !== undefined) &&
      (!longitude || longitude !== undefined)
    ) {
      this.setState({
        errorNum: this.state.errorNum + 1,
      });
    }
    // 调用上报位置
    this.postLocation(latitude, longitude, GpsInfo.speed, routeId);
  };
  // 功能
  // 上报位置
  postLocation = async (latitude, longitude, speed, routeId) => {
    const {
      dispatch,
      counter: { MotionInfoData },
    } = this.props;
    // const {
    //   counter: { MotionInfoData },
    // } = this.props;
    // let speed = "";
    // if (MotionInfoData) {
    //   speed = MotionInfoData.speedData;
    // } else {
    //   speed = this.state.motionInfoData.speedData;
    // }
    let params = {
      routeId: routeId,
      latitude: latitude,
      longitude: longitude,
      speed: speed,
    };
    const { data } = await reportPath(params);
    console.log(data, 4566456);

    dispatch({
      type: "CHANGE_NEW_POLYLINE",
      data: { latitude: latitude, longitude: longitude },
    });
  };

  // 删除路线
  deleteRoute = async () => {
    const { data } = await deletePath(this.state.routeId);
    this.setState({
      routeId: data.routeId,
    });
  };
  setIntervalTime = () => {
    // setTimer.start();
    this.state.myTimer = setInterval(() => {
      let times = setTimer.getTime();
      this.setState({
        motionInfoData: {
          timeData: times,
        },
      });
    }, 500);

    // }, 1000);
  };
  // // 时速
  // speedDatas = () => {
  //   // console.log(this.state.timeData);
  //   let runData = lebu.run(this.state.timeData);
  //   this.setState({
  //     distanceData: runData.distance,
  //     speedData: runData.speed,
  //   });
  // };
  // 开始运动
  onLaunch = () => {};
  handleStart = () => {
    let { dispatch } = this.props;
    clearTimeout(this.paramTime);
    // setTimer.start();
    // this.setIntervalTime(); //计时器开始
    // this.LocalsetInterval(); // 上传位置开始
    Taro.startAccelerometer({
      interval: "normal",
      success() {
        setTimer.start();
      },
    });
    Taro.onAccelerometerChange((res) => {
      debugger;
    });
    // // this.speedDatas();
    dispatch({
      type: "SAVE_RUNSTOP",
      data: false,
    });
    this.setState(
      () => ({
        suspendShow: false,
        longStopShow: false,
      }),
      () => {
        // console.log(that.refs);
        this.refs.per.getPer();
      }
    );
  };
  // onRef = (ref) => {
  //   this.child = ref;
  // };

  // 暂停运动
  handleStop = () => {
    setTimer.end();
    Taro.stopLocationUpdate({
      complete: (res) => {},
    });
    Taro.stopAccelerometer({
      complete: (res) => {},
    });
    // clearInterval(this.myTimer);
    // clearInterval(this.timeLocal);
    let { dispatch } = this.props;
    dispatch({
      type: "SAVE_MOTIONINFODATA",
      data: this.state.motionInfoData,
    });
    dispatch({
      type: "SAVE_RUNSTOP",
      data: true,
    });

    this.setState(
      () => ({
        suspendShow: true,
      }),
      () => {
        this.refs.per2.getPer();
      }
    );
  };
  getRunInfo = () => {
    // 存运动时间，里程，速度
    const motionInformation = {
      distanceData: this.state.motionInfoData.distanceData,
      timeData: this.state.motionInfoData.timeData,
      speedData: this.state.motionInfoData.speedData,
    };
    eventCenter.trigger(Thread_DETAIL_NAVIGATE, motionInformation);
  };
  // 长按事件开始
  touchLongPress = (e) => {
    e.stopPropagation();
    this.setState({
      longStopShow: false,
    });
    clearTimeout(this.paramTime);
    let semTime = setTimer.toSem(this.state.motionInfoData.timeData) as any;
    let time = 60 * 3;
    // 判断跑步时间是否超过3分钟
    if (semTime < time) {
      this.setState({
        isOpened: true,
      });
    } else {
      // 清空定时器
      let { dispatch } = this.props;
      dispatch({
        type: "SAVE_RUNSTOP",
        data: false,
      });
      setTimer.end();
      setTimer.reset();
      clearInterval(this.state.myTimer);
      clearInterval(this.timeLocal);
      this.setState(() => ({
        isOpened: false,
        suspendShow: false,
        longStopShow: false,
      }));
      // type=0结束路线; 1 是正常开始运动; 2 走别人的路
      Taro.redirectTo({
        url: `/pages/contribute/index?type=0&routeId=${this.state.routeId}&errorNum=${this.state.errorNum}`,
      });
    }
    this.getRunInfo();
    // TODO 测试完后用上方注释后的代码
    // // 测试
    // type=0结束路线; 1 是正常开始运动; 2 走别人的路
    // Taro.redirectTo({
    //   url: `/pages/contribute/index?type=0&routeId=${this.state.routeId}&errorNum=${this.state.errorNum}`,
    // });
  };
  // 轻触事件
  touchStart = () => {
    this.setState({
      longStopShow: true,
    });
    this.paramTime = setTimeout(() => {
      this.setState({
        longStopShow: false,
      });
    }, 5000);
  };
  // 长按事件结束
  handleTouchEnd = () => {
    // clearTimeout(this.state.timeOutEvent);
    // this.setState({ longClick: 0 }); // 清除标志位
    // if (this.state.timeOutEvent != 0 && this.state.longClick == 0) {
    //   // 判断是否非长按事件
    //   //此处为点击事件
    //   console.log("点击事件");
    // }
    // return false;
  };
  // 关闭弹层
  handleCancel = () => {
    let { dispatch } = this.props;
    // // 清除数据
    let motionInfoData = {
      distanceData: "0.00",
      timeData: "0:00",
      speedData: "0.00",
    };

    dispatch({
      type: "SAVE_MOTIONINFODATA",
      data: motionInfoData,
    });
    dispatch({
      type: "SAVE_RUNSTOP",
      data: false,
    });
    setTimer.end();
    setTimer.reset();
    clearInterval(this.state.myTimer);
    clearInterval(this.timeLocal);
    this.deleteRoute();
    this.setState(() => ({
      isOpened: false,
      suspendShow: false,
      longStopShow: false,
    }));
    Taro.redirectTo({
      url: "/pages/index/index",
    });
  };
  // 确定
  handleConfirm = () => {
    this.setState(() => ({
      isOpened: false,
    }));
  };
  handleBack = () => {
    const { type } = this.state;
    let typeNum = "";
    if (type !== "") {
      typeNum = "2";
    } else {
      typeNum = "1";
    }
    // setTimer.end();
    // clearInterval(this.myTimer);
    // clearInterval(this.timeLocal);
    this.getRunInfo();
    Taro.redirectTo({
      url: "/pages/index/index?name=back&type=" + typeNum,
    });
  };

  //打开地图
  goMapTop = () => {
    let _this = this;
    // type=0结束路线; 1 是正常开始运动; 2 走别人的路
    const { type } = this.state;

    let typeNum = "";
    if (type !== "") {
      typeNum = "2";
    } else {
      typeNum = "1";
    }
    Taro.redirectTo({
      url: "/pages/contribute/index?type=" + typeNum,
    });
  };

  // 页面渲染
  render() {
    const {
      longStopShow,
      suspendShow,
      realTimeSpeedData,
      motionInfoData,
      // distanceData,
      // timeData,
      // speedData,
      isOpened,
    } = this.state;
    let {
      counter: { RunStop },
    } = this.props;
    return (
      <View className="ridingBox">
        <NavBar fixed isHomeBack handleBack={this.handleBack} />
        {/* GPS */}
        <Gps />
        {/* end */}
        {!longStopShow ? (
          <View className="echarts">
            {/* https://blog.csdn.net/ink_s/article/details/95329996 */}
            {!suspendShow || !RunStop ? (
              <View className="echartsInfo">
                <PerTable ref="per" percent={realTimeSpeedData}></PerTable>
                <Text>实时时速</Text>
                <Text className="num">
                  {realTimeSpeedData === 0 ? "0.00" : realTimeSpeedData}
                </Text>
                <Text>km/h</Text>
              </View>
            ) : (
              <View className="echartsInfo">
                <PerTable ref="per2" percent="0"></PerTable>
                <View className="infoStop">暂停中</View>
              </View>
            )}
          </View>
        ) : (
          <View className="longStop">
            <Text>长按结束运动</Text>
          </View>
        )}

        {/* 实时速度 */}
        <View className={longStopShow ? "longStopActive" : ""}>
          <View
            className={[
              "exercise",
              suspendShow || RunStop ? "stopActive" : "",
            ].join(" ")}
          >
            {/* <RunInfo ref="runinfo" onRef={this.onRef}></RunInfo> */}
            <View className="info">
              <Text>里程</Text>
              <Text className="num">
                {motionInfoData.distanceData === 0
                  ? "0.00"
                  : motionInfoData.distanceData}
              </Text>
              <Text>km</Text>
            </View>
            <View className="info">
              <Text>运动时间</Text>
              <Text className="num">{motionInfoData.timeData}</Text>
              <Text>mm:ss</Text>
            </View>
            <View className="info">
              <Text>平均速度</Text>
              <Text className="num">{motionInfoData.speedData}</Text>
              <Text>km/h</Text>
            </View>
          </View>
        </View>
        <View className="btnOperation">
          {suspendShow || RunStop ? (
            <View className="btnInfo">
              <View className="btn btnStart" onClick={this.handleStart}></View>
              <View
                className="btn btnPress"
                onClick={this.touchStart}
                onLongPress={this.touchLongPress.bind(this)}
                onTouchEnd={this.handleTouchEnd}
              ></View>
            </View>
          ) : (
            <View className="btnInfo">
              <View className="btn btnPause" onClick={this.handleStop}></View>
            </View>
          )}
          <View className="mapIcon" onClick={this.goMapTop}></View>
        </View>
        {/* end */}
        <AtModal
          isOpened={isOpened}
          cancelText="结束"
          confirmText="继续运动"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          content="本次运动时间或距离过短，无法保存记录，确定要结束吗？"
        ></AtModal>
      </View>
    );
  }
}
export default connect(mapStateToProps)(Index);
