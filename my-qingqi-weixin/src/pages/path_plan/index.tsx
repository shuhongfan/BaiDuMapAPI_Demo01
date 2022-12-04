/* eslint-disable react/forbid-elements */
/* eslint-disable react/react-in-jsx-scope */
import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Image, Map } from "@tarojs/components";
import MapMak from "./../../components/mapMak/index";
import NavBar from "../../components/navBar";
import "./index.scss";
import { nearLineData } from "../../actions/api";
import { connect } from "react-redux";
import { bMapToQQMap } from "./../../utils/mapTool";
import historyIcon from "./../../assets/images/history.png";
import nearbyIcon from "./../../assets/images/nearby.png";
import plan from "./../../assets/images/img_xianshiqu@2x.png";
const mapStateToProps = (state, ownProps) => {
  return {
    counter: state.counter,
  };
};
class Index extends Component {
  // 变量状态
  state = {
    nearbyData: [],
    markers: [],
    polyLineData: [
      {
        points: [],
        color: "#FF0000DD",
        width: 6,
        dottedLine: false,
      },
    ],
  };
  cofig = {
    navigationBarBackgroundColor: "#000",
  };
  componentDidShow() {}
  async componentWillMount() {
    this.setState({
      markers: [],
    });
    // 从redux中获取当前地理位置
    const {
      counter: { GpsInfo },
    } = this.props;
    const gpsInfo = GpsInfo;
    console.log(gpsInfo, 125);
    let parent = {
      latitude: GpsInfo.latitude,
      longitude: GpsInfo.longitude,
      distance: 20,
    };
    this.getNearbyData(parent);
  }

  getNearbyData = async (parent) => {
    const { data } = await nearLineData(parent);
    console.log(data, 5555);
    this.markersSet(data);
    // // this.setState({
    // //   nearbyData: data,
    // // });
  };

  markersSet(data) {
    console.log(data, 444565);
    if (data.length > 0) {
      let arr = [];
      data.forEach((n, ind) => {
        let obj = { id: "0", longitude: "", latitude: "" };
        let point = bMapToQQMap(n.longitude, n.latitude);
        obj.id = ind;
        // console.log("n.routeId: " + n.routeId);
        // console.log("obj.id: " + obj.id);
        obj.userId = n.id;
        obj.routeId = n.routeId;
        obj.latitude = point[0];
        obj.longitude = point[1];
        obj.title = "marker" + n.routeId;
        obj.width = 10;
        obj.height = 10;
        obj.iconPath = plan;
        obj.callout = {
          display: "ALWAYS",
          content: `${n.range} km`,
          bgColor: "#fce700",
          padding: 10,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#dfc31e",
        };
        arr.push(obj);
      });
      this.setState({
        markers: arr,
      });
    }
  }

  histroyHandle() {
    Taro.redirectTo({
      url: "/pages/history/index",
    });
  }

  nearbyHandle() {
    Taro.redirectTo({
      url: "/pages/nearby/index",
    });
  }
  handleBack = () => {
    Taro.redirectTo({
      url: "/pages/index/index",
    });
  };
  // 页面渲染
  render() {
    const { polyLineData, markers } = this.state;
    return (
      <View className="planBox">
        {/* 导航 */}
        <NavBar fixed isHomeBack handleBack={this.handleBack} />
        {/* end */}

        <View className="pathPlan" v-if={markers.length > 0}>
          {/* <MapComp polyLineData={polyLineData} ></MapComp> */}
          <MapMak markers={markers}></MapMak>
          <View className="tableCont">
            {/* <Image src={historyListIcon}></Image> */}
            <View className="histroy" onClick={this.histroyHandle}>
              <Image src={historyIcon} className="icon"></Image>
              历史
            </View>
            <View className="nearby" onClick={this.nearbyHandle}>
              <Image src={nearbyIcon} className="icon"></Image>
              附近
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Index);
