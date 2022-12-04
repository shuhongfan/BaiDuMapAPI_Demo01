import { Component } from "react";
import { View, Map, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";
import markerIcon from "../../assets/images/maker.png";
// import markerPopIcon from '../../assets/images/point.png'

const mapMarkers = [
  {
    latitude: 39.899472,
    longitude: 116.397446,
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
    this.setState({ MapContext: Taro.createMapContext("myMap") });
  }

  checkHandle() {
    const { MapContext, polyLineData } = this.state;
    MapContext.moveAlong({
      markerId: 999999,
      path: polyLineData[0].points,
      duration: 5000,
    });
  }

  bindcallouttapHandle(e) {
    e.stopPropagation();
    const { markers } = this.props;

    // console.log("e: " + JSON.stringify(e));
    // const routeId = e.detail.markerId;
    // const { userId } = markers.filter((n) => n.id == routeId)[0];
    const index = e.detail.markerId;
    const routeId = markers[index].routeId;
    const userId = markers[index].userId;
    Taro.redirectTo({
      url: `/pages/history_detail/index?userId=${userId}&routeId=${routeId}`,
    });
  }

  render() {
    const { polyLineData, gpsInfo } = this.state;
    let { markers } = this.props;
    // 当前位置 图标设置
    // if (markers.length > 0 && markers[0].id != 999999 && gpsInfo) {
    //   mapMarkers[0].latitude = gpsInfo.latitude;
    //   mapMarkers[0].longitude = gpsInfo.longitude;
    //   markers.unshift(mapMarkers[0]);
    // }
    // markers[0].iconPath = mapMarkers[0].iconPath;
    // console.log(markers, gpsInfo, polyLineData, 123456);
    return markers.length > 0 && gpsInfo != null ? (
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
          show-location
          onCalloutTap={this.bindcallouttapHandle}
        >
          {
            // markers.map((item,index) => {
            //   return (<View slot="callout">
            //   <View marker-id={item}>
            //       <Image src={markerPopIcon} style={{'width': '30px', 'height': '30px'}}></Image>
            //   </View>
            // </View>)
            // })
          }
        </Map>
      </View>
    ) : null;
  }
}
