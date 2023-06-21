import request from '../request';
// 获取角色列表
export const roleList = (params) => request.get('/role/list', { params });

// 修改角色信息
export const editRole = (data) => request.post('/role/edit', data);

// 新增角色
export const addRole = (data) => request.post('/role/add', data);

// 删除角色
export const deleteRole = (data) => request.post('/role/delete', data);
