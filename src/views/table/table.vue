<script setup>
import { reactive, ref } from 'vue';
import useMemberData from './useMemberData';

const {
  memberData,
  total,
  getMemberList,
  addMemberClick,
  editMemberClick,
  deleteMemberClick,
} = useMemberData();
// 搜索信息
const searchInfo = reactive({
  page: 1,
  size: 10,
  keyword: '',
});
getMemberList(searchInfo);
// 成员信息
const memberInfo = ref({
  status: 1,
});
// 弹窗信息
const dialogVisible = ref(false);
const isAdd = ref(false);
// 新增成员
const handleAddMember = () => {
  isAdd.value = true;
  dialogVisible.value = true;
};

// 修改成员
const handleEditMember = (row) => {
  isAdd.value = false;
  dialogVisible.value = true;
  memberInfo.value = { ...row };
};

// 删除成员
const handleDeleteMember = () => {
  deleteMemberClick({ id: memberInfo.value.id });
};
// 弹窗确认事件
const formRef = ref();
const confirmClick = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (isAdd.value) {
        addMemberClick(memberInfo.value);
      } else {
        editMemberClick(memberInfo.value);
      }
      dialogVisible.value = false;
    }
  });
};
// 弹窗关闭事件
const handleClose = () => {
  memberInfo.value = { status: 1 };
  formRef.value && formRef.value.resetFields();
};

const rules = {
  name: [
    {
      required: true,
      message: '请输入成员名',
      trigger: 'blur',
    },
  ],
};
</script>

<template>
  <div class="member-manage">
    <div class="add-member">
      <el-button
        type="primary"
        @click="handleAddMember"
      >
        添加成员
      </el-button>
    </div>
    <div class="table">
      <el-table
        :data="memberData"
        border
        :header-cell-style="{ 'background-color': '#DDE2EE' }"
        align="center"
        height="100%"
      >
        <el-table-column
          prop="name"
          label="名称"
          min-width="80"
          align="center"
        />
        <el-table-column
          prop="sex"
          label="性别"
          align="center"
        >
          <template #default="scope">
            {{ ['', '男', '女'][scope.row.sex] }}
          </template>
        </el-table-column>
        <el-table-column
          prop="position"
          label="职位"
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
              @click="handleEditMember(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDeleteMember(scope.row)"
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
        v-model:page-size="searchInfo.size"
        background
        layout="total, sizes, prev, pager, next"
        :page-sizes="[5, 10, 15, 20]"
        :total="total"
        @size-change="getMemberList(searchInfo)"
        @current-change="getMemberList(searchInfo)"
      />
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="isAdd ? '添加成员' : '修改成员'"
    width="650px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div class="form">
      <el-form
        ref="formRef"
        :model="memberInfo"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item
          label="名称"
          prop="name"
        >
          <el-input v-model="memberInfo.name" />
        </el-form-item>
        <el-form-item
          label="性别"
          prop="sex"
        >
          <el-select v-model="memberInfo.sex">
            <el-option
              label="男"
              :value="1"
            ></el-option>
            <el-option
              label="女"
              :value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="职位"
          prop="position"
        >
          <el-input v-model="memberInfo.position" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="memberInfo.status">
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
.member-manage {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .add-member {
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
    overflow: hidden;
  }

  .paging {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
}
</style>
