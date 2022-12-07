<template>
  <div class="map">
    <baidu-map
      class="mapsClass"
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="scrollWheelZoom"
      @ready="handler"
    >
      <bm-driving
        :panel="false"
        :start="startArea"
        :end="endArea"
        :auto-viewport="true"
        location="中国"
      ></bm-driving>
    </baidu-map>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  name: 'Dialog',
  components: {}
})
// https://blog.csdn.net/wyf1048713166/article/details/107779968
// http://git.itcast.cn/development/project-pdwl-admin-vue/blob/huangxu-0817/src/views/waybill/waybill-detail.vue
// https://github.com/xiaoguaishou1/Vue-js-ts--vue-map/blob/master/src/views/About.vue
export default class extends Vue {
  @Prop() private formBase!: any
  private scrollWheelZoom = true
  private zoom = 6
  private startArea = ''
  private endArea = ''
  private center = {
    lng: 116.404,
    lat: 39.915
  }

  // 表单取消
  private handler({ BMap, map }: any) {
    console.log(BMap, 1)
    const _this = this
    _this.startArea = ''
    _this.endArea = ''
    _this.startArea = this.formBase.senderAddress
    _this.endArea = this.formBase.receiverAdress
    // map.enableScrollWheelZoom(true)
    // _this.BMap = BMap
    // _this.map = map
    // const icon = new BMap.Icon('../../../assets/dadao.png', new BMap.Size(48, 48))
    // // 经纬度
    // const startPoint = new BMap.Point(
    //   this.formBase.senderCounty.lng,
    //   this.formBase.senderCounty.lat
    // )
    // const endPoint = new BMap.Point(
    //   this.formBase.receiverCounty.lng,
    //   this.formBase.receiverCounty.lat
    // )
    // console.log(startPoint)
    // var gc = new BMap.Geocoder()
    // // var marker2 = new BMap.Marker(startPoint, { icon: icon })
    // // map.addOverlay(marker2)
    // // 获取中文位置
    // gc.getLocation(startPoint, function (rs: any) {
    //   _this.startArea = rs.address
    //   console.log(_this.startArea)
    // })
    // // 获取中文位置
    // gc.getLocation(endPoint, function (rs: any) {
    //   _this.endArea = rs.address
    //   console.log(_this.startArea)
    // })
  }

  stop() {
    //   lushu.stop();
  }
}
</script>
<style lang="scss">
</style>
