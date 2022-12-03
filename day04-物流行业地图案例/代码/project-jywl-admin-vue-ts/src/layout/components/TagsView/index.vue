<template>
  <div
    id="tags-view-container"
    class="tags-view-container"
  >
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper"
    >
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ $t(setTag(tag.path, tag.meta.title)) }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
  </div>
</template>

<script lang="ts">
import path from 'path'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'
import { PermissionModule } from '@/store/modules/permission'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import ScrollPane from './ScrollPane.vue'

@Component({
  name: 'TagsView',
  components: {
    ScrollPane
  }
})
export default class extends Vue {
  private visible = false
  private top = 0
  private left = 0
  private selectedTag: ITagView = {}
  private affixTags: ITagView[] = [] // dashboard页面  不管怎样都会存在的页面

  get visitedViews() {
    return TagsViewModule.visitedViews
  }

  get routes() {
    return PermissionModule.routes
  }

  @Watch('$route')
  private onRouteChange() {
    this.addTags()
    this.moveToCurrentTag()
  }

  @Watch('visible')
  private onVisibleChange(value: boolean) {
    if (value) {
      document.body.addEventListener('click', this.closeMenu)
    } else {
      document.body.removeEventListener('click', this.closeMenu)
    }
  }

  mounted() {
    this.initTags()
    this.addTags()
  }

  private setTag(val: any, title: any) {
    const d = val.includes('details')
    const n = val.includes('null')
    if (d) {
      if (!n) {
        return (title = '编辑' + title.substring(2))
      } else {
        return title
      }
    } else {
      return title
    }
  }

  private isActive(route: ITagView) {
    return route.path === this.$route.path
  }

  private isAffix(tag: ITagView) {
    return tag.meta && tag.meta.affix
  }

