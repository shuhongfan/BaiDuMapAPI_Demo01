import { Component } from "react";
import { View, Text, Map } from "@tarojs/components";
import Taro, {
  connectSocket,
  getCurrentInstance,
  eventCenter,
} from "@tarojs/taro";
import { AtForm, AtTextarea, AtButton, AtModal } from "taro-ui";
import { connect } from "react-redux";
import { GlobalState, Thread_DETAIL_NAVIGATE } from "../../utils";
import MapComp from "./../../components/MapComp/index";
import { GetDistance } from "./../../utils/mapTool";
// js
import setTimer from "../../utils/timer";
import lebu from "../../utils/lebu-core";
// import RunInfo from "../../components/interval";
// 接口
import { updatePath, reportPath } from "../../actions/api";
// 组件
import NavBar from "../../components/navBar";
// 样式
import "./index.scss";
// const INIT_MAP = {
//   latitude: 40.060584,
//   longitude: 116.344116,
//   scale: 13,
// };
interface IState {
  distance: number;
  // init: {
  //   latitude: number;
  //   longitude: number;
  //   scale: number;
  // };
  // map: {
  //   latitude: number;
  //   longitude: number;
  //   scale: number;
  // };
  markers: any[];
  polyline: any[];
  isMulti: boolean;
  routeId: String;
  // errorNum: Number;
  isOpened: boolean;
  value: string;
  motionInfoData: any;
  polyLineData: any[];
  mearkers: any[];
}
const mapStateToProps = (state, ownProps) => {
  return {
    counter: state.counter,
  };
};
class Index extends Component<{}, IState> {
  private timeLocal: any | undefined;
  current = getCurrentInstance();
  constructor(props) {
    super(props);
    // 变量状态
    this.state = {
      routeId: "",
      // errorNum: 0,
      isOpened: false,
      type: "",
      distance: 5,
      // init: INIT_MAP,
      // map: INIT_MAP,
      markers: [
        {
          latitude: 40.22077,
          longitude: 116.23128,
          id: 20,
          width: 30,
          height: 30,
        },
      ],
      // 区分是列表还是单个售货机
      isMulti: true,
      vms: [],
      vm: {
        location: "",
        innerCode: "",
        nodeName: "",
        addr: "",
        distance: 0,
        typeName: "",
      },
      polyline: [] as any,
      points_time: parseInt(Date.now() / 1000),
      distance_data: "0.00",
      motionInfoData: {
        realTimeSpeedData: Number(0), //实时速度
        distanceData: "0.00", //里程
        timeData: "00:00", //时间
        speedData: "0.00", //速度
      },

      value: "",
      MapContext: null as any,
      polyLineData: [],
      mearkers: [],
      // myTimer: 0,
      // timeLocal: null,
      latitude: "",
      longitude: "",
    };
  }
  //获取正在运动的时间、公里、平均速度
  componentWillReceiveProps(nextProps) {
    const params = this.current.router!.params;
    const {
      counter: { RunStop },
    } = this.props as any;

    // if (params.type !== "2" || (params.type === "2" && RunStop)) {

    const {
      counter: { MotionInfoData },
    } = nextProps;
    console.log(MotionInfoData, 258);
    if (MotionInfoData !== null) {
      this.setState({
        motionInfoData: {
          realTimeSpeedData: MotionInfoData.realTimeSpeedData,
          distanceData: MotionInfoData.distanceData,
          speedData: MotionInfoData.speedData,
          timeData: MotionInfoData.timeData,
        },
      });
    }

    // }
  }
  // 生命周期
  componentWillMount() {
    const {
      Times,
      counter: { TimeLocas, distanceData, RunStop, MotionInfoData },
    } = this.props as any;
    const params = this.current.router!.params;
    const type = params.type as any;
    const routeId = params.routeId;

    // const errorNum = params.errorInfo;
    const { counter } = this.props as any;
    this.setState({
      motionInfoData:
        MotionInfoData !== null ? MotionInfoData : this.state.motionInfoData,
      routeId: routeId,
      // errorNum: errorNum,
      type,
    });
    if (type === "1") {
      this.setState({
        motionInfoData: MotionInfoData,
      });
    }
    if (type === "2" && type === "2" && !RunStop) {
      // // 获取经纬度
      // // 骑行计时开始
      this.setIntervalTime();
      // // 上报位置
      this.LocalsetInterval(params.routeId);
      // this.setState({
      //   motionInfoData: MotionInfoData,
      // });
    } else {
      this.setState({
        polyLineData: [counter.MapNewPolyLine],
        mearkers: [],
      });
    }
  }
  LocalsetInterval = async (routeId) => {
    let _this = this;
    // 获取经纬度上报位置
    this.postLocation(routeId);
    this.timeLocal = setInterval(() => {
      _this.postLocation(routeId);
    }, 15000);
    // const { dispatch } = this.props;
    // dispatch({ type: "SAVE_EARKERS", data: this.timeLocal });
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
      speed: GpsInfo.speed,
    };
    const { data } = await reportPath(params);
    console.log(data);

