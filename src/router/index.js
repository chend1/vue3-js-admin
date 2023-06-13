import { createRouter, createWebHashHistory } from 'vue-router';
import { useMainStore } from '@/store';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    meta: { title: '登录', isHiddenLayout: true },
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
// 未授权时可访问的白名单
const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  const baseStore = useMainStore();
  const { token } = baseStore;
  if (token) {
    if (whiteList.indexOf(to.path) !== -1) {
      next('/');
    } else {
      next();
    }
  } else if (whiteList.includes(to.path)) {
    next();
  } else {
    next('/login');
  }
});

export default router;
