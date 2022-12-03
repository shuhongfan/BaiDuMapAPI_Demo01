<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[
      isCollapse ? 'simple-mode' : 'full-mode',
      { 'first-level': isFirstLevel }
    ]"
  >
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <sidebar-item-link
        v-if="theOnlyOneChild.meta"
        :to="resolvePath(theOnlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': isFirstLevel }"
        >
          <!-- <i
            v-if="theOnlyOneChild.meta.icon"
            class="item-icon iconfont"
            v-bind:class="theOnlyOneChild.meta.icon"
          /> -->

          <svg-icon
            v-if="theOnlyOneChild.meta.icon"
            :name="theOnlyOneChild.meta.icon"
          />
          <template v-else-if="!theOnlyOneChild.children">
            <div class="sub-item-dot">
              <div class="vline" />
              <div class="dot" />
            </div>
          </template>

          <!-- <svg-icon
            v-if="theOnlyOneChild.meta.icon"
            :name="theOnlyOneChild.meta.icon"
          /> -->
          <span
            v-if="theOnlyOneChild.meta.title"
            slot="title"
          >{{
            $t(theOnlyOneChild.meta.title)
          }}</span>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-submenu
      v-else
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <svg-icon
          v-if="item.meta && item.meta.icon"
          :name="item.meta.icon"
        />
        <!-- <i
          v-if="item.meta.icon"
          class="item-icon iconfont"
          v-bind:class="item.meta.icon"
        /> -->
        <span
          v-if="item.meta && item.meta.title"
          slot="title"
        >{{
          $t(item.meta.title)
        }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from 'path'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'
import { isExternal } from '@/utils/validate'
import SidebarItemLink from './SidebarItemLink.vue'

@Component({
  // Set 'name' here to prevent uglifyjs from causing recursive component not work
  // See https://medium.com/haiiro-io/element-component-name-with-vue-class-component-f3b435656561 for detail
  name: 'SidebarItem',
  components: {
    SidebarItemLink
  }
})
export default class extends Vue {
  @Prop({ required: true }) private item!: RouteConfig
  @Prop({ default: false }) private isCollapse!: boolean
  @Prop({ default: true }) private isFirstLevel!: boolean
  @Prop({ default: '' }) private basePath!: string

  get alwaysShowRootMenu() {
    if (this.item.meta && this.item.meta.alwaysShow) {
      return true
    }
    return false
  }

  get showingChildNumber() {
    if (this.item.children) {
      const showingChildren = this.item.children.filter(item => {
        if (item.meta && item.meta.hidden) {
          return false
        } else {
          return true
        }
      })
      return showingChildren.length
    }
    return 0
  }

  get theOnlyOneChild() {
    if (this.showingChildNumber > 1) {
      return null
    }
    if (this.item.children) {
      for (const child of this.item.children) {
        if (!child.meta || !child.meta.hidden) {
          return child
        }
      }
    }
    // If there is no children, return itself with path removed,
    // because this.basePath already conatins item's path information
    return { ...this.item, path: '' }
  }

  private resolvePath(routePath: string) {
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(this.basePath)) {
      return this.basePath
    }
    return path.resolve(this.basePath, routePath)
  }
}
</script>

<style lang="scss">
// 菜单项 背景 白色
.el-submenu__title,
.el-menu-item {
  background-color: rgb(255, 255, 255) !important;
  &:hover {
    background-color: $subMenuHover !important;
  }
}

.el-menu {
  font-weight: 400;
  color: #887e7e;
  font-family: PingFangSC, PingFangSC-Regular;
  .full-mode:nth-child(1) {
    .vline {
      top: 5px;
      height: 10px;
    }
  }
}

// 图标
.el-menu-item,
.el-submenu__title {
  .item-icon {
    width: 20px;
    height: 20px;
    margin-right: 16px;
  }

  .sub-item-dot {
    display: inline-block;
    margin-right: 16px;
    .vline {
      height: 20px;
      border-left: 1px solid #d9d0cf;
      border-right: 0;
      position: absolute;
      top: -10px;
      margin-left: 2px;
    }
    .dot {
      width: 6px;
      height: 6px;
      background: #d9d0cf;
      border-radius: 50%;
    }
  }
}

.el-menu-item.is-active {
  .sub-item-dot .dot {
    background-color: #ffb200;
  }
}

.full-mode {
  .nest-menu .el-submenu > .el-submenu__title,
  .el-submenu .el-menu-item {
    min-width: $sideBarWidth !important;
    // background-color: $subMenuBg !important;

    .el-submenu.is-active > .el-submenu__title {
      color: $subMenuActiveText !important;
    }

    // &:hover {
    //   background-color: $subMenuHover !important;
    // }
  }
  .is-active {
    .el-submenu__title {
      background: #fff6e2 !important;
      border-radius: 0px 100px 100px 0px;
      color: #ffc12f !important;
      i {
        color: #ffc12f !important;
      }
    }
  }
  // 选中背景
  .el-menu-item.is-active {
    span {
      // background-color: #fff6e2 !important;
      // border-radius: 0px 100px 100px 0px;
      font-weight: 500;
      // color: #332929 !important;
      font-family: PingFangSC, PingFangSC-Medium;
    }
  }
  svg {
    vertical-align: middle;
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      & > .el-submenu__title {
        padding: 0px !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        & > span {
          visibility: hidden;
        }
      }
    }
  }
}

.first-level:first-child {
  .is-active {
    border-radius: 0px 100px 100px 0px;
    span {
      color: #ffc12f !important;
      font-weight: 500;
      font-family: PingFangSC, PingFangSC-Medium;
    }
  }
}
</style>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}

.simple-mode {
  .svg-icon {
    margin-left: 20px;
  }
}
</style>
