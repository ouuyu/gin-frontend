<template>
  <div>
    <el-card>
      <template #header>
        <div class="flex justify-between items-center">
          <span>用户管理</span>
          <el-button text bg type="primary" @click="handleAdd">添加用户</el-button>
        </div>
      </template>

      <el-table :data="userList" v-loading="loading">
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="role" label="角色">
          <template #default="{ row }">
            {{ row.role === 100 ? '管理员' : '普通用户' }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '正常' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <user-edit-drawer
        v-model:visible="showEdit"
        :user-id="currentUser.id"
        :user-data="currentUser"
        @success="handleEditSuccess"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getUserList, deleteUser } from '@/services/user';
import UserEditDrawer from '@/components/manage/UserEditDrawer.vue';

interface User {
  id: number;
  username: string;
  email: string;
  role: number;
  status: number;
  password?: string;
}

const loading = ref(false);
const userList = ref<User[]>([]);
const showEdit = ref(false);
const currentUser = ref<User>({
  id: 0,
  username: '',
  email: '',
  role: 1,
  status: 1,
  password: ''
});

const loadUserList = async () => {
  loading.value = true;
  try {
    const res = await getUserList(1, 100);
    userList.value = res.list || [];
  } catch (error: any) {
    ElMessage.error(error.message);
  } finally {
    loading.value = false;
  }
};

const handleAdd = () => {
  currentUser.value = {
    id: 0,
    username: '',
    email: '',
    role: 1,
    status: 1,
    password: ''
  };
  showEdit.value = true;
};

const handleEdit = (row: User) => {
  currentUser.value = { ...row };
  showEdit.value = true;
};

const handleEditSuccess = () => {
  loadUserList();
};

const handleDelete = async (row: User) => {
  try {
    await ElMessageBox.confirm('确定要删除该用户吗？', '提示', {
      type: 'warning'
    });
    await deleteUser(row.id);
    ElMessage.success('删除成功');
    loadUserList();
  } catch (error: any) {
    if (error !== 'cancel') {
      ElMessage.error(error.message);
    }
  }
};

onMounted(loadUserList);
</script> 