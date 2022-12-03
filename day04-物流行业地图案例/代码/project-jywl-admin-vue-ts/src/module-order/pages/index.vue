<template>
  <div class="divWarehouse">
    <!-- 搜索 -->
    <div class="box divHead">
      <div class="serchForm">
        <el-form
          ref="ruleForm"
          :inline="true"
          :model="search"
        >
          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item
                label="订单编号"
                prop="orderNumber"
              >
                <el-input
                  v-model="search.orderNumber"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="订单状态"
                prop="status"
              >
                <el-select
                  v-model="search.status"
                  clearable
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in orderStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="付费状态"
                prop="paymentStatus"
              >
                <el-select
                  v-model="search.paymentStatus"
                  clearable
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in paymentStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="发件人姓名"
                prop="senderName"
              >
                <el-input
                  v-model="search.senderName"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="发件人电话"
                prop="senderPhone"
              >
                <el-input
                  v-model="search.senderPhone"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="发件人地址"
                prop="senderAdress"
                class="address"
              >
                <el-select
                  v-model="search.senderProvince"
                  clearable
                  placeholder="请选择"
                  @change="handleProvince"
                >

                  <el-option
                    v-for="(item,index) in provinceList"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>

                </el-select>
                <el-select
                  v-model="search.senderCity"
                  clearable
                  placeholder="请选择"
                  id="city"
                  @change="handleCity"
                >
                  <el-option
                    v-for="(item,index) in cityList"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="search.senderDistrict"
                  clearable
                  placeholder="请选择"
                  id="district"
                  @change="handleDistrict"
                >
                  <el-option
                    v-for="(item,index) in districtList"
                    :key="index"
                    :label="item.name"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="收件人姓名"
                prop="receiverName"
              >
                <el-input
                  v-model="search.receiverName"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="收件人电话"
                prop="receiverPhone"
              >
                <el-input
                  v-model="search.receiverPhone"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="收件人地址"
                prop="receiverAdress"
                class="address"
              >
                <el-select
                  v-model="search.receiverProvince"
                  clearable
                  placeholder="请选择"
                  @change="handleProvince"
                >

                  <el-option
                    v-for="(item,index) in provinceList"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>

                </el-select>
                <el-select
                  v-model="search.receiverCity"
                  clearable
                  placeholder="请选择"
                  id="city"
                  @change="handleCity"
                >
                  <el-option
                    v-for="(item,index) in cityList"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="search.receiverDistrict"
                  clearable
                  placeholder="请选择"
                  id="district"
                  @change="handleDistrict"
                >
                  <el-option
                    v-for="(item,index) in districtList"
                    :key="index"
                    :label="item.name"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="textRight">
        <base-button
          class="minorImportantButton btnSearch"
          @click="handleSearch"
        >搜索</base-button>
        <base-button
          class="unimportanceButton"
          @click="handleReset"
        >重置</base-button>
      </div>
    </div>
    <!-- end -->
    <div class="box divContent">
      <!-- 表格数据 -->
      <div v-if="listData.length>0">
        <el-table
          :data="listData"
          stripe
          border
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column
            type="index"
            label="序号"
            width="68"
          />
          <el-table-column
            prop="orderNumber"
            label="订单编号"
            width="160"
          />
          <el-table-column
            prop="waybillNumber"
            label="运单编号"
            width="160"
          />
          <el-table-column
            prop="orderTime"
            label="下单时间"
            width="160"
          />
          <el-table-column
            prop="status"
            label="订单状态"
            width="100"
          >
            <template slot-scope="{ row }">
              <span v-if="row.status==='0'">待取件</span>
              <span v-if="row.status==='1'">已取件</span>
              <span v-if="row.status==='2'">网点自寄</span>
              <span v-if="row.status==='3'">网点入库</span>
              <span v-if="row.status==='4'">待装车</span>
              <span v-if="row.status==='5'">运输中</span>
              <span v-if="row.status==='6'">网点出库</span>
              <span v-if="row.status==='7'">待派送</span>
              <span v-if="row.status==='8'">派送中</span>
              <span v-if="row.status==='9'">已签收</span>
              <span v-if="row.status==='10'">拒收</span>
              <span v-if="row.status==='11'">已取消</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="senderName"
            label="发件人姓名"
            width="120"
          />
          <el-table-column
            label="发件人电话"
            width="120"
            prop="senderPhone"
          />
          <el-table-column
            prop="senderAddress"
            label="发件人地址"
            width="200"
          />
          <el-table-column
            prop="receiverName"
            label="收件人姓名"
            width="120"
          />
          <el-table-column
            prop="receiverPhone"
            label="收件人电话"
            width="120"
          />
          <el-table-column
            prop="receiverAdress"
            label="收件人地址"
            width="200"
          />
          <el-table-column
            prop="deliverytype"
            label="取件类型"
            width="100"
          >
            <template slot-scope="{ row }">
              <span v-if="row.deliverytype==='1'">网点自寄</span>
              <span v-else>上门取件</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="payType"
            label="付费类型"
            width="100"
          >
            <template slot-scope="{ row }">
              <span v-if="row.payType==='1'">预结</span>
              <span v-else>到付</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="{ row }">
              <base-button
                class="fontOperateButton"
                @click="handleDetails(row.orderNumber)"
              >查看详情</base-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- end -->
        <!-- 分页 -->
        <base-pagination
          :total="total"
          :limit="search.pagesize"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></base-pagination>
        <!-- end -->
      </div>
      <div
        v-else
        class="emptyTip"
      >
        <span class="imgIcon"></span>
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
// 公用组件
// 按钮
import BaseButton from '@/components/base-button/index.vue'
// 分页
import BasePagination from '@/components/base-pagination/index.vue'
// 本模块组件
import DialogBase from './components/dialog.vue'
// interface接口
import { TableData } from '@/module-order/interface/order'
// api数据接口
import { paymentStatus, orderStatus } from '@/utils/common-select-data'
import { mixins } from 'vue-class-component'
import SinglePage from '@/mixin/single-page'
import { getOrderList } from '@/module-order/api/order'
const jsonCitys = require('@/api/json/city.json')
@Component({
  name: 'goodsOwnerList',
  components: {
    BaseButton,
    BasePagination,
    DialogBase
  }
})
export default class extends mixins(SinglePage) {
  private listData: TableData[] = [] // 数据列表
  private total = 0
  private ref: any = this.$refs
  private loading = false
  // private delectData = []
  // private deleData = {}
  private search = {
    // id: '', // id
    // orderNumber: '', //编号
    // paymentStatus: '', //付费状态
    // senderName: '', //发件人姓名
    // senderPhone: '', //发件人电话
    // status: '', //状态
    // senderProvince: '', // 发件人省
    // senderCity: '', // 发件人市
    // receiverName: '', //收件人姓名
    // receiverPhone: '', //收件人电话
    // senderDistrict: '', // 发件人县
    // receiverProvince: '', //收件人省
    // receiverCity: '', //收件人市
    // receiverDistrict: '', //收件人县
    pagesize: 10, // 每页显示10条
    page: 1 // 当前页
  } as any

