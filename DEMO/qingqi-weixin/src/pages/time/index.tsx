import { Component } from "react";
import { View } from "@tarojs/components";
import Taro, { getCurrentInstance } from "@tarojs/taro";
// 组件
// 样式
import "./index.scss";

class Index extends Component {
  // 变量状态
  private timer: any | undefined;
  state = {
    timeRemainingInSeconds: 4,
  };
  nextGo = () => {
    const routerParams = getCurrentInstance().router!.params;
    Taro.redirectTo({
      url: `/pages/riding/index?routeId=${routerParams.routeId}`,
    });
  };

  // 生命周期
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  // 第一次渲染后调用
  componentDidMount() {
    this.timer = setInterval(() => {
      this.decrementTimeRemaining();
    }, 1000);
  }
  decrementTimeRemaining = () => {
    if (this.state.timeRemainingInSeconds > 1) {
      this.setState({
        timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1,
      });
    } else {
      clearInterval(this.timer);
      this.nextGo();
    }
  };
  // 页面渲染
  render() {
    return (
      <View className="countDown">
        {/* <View className="text">{this.state.timeRemainingInSeconds}</View> */}
        <View className="text text1">3</View>
        <View className="text text2">2</View>
        <View className="text text3">1</View>
        <View className="text text4">GO</View>
      </View>
    );
  }
}
export default Index;