    dispatch({
      type: "CHANGE_NEW_POLYLINE",
      data: { latitude: latitude, longitude: longitude },
    });
  };
  setIntervalTime = () => {
    let {
      dispatch,
      counter: { Times },
    } = this.props;
    console.log(Times, 4555566);
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
        // let distance = this.state.motionInfoData.distanceData;
        if (this.state.motionInfoData.distanceData === undefined) {
          // this.state.motionInfoData.distanceData = 0;
          this.setState({
            motionInfoData: {
              distanceData: 0,
            },
          });
        }
        const runData = lebu.calSpeed(
          this.state.motionInfoData.distanceData,
          times
        );
        this.setState({
          motionInfoData: {
            realTimeSpeedData: Number(
              (GpsInfo.speed * (60 * 60)) / 1000
            ).toFixed(2),
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
      }, 1000);
      dispatch({
        type: "SAVE_TIMER",
        data: timer,
      });
    }
  };
  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  onSubmit = () => {};
  handleSubmit = async () => {
    const { dispatch } = this.props;
    let params = {
      routeId: this.state.routeId,
      title: this.state.value,
    };
    const { data } = await updatePath(params);
    console.log(data, 11111);
    this.finishTo();
    // let motionInfoData = {
    //   distanceData: "0.00",
    //   timeData: "0:00",
    //   speedData: "0.00",
    // };

    // if (this.state.errorNum > 10) {
    //   this.setState({
    //     isOpened: true,
    //   });
    // } else {

    // }
    // dispatch({
    //   type: "SAVE_MOTIONINFODATA",
    //   data: motionInfoData,
    // });
    // eventCenter.trigger(Thread_DETAIL_NAVIGATE, motionInfoData);
  };
  handleCancel = () => {
    this.setState({
      isOpened: false,
    });
    this.handleMyCenter();
  };
  finishTo = () => {
    Taro.redirectTo({
      // url: "/pages/contribute/finish?routeId=" + this.state.routeId,
      url: "/pages/history_detail/index?type=3&routeId=" + this.state.routeId,
    });
  };
  // 路线
  handleSearchAround = () => {
    Taro.redirectTo({
      url: "/pages/path_plan/index",
    });
  };
  // 个人中心
  handleMyCenter = () => {
    Taro.redirectTo({
      url: "/pages/my_center/index",
    });
  };
  handleBack = () => {
    const { type, routeId } = this.state;
    let {
      dispatch,
      counter: { Times },
    } = this.props;
    console.log(type);
    if (type === "2") {
      setTimer.end();
      clearInterval(Times);
      clearInterval(this.timeLocal);
      // dispatch({
      //   type: "SAVE_RUNSTOP",
      //   data: false,
      // });
      dispatch({
        type: "SAVE_TIMER",
        data: null,
      });
    }
    Taro.redirectTo({
      url: `/pages/riding/index?type=${type}&routeId=${routeId}`,
    });
  };
  // onRef = (ref) => {
  //   this.child = ref;
  // };
  // 页面渲染
  render() {
    const { type, polyLineData, mearkers, motionInfoData } = this.state;
    const { counter } = this.props as any;
    let polyLine = [];

    if (
      motionInfoData ||
      (motionInfoData.distanceData !== undefined &&
        motionInfoData.distanceData !== "0.00" &&
        motionInfoData.distanceData !== 0)
    ) {
      let distanceData = motionInfoData.distanceData;
      this.state.motionInfoData.distanceData = distanceData;
    }

    let mark = [];
    if (type == 0) {
      polyLine = [counter.MapNewPolyLine];
    } else if (type == 1) {
      polyLine = [counter.MapNewPolyLine];
    } else if (type == 2) {
      mark = counter.MapMearkers;

      let roullLine;
      if (counter.MapPolyLine) {
        roullLine = counter.MapPolyLine[0];
      } else {
        roullLine = [];
      }

      roullLine.color = "#cccccc";
      polyLine = [roullLine, counter.MapNewPolyLine];
    }
    return polyLineData ? (
      <View className="contribute">
        {type === "2" || type === "" ? (
          <NavBar fixed isRun handleBack={this.handleBack} />
        ) : (
          <NavBar fixed title="保存运动" isRun handleBack={this.handleBack} />
        )}
        {/* <NavBar fixed title="保存运动" isRun handleBack={this.handleBack} /> */}
        <MapComp polyLineData={polyLine} markers={mark}></MapComp>
        <View className="main">
          {/* 公里 */}
          <View className="kilometre boxBg">
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
            {/* {type === "2" ? (
              <RunInfo types={type} onRef={this.onRef}></RunInfo>
            ) : null} */}
          </View>

          {/* end */}
          {/* 标题 */}
          {type === "0" ? (
            <View className="fromBox boxBg">
              <AtForm onSubmit={this.onSubmit.bind(this)}>
                <Text className="tit">
                  <Text>*</Text>轨迹标题
                </Text>
                <AtTextarea
                  value={this.state.value}
                  onChange={this.handleChange.bind(this)}
                  maxLength={15}
                  placeholder="简短而有特色的名字，如果与地标相关也可以提及"
                />
                <View className="btnBox">
                  {/* <AtButton
                  formType="submit"
                  className="contributeBtn"
                  onClick={this.handleSubmit}
                >
                  完成
                </AtButton> */}
                  <AtButton
                    className="finishBtn"
                    formType="reset"
                    disabled={this.state.value == ""}
                    onClick={this.handleSubmit}
                  >
                    完成并发布
                  </AtButton>
                </View>
              </AtForm>
            </View>
          ) : null}
          {/* end */}
        </View>
        <AtModal
          isOpened={this.state.isOpened}
          title="无法保存轨迹"
          cancelText="知道了"
          onCancel={this.handleCancel}
          content="系统检测到此次骑行中存在时间或里程异常的情况，轨迹数据无法保存。"
        />
      </View>
    ) : null;
  }
}

export default connect(mapStateToProps)(Index);
