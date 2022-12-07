import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from './store/modules/permission'
NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

const roles: string[] = []
PermissionModule.GenerateRoutes(roles)
router.addRoutes(PermissionModule.dynamicRoutes)
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  // if (UserModule.token) {
  //   next()
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     next(`/login?redirect=${to.path}`)
  //   }
  // }
})

router.afterEach((to: Route) => {
  NProgress.done()
  document.title = (to.meta as any).title
})
