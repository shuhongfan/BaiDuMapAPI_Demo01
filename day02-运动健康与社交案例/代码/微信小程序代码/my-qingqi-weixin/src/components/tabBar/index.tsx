import { Component } from "react";
import { View } from "@tarojs/components";
// 样式
import "./index.scss";
// 定义class，继承Component
class Child extends Component {
  state = {
    current: 0,
  };

  handleClick(value) {
    this.setState({
      current: value,
    });
  }
  // render函数是必须实现的
  render() {
    return <View className="lineBox line"></View>;
  }
}

export default Child;
