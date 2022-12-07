import Router from '@/router'
import RouteConfig from './router'
export default class MoudleStorageOut {
  public static install(router: typeof Router): void {
    router.addRoutes(RouteConfig)
    if (Array.isArray(router.options.routes)) {
      router.options.routes.push(RouteConfig[0])
    }
  }
}
