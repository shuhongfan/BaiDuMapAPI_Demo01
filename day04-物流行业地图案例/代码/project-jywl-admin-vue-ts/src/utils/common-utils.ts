import { IJsonCityEntity } from './common-interface'

//  存放不好归类的公用方法
const jsonCitys: IJsonCityEntity[] = require('@/api/json/city.json')

export const getLocationData = (location: string) => {
  let str = ''
  if (location.length > 0) {
    const arr: string[] = location.split('/')
    const provinceCode: string = arr[0]
    const cityCode: string = arr[1]
    const areaCode: string = arr[2]
    const map: Map<string, string> = new Map()
    jsonCityMap(jsonCitys, map)
    const province = map.get(provinceCode)
    const city = map.get(cityCode)
    const area = map.get(areaCode)
    str = province + '/' + city + '/' + area
  }
  console.log(str, 456)
  return str
}

const jsonCityMap = (jsonArr: IJsonCityEntity[], map: Map<string, string>) => {
  jsonArr.forEach((item: IJsonCityEntity) => {
    map.set(item.code, item.name)
    if (Array.isArray(item.children)) {
      jsonCityMap(item.children, map)
    }
  })
}
