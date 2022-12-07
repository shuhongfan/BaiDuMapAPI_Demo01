import Vue from 'vue'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'
import '@/styles/element-variables.scss'
import 'element-ui/lib/theme-chalk/icon.css'
import '@/styles/index.scss'
import '@/scss/element-ui/el-select.scss'
import '@/scss/element-ui/el-input.scss'
import '@/scss/element-ui/el-form.scss'
import '@/scss/element-ui/el-step.scss'
import '@/assets/iconfont/iconfont.css'
import '@/scss/element-ui/el-date.scss'
import '@/scss/element-ui/el-dialog.scss'
import App from '@/App.vue'
import store from '@/store'
import BaiduMap from 'vue-baidu-map'
import { AppModule } from '@/store/modules/app'
import router from '@/router'
import i18n from '@/lang'
import '@/icons/components'
import '@/permission'
// import '@/pwa/register-service-worker'
// import ModuleBase from './module-base'
// import ModuleOrder from '@/module-order'
// import ModuleWaybill from '@/module-waybill'
// import ModuleElectronicFence from '@/module-electronic-fence'
// import ModuleVehicle from '@/module-vehicle'

// 修改 el-dialog 默认点击遮照为不关闭
const el: any = ElementUI
el.Dialog.props.closeOnClickModal.default = false
Vue.use(ElementUI, {
  size: AppModule.size // Set element-ui default size
})
Vue.use(BaiduMap, {
  ak: 'sjQA15v6qSwWSwg0Lv5ClVoAhvMGCkUR'
})

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '20px',
  defaultHeight: '20px'
})

Vue.config.productionTip = false
// ModuleBase.install(router)
// ModuleOrder.install(router)
// ModuleWaybill.install(router)
// ModuleElectronicFence.install(router)
// ModuleVehicle.install(router)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
