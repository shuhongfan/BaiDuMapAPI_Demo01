import { Component } from "react";
import { View, Canvas, Text } from "@tarojs/components";
import { connect } from "react-redux";
import Taro from "@tarojs/taro";
// 样式
import "./index.scss";
// 定义class，继承Component
const mapStateToProps = (state, ownProps) => {
  return {
    counter: state.counter,
  };
};
class perTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: "#cccccc",
      color: "#1DC779",
      /*  私有数据，可用于模版渲染 */
      step: 0, //用来算圆的弧度0-2
      size: 0, //画板大小
      screenWidth: 375, //实际设备的宽度
      txt: "0",
      r: "120",
      draw: "drawCircle",
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      step: (2 * Number(nextProps.per)) / 100,
      txt: nextProps.per,
    });
    const _this = this;
    //获取屏幕宽度
    Taro.getSystemInfo({
      success: function (res) {
        _this.setState({
          screenWidth: res.windowWidth,
        });
      },
    });

    //初始化
    const el = _this.state.draw; //画板元素
    // const per = per; //圆形进度
    const r = Number(_this.state.r); //圆形半径
    //获取屏幕宽度(并把真正的半径px转成rpx)
    let rpx = (_this.state.screenWidth / 375) * r;
    //计算出画板大小
    this.setState({
      size: rpx * 2,
    });
    const w = 10; //圆形的宽度

    //组件入口,调用下面即可绘制 背景圆环和彩色圆环。
    _this.drawCircleBg(el + "bg", rpx, w); //绘制 背景圆环
    _this.drawCircle(el, rpx, w, (2 * Number(nextProps.per)) / 100); //绘制 彩色圆环
  }
  componentWillMount() {}

  /**
   * el:画圆的元素
   * r:圆的半径
   * w:圆的宽度
   * 功能:画背景
   */
  drawCircleBg = (el, r, w) => {
    const ctx = Taro.createCanvasContext(el, this);
    ctx.setLineWidth(w); // 设置圆环的宽度
    ctx.setStrokeStyle("#E5E5E5"); // 设置圆环的颜色
    ctx.setLineCap("round"); // 设置圆环端点的形状
    ctx.beginPath(); //开始一个新的路径
    ctx.arc(r, r, r - w, 0, 2 * Math.PI, false);
    //设置一个原点(110,110)，半径为100的圆的路径到当前路径
    ctx.stroke(); //对当前路径进行描边
    ctx.draw();
  };
  /**
   * el:画圆的元素
   * r:圆的半径
   * w:圆的宽度
   * step:圆的弧度 (0-2)
   * 功能:彩色圆环
   */
  drawCircle = (el, r, w, step) => {
    if (step !== 0) {
      var context = Taro.createCanvasContext(el, this);
      // 设置渐变
      var gradient = context.createLinearGradient(2 * r, r, 0);
      gradient.addColorStop("0", "#1dc779");
      gradient.addColorStop("0.5", "#00b8d4");
      gradient.addColorStop("1.0", "#00b8d4");
      context.setLineWidth(w);
      context.setStrokeStyle(gradient);
      context.setLineCap("round");
      context.beginPath(); //开始一个新的路径
      // step 从0到2为一周

      context.arc(
        r,
        r,
        r - w,
        -Math.PI / 0.8,
        step * Math.PI - Math.PI / 1.3,
        false
      );
      context.stroke(); //对当前路径进行描边
      context.draw();
    }
  };

  render() {
    const { txt } = this.state;
    const { RunStop, per } = this.props;
    console.log(txt, 1458);
    return (
      // <View className="perTabCont">
      //   <Canvas canvasId="pertab" className="pertable"></Canvas>
      // </View>
      <view className="circle_box">
        <canvas
          className="circle_bg"
          canvas-id="drawCirclebg"
          style={{ width: this.state.size, height: this.state.size }}
        ></canvas>
        <canvas
          className="circle_draw"
          canvas-id="drawCircle"
          style={{ width: this.state.size, height: this.state.size }}
        ></canvas>
        {!RunStop ? (
          <Text className="circle_txt">
            <Text>实时时速</Text>
            <Text className="num">{txt === 0 ? "0.00" : txt}</Text>
            <Text>km/h</Text>
          </Text>
        ) : (
          <Text className="circle_txt">
            <Text className="infoStop">暂停中</Text>
          </Text>
        )}
      </view>
    );
  }
}
export default connect(mapStateToProps)(perTable);
