/** 历史轨迹 ***/
import { Component } from "react";
import { View, Text, ScrollView } from "@tarojs/components";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { AtButton, AtActivityIndicator } from "taro-ui";
// ts
import { HistoryInterfaces } from "../../interfaces/interfaces";
// 接口
import { historyLineData } from "../../actions/api";
import "./index.scss";
// 组件
import NavBar from "../../components/navBar";
interface IState {
  params: Object;
  baseData: HistoryInterfaces;
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
class History extends Component<{}, IState> {
  current = getCurrentInstance();
  // 变量状态
  state = {
    params: {},
    baseData: [],
    pages: {
      pageNum: 1, //分页记录数
      pageSize: 10, //分页大小
      userId: "",
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
  // 生命周期
  // 第一次渲染后调用
  componentWillMount() {
    const params = this.current.router?.params as any;
    if (params.userId === undefined) {
      params.userId = "";
    }
    this.setState({
      params: params,
    });
    this.getData(params.userId);
  }
  getData = async (userId) => {
    let pages = {
      userId: userId,
      pageNum: 1, //分页记录数
      pageSize: 10, //分页大小
    };
    const { data } = await historyLineData(pages);
    this.setState({
      baseData: data.records,
      total: data.total,
    });
  };
  //
  handleNavigate(routeId: number | string) {
    Taro.redirectTo({
      url: `/pages/history_detail/index?type=6&routeId=${routeId}`,
    });
  }
  // 查看其它路线
  handleStart() {
    Taro.redirectTo({
      // url: "/pages/time/index",
      url: "/pages/path_plan/index",
    });
  }
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
    let { baseData, total, pages, params } = this.state;

    this.state.pages.pageNum = pages.pageNum + 1;
    //上拉

    if (pages.pageNum * 10 > total) {
      this.setState({ dargState: -1, pullText: "暂无更多" });
      return false;
    } else {
      let pages = {
        userId: params.userId,
        pageNum: this.state.pages.pageNum, //分页记录数
        pageSize: 10, //分页大小
      };
      const { data } = await historyLineData(pages);
      this.setState({
        baseData: baseData.concat(data.records), //data.data,
      });
    }
  };
  touchEnd = (e) => {
    this.pull();
    this.reduction();
  };
  handleBack = () => {
    Taro.redirectTo({
      url: "/pages/path_plan/index",
    });
  };
  // 页面渲染
  render() {
    let dargStyle = this.state.dargStyle;
    let downDragStyle = this.state.downDragStyle;
    let upDragStyle = this.state.upDragStyle;
    const items = this.state.baseData.map((val: HistoryInterfaces) => (
      <View
        className="itemCont"
        key={val.routeId}
        onClick={this.handleNavigate.bind(this, val.routeId)}
      >
        <View className="itemTit">{val.title}</View>
        <View className="itemDis">
          全程
          <Text>{(val.distance / 1000).toFixed(2)}km</Text>
        </View>
      </View>
    ));
    // 无数据
    const noList = (
      <View className="contribute">
        <View className="noDataBox">
          <View className="noIcon">暂无已完成的骑行路线</View>
          <View className="btnBox ">
            <AtButton className="finishBtn" onClick={this.handleStart}>
              查看路线
            </AtButton>
          </View>
        </View>
      </View>
    );
    return (
      <View className="historyCont">
        <NavBar fixed isBack title="完成的路线" handleBack={this.handleBack} />
        {this.state.baseData.length > 0 ? (
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
              {items}
            </ScrollView>

            <View className="upDragBox" style={upDragStyle}>
              <AtActivityIndicator></AtActivityIndicator>
              <Text className="downText">{this.state.pullText}</Text>
            </View>
          </View>
        ) : (
          <View>{noList}</View>
        )}
      </View>
    );
  }
}
export default History;
