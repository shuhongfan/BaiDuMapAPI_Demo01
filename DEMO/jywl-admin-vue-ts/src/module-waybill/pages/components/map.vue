<template>
  <div class="map">
    <!-- <baidu-map
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
    </baidu-map> -->
    <baidu-map
      class="map"
      :center="center"
      :zoom="zoom"
      style="height:100%"
      :scroll-wheel-zoom="true"
      @ready="handler"
    >
      <bm-polyline
        :path="centerList"
        stroke-color="blue"
        :stroke-opacity="1"
        :stroke-weight="5"
        :editing="false"
      ></bm-polyline>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation>
      <bm-marker
        v-for="(item,index) of points"
        :key="index"
        :position="item.markerPoint"
        :icon="{url: item.icon,opts: {imageSize: {width: 32, height: 38}}, size: {width: 32, height: 38}}"
        class="mapIcon"
      >
        <!-- <bm-label
          :content="item.name"
          :position="item.markerPoint"
          :label-style="labelStyle"
          :title="item.licensePlate"
          :offset="{width: -20, height: -28}"
        /> -->

      </bm-marker>
      <bml-lushu
        @stop="stop"
        :path="polylinePath"
        :icon="icon"
        :play="play"
        :speed="speed"
        :content="content"
        :auto-view="autoView"
        :rotation="true"
      ></bml-lushu>

    </baidu-map>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { BmlLushu, BmPolyline } from 'vue-baidu-map'
import { getListTrack } from '@/module-waybill/api/index'
@Component({
  name: 'Dialog',
  components: {
    BmlLushu,
    BmPolyline
  }
})
export default class extends Vue {
  @Prop() private formBase!: any
  @Prop() private content!: any
  @Prop() private centerList!: any
  @Prop() private polylinePath!: any
  @Prop() private points!: any
  private scrollWheelZoom = true
  private zoom = 6
  private center = {
    lng: 116.404,
    lat: 39.915
  }

  private startArea = ''
  private endArea = ''
  private speed = 0
  private autoView = true
  private play = true
  private wayId = '' as any
  private labelStyle = {
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    fontSize: '12px',
    backgroundColor: '#7BA6FF',
    color: '#fff'
  }

  private rotation = true
  private icon = {
    url: 'https://developer.baidu.com/map/jsdemo/img/car.png',
    size: { width: 52, height: 26 },
    // eslint-disable-next-line object-curly-spacing
    opts: {
      anchor: { width: 27, height: 13 }
    }
  }

  private objData = {
    lng: '116.216456',
    lat: '40.221724'
  }

  getData = () => {
    //  if(obj.data.length > 0) {
    //      for (let index = 0; index < obj.data.length; index++) {
    //        const element = obj.data[index];
    //         _this.startPoint.push({
    //            lng: element[0].lng,
    //            lat: element[0].lat,
    //            icon: './static/image/qidian.png',
    //         })
    //          _this.endPoint.push({
    //            lng: element[element.length-1].lng,
    //            lat: element[element.length-1].lat,
    //            icon: './static/image/zhongdian.png',
    //         })
    //      }
    //    }
  }

  created() {
    console.log(this.$route.params.id)
    this.wayId = this.$route.params.id
  }

  // 表单取消
  private handler({ BMap, map }: any) {
    const _this = this
    _this.startArea = ''
    _this.endArea = ''
    map.centerAndZoom(new BMap.Point(this.objData.lng, this.objData.lat), 6) // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true)
    // _this.BMap = BMap
    // _this.map = map
    // 经纬度
    const startPoint = new BMap.Point(
      _this.formBase.senderCounty.lng,
      _this.formBase.senderCounty.lat
    )
    const endPoint = new BMap.Point(
      _this.formBase.receiverCounty.lon,
      _this.formBase.receiverCounty.lng
    )
    console.log(startPoint)
    var gc = new BMap.Geocoder()
    // var marker2 = new BMap.Marker(startPoint, { icon: icon })
    // map.addOverlay(marker2)
    // 获取中文位置
    gc.getLocation(startPoint, function(rs: any) {
      _this.startArea = rs.address
      console.log(_this.startArea)
    })
    // 获取中文位置
    gc.getLocation(endPoint, function(rs: any) {
      _this.endArea = rs.address
    })
  }

  updatePolylinePath(e: any) {
    this.polylinePath = e.target.getPath()
  }

  stop() {
    //   lushu.stop();
  }
}
</script>
<style lang="scss">
</style>
