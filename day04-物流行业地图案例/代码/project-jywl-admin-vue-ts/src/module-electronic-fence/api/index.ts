import request from '@/utils/request'

// 分页查询
export const getEleList = (params: any) =>
  request({
    url: '/electronicFence/page',
    method: 'get',
    params
  })
// 所有
export const getAllList = (params: any) =>
  request({
    url: '/electronicFence/all',
    method: 'get',
    params
  })
// 详情
export const getListDetails = (id: any) =>
  request({
    url: `/electronicFence/details/${id}`,
    method: 'get'
  })
// 增加
export const addRail = (data: any) =>
  request({
    url: '/electronicFence',
    method: 'post',
    data
  })
export const deleteRail = (id: any) =>
  request({
    url: `/electronicFence/${id}`,
    method: 'delete'
  })
// 编辑
export const editRail = (data: any) =>
  request({
    url: `/electronicFence/${data.id}`,
    method: 'put',
    data
  })
