import { getStorage } from '@/utils/storage';
// 菜单列表
export const menuList = getStorage('menuList') || [
  {
    id: 100,
    path: '/home',
    title: '首页',
    icon: 'home',
    isHidden: false,
    children: [],
    parentId: 0,
  },
  {
    id: 101,
    path: '/about',
    title: '关于我们',
    icon: 'about',
    isHidden: false,
    children: [],
    parentId: 0,
  },
  {
    id: 102,
    path: '/table',
    title: 'Table表格',
    icon: 'table',
    children: [],
    isHidden: false,
    parentId: 0,
  },
  {
    id: 103,
    path: '/power',
    title: '权限管理',
    icon: 'power',
    isHidden: false,
    parentId: 0,
    children: [
      {
        id: 104,
        path: '/power/userManage',
        title: '用户管理',
        icon: '',
        children: [],
        isHidden: false,
        parentId: 103,
      },
      {
        id: 105,
        path: '/power/menuManage',
        title: '菜单管理',
        icon: '',
        children: [],
        isHidden: false,
        parentId: 103,
      },
      {
        id: 106,
        path: '/power/roleManage',
        title: '角色管理',
        icon: '',
        children: [],
        isHidden: false,
        parentId: 103,
      },
    ],
  },
];

const getMenuList = {
  url: '/menu/list',
  type: 'get',
  response: () => ({
    result: true,
    code: 200,
    data: {
      list: menuList,
    },
  }),
};

// const editMenu = {
//   url: '/menu/edit',
//   type: 'post',
//   response: (config) => {
//     const newList = deleteMenuList(menuList, config.body);
//     if (config.body.parentId === 0) {
//       const menu = {
//         id: Date.now(),
//         ...config.body,
//       };
//       newList.unshift(menu);
//       setStorage('menuList', newList);
//       menuList = newList;
//       return {
//         result: true,
//         code: 200,
//         data: {
//           message: '编辑成功',
//         },
//       };
//     }
//     const newMenuList = addMenuList(newList, config.body);
//     if (newMenuList.length > 0) {
//       setStorage('menuList', newMenuList);
//       menuList = newMenuList;
//       return {
//         result: true,
//         code: 200,
//         data: {
//           message: '编辑成功',
//         },
//       };
//     }
//     return {
//       result: false,
//       code: 400,
//       data: {
//         message: '编辑错误',
//       },
//       message: '编辑错误',
//     };
//   },
// };
// const addMenu = {
//   url: '/menu/add',
//   type: 'post',
//   response: (config) => {
//     const menu = {
//       id: Date.now(),
//       ...config.body,
//     };
//     if (config.body.parentId === 0) {
//       menuList.unshift(menu);
//       setStorage('menuList', menuList);
//       return {
//         result: true,
//         code: 200,
//         data: {
//           message: '新增成功',
//         },
//       };
//     }
//     const newMenuList = addMenuList(menuList, config.body);
//     if (newMenuList.length > 0) {
//       setStorage('menuList', newMenuList);
//       menuList = newMenuList;
//       return {
//         result: true,
//         code: 200,
//         data: {
//           message: '新增成功',
//         },
//       };
//     }
//     return {
//       result: false,
//       code: 400,
//       data: {
//         message: '新增错误',
//       },
//       message: '新增错误',
//     };
//   },
// };
// const deleteMenu = {
//   url: '/menu/delete',
//   type: 'post',
//   response: (config) => {
//     const newMenuList = deleteMenuList(menuList, config.body);
//     if (newMenuList.length > 0) {
//       setStorage('menuList', newMenuList);
//       menuList = newMenuList;
//       return {
//         result: true,
//         code: 200,
//         data: {
//           message: '删除成功',
//         },
//       };
//     }
//     return {
//       result: false,
//       code: 400,
//       data: {
//         message: '删除错误',
//       },
//       message: '删除错误',
//     };
//   },
// };
export default [getMenuList];

// // 添加菜单
// function addMenuList(menuLists, menu) {
//   const menus = [];
//   menuLists.forEach((item) => {
//     const newMenu = { ...item };
//     if (item.id === menu.parentId) {
//       if (!menu.id) {
//         menu.id = Date.now();
//       }
//       (newMenu.children).push(menu);
//     } else if (item.children && item.children.length) {
//       newMenu.children = addMenuList(item.children, menu);
//     }
//     menus.push(newMenu);
//   });
//   return menus;
// }
// // 删除菜单
// function deleteMenuList(menuLists, menu) {
//   const menus = [];
//   menuLists.forEach((item) => {
//     let newMenu = { ...item };
//     if (item.id === menu.id) {
//       newMenu = menu;
//     } else {
//       if (item.children && item.children.length) {
//         newMenu.children = deleteMenuList(item.children, menu);
//       }
//       menus.push(newMenu);
//     }
//   });
//   return menus;
// }
