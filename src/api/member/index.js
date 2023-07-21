import request from '../request';
// 获取成员列表
export const memberList = (params) => request.get('/member/list', { params });

// 修改成员信息
export const editMember = (data) => request.post('/member/edit', data);

// 新增成员信息
export const addMember = (data) => request.post('/member/add', data);

// 删除成员信息
export const deleteMember = (data) => request.post('/member/delete', data);
