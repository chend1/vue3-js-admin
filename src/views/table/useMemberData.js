import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  memberList, editMember, addMember, deleteMember,
} from '@/api';

export default function useMemberData() {
  const memberData = ref([]);
  const total = ref(0);
  let searchInfo = {};
  // 获取成员列表
  const getMemberList = async (params, callback) => {
    searchInfo = params;
    const res = await memberList(params);
    memberData.value = res.list;
    total.value = res.count;
    callback && callback();
  };
  // 新增成员
  const addMemberClick = async (params) => {
    try {
      await addMember(params);
      getMemberList(searchInfo);
      ElMessage({
        type: 'success',
        message: '新增成功',
      });
    } catch (err) {
      console.error(err);
    }
  };
  // 修改成员
  const editMemberClick = async (params) => {
    try {
      await editMember(params);
      getMemberList(searchInfo);
      ElMessage({
        type: 'success',
        message: '修改成功',
      });
    } catch (err) {
      console.error(err);
    }
  };
  // 删除成员
  const deleteMemberClick = (params) => {
    ElMessageBox.confirm('确认删除该成员吗？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        try {
          await deleteMember(params);
          getMemberList(searchInfo);
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
    memberData,
    total,
    getMemberList,
    addMemberClick,
    editMemberClick,
    deleteMemberClick,
  };
}
