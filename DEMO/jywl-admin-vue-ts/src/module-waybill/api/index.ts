import request from '@/utils/request'

// 分页查询
export const getWayList = (params: any) =>
  request({
    url: '/waybill',
    method: 'get',
    params
  })

// 详情
export const getListDetails = (id: any) =>
  request({
    url: `/waybill/${id}`,
    method: 'get'
  })
// 运单轨迹
export const getListTrack = (id: any) =>
  request({
    url: `/waybill/track/${id}`,
    method: 'get'
  })
