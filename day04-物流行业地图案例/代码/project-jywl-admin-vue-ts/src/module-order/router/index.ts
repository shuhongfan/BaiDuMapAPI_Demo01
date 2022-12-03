import Layout from '@/layout/index.vue'
export default [
  {
    path: '/',
    component: Layout,
    redirect: 'order',
    children: [
      {
        path: 'order',
        component: () =>
          import(
            /* webpackChunkName: "warehouse" */ '@/module-order/pages/index.vue'
          ),
        name: 'order',
        meta: {
          title: '订单管理',
          icon: 'base'
        }
      },
      {
        path: 'order/details/:id',
        component: () =>
          import(
            /* webpackChunkName: "warehouse" */ '@/module-order/pages/detail.vue'
          ),
        name: 'details',
        meta: {
          title: '详情',
          activeMenu: '/order',
          hidden: true
        }
      }
    ]
  }
]
