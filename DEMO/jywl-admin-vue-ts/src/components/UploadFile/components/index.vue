<template>
  <el-dialog
    :title="'导入'+dialogData.updatedTitle"
    width="30%"
    class="uploadBox"
    :visible.sync="isDetailsVisible"
    :before-close="handleClose"
  >
    <div class="upload uploadDetails clearfix">
      <div class="fileTip">
        导入<span>成功<span
            class="success"
          >{{fileSuccessData}}</span>条</span>，<span>失败<span
            class="errorTip"
            v-if='fileMessageData.length>0'
          >{{fileMessageData.length}}</span><span v-else class="errorTip">0</span>条</span>
      </div>
      <ul v-if="fileMessageData.length>0">
        <li>
          {{fileMessageData.join('，')}}
        </li>
      </ul>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <!-- <base-button
        class="unimportanceButton btnCancle"
        @click="handleClose"
      >取 消</base-button> -->
      <base-button
        class="minorImportantButton"
        type="primary"
        @click="handleClose"
      >确 定</base-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
// 公用组件
// 按钮
import BaseButton from '@/components/base-button/index.vue'
@Component({
  name: 'details',
  components: {
    BaseButton
  }
})
export default class extends Vue {
  @Prop() private dialogData!: any
  @Prop() private isDetailsVisible!: boolean
  @Prop() private fileMessageData!: []
  @Prop() private fileSuccessData!: string
  // 功能
  // ui
  // 表单取消
  private handleClose() {
    this.$emit('handleclose')
  }
}
</script>
<style lang="scss">
</style>
