<template>
  <el-dialog
    :title="dialogData.dialogTitle"
    :visible.sync="visible"
    width="30%"
    :before-close="handleClose"
  >
    <span>{{dialogData.msg}}</span>
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
import { Component, Vue, Prop } from 'vue-property-decorator'
// 公用组件
// 按钮
import BaseButton from '@/components/base-button/index.vue'
@Component({
  name: 'Dialog',
  components: {
    BaseButton
  }
})
export default class extends Vue {
  @Prop() private visible!: any
  @Prop() private dialogData!: any
  private handleSubmit() {
    this.$emit('handlesubmit')
  }

  // 表单取消
  private handleClose() {
    this.$emit('handleclose')
  }
}
</script>
<style lang="scss">
</style>
