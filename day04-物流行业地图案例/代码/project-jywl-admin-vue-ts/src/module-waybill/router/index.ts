import Layout from '@/layout/index.vue'
export default [
  {
    path: '/list',
    component: Layout,
    redirect: 'noredirect',

    children: [
      {
        path: 'list',
        component: () =>
          import(
            /* webpackChunkName: "list" */ '@/module-waybill/pages/index.vue'
          ),
        name: 'waybill',
        meta: {
          title: '运单管理',
          icon: 'base'
        }
      },
      {
        path: 'list/details/:id',
        component: () =>
          import(
            /* webpackChunkName: "list" */ '@/module-waybill/pages/detail.vue'
          ),
        name: 'waybillAdd',
        meta: {
          title: '新增盘点单',
          hidden: true,
          activeMenu: '/list/list'
        }
      }
    ]
  }
]
