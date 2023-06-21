<script setup>
import { reactive, ref } from 'vue';
import useRoleData from './useRoleData';

const {
  roleData,
  total,
  getRoleList,
  addRoleClick,
  editRoleClick,
  deleteRoleClick,
} = useRoleData();
// 搜索信息
const searchInfo = reactive({
  page: 1,
  size: 10,
  keyword: '',
});
getRoleList(searchInfo);
// 角色信息
const roleInfo = ref({});
// 弹窗信息
const dialogVisible = ref(false);
const isAdd = ref(false);
// 新增角色
const handleAddRole = () => {
  isAdd.value = true;
  dialogVisible.value = true;
};

// 修改角色
const handleEditRole = (row) => {
  isAdd.value = false;
  dialogVisible.value = true;
  roleInfo.value = { ...row };
};

// 删除角色
const handleDeleteRole = () => {
  deleteRoleClick({ id: roleInfo.value.id });
};
// 弹窗确认事件
const confirmClick = () => {
  if (isAdd.value) {
    addRoleClick(roleInfo.value);
  } else {
    editRoleClick(roleInfo.value);
  }
};
// 弹窗关闭事件
const handleClose = () => {
  roleInfo.value = {};
};
</script>

<template>
  <div class="role-manage">
    <div class="add-role">
      <el-button
        type="primary"
        @click="handleAddRole"
      >
        添加角色
      </el-button>
    </div>
    <div class="table">
      <el-table
        :data="roleData"
        border
        :header-cell-style="{ 'background-color': '#DDE2EE' }"
        align="center"
        height="100%"
      >
        <el-table-column
          prop="name"
          label="角色名"
          min-width="80"
          align="center"
        />
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
              @click="handleEditRole(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDeleteRole(scope.row)"
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
        @size-change="getRoleList(searchInfo)"
        @current-change="getRoleList(searchInfo)"
      />
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="isAdd ? '添加角色' : '修改角色'"
    width="650px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div class="form">
      <el-form
        :model="roleInfo"
        label-width="120px"
      >
        <el-form-item label="角色名">
          <el-input v-model="roleInfo.name" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="roleInfo.status">
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
.role-manage {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  .add-role {
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
