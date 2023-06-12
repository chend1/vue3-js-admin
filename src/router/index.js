import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    meta: { title: '登录' },
  },
  {
    path: '/home',
    component: () => import('@/views/home/home.vue'),
    meta: { title: '首页' },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
