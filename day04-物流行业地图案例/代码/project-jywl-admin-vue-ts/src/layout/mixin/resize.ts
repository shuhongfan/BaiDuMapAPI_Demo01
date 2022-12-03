import { Component, Vue, Watch } from 'vue-property-decorator'
import { AppModule, DeviceType } from '@/store/modules/app'

const WIDTH = 992 // refer to Bootstrap's responsive design

@Component({
  name: 'ResizeMixin'
})
export default class extends Vue {
  get device() {
    return AppModule.device
  }

  get sidebar() {
    return AppModule.sidebar
  }

  @Watch('$route')
  private onRouteChange() {
    if (this.device === DeviceType.Mobile && this.sidebar.opened) {
      AppModule.CloseSideBar(false)
    }
  }

  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      AppModule.ToggleDevice(DeviceType.Mobile)
      AppModule.CloseSideBar(true)
    }
  }

  private isMobile() {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }
}
