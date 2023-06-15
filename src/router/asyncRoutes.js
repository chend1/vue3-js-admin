export const asyncRoutes = [
  {
    path: '/home',
    component: () => import('@/views/home/home.vue'),
    name: 'home',
    meta: { title: '首页', isLayout: true },
  },
  {
    path: '/power',
    redirect: '/power/userManage',
    meta: { title: '权限管理', isLayout: true },
    name: 'power',
    children: [
      {
        path: '/power/userManage',
        component: () => import('@/views/power/userManage/userManage.vue'),
        meta: { title: '账号管理', isLayout: true },
        name: 'userManage',
      },
      {
        path: '/power/roleManage',
        component: () => import('@/views/power/roleManage/roleManage.vue'),
        meta: { title: '角色管理', isLayout: true },
        name: 'roleManage',
      },
      {
        path: '/power/menuManage',
        component: () => import('@/views/power/menuManage/menuManage.vue'),
        meta: { title: '菜单管理', isLayout: true },
        name: 'menuManage',
      },
    ],
  },
];
