// 个人中心
import { Component } from "react";
import { View, Text, Image, Icon, ScrollView } from "@tarojs/components";
import { changeArr } from ".././../utils/common";
import { AtButton, AtActivityIndicator } from "taro-ui";
import Taro, { getCurrentInstance } from "@tarojs/taro";
// api
import { getUserData, myHistory } from "../../actions/api";
// ts
import { ItemsInterfaces } from "../../interfaces/interfaces";
// 样式
import "./index.scss";
// 组件
import NavBar from "../../components/navBar";
import Item from "./components/index";
class Index extends Component {
  current = getCurrentInstance();
  // 变量状态
  state = {
    params: {},
    baseData: {},
    itemsData: [],
    items: [],
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
  } as any;
  // 生命周期
  // 第一次渲染后调用
  componentDidMount() {
    const params = this.current.router?.params as any;
    const userId = params.userId ?? "";
    if (params.userId === undefined) {
      params.userId = "";
    }
    this.setState({
      params: params,
    });
    this.getData(userId);
    this.getUserDataList(userId);
  }
  // 个人信息
  getData = async (userId) => {
    const { data } = await getUserData(userId);
    this.setState({
      baseData: data,
    });
    // console.log(data);
  };
  // 个人骑行列表
  getUserDataList = async (userId) => {
    let pages = {
      userId: userId,
      pageNum: 1, //分页记录数
      pageSize: 10, //分页大小
    };
    const { data } = await myHistory(pages);
    this.setState({
      items: data.records,
      itemsData: changeArr(data.records),
      total: data.total,
    });
  };
  // 返回
  handleBack = () => {
    const params = this.current.router?.params as any;
    // if (params.user === "user") {
    //   Taro.redirectTo({
    //     url: "/pages/nearby/index",
    //   });
    // } else {
    Taro.redirectTo({
      url: `/pages/index/index`,
    });
    // }
  };
  // handleNavigate(routeId: number | string) {
  //   Taro.redirectTo({
  //     url: `/pages/history_detail/index?routeId=${routeId}`,
  //   });
  // }
  // 查看其它路线
  handleStart() {
    Taro.redirectTo({
      // url: "/pages/time/index",
      url: "/pages/path_plan/index",
    });
  }
  // https://www.cnblogs.com/wuliujun521/p/11463361.html
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
    let { items, pages, total, params } = this.state;
    // this.setState({
    //   pageNum: pages.pageNum++,
    // });
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
      const { data } = await myHistory(pages);

      this.setState({
        items: items.concat(data.records),
        itemsData: changeArr(this.state.items), //data.data,
      });
    }
  };
  touchEnd = (e) => {
    this.pull();
    this.reduction();
  };
  // 页面渲染
  render() {
    const { params } = this.state;
    console.log(params, 1354561);

    let dargStyle = this.state.dargStyle;
    let downDragStyle = this.state.downDragStyle;
    let upDragStyle = this.state.upDragStyle;
    const { baseData, itemsData } = this.state;
    const items = itemsData.map((val) => {
      const itemList = val.data.map((valObj) => {
        return (
          <View className="itemCont">
            <View className="itemTit">
              {valObj.date}
              {/* {formatTimeData(new Date(Number(val.date)))} */}

              <View className="textR">
                <Icon className="icon" />
                {valObj.totalTime}
                {/* {formatTime(new Date(Number(val.totalTime)))} */}
              </View>
            </View>
            <Item itemsData={valObj} />
          </View>
        );
      });
      return (
        <View>
          <View className="itemYear">{val.year}</View>
          {itemList}
        </View>
      );
    });
    // 无数据
    const noList = (
      <View className="contribute">
        <View className="noDataBox">
          <View className="noIcon"></View>
          {params.userId !== "" ? (
            <View>这位大佬目前还没有骑行记录</View>
          ) : (
            <View>
              <View>您还没有骑行过，快去运动骑行吧！</View>
              <View className="btnBox ">
                <AtButton className="finishBtn" onClick={this.handleStart}>
                  查看路线
                </AtButton>
              </View>
            </View>
          )}
        </View>
      </View>
    );
    return (
      <View className="userBox">
        {/* 导航 */}
        <View className="headbg">
          <NavBar fixed isHomeBack handleBack={this.handleBack} />
          {/* end */}
          {/* 信息 */}
          <View className="head">
            <View className="lHead">
              <Image src={baseData.logo} />
            </View>
            <View className="rText">
              <Text className="tit">{baseData.nickName}</Text>
              <View className="adress">
                <Icon className="addressIcon"></Icon>
                <Text>{baseData.city}</Text>
                <Text>{baseData.province}</Text>
              </View>
            </View>
          </View>
          <View className=" boxBg">
            <View className="kilometre">
              <View className="info">
                <Text>总里程</Text>
                <Text className="num">
                  {baseData.totalDistance === "" &&
                  baseData.totalDistance === undefined ? (
                    "--"
                  ) : (
                    <Text>
                      {(Number(baseData.totalDistance) / 1000).toFixed(2)}
                    </Text>
                  )}
                </Text>
                <Text>km</Text>
              </View>
              <View className="info">
                <Text>运动时间</Text>
                <Text className="num">
                  {!baseData.totalTime &&
                  baseData.totalTime === "" &&
                  baseData.totalTime === undefined ? (
                    "--"
                  ) : (
                    <Text>{baseData.totalTime}</Text>
                  )}
                </Text>
                <Text>mm:ss</Text>
              </View>
              <View className="info">
                <Text>平均速度</Text>
                <Text className="num">
                  {baseData.averageSpeed === "" &&
                  baseData.averageSpeed === undefined ? (
                    "--"
                  ) : (
                    <Text>{baseData.averageSpeed}</Text>
                  )}
                </Text>
                <Text>km/h</Text>
              </View>
            </View>
          </View>
          {/* end */}
        </View>
        {/* 列表 */}
        <View className="userMain">
          {itemsData.length > 0 ? (
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
        {/* end */}
      </View>
    );
  }
}
export default Index;
