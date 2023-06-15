import { createRouter, createWebHashHistory } from 'vue-router';
import { asyncRoutes } from './asyncRoutes';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: { title: '登录', isHiddenLayout: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 重置路由
export const resetRouter = () => {
  const asyncRoutesName = asyncRoutes.map((item) => item.name);
  asyncRoutesName.forEach((name) => {
    console.log(name, router.hasRoute(name));
    if (router.hasRoute(name)) {
      router.removeRoute(name);
    }
  });
};
export default router;
