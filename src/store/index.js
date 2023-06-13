import { defineStore } from 'pinia';
import { getUserInfo } from '@/api';
import { getStorage, setStorage, removeStorage } from '@/utils/storage';

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
      this.menuList = res.menu;
    },
    logOut() {
      removeStorage('token');
      this.token = '';
      this.userInfo = {};
      this.menuList = [];
    },
  },
  getters: {

  },
});
