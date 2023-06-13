import { getStorage } from '@/utils/storage';

// 账号列表
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
