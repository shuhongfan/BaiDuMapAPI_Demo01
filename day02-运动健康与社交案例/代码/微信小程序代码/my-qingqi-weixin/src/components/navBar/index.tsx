import { View, Text } from "@tarojs/components";
import { Component } from "react";
import Taro from "@tarojs/taro";
import classNames from "classnames";
import "./index.scss";

class Navbar extends Component {
  // 默认配置
  static defaultProps = {
    isBack: false,
    isRun: false,
    isHomeBack: false,
    isLogo: false,
    isBackMy: false,
    title: " ",
    background: "#fff",
    color: "#181a39",
    logo: "logo",
  };
  // constructor(props) {
  //   super(props);
  // }
  handleClick = () => {};
  handleNavigateBack = () => {
    this.props.handleBack();
  };
  handleBack = () => {
    Taro.navigateBack();
  };
  cofig = {
    navigationBarBackgroundColor: "#fff",
  };
  render() {
    const style = {
      paddingTop: Taro.$navBarMarginTop + "px",
      backgroundColor: "#fff",
      color: "#181a39",
    };
    const {
      isBack,
      isBackMy,
      isHomeBack,
      isRun,
      title,
      background,
      color,
      logo,
    } = this.props;

    let weapp = false;
    if (process.env.TARO_ENV === "weapp") {
      weapp = true;
    }

    return (
      <View style={style} className="navBox">
        <View className="taroNavbar">
          <View
            className="taroNavbarWrap"
            style={{ backgroundColor: background }}
          >
            {/* 返回 */}
            <View>
              {isHomeBack && (
                <View
                  onClick={this.handleNavigateBack}
                  className="backHomeIcon"
                ></View>
              )}
              {isBack && (
                <View
                  onClick={this.handleNavigateBack}
                  className="backIcon"
                ></View>
              )}
              {isBackMy && (
                <View
                  onClick={this.handleNavigateBack}
                  className="backIcon"
                ></View>
              )}
              {isRun && (
                <View
                  onClick={this.handleNavigateBack}
                  className="backIcon"
                ></View>
              )}

              {/* 标题 */}
              <Text style={{ color: color }}>{title}</Text>
            </View>
            <View className={logo}></View>
          </View>
        </View>
      </View>
    );
  }
}
export default Navbar;
