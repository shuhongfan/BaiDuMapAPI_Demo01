<template>
  <el-dialog
    :title="dialogData.title"
    :visible.sync="dialogData.isVisible"
    width="30%"
    :before-close="handleClose"
  >
    <div class="unfreeze-form">
      <el-form
        ref="ruleForm"
        :rules="formRules"
        :model="baseData"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="车辆类型："
          prop="truckType"
        >
          <el-select
            v-model="baseData.truckType"
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
        <el-form-item
          label="车牌号码："
          prop="licensePlate"
        >
          <el-input
            v-model="baseData.licensePlate"
            placeholder="请输入"
            autocomplete="off"
            minlength="1"
            maxlength="6"
          />
        </el-form-item>
        <el-form-item
          label="关联电子围栏："
          prop="railId"
        >
          <el-select
            v-model="baseData.railId"
            clearable
            placeholder="请选择"
            style="width:100%"
          >
            <el-option
              v-for="item in allData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="GPS设备ID："
          prop="gps"
        >
          <el-input
            v-model="baseData.gps"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          label="准载重量："
          prop="allowableLoad"
        >
          <el-input
            v-model="baseData.allowableLoad"
            placeholder="请输入"
            maxlength="20"
          >
            <span slot="suffix">千克</span>
          </el-input>
        </el-form-item>
        <el-form-item
          label="准载体积："
          prop="allowableVolume"
        >
          <el-input
            v-model="baseData.allowableVolume"
            placeholder="请输入"
            maxlength="20"
          >
            <span slot="suffix">方</span>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <base-button
        class="unimportanceButton btnCancle"
        @click="handleClose"
      >取 消</base-button>
      <base-button
        class="minorImportantButton"
        type="primary"
        @click="handleSubmit"
      >确 定</base-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
// 公用组件
// 按钮
import BaseButton from '@/components/base-button/index.vue'
import { addVehicle, editVehicle } from '@/module-vehicle/api/index'
@Component({
  name: 'Dialog',
  components: {
    BaseButton
  }
})
export default class extends Vue {
  private validate = (rule: any, value: string, callback: Function) => {
    if (value) {
      const reg = /^[0-9]+(.[0-9]{1,2})?$/
      if (!reg.test(value)) {
        callback(new Error('只能输入数字类型，最多保留两位小数，请重新输入'))
      } else {
        callback()
      }
    } else {
      callback()
    }
  }

  @Prop() private dialogData!: any
  @Prop() private truckType!: any
  @Prop() private allData!: any
  @Prop() private editdata!: {}
  private baseData = {
    truckType: '',
    licensePlate: '',
    railId: '',
    gps: '',
    allowableLoad: '',
    allowableVolume: ''
  }

  private formRules = {
    truckType: [
      { required: true, message: '请选择上级类目', trigger: 'change' }
    ],
    licensePlate: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    railId: [{ required: true, message: '请选择上级类目', trigger: 'change' }],
    allowableLoad: [
      { required: false, validator: this.validate, trigger: 'blur' }
    ],
    allowableVolume: [
      { required: false, validator: this.validate, trigger: 'blur' }
    ]
  }

  @Watch('editdata')
  getUserData(val: any) {
    if (val.id !== '') {
      this.baseData = val
    }
  }

  // 添加
  private async addSave() {
    const { data } = await addVehicle(this.baseData)
    console.log(data)
    // if (data.isSuccess) {
    this.$message({
      message: '操作成功！',
      type: 'success'
    })
    this.handleClose()
    // }
  }

  // 编辑
  private async updateSave() {
    const { data } = await editVehicle(this.baseData)
    console.log(data)
    // if (data.isSuccess) {
    this.$message({
      message: '操作成功！',
      type: 'success'
    })
    this.handleClose()
    // }
  }

  private handleSubmit() {
    (this.$refs.ruleForm as ElForm).validate(async(valid: boolean) => {
      if (valid) {
        if (this.dialogData.type === 'add') {
          await this.addSave()
        } else {
          await this.updateSave()
        }
        this.$emit('getList')
      } else {
        return false
      }
    })
  }

  // 表单取消
  private handleClose() {
    this.$emit('close')
    ;(this.$refs.ruleForm as ElForm).resetFields()
  }
}
</script>
<style lang="scss">
</style>
