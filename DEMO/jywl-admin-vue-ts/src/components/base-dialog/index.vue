<template>
    <div class="divBaseDialog">
            <el-dialog
                :title="title"
                :visible.sync="visible"
                width="30%">
                <span>{{msg}}</span>
                <div class="divSubMsg">{{subMsg}}</div>
                <span slot="footer" class="dialog-footer">
                <base-button class="unimportanceButton btnCancle" @click="btnCancleClick">取 消</base-button>
                <base-button class="minorImportantButton" @click="btnSureClick">确 定</base-button>
                </span>
            </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import BaseButton from '@/components/base-button/index.vue'
@Component({
  name: 'BaseDialog',
  components: {
    BaseButton
  }
})
export default class extends Vue {
    @Prop({ default: '' }) private title!: string
    @Prop({ default: '' }) private msg!: string
    @Prop({ default: '' }) private subMsg!: string
    @Prop({ default: false }) private visible!: boolean

    // 事件名不能使用驼峰命名用全小写或者短横线连接
    private btnCancleClick() {
      this.$emit('btn-cancle-click')
    }

    private btnSureClick() {
      this.$emit('btn-sure-click')
    }
}
</script>

<style lang="scss" scoped>
.divBaseDialog{
  ::v-deep .el-dialog{
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Medium;
        color: #332929;
          .el-dialog__title{
            text-align: left;
            font-weight: 500;
          }
          .el-dialog__body{
            font-weight: 400;
            .divSubMsg{
              margin: 20px auto;
            }
          }
  }
}
</style>
