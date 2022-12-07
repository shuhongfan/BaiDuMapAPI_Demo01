import Layout from '@/layout/index.vue'
export default [
  {
    path: '/manage-vehicle',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () =>
          import(
            /* webpackChunkName: "list" */ '@/module-vehicle/pages/index.vue'
          ),
        name: 'CheckList',
        meta: {
          title: '车辆管理',
          icon: 'base'
        }
      },
      {
        path: 'list/details/:id',
        component: () =>
          import(
            /* webpackChunkName: "list" */ '@/module-vehicle/pages/index.vue'
          ),
        name: 'CheckListAdd',
        meta: {
          title: '新增盘点单',
          hidden: true
        }
      }
    ]
  }
]