  private dialogData = {
    id: '',
    msg: '',
    dialogTitle: '',
    visible: false
  }

  private provinceList = []
  private cityList = []
  private districtList = []
  private paymentStatus = [] as any
  private orderStatus = [] as any
  created() {
    this.getList()
    // addressInit('province', 'city', 'district', '广东', '深圳市', '宝安区')
    this.provinceList = jsonCitys.provinceList
    this.paymentStatus = paymentStatus
    this.orderStatus = orderStatus
    console.log(jsonCitys)
  }

  private clearDate() {
    this.search.senderProvince = '' // 发件人省
    this.search.senderCity = '' // 发件人市
    this.search.senderDistrict = '' // 发件人县
    this.search.receiverProvince = '' // 收件人省
    this.search.receiverCity = '' // 收件人市
    this.search.receiverDistrict = '' // 收件人县
  }

  private handleProvince(val: any) {
    this.provinceList.forEach((ele: any) => {
      if (val === ele.name) {
        // // 获取默认省市县
        // this.search.senderCity = ele.cityList[0].name
        // this.search.senderDistrict = ele.cityList[0].areaList[0]
        // 获取市、县下拉
        this.cityList = ele.cityList
        this.districtList = ele.cityList[0].areaList
      }
    })
    // this.getLogLat()
  }

  private handleCity(val: any) {
    this.cityList.forEach((ele: any) => {
      if (val === ele.name) {
        // // 获取默认县
        // this.search.senderDistrict = ele.areaList[0]
        // 县下拉
        this.districtList = ele.areaList
      }
    })
  }

  handleDistrict = () => {
    this.getLogLat()
  }

  getLogLat = () => {
    var p = jsonCitys.p
    var d = jsonCitys.d
    var c = jsonCitys.c
    for (var pKey in p) {
      if (
        p[pKey] === this.search.senderProvince ||
        this.search.receiverProvince
      ) {
        // 取得对应的省
        var ct = c[pKey]
        // console.log(pKey)
        for (var cKey in ct) {
          if (ct[cKey] === this.search.senderCity || this.search.receiverCity) {
            // 取得对应的市
            var dt = d[cKey]
            console.log(cKey, 1)
            for (var dKey in dt) {
              if (
                dt[dKey].name === this.search.senderDistrict ||
                this.search.receiverDistrict
              ) {
                // 取得对应的区 并且获取经纬度
                console.log(dt[dKey])
                break
              }
            }
            break
          }
        }
        break
      }
    }
  }

  // 功能
  private handleSearch() {
    this.getList()
  }

  // 获取数据
  private async getList() {
    // this.loading = true
    const data = (await getOrderList(this.search)) as any
    console.log(data, 1)
    if (data) {
      this.loading = false
      this.listData = data.items
      this.total = parseInt(data.total, 10)
    }
  }

  // ui
  // 详情
  handleDetails(id: string) {
    this.$router.push({ path: `order/details/${id}` })
  }

  // 重置
  handleReset() {
    this.ref.ruleForm.resetFields()
    this.clearDate()
    this.getList()
  }

  // 当前页
  private handleCurrentChange(page: number) {
    this.search.page = page
    this.getList()
  }

  // 每页条数
  private handleSizeChange(page: number) {
    this.search.pagesize = page
    this.search.page = 1
    this.getList()
  }

  // 弹层关闭
  private handleClose() {
    this.dialogData.visible = false
    this.getList()
  }
}
</script>
