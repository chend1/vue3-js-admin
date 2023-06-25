<script setup>
import { reactive, ref } from 'vue';
import useUserData from './useUserData';
import useRoleData from '../roleManage/useRoleData';

const { roleData, getRoleList, getRoleName } = useRoleData();
getRoleList({ page: 1, size: 100 });
const {
  userData,
  total,
  getUserList,
  addUserClick,
  editUserClick,
  deleteUserClick,
} = useUserData();
// 搜索信息
const searchInfo = reactive({
  page: 1,
  size: 10,
  keyword: '',
});
getUserList(searchInfo);
// 用户信息
const userInfo = ref({
  status: 1,
});
// 弹窗信息
const dialogVisible = ref(false);
const isAdd = ref(false);
// 新增用户
const handleAddUser = () => {
  isAdd.value = true;
  dialogVisible.value = true;
};

// 修改用户
const handleEditUser = (row) => {
  isAdd.value = false;
  dialogVisible.value = true;
  userInfo.value = { ...row };
};

// 删除用户
const handleDeleteUser = () => {
  deleteUserClick({ id: userInfo.value.id });
};
// 弹窗确认事件
const formRef = ref();
const confirmClick = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (isAdd.value) {
        addUserClick(userInfo.value);
      } else {
        editUserClick(userInfo.value);
      }
      dialogVisible.value = false;
    }
  });
};
// 弹窗关闭事件
const handleClose = () => {
  userInfo.value = { status: 1 };
  formRef.value && formRef.value.resetFields();
};

const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
  ],
  account: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur',
    },
  ],
  role: [
    {
      required: true,
      message: '请选择角色',
      trigger: 'change',
    },
  ],
};
</script>

<template>
  <div class="user-manage">
    <div class="add-user">
      <el-button
        type="primary"
        @click="handleAddUser"
      >
        添加账号
      </el-button>
    </div>
    <div class="table">
      <el-table
        :data="userData"
        border
        :header-cell-style="{ 'background-color': '#DDE2EE' }"
        align="center"
        height="100%"
      >
        <el-table-column
          prop="name"
          label="用户名"
          min-width="80"
          align="center"
        />
        <el-table-column
          prop="account"
          label="账号"
          align="center"
        />
        <el-table-column
          prop="role"
          label="角色"
          align="center"
        >
          <template #default="scope">
            {{ getRoleName(scope.row.role) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="center"
        />
        <el-table-column
          prop="principal"
          label="状态"
          align="center"
        >
          <template #default="scope">
            {{ scope.row.status === 1 ? '启用' : '禁用' }}
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="操作"
          min-width="140"
          align="center"
        >
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleEditUser(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDeleteUser(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      v-if="total > 0"
      class="paging"
    >
      <el-pagination
        v-model:current-page="searchInfo.page"
        v-model:page-size="searchInfo.length"
        background
        layout="total, sizes, prev, pager, next"
        :page-sizes="[5, 10, 15, 20]"
        :total="total"
        @size-change="getUserList(searchInfo)"
        @current-change="getUserList(searchInfo)"
      />
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="isAdd ? '添加账号' : '修改账号'"
    width="650px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div class="form">
      <el-form
        ref="formRef"
        :model="userInfo"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item
          label="用户名"
          prop="name"
        >
          <el-input v-model="userInfo.name" />
        </el-form-item>
        <el-form-item
          label="账号"
          prop="account"
        >
          <el-input v-model="userInfo.account" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="userInfo.password"
            type="password"
            placeholder="不填写则使用默认密码123456"
          />
        </el-form-item>
        <el-form-item
          label="角色"
          prop="role"
        >
          <el-select v-model="userInfo.role">
            <el-option
              v-for="item in roleData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="userInfo.status">
            <el-radio :label="1">
              启用
            </el-radio>
            <el-radio :label="0">
              禁用
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="confirmClick"
        > 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="less">
.user-manage {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  .add-user {
    margin: 10px 0;
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;
  }
  .table {
    width: 100%;
    flex: 1;
    box-sizing: border-box;
    padding: 0 10px;
  }
  .paging {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
}
</style>
