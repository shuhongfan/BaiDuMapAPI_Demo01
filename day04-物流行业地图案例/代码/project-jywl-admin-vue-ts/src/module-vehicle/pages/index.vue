<template>
  <div class="divWarehouse">
    <!-- 搜索 -->
    <div class="box divHead">
      <div class="serchForm waybillSerch">
        <el-form
          ref="ruleForm"
          :inline="true"
          :model="search"
        >
          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item
                label="车辆类型"
                prop="status"
              >
                <el-select
                  v-model="search.truckType"
                  clearable
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in truckType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="车牌号码"
                prop="waybillNumber"
              >
                <el-input
                  v-model="search.waybillNumber"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
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
            </el-col>
          </el-row>
        </el-form>
      </div>

    </div>
    <!-- end -->
    <div class="box divContent">
      <div class="tableInfo">
        <base-button
          class="importantButton"
          @click="handleAdd"
        >新增车辆</base-button>
      </div>
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
            prop="id"
            label="车辆编号"
            width="150"
          />
          <el-table-column
            prop="truckType"
            label="车辆类型"
            width="150"
          >
            <template slot-scope="{ row }">
              {{row.truckType}}
            </template>
          </el-table-column>
          <el-table-column
            prop="licensePlate"
            label="车牌号码"
            width="150"
          />
          <el-table-column
            prop="warn"
            label="电子围栏警告"
            width="150"
          >
            <template slot-scope="{ row }">
              <span
                v-if="row.warn==='0'"
                class="normalClo"
              >正常</span>
              <span
                v-if="row.warn==='1'"
                class="anomalyClo"
              >超出</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="currentPosition.name"
            label="车辆当前位置"
            width="200"
          />
          <el-table-column
            prop="gps"
            label="GPS设备ID"
            width="200"
          />
          <el-table-column
            prop="allowableLoad"
            label="准载重量（千克）"
            width="200"
          />
          <el-table-column
            label="准载体积（方）"
            width="200"
            prop="allowableVolume"
          />

          <el-table-column
            fixed="right"
            label="操作"
            width="150"
          >
            <template slot-scope="{ row }">
              <base-button
                class="fontOperateButton"
                @click="handleDetails(row.id)"
              >查看详情</base-button>
              <base-button
                class="fontOperateButton"
                @click="handleDelect(row)"
              >删除</base-button>
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
      <!-- 用户添加、编辑对话框 -->
      <dialog-base
        ref="userDialog"
        :editdata="formData"
        :dialogData="dialogData"
        :truckType="truckType"
        :allData="allData"
        @getList="getList"
        @close="handleClose"
      />
      <!-- end -->
      <!-- 删除 -->
      <delete-base
        :visible="dialogData.visible"
        :dialogData="dialogData"
        @handlesubmit="handleSubmit"
        @handleclose="handleClose"
      ></delete-base>
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
import DeleteBase from './components/delete.vue'
// interface接口
import { TableData } from '@/module-order/interface/order'
// https://github.com/cqmrzeng/gps180-vue
// api数据接口
import { truckType } from '@/utils/common-select-data'
import { mixins } from 'vue-class-component'
import SinglePage from '@/mixin/single-page'
import {
  getVehicleList,
  getListDetails,
  deleteVehicle
} from '@/module-vehicle/api/index'
import { getAllList } from '@/module-electronic-fence/api/index'
// const jsonCitys = require('@/api/json/city.json')
@Component({
  name: 'goodsOwnerList',
  components: {
    BaseButton,
    BasePagination,
    DialogBase,
    DeleteBase
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
    pagesize: 10, // 每页显示10条
    page: 1 // 当前页
  }

  private dialogData = {
    id: '',
    msg: '',
    title: '',
    type: '',
    isVisible: false,
    visible: false
  }

  private truckType = [] as any
  private allData = [] as any
  private formData = {} as any
  created() {
    this.getList()
    this.truckType = truckType
  }

  // 功能
  private handleSearch() {
    this.getList()
  }

  // 获取数据
  private async getList() {
    // this.loading = true
    const data = (await getVehicleList(this.search)) as any
    if (data) {
      this.loading = false
      this.listData = data.items
      this.total = parseInt(data.total, 10)
    }
  }

  private async getAllList() {
    const data = await getAllList({})
    this.allData = data
  }
  // 获取详情

  // ui
  // 新增
  handleAdd() {
    this.dialogData.isVisible = true
    this.dialogData.type = 'add'
    this.dialogData.title = '添加'
    this.getAllList()
  }

  // 详情
  private async handleDetails(id: string) {
    this.dialogData.type = 'edit'
    this.dialogData.title = '修改'
    this.dialogData.isVisible = true
    this.getAllList()
    const data = await getListDetails(id)
    this.formData = data
    this.formData.id = id
  }

  // 删除数据
  handleDelect(val: any) {
    if (this.confirmMsg()) {
      return
    }
    this.dialogData.visible = true
    this.dialogData.msg = '确定要删除吗？'
    this.dialogData.id = val.id
    this.dialogData.title = '确认删除'
  }

  // 确定删除
  private async handleSubmit() {
    // const ids = [this.dialogData.id]
    const data = await deleteVehicle(this.dialogData.id)
    console.log(data)
    // if (data.code === 0) {
    this.dialogData.visible = false
    this.$message.success('删除成功')
    this.getList()
    // } else {
    //   this.$message.error(data.msg)
    // }
  }

  // 重置
  handleReset() {
    this.ref.ruleForm.resetFields()
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
    this.dialogData.isVisible = false
    this.getList()
  }
}
</script>