  private filterAffixTags(routes: RouteConfig[], basePath = '/') {
    let tags: ITagView[] = []
    routes.forEach(route => {
      if (route.meta && route.meta.affix) {
        const tagPath = path.resolve(basePath, route.path)
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta }
        })
      }
      if (route.children) {
        const childTags = this.filterAffixTags(route.children, route.path)
        if (childTags.length >= 1) {
          tags = [...tags, ...childTags]
        }
      }
    })
    return tags
  }

  private initTags() {
    this.affixTags = this.filterAffixTags(this.routes)
    for (const tag of this.affixTags) {
      // Must have tag name
      if (tag.name) {
        TagsViewModule.addVisitedView(tag)
      }
    }
  }

  private addTags() {
    const { name } = this.$route
    if (name) {
      TagsViewModule.addView(this.$route)
    }
    return false
  }

  private moveToCurrentTag() {
    const tags = this.$refs.tag as any[] // TODO: better typescript support for router-link

    this.$nextTick(() => {
      for (const tag of tags) {
        if ((tag.to as ITagView).path === this.$route.path) {
          (this.$refs.scrollPane as ScrollPane).moveToTarget(tag as any)
          // When query is different then update
          if ((tag.to as ITagView).fullPath !== this.$route.fullPath) {
            TagsViewModule.updateVisitedView(this.$route)
          }
          break
        }
      }
    })
  }

  private refreshSelectedTag(view: ITagView) {
    TagsViewModule.delCachedView(view)
    const { fullPath } = view
    this.$nextTick(() => {
      this.$router
        .replace({
          path: '/redirect' + fullPath
        })
        .catch(err => {
          console.warn(err)
        })
    })
  }

  private closeSelectedTag(view: ITagView) {
    TagsViewModule.delView(view)
    if (this.isActive(view)) {
      this.toLastView(TagsViewModule.visitedViews, view)
    }
  }

  private closeOthersTags() {
    // if (
    //   this.selectedTag.fullPath !== this.$route.path &&
    //   this.selectedTag.fullPath !== undefined
    // ) {
    //   this.$router.push(this.selectedTag.fullPath).catch(err => {
    //     console.warn(err)
    //   })
    // }
    this.getSelectedTag()
    TagsViewModule.delOthersViews(this.selectedTag)
    this.moveToCurrentTag()
  }

  private closeAllTags(view: ITagView) {
    TagsViewModule.delAllViews()
    if (this.affixTags.some(tag => tag.path === this.$route.path)) {
      return
    }
    this.toLastView(TagsViewModule.visitedViews, view)
  }

  private closeLeftTags() {
    this.getSelectedTag()
    const arr = [] as ITagView[]
    const visitedViews = this.visitedViews
    let flag = true
    for (let i = 1; i < visitedViews.length && flag; i++) {
      if (this.selectedTag.fullPath === visitedViews[i].fullPath) {
        flag = false
      } else {
        arr.push(visitedViews[i])
      }
    }
    for (const item of arr) {
      this.closeSelectedTag(item)
    }
  }

  private closeRightTags() {
    this.getSelectedTag()
    const visitedViews = this.visitedViews
    let index = 0
    for (let i = 0; i < visitedViews.length; i++) {
      if (this.selectedTag.fullPath === visitedViews[i].fullPath) {
        index = i
      }
    }
    const arr = visitedViews.slice(index + 1)
    for (const item of arr) {
      this.closeSelectedTag(item)
    }
  }

  private toLastView(visitedViews: ITagView[], view: ITagView) {
    const latestView = visitedViews.slice(-1)[0]
    if (latestView !== undefined && latestView.fullPath !== undefined) {
      this.$router.push(latestView.fullPath).catch(err => {
        console.warn(err)
      })
    } else {
      // Default redirect to the home page if there is no tags-view, adjust it if you want
      if (view.name === 'Dashboard') {
        // to reload home page
        this.$router
          .replace({ path: '/redirect' + view.fullPath })
          .catch(err => {
            console.warn(err)
          })
      } else {
        this.$router.push('/').catch(err => {
          console.warn(err)
        })
      }
    }
  }

  private openMenu(tag: ITagView, e: MouseEvent) {
    const menuMinWidth = 105
    const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
    const offsetWidth = (this.$el as HTMLElement).offsetWidth // container width
    const maxLeft = offsetWidth - menuMinWidth // left boundary
    const left = e.clientX - offsetLeft + 15 // 15: margin right
    if (left > maxLeft) {
      this.left = maxLeft
    } else {
      this.left = left
    }
    this.top = e.clientY
    this.visible = true
    this.selectedTag = tag
  }

  private closeMenu() {
    this.visible = false
  }

  private handleCommand(type: string) {
    switch (type) {
      case 'all':
        this.closeAllTags(this.selectedTag)
        break
      case 'left':
        this.closeLeftTags()
        break
      case 'right':
        this.closeRightTags()
        break
      case 'other':
        this.closeOthersTags()
        break
    }
  }

  private getSelectedTag() {
    this.visitedViews.forEach(item => {
      if (item.fullPath === this.$route.path) {
        this.selectedTag = item
      }
    })
  }
}
</script>

<style lang="scss">
// Reset element css of el-icon-close
.tags-view-wrapper {
  width: calc(100% - 80px) !important;
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        display: inline-block;
        vertical-align: -3px;
        color: #887e7e;
      }
    }
  }
}
.el-dropdown-menu {
  .el-dropdown-menu__item {
    padding-left: 13px;
    padding-right: 19px;
    &:hover {
      background: #f5f1f1;
    }
    .tabImg {
      width: 16px;
      height: 16px;
      margin-right: 6px;
      vertical-align: sub;
    }
    .tabSpan {
      width: 52px;
      height: 18px;
      font-size: 13px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #332929;
      line-height: 18px;
    }
  }
}
</style>
<style lang="scss" scoped>
.tags-view-container {
  height: 64px;
  width: 100%;
  background: #f5f1f1;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .divDropDown {
    width: 36px;
    height: 36px;
    background: #ffffff;
    border-radius: 6px;
    position: absolute !important;
    right: 34px;
    top: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-dropdown {
      .el-dropdown-link {
        padding-left: 2px;
        .el-icon--right {
          margin-left: 0;
        }
      }
    }
  }

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 36px;
      background: #ffffff;
      border-radius: 6px;
      line-height: 36px;
      color: #b5abab;
      padding: 0 9px 0 15px;
      font-size: 13px;
      margin-left: 10px;
      margin-top: 14px;
      margin-bottom: 14px;
      font-weight: 400;
      font-family: PingFangSC, PingFangSC-Regular;

      &:first-of-type {
        margin-left: 30px;
      }
      &:first-child {
        padding: 0 15px 0 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        color: #ffb200;
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
