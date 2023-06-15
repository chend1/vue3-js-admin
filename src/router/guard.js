import { useMainStore } from '@/store';
import router from './index';
// 未授权时可访问的白名单
const whiteList = ['/login'];
router.beforeEach(async (to, from, next) => {
  const baseStore = useMainStore();
  const { token, menuList } = baseStore;
  if (token) {
    console.log(333);
    if (whiteList.indexOf(to.path) !== -1) {
      next('/');
    } else if (menuList && menuList.length) {
      next();
    } else {
      await baseStore.setUserInfo();
      console.log(123);
      // 第一次进入页面，addRoute刚添加路由未生效，需要重进一次
      next({ ...to, replace: true });
    }
  } else if (whiteList.includes(to.path)) {
    next();
  } else {
    next('/login');
  }
});
