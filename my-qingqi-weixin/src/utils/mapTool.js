// 百度坐标转腾讯坐标
export function bMapToQQMap(lng, lat) {
    if (lng == null || lng == '' || lat == null || lat == ''){
      return [lng, lat];
    }
    let x_pi = 3.14159265358979324;
    let x = parseFloat(lng) - 0.0065;
    let y = parseFloat(lat) - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    let longitude = (z * Math.cos(theta)).toFixed(7);
    let latitude = (z * Math.sin(theta)).toFixed(7);
    return [latitude,longitude];
  }

// 计算距离 
// 进行经纬度转换为距离的计算
function Rad(d){
    return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
}

//计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
export function GetDistance(lat1,lng1,lat2,lng2){
    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var  b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10; //输出为公里
    //s=s.toFixed(2);
    return s;
}