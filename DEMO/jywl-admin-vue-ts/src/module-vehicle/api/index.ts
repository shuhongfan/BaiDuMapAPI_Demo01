import request from '@/utils/request'

// 分页查询
export const getVehicleList = (params: any) =>
  request({
    url: '/vehicle',
    method: 'get',
    params
  })

// 详情
export const getListDetails = (id: any) =>
  request({
    url: `/vehicle/details/${id}`,
    method: 'get'
  })
// 增加
export const addVehicle = (data: any) =>
  request({
    url: '/vehicle',
    method: 'post',
    data
  })
export const deleteVehicle = (id: any) =>
  request({
    url: `/vehicle/${id}`,
    method: 'delete'
  })
// 编辑
export const editVehicle = (data: any) =>
  request({
    url: `/vehicle/${data.id}`,
    method: 'put',
    data
  })
