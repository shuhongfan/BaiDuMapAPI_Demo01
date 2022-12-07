<template>
  <div class="divWarehouse outDetails">

    <el-collapse
      v-model="activeNames"
      @change="handleChange"
    >
      <el-collapse-item
        title="路线规划"
        name="1"
      >
        <div>
          <Map :formBase="baseData"></Map>
        </div>
      </el-collapse-item>
      <el-collapse-item
        title="基础信息"
        name="1"
      >
        <div class="main">
          <div class="baseInfo">
            <el-row :gutter="30">
              <el-col :span="6">
                <p>订单编号：<span>{{baseData.orderNumber}}</span></p>
              </el-col>
              <el-col :span="6">
                <p>运单编号：<span>{{baseData.waybillNumber}}</span></p>
              </el-col>
              <el-col :span="6">
                <p>下单时间：<span>{{baseData.orderTime}}</span></p>
              </el-col>
              <el-col :span="6">
                <p>订单状态：
                  <span v-if="baseData.status==='0'">待取件</span>
                  <span v-if="baseData.status==='1'">已取件</span>
                  <span v-if="baseData.status==='2'">网点自寄</span>
                  <span v-if="baseData.status==='3'">网点入库</span>
                  <span v-if="baseData.status==='4'">待装车</span>
                  <span v-if="baseData.status==='5'">运输中</span>
                  <span v-if="baseData.status==='6'">网点出库</span>
                  <span v-if="baseData.status==='7'">待派送</span>
                  <span v-if="baseData.status==='8'">派送中</span>
                  <span v-if="baseData.status==='9'">已签收</span>
                  <span v-if="baseData.status==='10'">拒收</span>
                  <span v-if="baseData.status==='11'">已取消</span>
                </p>
              </el-col>
            </el-row>
          </div>
          <div class="basicInfo">
            <div class="line"></div>
            <div class="tit"><img src="../../assets/images/star.png" />发货方</div>
            <div class="text">
              <el-row :gutter="30">
                <el-col :span="6">
                  <p>发货方姓名：<span>{{baseData.senderName}}</span></p>
                </el-col>
                <el-col :span="18">

                  <p>发货方地址：<span>{{baseData.senderProvince.name}}
                      {{baseData.senderCity.name}}
                      {{baseData.senderCounty.name}}</span></p>
                </el-col>
                <el-col :span="6">
                  <p>发货方电话：<span>{{baseData.senderPhone}}</span></p>
                </el-col>
                <el-col :span="18">
                  <p>详细地址：<span>{{baseData.senderAddress}}</span></p>
                </el-col>
              </el-row>
            </div>
            <div class="tit"><img src="../../assets/images/end.png" />收货方</div>
            <div class="text">
              <el-row :gutter="30">
                <el-col :span="6">
                  <p>收货方姓名：<span>{{baseData.receiverName}}</span></p>
                </el-col>
                <el-col :span="18">
                  <p>收货方地址：<span>{{baseData.receiverProvince.name}}{{baseData.receiverCity.name}}{{baseData.receiverCounty.name}}</span></p>
                </el-col>
                <el-col :span="6">
                  <p>收货方电话：<span>{{baseData.receiverPhone}}</span></p>
                </el-col>
                <el-col :span="18">
                  <p>详细地址：<span>{{baseData.receiverAdress}}</span></p>
                </el-col>
              </el-row>
            </div>
            <div class="tit"><img src="../../assets/images/jl.png" />距离：{{distanceData}}km</div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item
        title="费用信息"
        name="3"
      >
        <div class="main">
          <div class="baseInfo">
            <el-row :gutter="30">
              <el-col :span="6">
                <p>运费：<span>{{baseData.amount}}</span></p>
              </el-col>
              <el-col :span="6">
                <p>支付方式：<span v-if="baseData.payType==='1'">预结</span><span v-else>到付</span></p>
              </el-col>
              <el-col :span="6">
                <p>
                  付款状态：<span v-if="baseData.paymentStatus==='1'">未付</span><span v-else>已付</span></p>
              </el-col>
            </el-row>
          </div>

        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// 公用组件
// 分页
import BasePagination from '@/components/base-pagination/index.vue'
import Map from './components/map.vue'
// 基础数据
// api数据接口
import { getListDetails } from '@/module-vehicle/api/index'

@Component({
  name: 'ListOutDetails',
  components: {
    BasePagination,
    Map
  }
})
export default class extends Vue {
  private activeNames = ['1']
  private baseData = {} as any
  private distanceData = '' as any

  created() {
    this.getDitails()
  }

  // 功能

  // 基础信息
  private async getDitails() {
    const id = this.$route.params.id
    if (id !== '') {
      const data = await getListDetails(id)
      console.log(data)
      this.baseData = data
    }
    // 计算距离
    const result = this.getDistance(
      this.baseData.senderCity.lat,
      this.baseData.senderCity.lng,
      this.baseData.receiverCity.lat,
      this.baseData.receiverCity.lng
    )
    this.distanceData = result
  }

  getDistance(lat1: any, lng1: any, lat2: any, lng2: any) {
    var radLat1 = (lat1 * Math.PI) / 180.0
    var radLat2 = (lat2 * Math.PI) / 180.0
    var a = radLat1 - radLat2
    var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0
    var s =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
        )
      )
    s = s * 6378.137 // EARTH_RADIUS;
    s = Math.round(s * 100) / 100
    return s
  }

  // ui
  handleChange(val: any) {
    console.log(val)
  }
}
</script>

<style scoped>
</style>
