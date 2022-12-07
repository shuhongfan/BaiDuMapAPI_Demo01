/** 历史轨迹 ***/
import { Component } from "react";
import { View, Text, Icon, Image, ScrollView } from "@tarojs/components";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { AtTabs, AtTabsPane, AtActivityIndicator } from "taro-ui";
import { connect } from "react-redux";
// ts
import { HistoryInterfaces } from "../../interfaces/interfaces";
// 接口
import { nearLineData, nearData, newUserData } from "../../actions/api";
import "./index.scss";
// 组件
interface IState {
  baseData: HistoryInterfaces;
  baseUserData: HistoryInterfaces;
  latitude: number;
  longitude: number;
  distance: number;
  current: Number;
  pages: Object;
  total: Number;
  dargStyle: Object;
  downDragStyle: Object;
  downText: string;
  upDragStyle: Object;
  pullText: string;
  start_p: Object;
  scrollY: boolean;
  dargState: Number;
}
const mapStateToProps = (state, ownProps) => {
  return {
    counter: state.counter,
  };
};
class History extends Component<{}, IState> {
  // 变量状态
  state = {
    baseData: [],
    baseUserData: [],
    param: {
      latitude: 0,
      longitude: 0,
      distance: 10,
    },
    current: 0,
    pages: {
      pageNum: 1, //分页记录数
      pageSize: 10, //分页大小
    },
    total: 0,
    dargStyle: {
      //下拉框的样式
      top: 0 + "px",
    },
    downDragStyle: {
      //下拉图标的样式
      height: 0 + "px",
    },
    downText: "下拉刷新",
    upDragStyle: {
      //上拉图标样式
      height: 0 + "px",
    },
    pullText: "上拉加载更多",
    start_p: {},
    scrollY: true,
    dargState: 0, //刷新状态 0不做操作 1刷新 -1加载更多
  };
  cofig = {
    navigationBarBackgroundColor: "#fff",
  };
  // 生命周期
  async componentDidMount() {}
  // 第一次渲染后调用
  async componentWillMount() {
    const routerParams = getCurrentInstance().router!.params;
    console.log(routerParams.current, 123654);
    if (routerParams.current !== undefined) {
      this.setState({
        current: Number(routerParams.current),
      });
    }

    // 从redux中获取当前地理位置
    const {
      counter: { GpsInfo },
    } = this.props;
    const gpsInfo = GpsInfo;

    let parent = {
      latitude: gpsInfo.latitude,
      longitude: gpsInfo.longitude,
      distance: 10,
    };
    this.getLineData(parent);
    this.geUserData(parent);
  }
  // 获取附近路线
  getLineData = async (parent) => {
    const { data } = await nearLineData(parent);
    this.setState({
      baseData: data,
    });
  };
  // 获取附近的人
  geUserData = async (parent) => {
    let parentData = Object.assign(parent, this.state.pages);
    const routerParams = getCurrentInstance().router!.params;
    // if (routerParams.runUser === "users") {
    //   const { data } = await newUserData(routerParams.routeId ?? "");
    //   this.setState({
    //     baseUserData: data.records,
    //     total: data.total,
    //   });
    // } else {
    const { data } = await nearData(parentData);
    this.setState({
      baseUserData: data.records,
      total: data.total,
    });
    // }
  };
  //附近路线进入开始骑行页面
  handleNavigate(routeId: number | string) {
    Taro.redirectTo({
      url: `/pages/history_detail/index?type=5&routeId=${routeId}`,
    });
  }
  //附近人进入个人中心
  handleUser(userId: number | string) {
    Taro.redirectTo({
      url: `/pages/my_center/index?user=user&userId=${userId}`,
    });
  }
  // 开始跑步
  handleStart() {
    Taro.redirectTo({
      url: "/pages/time/index",
    });
  }
  handleBack = () => {
    Taro.redirectTo({
      url: "/pages/path_plan/index",
    });
  };
  handleClick = (value) => {
    this.setState({
      current: value,
    });
  };
  reduction() {
    //还原初始设置
    const time = 0.5;
    this.setState({
      upDragStyle: {
        //上拉图标样式
        height: 0 + "px",
        transition: `all ${time}s`,
      },
      dargState: 0,
      dargStyle: {
        top: 0 + "px",
        transition: `all ${time}s`,
      },
      downDragStyle: {
        height: 0 + "px",
        transition: `all ${time}s`,
      },
      scrollY: true,
    });
    setTimeout(() => {
      this.setState({
        dargStyle: {
          top: 0 + "px",
        },
        upDragStyle: {
          //上拉图标样式
          height: 0 + "px",
        },
        pullText: "上拉加载更多",
        downText: "下拉刷新",
      });
    }, time * 1000);
  }
  touchStart = (e) => {
    let that = this;
    that.setState({
      start_p: e.touches[0],
    });
  };
  touchmove = (e) => {
    let that = this;
    let move_p = e.touches[0], //移动时的位置
      deviationX = 0.3, //左右偏移量(超过这个偏移量不执行下拉操作)
      deviationY = 70, //拉动长度（低于这个值的时候不执行）
      maxY = 100; //拉动的最大高度

    let start_x = this.state.start_p.clientX,
      start_y = this.state.start_p.clientY,
      move_x = move_p.clientX,
      move_y = move_p.clientY;

    //得到偏移数值
    let dev = Math.abs(move_x - start_x) / Math.abs(move_y - start_y);
    if (dev < deviationX) {
      //当偏移数值大于设置的偏移数值时则不执行操作
      let pY = Math.abs(move_y - start_y) / 3.5; //拖动倍率（使拖动的时候有粘滞的感觉--试了很多次 这个倍率刚好）
      if (move_y - start_y > 0) {
        //下拉操作
        if (pY >= deviationY) {
          this.setState({ dargState: 1, downText: "释放刷新" });
        } else {
          this.setState({ dargState: 0, downText: "下拉刷新" });
        }
        if (pY >= maxY) {
          pY = maxY;
        }
        this.setState({
          dargStyle: {
            top: pY + "px",
          },
          downDragStyle: {
            height: pY + "px",
          },
          scrollY: false, //拖动的时候禁用
        });
      }
      if (start_y - move_y > 0) {
        //上拉操作
        if (pY >= deviationY) {
          this.setState({ dargState: -1, pullText: "释放加载更多" });
        } else {
          this.setState({ dargState: 0, pullText: "上拉加载更多" });
        }
        if (pY >= maxY) {
          pY = maxY;
        }
        this.setState({
          dargStyle: {
            top: -pY + "px",
          },
          upDragStyle: {
            height: pY + "px",
          },
          scrollY: false, //拖动的时候禁用
        });
      }
    }
  };
  pull = async () => {
    let { baseUserData, total, pages } = this.state;
    this.state.pages.pageNum = pages.pageNum + 1;
    //上拉
    if (pages.pageNum * 10 > total) {
      this.setState({ dargState: -1, pullText: "暂无更多" });
      return false;
    } else {
      const { data } = await nearData(pages);
      this.setState({
        baseUserData: baseUserData.concat(data.records), //data.data,
      });
    }
  };
  touchEnd = (e) => {
    this.pull();
    this.reduction();
  };
  // 页面渲染
  render() {
    let dargStyle = this.state.dargStyle;
    let downDragStyle = this.state.downDragStyle;
    let upDragStyle = this.state.upDragStyle;
    const tabList = [{ title: "附近路线" }, { title: "附近的人" }];
    //附近路线
    const items = this.state.baseData.map((val: HistoryInterfaces) => (
      <View
        className="itemCont"
        key={val.routeId}
        onClick={this.handleNavigate.bind(this, val.routeId)}
      >
        <View className="itemTit">{val.title}</View>
        <View className="itemDis">
          全程{(val.distance / 1000).toFixed(2)}km<Text>距您{val.range}km</Text>
        </View>
      </View>
    ));
    // 附近的人
    const Useritem = this.state.baseUserData.map((val: HistoryInterfaces) => (
      <View
        className="itemCont"
        key={val.userId}
        onClick={this.handleUser.bind(this, val.userId)}
      >
        <View className="headInfo">
          <View className="lHead">
            <Image src={val.logo} />
          </View>
          <View className="rText">
            <Text className="itemTit">{val.nickName}</Text>
            <Text className="itemDis">
              本月完成骑行{val.runCount}次
              <Text>距您{(val.distance / 1000).toFixed(2)}km</Text>
            </Text>
          </View>
        </View>
      </View>
    ));
    // 无数据
    const noList = (
      <View>
        <View className="noDataBox">
          <View className="noIcon">
            你附近的人很懒，还没有人创建路线，快去成为第一人吧
          </View>
        </View>
        <View className="goExercise">
          <Icon className="icon startIcon" onClick={this.handleStart} />
        </View>
      </View>
    );
    return (
      <View className="nearbyCont">
        {/* 导航 */}
        <View className="navBox">
          <View className="taroNavbar">
            <View className="taroNavbarWrap">
              <View onClick={this.handleBack} className="backIcon"></View>
            </View>
          </View>
        </View>
        {/* end */}
        <AtTabs
          current={this.state.current}
          tabList={tabList}
          onClick={this.handleClick.bind(this)}
        >
          <AtTabsPane current={this.state.current} index={0}>
            {this.state.baseData.length > 0 ? (
              <View className="at-row at-row--wrap product-list">{items}</View>
            ) : (
              <View>{noList}</View>
            )}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            {this.state.baseUserData.length > 0 ? (
              <View className="dragUpdataPage">
                <View className="downDragBox" style={downDragStyle}>
                  <AtActivityIndicator></AtActivityIndicator>
                  <Text className="downText">{this.state.downText}</Text>
                </View>
                <ScrollView
                  style={dargStyle}
                  onTouchMove={this.touchmove}
                  onTouchEnd={this.touchEnd}
                  onTouchStart={this.touchStart}
                  className="dragUpdata"
                  scrollY={this.state.scrollY}
                  scrollWithAnimation
                >
                  {Useritem}
                </ScrollView>

                <View className="upDragBox" style={upDragStyle}>
                  <AtActivityIndicator></AtActivityIndicator>
                  <Text className="downText">{this.state.pullText}</Text>
                </View>
              </View>
            ) : (
              <View>{noList}</View>
            )}
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}
export default connect(mapStateToProps)(History);
