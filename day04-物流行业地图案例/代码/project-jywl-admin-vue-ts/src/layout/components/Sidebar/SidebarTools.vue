<template>
  <div class="sidebar-tools">
    <img
      class="icon"
      :src="avatar ? avatar : require('@/assets/images/avatar@2x.png')"
      alt=""
    />
    <div class="title">
      {{ userName ? userName : 'admin' }}
    </div>
    <div class="divSplit"></div>
    <img
      class="quit"
      :src="avatar ? avatar : require('@/assets/images/btn_quite_nor@2x.png')"
      @click="handleQuit"
      alt=""
    />
  </div>
</template>

<script lang="ts">
import { UserModule } from '@/store/modules/user'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'SideBarTools'
})
export default class extends Vue {
  private async handleQuit() {
    await UserModule.LogOut()
    this.$router.push(`/login?redirect=${this.$route.fullPath}`)
  }

  get avatar() {
    return UserModule.avatar
  }

  get userName() {
    return UserModule.name
  }
}
</script>

<style lang="scss" scoped>
.sidebar-tools {
  // position: absolute;
  // left: 0px;
  // bottom: 0px;
  height: 62px;
  width: 226px;
  background-color: #ffffff;
  border-top: 1px solid #f5efee;

  display: flex;
  flex-direction: row;
  align-items: center;

  .icon {
    width: 32px;
    height: 32px;
    margin-left: 41px;
    margin-right: 14px;
  }
  .title {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #332929;
    line-height: 20px;
  }
  .divSplit{
    height: 17px;
    border-left: 1px solid #d9d0cf;
    border-right: 0;
    margin-left: 17px;
    margin-right: 17px;
  }
  .quit {
    width: 21px;
    height: 21px;
    cursor: pointer;
    color: #b5abab;
  }
  .quit:hover {
  }
}
</style>
