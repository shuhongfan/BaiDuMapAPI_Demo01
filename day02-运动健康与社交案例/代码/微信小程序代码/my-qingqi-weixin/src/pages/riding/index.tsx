import { Component } from "react";
import { View, Text, CoverView } from "@tarojs/components";
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
  private timer: any | undefined;
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
        realTimeSpeedData: 0, //实时速度
        distanceData: "0.00", //里程
        timeData: "00:00", //时间
        speedData: "0.00", //速度
      } as any,

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
      // errorNum: 0,
      distanceaData: null as any,
      // myTimer: null,
      // timeLocal: null,
      paramTime: null,
      gpsInfo: null,
      type: "",
      // motionInfoData: {} as any,
    };

    // this.handleStop = this.handleStop.bind(this);
  }
  // 生命周期
  componentWillUnmount() {}
  //获取正在运动的时间、公里、平均速度
  componentWillReceiveProps(nextProps) {
    const {
      counter: { MotionInfoData, Times },
    } = nextProps;
    if (MotionInfoData !== null && Times) {
      this.setState({
        motionInfoData: {
          realTimeSpeedData: MotionInfoData.realTimeSpeedData,
          distanceData: MotionInfoData.distanceData,
          speedData: MotionInfoData.speedData,
          timeData: MotionInfoData.timeData,
        },
      });
    }
  }
  componentDidMount() {}
  componentDidShow() {}
  componentWillMount() {
    // 保持屏幕常亮
    Taro.setKeepScreenOn({
      keepScreenOn: true,
    });
    let {
      Times,
      counter: { RunStop, MotionInfoData },
    } = this.props;

    const routerParams = getCurrentInstance().router!.params;
    // console.log(routerParams, 449645);
    this.setState({
      type: routerParams.type ?? "",
      routeId: routerParams.routeId,
    });
    if (
      (routerParams.type !== "2" && !RunStop) ||
      (routerParams.type === "2" && !RunStop)
    ) {
      // 骑行计时开始
      this.setIntervalTime();
      // 上报位置
      this.LocalsetInterval(routerParams.routeId);
    } else {
      this.setState({
        motionInfoData: MotionInfoData,
      });
    }
  }
  // 生命周期
  onLoad = () => {};
  LocalsetInterval = async (routeId) => {
    let _this = this;
    // 获取经纬度上报位置
    this.postLocation(routeId);
    this.timeLocal = setInterval(() => {
      _this.postLocation(routeId);
    }, 15000);
    const { dispatch } = this.props;
    dispatch({ type: "SAVE_EARKERS", data: this.timeLocal });
  };
  // 功能
  // 上报位置
  postLocation = async (routeId) => {
    const {
      dispatch,
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
      }
      // () => {
      //   this.refs.per.getPer();
      // }
    );
    let params = {
      routeId: routeId,
      latitude: latitude,
      longitude: longitude,
      speed: GpsInfo.speed,
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
    console.log(this.state.routeId, 1125635);
    const { data } = await deletePath(this.state.routeId);
    // this.setState({
    //   routeId: data.routeId,
    // });
  };
  setIntervalTime = () => {
    let {
      dispatch,
      counter: { Times, MotionInfoData, RunStop },
    } = this.props;
    if (Times == null) {
      setTimer.start();
      const timer = setInterval(() => {
        const {
          counter: { GpsInfo, MapNewPolyLine },
        } = this.props as any;

        let objArr = MapNewPolyLine.points;
        let end = null as any;
        if (objArr.length === 0) {
          end = GpsInfo;
        } else {
          end = objArr[objArr.length - 1];
        }

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

        let times = setTimer.getTime();

        const runData = lebu.calSpeed(
          this.state.motionInfoData.distanceData,
          times
        );
        let speedNum = GpsInfo.speed;
        if (speedNum === -1) {
          GpsInfo.speed = 0;
        }
        this.setState({
          // realTimeSpeedData: (distance / 1000).toFixed(2),

          motionInfoData: {
            realTimeSpeedData: ((GpsInfo.speed * (60 * 60)) / 1000).toFixed(2),
            timeData: times,
            speedData: runData,
            distanceData: (
              Number(this.state.motionInfoData.distanceData) +
              Number(distance / 1000)
            ).toFixed(2),
          },
        });
        dispatch({
          type: "SAVE_MOTIONINFODATA",
          data: this.state.motionInfoData,
        });
        console.log(
          GpsInfo.speed,
          (GpsInfo.speed * (60 * 60)) / 1000,
          123456789
        );
      }, 1000);

      dispatch({
        type: "SAVE_TIMER",
        data: timer,
      });
    }
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
  handleStart = () => {
    console.log(this.state.routeId);
    let { dispatch } = this.props;
    clearTimeout(this.paramTime);
    this.setIntervalTime(); //计时器开始
    this.LocalsetInterval(this.state.routeId); // 上传位置开始
    Taro.startLocationUpdate({
      success: (res) => {
        // Taro.onLocationChange((res) => {
        //   console.log("GPS获取成功：1", res);
        //   dispatch({ type: "SAVE_GPSINFO", data: res });
        // });
      },
      fail: (res) => {
        console.log(res);
      },
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
        // this.refs.per.getPer();
      }
    );
  };
  // onRef = (ref) => {
  //   this.child = ref;
  // };

  // 暂停运动
  handleStop = () => {
    let {
      dispatch,
      counter: { Times, TimesLocal },
    } = this.props;

    setTimer.end();
    clearInterval(Times);
    clearInterval(this.timeLocal);
    Taro.stopLocationUpdate();

    dispatch({
      type: "SAVE_TIMER",
      data: null,
    });
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
        // this.refs.per.getPer();
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
    // let time = 10;
    // 判断跑步时间是否超过3分钟
    if (semTime < time) {
      this.setState({
        isOpened: true,
      });
    } else {
      // 清空定时器
      let {
        dispatch,
        counter: { Times, TimesLocal },
      } = this.props;
      setTimer.end();
      setTimer.reset();
      clearInterval(Times);
      clearInterval(TimesLocal);
      Taro.stopLocationUpdate();
      dispatch({
        type: "SAVE_RUNSTOP",
        data: false,
      });
      // dispatch({
      //   type: "SAVE_TIMER",
      //   data: null,
      // });
      this.setState(() => ({
        isOpened: false,
        suspendShow: false,
        longStopShow: false,
      }));
      // type=0结束路线; 1 是正常开始运动; 2 走别人的路
      Taro.navigateTo({
        url: `/pages/contribute/index?type=0&routeId=${this.state.routeId}`,
      });
    }
    this.getRunInfo();
    // TODO 测试完后用上方注释后的代码
    // // 测试
    // type=0结束路线; 1 是正常开始运动; 2 走别人的路
    // Taro.navigateTo({
    //   url: `/pages/contribute/index?type=0&routeId=${this.state.routeId}&errorNum=${this.state.errorNum}`,
    // });
  };
  // 轻触事件
  touchStart = () => {
    this.setState({
      longStopShow: true,
    });
    clearInterval(this.paramTime);
    this.paramTime = setTimeout(() => {
      this.setState({
        longStopShow: false,
      });
    }, 1000);
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
    let {
      dispatch,
      counter: { Times, TimesLocal },
    } = this.props;
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
    clearInterval(Times);
    clearInterval(TimesLocal);
    Taro.stopLocationUpdate();
    this.deleteRoute();
    this.setState(() => ({
      isOpened: false,
      suspendShow: false,
      longStopShow: false,
    }));
    Taro.navigateTo({
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
    let typeNum = type;
    // if (type !== "") {
    //   typeNum = "2";
    // } else {
    //   typeNum = "1";
    // }
    // setTimer.end();
    // clearInterval(this.myTimer);
    // clearInterval(this.timeLocal);
    this.getRunInfo();
    Taro.navigateTo({
      url: `/pages/index/index?name=back&type=${type}&routeId=${this.state.routeId}`,
    });
  };

  //打开地图
  goMapTop = () => {
    // setTimer.end();
    // clearInterval(this.state.myTimer);
    // clearInterval(this.timeLocal);
    let _this = this;
    // type=0结束路线; 1 是正常开始运动; 2 走别人的路
    const { type, routeId } = this.state;
    let typeNum = type;
    // if (type !== undefined) {
    //   debugger;
    //   typeNum = "2";
    // } else {
    //   typeNum = "1";
    // }
    Taro.navigateTo({
      url: `/pages/contribute/index?routeId=${routeId}&type=` + typeNum,
    });
  };

  // 页面渲染
  render() {
    const {
      longStopShow,
      suspendShow,
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
                <PerTable per={motionInfoData.realTimeSpeedData}></PerTable>
                {/* <Text>实时时速</Text>
                <Text className="num">
                  {motionInfoData.realTimeSpeedData === 0
                    ? "0.00"
                    : motionInfoData.realTimeSpeedData}
                </Text>
                <Text>km/h</Text> */}
              </View>
            ) : (
              <View className="echartsInfo">
                <PerTable ref="per2" per="0" RunStop="RunStop"></PerTable>
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
        {/* <AtModal
          isOpened={isOpened}
          cancelText="结束"
          confirmText="继续运动"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          content="本次运动时间或距离过短，无法保存记录，确定要结束吗？"
        ></AtModal> */}
        {isOpened ? (
          <CoverView className="controls">
            <CoverView className="main">
              {/* <AtModal
                isOpened
                cancelText="结束"
                confirmText="继续运动"
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
                content="本次运动时间或距离过短，无法保存记录，确定要结束吗？"
              ></AtModal> */}
              <CoverView className="con">
                本次运动时间或距离过短，无法保存记录，确定要结束吗？
              </CoverView>
              <CoverView className="btn">
                <CoverView onClick={this.handleCancel}>结束</CoverView>
                <CoverView onClick={this.handleConfirm}>继续运动</CoverView>
              </CoverView>
            </CoverView>
          </CoverView>
        ) : null}
      </View>
    );
  }
}
export default connect(mapStateToProps)(Index);
