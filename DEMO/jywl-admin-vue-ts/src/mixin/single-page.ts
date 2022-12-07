import { Component, Vue } from 'vue-property-decorator'
import { TagsViewModule } from '@/store/modules/tags-view'

@Component({
  name: 'SinglePage'
})
export default class extends Vue {
  // 关闭窗口
  public closeWindow() {
    TagsViewModule.delView(this.$router.currentRoute)
    this.$router.go(-1)
  }

  // 演示系统提示
  public confirmMsg() {
    if (process.env.NODE_ENV === 'production') {
      const message = '演示系统，不支持此操作'
      this.$notify.info({
        title: '提示',
        message: message
      })
      return true
    }
    return false
  }
}
