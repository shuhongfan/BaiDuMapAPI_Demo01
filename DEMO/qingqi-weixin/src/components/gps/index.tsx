import { Component } from "react";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
// 样式
import "./index.scss";
// 定义class，继承Component

class GpsModule extends Component {
  state = {
    current: 0,
    num: null as any,
  };

  async componentWillMount() {
    const { networkType } = await Taro.getNetworkType();
    this.setState({
      num: networkType,
    });
    this.base(networkType);
  }

  onLoad() {
    Taro.onNetworkStatusChange((res) => {
      if (res.isConnected) {
        const resData = res.networkType;
        this.base(resData);
      } else {
        this.setState({
          num: 0,
        });
      }
    });
  }
  base = (resData) => {
    if (resData === "none") {
      this.setState({
        num: 1,
      });
    } else if (resData === "2g") {
      this.setState({
        num: 2,
      });
    } else if (resData === "3g") {
      this.setState({
        num: 3,
      });
    } else if (resData === "4g") {
      this.setState({
        num: 4,
      });
    } else if (resData === "wifi") {
      this.setState({
        num: 5,
      });
    }
  };
  handleClick(value) {}
  // render函数是必须实现的
  render() {
    let { num } = this.state;
    return (
      <View className="gpsTip">
        <Text onClick={this.handleClick}>GPS</Text>
        {num === 1 ? (
          <View className="tipInfo">
            <View className="icon wrongTip"></View>
            <View className="bg">
              <View className="triangle-up"></View>无信号：可能无法记录轨迹
            </View>
          </View>
        ) : (
          ""
        )}
        {num === 2 ? (
          <View className="tipInfo">
            <View className="icon activeReg"></View>
            <View className="icon"></View>
            <View className="icon"></View>
            <View className="bg">
              <View className="triangle-up"></View>信号弱：可能无法记录轨迹
            </View>
          </View>
        ) : (
          ""
        )}
        {num === 3 ? (
          <View className="tipInfo">
            <View className="icon active"></View>
            <View className="icon active"></View>
            <View className="icon"></View>
          </View>
        ) : (
          ""
        )}
        {num === 4 || num === 5 ? (
          <View className="tipInfo">
            <View className="icon active"></View>
            <View className="icon active"></View>
            <View className="icon active"></View>
          </View>
        ) : (
          ""
        )}
      </View>
    );
  }
}

export default GpsModule;
