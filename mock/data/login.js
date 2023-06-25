import { Random } from 'mockjs';
import { accountList } from './account';
import { roleList } from './role';
import { modifyMenuList } from './menu';

const login = {
  url: '/login',
  type: 'post',
  response: (config) => {
    const userInfo = accountList.filter(
      (user) => config.body.account === user.account,
    );
    const token = JSON.stringify(userInfo[0]);
    if (userInfo.length <= 0) {
      return {
        result: false,
        code: 400,
        data: {},
        message: '账号或密码错误，请重试！',
      };
    }
    if (
      config.body.account === userInfo[0].account
      && config.body.password === userInfo[0].password
    ) {
      if (userInfo[0].status !== 1) {
        return {
          result: false,
          code: 401,
          data: {},
          message: '账号已被禁用，请联系管理员！',
        };
      }
      return {
        result: true,
        code: 200,
        data: {
          token,
        },
      };
    }
    return {
      result: false,
      code: 400,
      data: {},
      message: '账号或密码错误，请重新登录！',
    };
  },
};
const getUserInfo = {
  url: '/user/info',
  type: 'post',
  response: (config) => {
    const { token } = config.body;
    try {
      const tokenInfo = JSON.parse(token);
      const userInfo = accountList.filter(
        (user) => user.account === tokenInfo.account,
      )[0];
      const roleInfo = roleList.filter((role) => role.id === userInfo.role);
      const ids = roleInfo[0].menuList;
      const menuList = modifyMenuList();
      return {
        result: true,
        code: 200,
        data: {
          userInfo: { ...userInfo, avatar: Random.image('100x100') },
          menu: getMyMenuList(ids, menuList),
        },
      };
    } catch {
      return {
        result: false,
        code: 400,
        data: {},
        message: '无效token，请重新登录！',
      };
    }
  },
};
export default [login, getUserInfo];

// 根据id获取菜单
function getMyMenuList(ids, menuInfo) {
  const menus = [];
  menuInfo.forEach((item) => {
    if (ids.indexOf(item.id) !== -1) {
      const menu = { ...item };
      menu.children = [];
      menus.push(menu);
      if (item.children && item.children.length) {
        menu.children = getMyMenuList(ids, item.children);
      }
    }
  });
  return menus;
}
