<template>
    <div class="divBaseListDialog">
            <el-dialog
                :title="title"
                :visible.sync="visible"
                width="30%">
                <div class="spanSubTitle" v-if="subTitle">{{subTitle}}</div>
                <div class="divMsg"  v-if="msg">{{msg}}</div>
                <div class="divItemList" v-if="itemList.length > 0 ">
                    <el-scrollbar style="height:70px;">
                       <div class="divItems">{{itemList.join('、')}}</div>
                    </el-scrollbar>
                </div>
                <div class="divFailureMsg" v-if="msgFailure">{{msgFailure}}</div>
                <div class="divItemList" v-if="itemListFailure.length > 0 ">
                    <el-scrollbar style="height:70px;">
                       <div class="divItems">{{itemListFailure.join('、')}}</div>
                    </el-scrollbar>
                </div>
                <span slot="footer" class="dialog-footer">
                    <base-button class="minorImportantButton" @click="btnSureClick">确 定</base-button>
                </span>
            </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import BaseButton from '@/components/base-button/index.vue'
@Component({
  name: 'BaseListDialog',
  components: {
    BaseButton
  }
})
export default class extends Vue {
    @Prop({ default: '' }) private title!: string
    @Prop({ default: '' }) private subTitle!: string
    @Prop({ default: '' }) private msg!: string
    @Prop({ default: false }) private visible!: boolean
    @Prop({ default: [] }) private itemList!: []
    @Prop({ default: '' }) private msgFailure!: string
    @Prop({ default: [] }) private itemListFailure!: []

    // 事件名不能使用驼峰命名用全小写或者短横线连接
    private btnSureClick() {
      this.$emit('btn-sure-click')
    }
}
</script>

<style lang="scss" scoped>
.divBaseListDialog{
  ::v-deep .el-dialog{
        font-family: PingFangSC, PingFangSC-Medium;
      .el-dialog__header{
        box-shadow:none
      }
      .el-dialog__body{
        background: #f9f9f9;
        border: 1px solid #eaeaea;
        border-radius: 4px;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 23px;
        padding:21px 20px 14px 21px;
        .spanSubTitle{
          height: 24px;
          font-size: 16px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: center;
          color: #332929;
          line-height: 24px;
        }
        .divMsg{
          height: 22px;
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #ffb200;
          line-height: 22px;
          margin-top: 11px;
          margin-bottom: 6px;
          text-align: center;

        }
        .divFailureMsg{
          height: 22px;
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #d9021c;
          line-height: 22px;
          text-align: center;
          margin-top: 11px;
          margin-bottom: 6px;
        }
        .el-scrollbar__wrap {
          overflow-x: hidden;
        }
        .divItemList{
          .divItems{
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: center;
            color: #b5abab;
            line-height: 22px;
            padding-right: 10px;
            text-align: left;
          }
        }
      }
      .el-dialog__footer{
        padding: 30px 20px 30px 0;
      }

  }

}
</style>
