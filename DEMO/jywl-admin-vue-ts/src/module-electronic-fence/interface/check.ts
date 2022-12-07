/**
 * 盘点单相关的接口
 */
// 损益数据集
export interface ILoseProfitList {
    code: string
    createName: string
    createTime: string
    createUser: number
    id: number
    idMoney: number
    idNum: number
    idSource: string
    logicDel: number
    remark: string
    status: number
    stockId: number
    taskCode: string
    taskId: number
    updateName: string
    updateTime: string
    updateUser: number
}

// 盘点任务集合
export interface ICheckTaskEntity {
    areaId: number
    checkCode: string
    checkNum: number
    checkTotal: number
    code: string
    createName: string
    createTime: string
    createUser: number
    differenceNum: number
    dimension: string
    id: number
    logicDel: number
    masterId: number
    ownerId: number
    personName: string
    planTaskTime: string
    remark: string
    status: number
    stockTotal: number
    type: string
    updateName: string
    updateTime: string
    updateUser: number
    warehouseId: number
}

// 盘点单相关的信息
export interface ICheckTableData {
    areaId: number
    areaName: string
    checkTaskEntity1: ICheckTaskEntity
    checkTaskEntity2: ICheckTaskEntity
    code: string
    createName: string
    createTime: string
    createUser: number
    dimension: string
    goodsTotal: number
    id: number
    id1List: ILoseProfitList[]
    id1Money: number
    id2List: ILoseProfitList[]
    id2Money: number
    locationTotal: number
    logicDel: number
    ownerId: number
    ownerName: string
    planCheckTime: string
    reason: string
    remark: string
    status: number
    timeArray: string[]
    type: string
    updateName: string
    updateTime: string
    updateUser: number
    warehouseId: number
    warehouseName: string
}

export interface ICheckData {
    current: number
    hitCount: boolean
    pages: number
    records: ICheckTableData[]
    searchCount: boolean
    size: number
    total: number
}

export interface ICheckReturnData {
    code: number
    data: ICheckData
    isError: boolean
    isSuccess: boolean
    msg: string
    path: string
    timestamp: number
}
