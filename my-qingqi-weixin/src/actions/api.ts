import api from "../services/api";
import { MyInfoData } from "../interfaces/interfaces";
/**
 *  授权登录
 */
export const logins = (code: string): Promise<any> => {
  return api.post(`/wx/login`, { code });
};
// 更新用户信息
export const updateUserInfo = (data): Promise<any> => {
  return api.put("/wx/userInfo", data);
};

/**
 *  个人数据
 * @param payload
 */
export const getUserData = (id): Promise<any> => {
  return api.get("/myinfo", { userId: id });
};
/**
 *  创建路线
 *
 */
export const createPath = (): Promise<any> => {
  return api.post("/route");
};
/**
 *  删除路线
 * @param routeId
 */
export const deletePath = (routeId: string): Promise<any> => {
  return api.delete(`/route/${routeId}`);
};
/**
 *  更新路线
 * @param routeId //路线id
 * @param title //路线标题
 */
export const updatePath = (data): Promise<any> => {
  return api.put("/route", data);
};
/**
 *  投稿路线
 * @param routeId //路线id
 */
export const contribute = (routeId: string): Promise<any> => {
  return api.put(`/route/share/${routeId}`);
};
/**
 *  上报位置
 * @param routeId //路线id
 */
export const reportPath = (params): Promise<any> => {
  return api.post(`/run/${params.routeId}`, params);
};
/**
 *  查询路线
 * @param routeId
 */
export const routeDetails = (routeId: string): Promise<any> => {
  return api.get(`/route/${routeId}`);
};
// 路线规划
/**
 *  附近的路线
 * @param latitude //当前用户的纬度
 * @param longitude //当前用户的经度
 * @param distance //查询距离
 */
export const nearLineData = (data): Promise<any> => {
  return api.get("/route/near", data);
};
/**
 *  历史路线
 * @param userId //用户Id
 */
export const historyLineData = (pages): Promise<any> => {
  return api.get("/route/history", pages);
};
/**
 *  路线同行人
 * @param routeId //路线Id
 */
export const newUserData = (routeId: string): Promise<any> => {
  return api.get(`/route/nearUser/${routeId}`);
};
/**
 *  附近的人
 * @param latitude //当前用户的纬度
 * @param longitude //当前用户的经度
 * @param distance //查询距离
 */
export const nearData = (data): Promise<any> => {
  return api.get("/user/near", data);
};
/**
 *  沿路线开始运动
 * @param routeId //路线id
 * @param userId //用户id
 */
export const routeData = (routeId: string): Promise<any> => {
  // return api.post(`/route/${routeId}/${userId}`);
  return api.post(`/route/${routeId}`);
};
/**
 *  我的历史路线（按日展现）
 */
export const myHistory = (page): Promise<any> => {
  return api.get("/route/history/date", page);
};
