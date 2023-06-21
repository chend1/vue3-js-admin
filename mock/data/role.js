import { getStorage } from '@/utils/storage';

// 角色列表
export const roleList = getStorage('roleList') || [
  {
    id: 1,
    name: '管理员',
    status: 1,
    menuList: [100, 101, 102, 103, 104, 105, 106, 107],
    create_time: '2022-10-26 10:10:10',
  },
  {
    id: 2,
    name: '普通用户',
    status: 1,
    menuList: [100, 101, 102, 103, 104, 105, 106, 107],
    create_time: '2022-10-26 10:10:10',
  },
];

const getRoleList = {
  url: '/role/list',
  type: 'get',
  response: (config) => {
    let list = [];
    const { page, size, keyword } = config.query;
    const searchList = roleList.filter(
      (item) => item.name.indexOf(keyword || '') !== -1
        || item.name.indexOf(keyword || '') !== -1,
    );
    list = searchList.slice((page - 1) * size, page * size);
    return {
      result: true,
      code: 200,
      data: {
        count: roleList.length,
        list,
      },
    };
  },
};

export default [getRoleList];
