<template>
  <div class="divWarehouse">
    <div class="container scrollTable tabConLeft">
      <div class="serchForm">
        <el-form
          ref="ruleForm"
          :inline="true"
          :model="search"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item
                label=""
                prop="like_code"
              >
                <el-input
                  v-model="search.like_code"
                  placeholder="请输入"
                  suffix-icon="el-icon-search"
                  style="width: 160px;"
                  clearable
                  @click.native="handleSearch"
                  @keypress.native.enter="handleSearch"
                />
              </el-form-item>
              <base-button
                class="importantButton textRight"
                @click="handleAdd"
              >新增</base-button>
            </el-col>
          </el-row>
        </el-form>
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
            prop="name"
            label="名称"
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="160"
          >
            <template slot-scope="{ row }">
              <base-button
                class="fontOperateButton"
                @click="handleView(row.id)"
              >查看</base-button>
              <base-button
                class="fontOperateButton"
                @click="handleEdit(row.id)"
              >编辑</base-button>
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
        <p>暂无</p>
      </div>
      <!-- 删除 -->
      <dialog-base
        :visible="dialogData.visible"
        :dialogData="dialogData"
        @handlesubmit="handleSubmit"
        @handleclose="handleClose"
      ></dialog-base>
      <!-- end -->
    </div>
    <div class="container tabConRight">

      <div
        class="anchorTR"
        v-if="isStart"
      >
        <div class="unfreeze-form mapForm">
          <el-form
            ref="ruleForm"
            :rules="formRules"
            :model="userData"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="名称："
              prop="name"
            >
              <el-input
                v-model="userData.name"
                placeholder="请输入"
                autocomplete="off"
                minlength="1"
                maxlength="6"
              />
            </el-form-item>
          </el-form>
        </div>

      </div>

      <div>
        <baidu-map
          ref="myMap"
          class="map"
          :center="center"
          :zoom="10"
          :scroll-wheel-zoom="false"
          :map-click="false"
          @mousedown="syncPolyline"
          @click="paintPolyline"
          @rightclick="newPolyline"
          @ready="handler"
        >
          <bm-control
            v-show="isStart"
            style="background:#fff;width:100%;"
          >
            <el-tooltip
              v-if="saveShow"
              class="item"
              effect="dark"
              content="点击保存上传绘制好的电子围栏"
              placement="top"
            >
              <base-button
                class="minorImportantButton btnSearch"
                @click="createData"
              >保存</base-button>
            </el-tooltip>
            <base-button
              v-else
              type="primary"
              class="minorImportantButton btnSearch"
              @click="toggle('polyline')"
            >{{ polyline.editing ? '完成绘制' : '开始绘制' }}</base-button>

            <base-button
              v-show="polyline.editing !== false"
              class="unimportanceButton"
              @click="clear()"
            >清除围栏</base-button>
            <P
              v-if="!saveShow"
              class="infoTip"
            >点击绘制电子围栏，完成绘制后，点击保存按钮保存。仅支持绘制单个电子围栏区域</P>
          </bm-control>
          <bm-navigation
            anchor="BMAP_ANCHOR_TOP_RIGHT"
            style="margin-top:100px;"
          ></bm-navigation>

          <bm-polygon
            v-for="(path, index) of polyline.paths"
            :key="index"
            :path="path"
            stroke-color="#5E87DB"
            fill-color="rgba(94,135,219,0.40)"
            :fill-opacity="0.4"
            :stroke-opacity="1"
            :stroke-weight="2"
            stroke-style="dashed"
            :editing="polyline.editing"
            @lineupdate="updatePolygonPath"
          ></bm-polygon>
        </baidu-map>
      </div>
    </div>
    <div id="container"></div>
  </div>
</template>

<script lang="ts">
// https://blog.csdn.net/qq_36019174/article/details/109639405
// https://www.cnblogs.com/caoxen/p/11352488.html
// https://blog.csdn.net/c153284575/article/details/106386103/
import { Component } from 'vue-property-decorator'
// 公用组件
// 按钮
import BaseButton from '@/components/base-button/index.vue'
// 分页
import BasePagination from '@/components/base-pagination/index.vue'
// 本模块组件
import DialogBase from './components/dialog.vue'
// interface接口
// import { ICommonReturn } from '@/utils/common-interface'
// import { IOwnerTableData } from '@/module-business/interface/owner'
// api数据接口
import {
  getEleList,
  addRail,
  editRail,
  getListDetails,
  deleteRail
} from '@/module-electronic-fence/api/index'
import { mixins } from 'vue-class-component'
import SinglePage from '@/mixin/single-page'
@Component({
  name: 'goodsOwnerList',
  components: {
    BaseButton,
    BasePagination,
    DialogBase
  }
})
export default class extends mixins(SinglePage) {
  private listData = [] // 数据列表
  private total = 0
  private ref: any = this.$refs
  private loading = false
  // private delectData = []
  // private deleData = {}
  // private showEdit = true
  private isStart = false
  private saveShow = false
  // private showCounty = false
  private railId = '' as any
  private search = {
    id: '', // id
    pagesize: 10, // 每页显示10条
    page: 1 // 当前页
  }

  private dialogData = {
    id: '',
    msg: '',
    dialogTitle: '',
    visible: false
  }

  private center = {
    lng: 116.216456,
    lat: 40.221724
  }

  private polyline = {
    editing: false,
    paths: [[]]
  } as any

  private userData = {
    name: ''
  } as any

  private type = ''
  private formRules = {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
  }

  created() {
    this.getList()
  }

  // 功能
  private handleSearch() {
    this.getList()
  }

