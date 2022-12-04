/**
 * 订单实体
 */

export interface MyData {
  /**
   * 昵称
   */
  nickName?: string;
  /**
   * 头像
   */
  logo?: string;
  /**
   * 国家
   */
  country?: string;
  /**
   * 城市
   */
  city?: string;
  /**
   * 省份
   */
  province?: string;
  /**
   * 总里程
   */
  totalDistance?: string;
  /**
   * 累计时间
   */
  totalTime?: string;
  /**
   * 平均速度
   */
  averageSpeed?: string;
  /**
   * 运动次数
   */
  count?: string;
}
export interface HistoryInterfaces {
  routeId?: number;
  title?: string;
  distance?: number;
  latitude?: number;
  longitude?: number;
  userId?: number;
  date?: number;
}
export interface ItemsInterfaces {
  date?: string;
  routeList: [
    {
      routeId?: number;
      isShare?: boolean;
      title?: string;
      distance?: number;
      date?: number;
      speed?: string;
    }
  ];
}

export type MyInfoData = {
  nickName: string;
  logo: string;
  country: string;
  city: string;
  province: string;
  totalDistance: string;
  totalTime: string;
  averageSpeed: string;
  count: string;
};
