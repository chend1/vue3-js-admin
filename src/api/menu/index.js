import request from '../request';
// 获取菜单列表
export const menuList = (params) => request.get('/menu/list', { params });

// 修改菜单信息
export const editMenu = (data) => request.post('/menu/edit', data);

// 新增菜单
export const addMenu = (data) => request.post('/menu/add', data);

// 删除菜单
export const deleteMenu = (data) => request.post('/menu/delete', data);
