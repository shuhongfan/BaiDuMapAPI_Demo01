import { Component } from "react";
import { View, Text, Icon } from "@tarojs/components";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { AtButton } from "taro-ui";
import setTimer from "../../utils/timer";
// 接口
import { getUserData } from "../../actions/api";
// 组件
import NavBar from "../../components/navBar";
// 样式
import "./index.scss";
interface IState {
  baseData: Object;
}
class Index extends Component<{}, IState> {
  current = getCurrentInstance();
  // 变量状态
  state = {
    baseData: {} as any,
  };
  // 生命周期
  async componentWillMount() {
    const params = this.current.router?.params as any;
    const userId = params.userId ?? "";

    // 路线详情
    const { data } = await getUserData(userId);
    // console.log(data);
    this.setState({
      baseData: data,
    });
  }

  handleBtn = () => {
    setTimer.end();
    setTimer.reset();
    Taro.redirectTo({
      url: "/pages/my_center/index",
    });
  };
  // 页面渲染
  render() {
    const { baseData } = this.state;
    return (
      <View className="contribute finish">
        <NavBar fixed isBackMy handleBack={this.handleBtn} />
        <View className="succeedBox">
          <Icon className="icon"></Icon>
          <Text className="tip">恭喜你，发布成功</Text>
          <Text>
            本月完成第{baseData.count}次骑行，累计完成
            {(baseData.totalDistance / 1000).toFixed(2)}
            km
          </Text>
          {/* 按钮 */}
          <View className="btnBox">
            <AtButton onClick={this.handleBtn}>查看我的轨迹</AtButton>
          </View>
          {/* end */}
        </View>
      </View>
    );
  }
}
export default Index;
