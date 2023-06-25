import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  roleList, editRole, addRole, deleteRole,
} from '@/api';

export default function useRoleData() {
  const roleData = ref([]);
  const total = ref(0);
  let searchInfo = {};
  // 获取角色列表
  const getRoleList = async (params, callback) => {
    searchInfo = params;
    const res = await roleList(params);
    console.log(res);
    roleData.value = res.list;
    total.value = res.count;
    callback && callback();
  };
  // 新增角色
  const addRoleClick = async (params) => {
    try {
      await addRole(params);
      getRoleList(searchInfo);
      ElMessage({
        type: 'success',
        message: '新增成功',
      });
    } catch (err) {
      console.error(err);
    }
  };
  // 修改角色
  const editRoleClick = async (params) => {
    try {
      await editRole(params);
      getRoleList(searchInfo);
      ElMessage({
        type: 'success',
        message: '修改成功',
      });
    } catch (err) {
      console.error(err);
    }
  };
  // 删除角色
  const deleteRoleClick = (params) => {
    ElMessageBox.confirm('确认删除该角色吗？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        try {
          await deleteRole(params);
          getRoleList(searchInfo);
          ElMessage({
            type: 'success',
            message: '删除成功',
          });
        } catch (err) {
          console.error(err);
        }
      })
      .catch(() => {});
  };
  // 获取角色名称
  const getRoleName = (id) => {
    const list = roleData.value.filter((item) => item.id === id);
    return list[0] && list[0].name;
  };
  return {
    roleData,
    total,
    getRoleList,
    addRoleClick,
    editRoleClick,
    deleteRoleClick,
    getRoleName,
  };
}
