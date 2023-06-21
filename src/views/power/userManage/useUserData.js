import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  userList, editUser, addUser, deleteUser,
} from '@/api';

export default function useUserData() {
  const userData = ref([]);
  const total = ref(0);
  let searchInfo = {};
  // 获取账号列表
  const getUserList = async (params, callback) => {
    searchInfo = params;
    const res = await userList(params);
    userData.value = res.list;
    total.value = res.count;
    callback && callback();
  };
  // 新增账号
  const addUserClick = async (params) => {
    try {
      await addUser(params);
      getUserList(searchInfo);
      ElMessage({
        type: 'success',
        message: '新增成功',
      });
    } catch (err) {
      console.error(err);
    }
  };
  // 修改账号
  const editUserClick = async (params) => {
    try {
      await editUser(params);
      getUserList(searchInfo);
      ElMessage({
        type: 'success',
        message: '修改成功',
      });
    } catch (err) {
      console.error(err);
    }
  };
  // 删除账号
  const deleteUserClick = (params) => {
    ElMessageBox.confirm('确认删除该账号吗？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        try {
          await deleteUser(params);
          getUserList(searchInfo);
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
  return {
    userData,
    total,
    getUserList,
    addUserClick,
    editUserClick,
    deleteUserClick,
  };
}
