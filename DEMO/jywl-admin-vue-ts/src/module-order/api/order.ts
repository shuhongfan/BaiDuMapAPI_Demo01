import request from '@/utils/request'

// 分页查询
export const getOrderList = (params: any) =>
  request({
    url: '/order',
    method: 'get',
    params
  })

// 详情
export const getListDetails = (id: any) =>
  request({
    url: `/order/${id}`,
    method: 'get'
  })
