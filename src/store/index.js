import { defineStore } from 'pinia';
import { getUserInfo } from '@/api';
import { getStorage, setStorage, removeStorage } from '@/utils/storage';
import { asyncRoutes } from '@/router/asyncRoutes';
import router, { resetRouter } from '@/router';
import { generateRoutes } from './permission';

export const useMainStore = defineStore('main', {
  state: () => ({
    token: getStorage('token') || '',
    userInfo: {},
    menuList: [],
  }),
  actions: {
    setToken(token) {
      setStorage('token', token);
      this.token = token;
    },
    async setUserInfo() {
      const res = await getUserInfo({ token: this.token });
      this.userInfo = res.userInfo;
      const { accessibleRoutes, menuList } = await generateRoutes(asyncRoutes, res.menu);
      console.log(accessibleRoutes, menuList);
      this.menuList = menuList;
      accessibleRoutes.forEach((route) => {
        router.addRoute(route);
      });
      // 必须最后加上404跳转路由，不然刷新会直接跳转404
      router.addRoute({ path: '/:pathMatch(.*)', redirect: '/404' });
    },
    logOut() {
      removeStorage('token');
      this.token = '';
      this.userInfo = {};
      this.menuList = [];
      resetRouter();
      router.push('/login');
    },
  },
  getters: {

  },
});
