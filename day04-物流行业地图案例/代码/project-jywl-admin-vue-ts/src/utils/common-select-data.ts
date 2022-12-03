// 设置通用的下拉选数据--包括级联下拉选数据

import {
  ICommonSelectOptions,
  ICommonSelectOptionsString,
  IJsonCityEntity,
  ICascaderEntity
} from './common-interface'
const jsonCitys: IJsonCityEntity[] = require('@/api/json/city.json')
const jsonDataConvert = (
  cityArr: IJsonCityEntity[],
  arr: ICascaderEntity[]
) => {
  cityArr.forEach((item: IJsonCityEntity) => {
    const newItem: ICascaderEntity = {
      label: item.name,
      value: item.code
    }
    if (Array.isArray(item.children) && item.children.length > 0) {
      newItem.children = []
      jsonDataConvert(item.children, newItem.children)
    }
    arr.push(newItem)
  })
}

export const getChinaCascaderData = (): ICascaderEntity[] => {
  const arr: ICascaderEntity[] = []
  jsonDataConvert(jsonCitys, arr)
  return arr
}

// 付款状态下拉选
export const paymentStatus: ICommonSelectOptions[] = [
  {
    value: 1,
    label: '未付'
  },
  {
    value: 2,
    label: '已付'
  }
]
// 车辆类型下拉选
export const truckType: ICommonSelectOptions[] = [
  {
    value: 1,
    label: '小货车'
  },
  {
    value: 2,
    label: '面包车'
  }
]
// 订单状态下拉选
export const orderStatus: ICommonSelectOptions[] = [
  {
    value: 0,
    label: '待取件'
  },
  {
    value: 1,
    label: '已取件'
  },
  {
    value: 2,
    label: '网点自寄'
  },
  {
    value: 3,
    label: '网点入库'
  },
  {
    value: 4,
    label: '待装车'
  },
  {
    value: 5,
    label: '运输中'
  },
  {
    value: 6,
    label: '网点出库'
  },
  {
    value: 7,
    label: '待派送'
  },
  {
    value: 8,
    label: '派送中'
  },
  {
    value: 9,
    label: '已签收'
  },
  {
    value: 10,
    label: '拒收'
  },
  {
    value: 11,
    label: '已取消'
  }
]
// 运单状态下拉选
export const waybillStatus: ICommonSelectOptions[] = [
  {
    value: 1,
    label: '新建'
  },
  {
    value: 2,
    label: '已装车'
  },
  {
    value: 3,
    label: '到达'
  }
]