  // handler({ BMap, map }) {
  //   console.log(BMap, map)
  //   map.enableScrollWheelZoom(true)
  //   // map.centerAndZoom('青岛市', 13)
  // }

  // 鼠标移动时
  syncPolyline(e: any) {
    if (!this.polyline.editing) {
      return
    }
    const { paths } = this.polyline
    if (!paths.length) {
      return
    }
    const path = paths[paths.length - 1]
    if (!path.length) {
      return
    }
    if (path.length === 1) {
      path.push(e.point)
    }
    this.$set(path, path.length - 1, e.point)
    console.log(paths, 2)
  }

  // 鼠标左键点击时往路径里push一个点
  newPolyline() {
    if (!this.polyline.editing) {
      return
    }
    // 当开始绘制后把按钮调回开始绘制状态，防止绘制多个图形
    this.polyline.editing = !this.polyline.editing
    const { paths } = this.polyline
    if (!paths.length) {
      paths.push([])
    }
    const path = paths[paths.length - 1]
    path.pop()
    if (path.length) {
      paths.push([])
    }
    console.log(paths, 1)
  }

  // 鼠标右键多边形绘制完成
  paintPolyline(e: any) {
    if (!this.polyline.editing) {
      return
    }
    console.log(e.point)
    const { paths } = this.polyline
    !paths.length && paths.push([])
    paths[paths.length - 1].push(e.point)
    console.log(this.polyline, 3)
  }

  // 获取数据
  private async getList() {
    this.loading = true
    const data = (await getEleList(this.search)) as any
    console.log(data)
    if (data) {
      this.loading = false
      this.listData = data.items
      this.total = parseInt(data.total, 10)
    }
  }

  // 删除数据
  handleDelect(val: any) {
    if (this.confirmMsg()) {
      return
    }
    this.dialogData.visible = true
    this.dialogData.msg = `确定要删除：${val.name} 吗？`
    this.dialogData.id = val.id
    this.dialogData.dialogTitle = '确认删除'
  }

  // 确定删除
  private async handleSubmit() {
    // const ids = [this.dialogData.id]
    const data = await deleteRail(this.dialogData.id)
    console.log(data)
    // if (data.code === 0) {
    this.dialogData.visible = false
    this.$message.success('删除成功')
    this.getList()
    // } else {
    //   this.$message.error(data.msg)
    // }
  }

  // ui
  // 添加货主
  private handleAdd() {
    this.type = 'add'
    this.isStart = true
    this.clear()
    this.userData.name = ''
  }

  // 编辑
  private handleEdit(id: string) {
    this.isStart = true
    this.type = ''
    this.handleDetails(id)
  }

  // 查看
  handleView(id: string) {
    this.isStart = false
    this.handleDetails(id)
  }

  // 详情

  async handleDetails(id: string) {
    this.railId = id
    this.polyline.paths = [[]]
    const data = (await getListDetails(id)) as any
    this.polyline.paths[0].push(...data.mutiPoints)
    this.userData.name = data.name
    // console.log(this.polyline.paths[0])
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
    this.dialogData.visible = false
    this.getList()
  }

  // 开始绘制
  // 开启多边形绘制
  toggle(name: any) {
    (this as any)[name].editing = !(this as any)[name].editing
    if (this.railId === '' && this.polyline.paths && this.polyline.editing) {
      this.polyline.paths = []
    }
    if (!this.polyline.editing) {
      this.saveShow = true
    }
  }

  // 鼠标左键键多边形绘制
  drawLine(e: any) {
    if (!this.polyline.editing) {
      return
    }
    const { paths } = this.polyline
    !paths.length && paths.push([])
    paths[0].push(e.point)
  }

  clear() {
    this.polyline.editing = false
    console.log(this.polyline, this.polyline.paths.length)
    if (this.polyline.paths.length === 0) {
    } else {
      this.polyline.paths = []
    }
  }

  // 修改拖拽坐标
  updatePolygonPath(e: any) {
    this.polyline.paths[0] = e.target.getPath()
    console.log(this.polyline.paths[0], 1)
  }

  // 保存机构作业范围
  private async createData() {
    this.polyline.editing = false
    if (this.polyline.paths.length === 0) {
      this.isStart = true
      this.saveShow = false
      return this.$message.error('请绘制作业机构范围')
    }

    // 提交先去重
    const result = []
    var obj = {} as any
    let list = this.polyline.paths[this.polyline.paths.length - 1]
    if (this.polyline.paths[this.polyline.paths.length - 1].length === 0) {
      list = this.polyline.paths[this.polyline.paths.length - 2]
    }
    for (let i = 0; i < list.length; i++) {
      if (!obj[list[i].lat]) {
        result.push(list[i])
        obj[list[i].lat] = true
      }
    }
    let data = {
      name: this.userData.name,
      mutiPoints: result
    } as any
    this.isStart = false
    this.saveShow = false
    this.clear()
    ;(this.$refs.ruleForm as any).resetFields()
    if (this.type === 'add') {
      const resData = await addRail(data)
      console.log(resData)
    } else {
      data = {
        ...data,
        id: this.railId
      }
      const resData = await editRail(data)
      console.log(resData)
    }

    // await addRail(data).then(res => {
    //   if (res.data.msg === 'success') {

    //     this.$message.success('电子围栏保存成功')
    //   } else {
    //     this.$message.error(res.data.msg)
    //   }
    // })
  }

  private handler({ BMap, map }: any) {
    map.centerAndZoom(new BMap.Point(this.center.lng, this.center.lat), 10) // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true)
  }
}
</script>
