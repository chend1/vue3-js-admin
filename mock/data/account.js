import { getStorage } from '@/utils/storage';

// 账号列表
export const accountList = getStorage('accountList') || [
  {
    id: 1,
    name: 'admin',
    sex: 1,
    account: 'admin',
    password: '123456',
    create_time: '2022-10-26 10:10:10',
    status: 1,
    role: 1,
  },
  {
    id: 2,
    name: 'user',
    sex: 1,
    account: 'user',
    password: '123456',
    create_time: '2022-10-26 10:10:10',
    status: 1,
    role: 2,
  },
];
