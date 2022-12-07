// 通用的interface
// 公用返回
export interface ICommonReturn {
  code: number
  msg: string
  data: string
}

export interface ICommonSelectOptions {
  value: number
  label: string
}

export interface ICommonSelectOptionsString {
  value: string
  label: string
}

// json 城市数据
export interface IJsonCityEntity {
  code: string
  level: number
  name: string
  children?: IJsonCityEntity[]
}

//
export interface ICascaderEntity {
  label?: string
  value?: string
  children?: ICascaderEntity[]
}

// steps步骤条类型

export interface IStepsOptions {
  label: string
  time?: string
}
