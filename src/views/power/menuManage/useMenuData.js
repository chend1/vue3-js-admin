import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  menuList, editMenu, addMenu, deleteMenu,
} from '@/api';
import { flatArray } from '@/utils';

export default function useMenuData() {
  const menuData = ref([]);
  const menuOptions = ref([]);
  let searchInfo = {};
  // 获取菜单列表
  const getMenuList = async (params, callback) => {
    searchInfo = params;
    const res = await menuList(params);
    // 一维菜单列表
    menuOptions.value = flatArray(res.list);
    menuOptions.value.unshift({ id: 0, title: '暂无' });
    menuData.value = res.list;
    callback && callback();
  };

  // 新增菜单
  const addMenuClick = async (params) => {
    try {
      await addMenu(params);
      getMenuList(searchInfo);
      ElMessage({
        type: 'success',
        message: '新增成功',
      });
    } catch (err) {
      console.error(err);
    }
  };
  // 修改菜单
  const editMenuClick = async (params) => {
    try {
      await editMenu(params);
      getMenuList(searchInfo);
      ElMessage({
        type: 'success',
        message: '修改成功',
      });
    } catch (err) {
      console.error(err);
    }
  };
  // 删除菜单
  const deleteMenuClick = (params) => {
    ElMessageBox.confirm('确认删除该菜单吗？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        try {
          await deleteMenu(params);
          getMenuList(searchInfo);
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
    menuData,
    menuOptions,
    getMenuList,
    addMenuClick,
    editMenuClick,
    deleteMenuClick,
  };
}
