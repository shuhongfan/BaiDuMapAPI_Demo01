<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView: showTagsView}" class="main-container">
      <div :class="{'fixed-header': fixedHeader}">
        <tags-view v-if="showTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { DeviceType } from '@/store/modules/app'
import { SettingsModule } from '@/store/modules/settings'
import { AppMain, Sidebar, TagsView } from './components'
import RightPanel from '@/components/RightPanel/index.vue'
import ResizeMixin from './mixin/resize'

@Component({
  name: 'Layout',
  components: {
    AppMain,
    RightPanel,
    Sidebar,
    TagsView
  }
})
export default class extends mixins(ResizeMixin) {
  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === DeviceType.Mobile
    }
  }

  get showTagsView() {
    return SettingsModule.showTagsView
  }

  get fixedHeader() {
    return SettingsModule.fixedHeader
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
  background-color: #FDFAFA;
  }

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;

  background: #ffffff;
  box-shadow: 2px 0px 6px 0px rgba(144, 142, 142, 0.13);
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }

  .fixed-header {
    width: calc(100% - 54px);
  }
}

/* for mobile response 适配移动端 */
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform 0.28s;
    width: $sideBarWidth !important;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
  }

  .fixed-header {
    width: 100%;
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
