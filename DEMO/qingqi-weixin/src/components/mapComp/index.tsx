import { Component } from "react";
import { View, Map } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";
import markerIcon from "../../assets/images/maker.png";
import "../../assets/images/start.png";

const mapMarkers = [
  {
    latitude: null,
    longitude: null,
    iconPath: markerIcon,
    id: 999999,
    width: 50,
    height: 50,
    rotate: 0,
    anchor: {
      x: 0.5,
      y: 0.5,
    },
  },
];

export default class MapComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MapContext: null,
      ...props,
      gpsInfo: null,
    };

    this.checkHandle = this.checkHandle.bind(this);
  }

  componentWillMount() {
    const _this = this;
    // Taro.getLocation({
    //   type: "gcj02",
    //   success(res) {
    //     console.log("GPS获取成功：", res);
    //     _this.setState({ gpsInfo: res });
    //   },
    //   fail(err) {
    //     console.log("GPS获取失败：", err);
    //   },
    // });
    let { polyLineData } = this.props;
    this.setState({
      gpsInfo: {
        latitude: polyLineData[0].points[0].latitude,
        longitude: polyLineData[0].points[0].longitude,
      },
    });
    this.setState({ MapContext: Taro.createMapContext("myMap") });
  }

  componentDidMount() {}

  onLoad() {}

  checkHandle() {
    const { MapContext, polyLineData } = this.state;
    MapContext.moveAlong({
      markerId: 999999,
      path: polyLineData[0].points,
      duration: 5000,
    });
  }

  bindcallouttapHandle(obj) {}

  render() {
    const { gpsInfo } = this.state;
    let { markers, polyLineData } = this.props ?? [];
    // if (
    //   (markers.length == 0 && gpsInfo) ||
    //   (markers.length > 0 && markers[0].id != 999999 && gpsInfo)
    // ) {
    //   mapMarkers[0].latitude = gpsInfo.latitude;
    //   mapMarkers[0].longitude = gpsInfo.longitude;
    //   markers.unshift(mapMarkers[0]);
    // }
    // console.log(markers, 1);
    return gpsInfo != null ? (
      <View className="mapComp">
        <Map
          id="myMap"
          setting={{}}
          className="mapConver"
          markers={markers}
          latitude={gpsInfo.latitude}
          longitude={gpsInfo.longitude}
          showCompass={true}
          polyline={polyLineData}
          scale={15}
          bindcallouttap="bindcallouttapHandle"
          bindmarkertap="bindcallouttapHandle"
          // show-location
          showLocation={true} // 显示带有方向的当前定位点
        ></Map>
        {/* <View onClick={this.checkHandle}>点我试试</View> */}
      </View>
    ) : null;
  }
}
