// 个人中心
import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Icon } from "@tarojs/components";
import { AtButton } from "taro-ui";
// import { formatTime } from ".././../../utils/common";
// ts
import { ItemsInterfaces } from "../../../interfaces/interfaces";
// 样式
import "./../index.scss";
type IProps = {
  itemsData: ItemsInterfaces;
};

interface Item {
  props: IProps;
}
class Item extends Component {
  // 变量状态
  state = {} as any;
  componentDidMount() {}
  // 生命周期
  handleNavigate(routeId: number | string, e) {
    e.stopPropagation();
    Taro.redirectTo({
      url: `/pages/history_detail/index?type=4&routeId=${routeId}`,
    });
  }
  // 投稿
  handleBtn = (val, e) => {
    e.stopPropagation();
    Taro.redirectTo({
      url: `/pages/history_detail/index?type=3&routeId=${val.routeId}&date=${val.date}&speed=${val.speed}&distance=${val.distance}`,
    });
  };
  // 页面渲染
  render() {
    const { itemsData } = this.props;
    const lists = itemsData.routeList.map((val) => (
      <View
        onClick={this.handleNavigate.bind(this, val.routeId)}
        className="items"
      >
        <View className="lHead"></View>
        <View className="rText">
          <View className="tit">
            <Text className="num">{(val.distance / 1000).toFixed(2)}</Text>
            km
            <View className="textR">
              {val.isShare ? (
                <Text className="isShare">已投稿</Text>
              ) : (
                <AtButton
                  className="finishBtn"
                  onClick={this.handleBtn.bind(this, val)}
                >
                  投稿
                </AtButton>
                // <Text className="siShare">投稿</Text>
              )}
            </View>
          </View>
          <View className="timeSpeed">
            <View className="time">
              <Icon className="icon" />
              {val.time}
              {/* {formatTime(new Date(Number(val.date)))} */}
            </View>
            <View className="speed">
              <Icon className="timeIcon" />
              {val.speed}km/h
            </View>
          </View>
        </View>
      </View>
    ));
    return (
      <View className="userItems">
        {/* 列表 */}
        <View>{lists}</View>
        {/* end */}
      </View>
    );
  }
}
export default Item;
