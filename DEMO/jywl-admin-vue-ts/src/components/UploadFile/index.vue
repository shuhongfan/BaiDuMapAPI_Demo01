<template>
  <div>
    <el-dialog
      :title="'导入'+dialogData.updatedTitle"
      width="30%"
      class="uploadBox"
      :visible.sync="dialogData.isFileVisible"
      :before-close="handleClose"
    >
      <div class="upload clearfix">
        <!-- 上传组件按钮 -->
        <el-upload
          class="upload-demo upload-text"
          ref="upload"
          drag
          :action="dialogData.uploadUrl"
          :on-change="handleChange"
          :on-error="uploadFail"
          :limit="1"
          :auto-upload='false'
          :show-file-list="true"
          :on-success="handleAvatarSuccess"
          :disabled="isDisabled"
          :class="{ 'uploadIsabled': isActive }"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">点击或将表格文件拖拽到这里上传</div>
          <div class="fontCol">仅支持单个表单文件导入</div>
        </el-upload>
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
          :disabled="isDisabledButton"
        >确 定</base-button>
      </span>
    </el-dialog>
    <!--  -->
    <base-details
      :isDetailsVisible="isDetailsVisible"
      :dialogData="dialogData"
      :fileMessageData="fileMessageData"
      :fileSuccessData="fileSuccessData"
      @handleclose="handleCloseDetails"
    ></base-details>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
// 公用组件
// 按钮
import BaseButton from '@/components/base-button/index.vue'
import BaseDetails from './components/index.vue'
@Component({
  name: 'UploadFile',
  components: {
    BaseButton,
    BaseDetails
  }
})
export default class extends Vue {
  @Prop() private dialogData!: any
  private isDetailsVisible = false
  private res: any = this.$refs
  private fileMessageData = []
  private fileSuccessData = ''
  private isDisabled = false
  private isDisabledButton = true
  private fileList = {}
  private isActive = false
  // 功能
  // 文件上传格式
  handleChange(file: any) {
    this.isDisabledButton = false
    this.fileList = file
    const fileName = file.name.split('.')
    const size = file.size / 1024 / 1024 < 10
    if (!size) {
      this.$message({
        message: '上传文件大小不能超过 10MB!',
        type: 'warning'
      })
    } else {
      this.isDisabled = true
      this.isActive = true
    }
    if (fileName[1] === 'xls' || fileName[1] === 'xlsx') {
      this.isDisabled = true
      this.isActive = true
      return file
    } else {
      this.$message.error('上传文件只能是 xls/xlsx 格式!')
      this.res.upload.clearFiles()
      return false
    }
  }

  // 手动上传
  private async handleSubmit() {
    this.res.upload.submit()
    this.isDetailsVisible = true
    this.$emit('handleclose')
  }

  // 上传错误
  uploadFail(err: any) {
    this.$message.error(err)
  }

  // 上传成功后获取列表
  private async handleAvatarSuccess(response: any) {
    if (response.isSuccess) {
      this.fileMessageData = response.data.message
      this.fileSuccessData = response.data.success
      this.res.upload.clearFiles()
      this.isDisabled = false
      this.isActive = false
    } else {
      this.$message.error(response.msg)
    }
  }

  // ui
  // 表单取消
  private handleClose() {
    this.$emit('handleclose')
    this.isDisabled = false
    this.isDisabledButton = true
    this.isActive = false
    this.res.upload.clearFiles()
  }

  private handleCloseDetails() {
    this.isDetailsVisible = false
    this.isDisabled = false
    this.isDisabledButton = true
    this.isActive = false
    this.res.upload.clearFiles()
  }
}
</script>
<style lang="scss">
</style>
