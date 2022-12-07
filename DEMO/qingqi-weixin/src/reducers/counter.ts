import { ADD, MINUS } from "../constants/counter";

const INITIAL_STATE = {
  GpsInfo: null,
  MapMearkers: null, // 别人的起始点和结束点
  MapPolyLine: null, // 别人的路线点位
  MapNewPolyLine: {
    // 动态信息
    points: [
      // { latitude: 40.084994, longitude: 116.300842 },
      // { latitude: 40.053998, longitude: 116.324082 },
    ],
    color: "#FCD700",
    width: 4,
    dottedLine: false,
  },
  Times: null,
  MotionInfoData: null,
  RunStop: null,
  TimesLocal: null,
};

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SAVE_EARKERS": // markers数据报错
      return {
        ...state,
        MapMearkers: action.data,
      };
    case "SAVE_POLYLINE":
      return {
        ...state,
        MapPolyLine: action.data,
      };
    case "CHANGE_NEW_POLYLINE": {
      if (action.data.latitude != "") {
        state.MapNewPolyLine.points.push(action.data);
      }
      return {
        ...state,
      };
    }
    case "SAVE_GPSINFO": // 储存当前的地理位置信息
      return {
        ...state,
        GpsInfo: action.data,
      };
    case "SAVE_TIMER":
      return {
        ...state,
        Times: action.data,
      };
    case "SAVE_EARKERS":
      return {
        ...state,
        TimesLocal: action.data,
      };

    case "SAVE_MOTIONINFODATA":
      return {
        ...state,
        MotionInfoData: action.data,
      };
    case "SAVE_RUNSTOP":
      return {
        ...state,
        RunStop: action.data,
      };

    default:
      return state;
  }
}
