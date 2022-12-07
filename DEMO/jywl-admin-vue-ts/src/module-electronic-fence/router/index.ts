import Layout from '@/layout/index.vue'
export default [
  {
    path: '/manage-electronic',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'list',
        component: () =>
          import(
            /* webpackChunkName: "list" */ '@/module-electronic-fence/pages/index.vue'
          ),
        name: 'CheckList',
        meta: {
          title: '电子围栏管理',
          icon: 'base'
        }
      },
      {
        path: 'list/details/:id',
        component: () =>
          import(
            /* webpackChunkName: "list" */ '@/module-electronic-fence/pages/index.vue'
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
