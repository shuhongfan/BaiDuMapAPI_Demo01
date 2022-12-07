import { Component } from "react";
import { View, Text, Image } from "@tarojs/components";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { AtButton } from "taro-ui";
import { GlobalState } from "../../utils";
import { bMapToQQMap, GetDistance } from "./../../utils/mapTool";
import { connect } from "react-redux";
// 接口
import { contribute, routeDetails, getUserData } from "../../actions/api";
// 组件
import NavBar from "../../components/navBar";
import MapComp from "./../../components/MapComp/index";
import startIcon from "../../assets/images/start.png";
import endIcon from "../../assets/images/maker.png";
// 样式
import "./index.scss";
interface IState {
  // distance: number;
  markers: any[];
  polyLineData: any[];
  routeId: String;
  baseData: object;
  userData: object;
}
class Index extends Component<{}, IState> {
  current = getCurrentInstance();
  // 变量状态
  constructor(props) {
    super(props);
    this.state = {
      routeId: "",
      markers: [
        {
          latitude: 39.899472,
          longitude: 116.397446,
          id: 20,
          width: 30,
          height: 30,
        },
      ],
      type: "",
      polyLineData: [],
      baseData: {} as any,
      userData: {} as any,
    };
  }
  // async componentDidMount() {}
  // 生命周期
  async componentDidMount() {
    const params = this.current.router?.params as any;
    const routeId = params.routeId ?? "";

    const { data } = await routeDetails(routeId);
    const userData = await getUserData(data!.userId);
    // // 从redux中获取当前地理位置
    // const {
    //   counter: { GpsInfo },
    // } = this.props;
    // const gpsInfo = GpsInfo;
    let markers = [{}];
    const stPint = bMapToQQMap(
      data.startPoint.latitude,
      data.startPoint.longitude
    );
    const endPint = bMapToQQMap(
      data.endPoint.latitude,
      data.endPoint.longitude
    );
    // 计算两点之间的距离 单位米
    // const distance = gpsInfo
    //   ? GetDistance(gpsInfo.latitude, gpsInfo.longitude, endPint[0], endPint[1])
    //   : 0;

    markers[0] = {
      latitude: stPint[0],
      longitude: stPint[1],
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
      latitude: endPint[0],
      longitude: endPint[1],
      iconPath: userData.data.logo || endIcon,
      id: 1,
      width: 40,
      height: 40,
      borderRadius: 40,
      rotate: 0,
      anchor: {
        x: 0.5,
        y: 0.5,
      },
      callout: {},
    };

    let polyLineData: any = [
      {
        points: [],
        color: "#FCD700",
        width: 4,
        dottedLine: false,
      },
    ];
    let points: object[] = [];
    data.points.map((n) => {
      let obj = { longitude: "", latitude: "" };
      let point = bMapToQQMap(n.longitude, n.latitude);
      obj.latitude = point[1];
      obj.longitude = point[0];
      points.push(obj);
    });

    // points.unshift({
    //   latitude: markers[0].latitude,
    //   longitude: markers[0].longitude,
    // });
    // points.push({
    //   latitude: markers[1].latitude,
    //   longitude: markers[1].longitude,
    // });
    polyLineData[0].points = points;
    this.setState({
      baseData: data,
      markers,
      polyLineData,
      userData: userData.data,
      // distance,
    });

    const { dispatch } = this.props;
    dispatch({ type: "SAVE_EARKERS", data: markers });
    dispatch({ type: "SAVE_POLYLINE", data: polyLineData });
  }
  // 路线详情
  // 投稿
  handleFinish = async () => {
    let { dispatch } = this.props;
    const { data } = await contribute(this.state.routeId);
    Taro.redirectTo({
      url: "/pages/contribute/succeed",
    });
    if (data.code === 200) {
      // Taro.redirectTo({
      //   url: "pages/contribute/succeed",
      // });
    }
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
  };
  // 页面渲染
  render() {
    const { markers, polyLineData, baseData, userData } = this.state;
    return (
      <View className="contribute finish">
        <NavBar fixed title="保存运动" isBack />
        <MapComp polyLineData={polyLineData} markers={markers}></MapComp>
        <View className="main">
          {/* 公里 */}
          <View className=" boxBg">
            <View className="headInfo">
              <View className="lHead">
                <Image src={userData.avatarUrl} />
              </View>
              <View className="rText">
                <Text className="title">{userData.nickName}</Text>
                <Text className="address">{baseData.title}</Text>
              </View>
            </View>
            <View className="timeInfo">
              {baseData.endTime}
              <text>
                <text className="icon" />
                {baseData.time}
              </text>
            </View>
            <View className="kilometre">
              <View className="info">
                <Text>里程</Text>
                <Text className="num">{Number(baseData.distance) / 1000}</Text>
                <Text>km</Text>
              </View>
              <View className="info">
                <Text>运动时间</Text>
                <Text className="num">{baseData.time}</Text>
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
          <View className="btnBox">
            <AtButton onClick={this.handleFinish}>确定投稿</AtButton>
          </View>
          {/* end */}
        </View>
      </View>
    );
  }
}
export default connect()(Index);
