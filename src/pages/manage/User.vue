<template>
  <div class="p-8">
    <el-card v-loading="loading">
      <template #header>
        <div class="flex justify-between items-center">
          <span>用户管理</span>
          <el-button text bg type="primary" @click="handleAdd">添加用户</el-button>
        </div>
      </template>

      <el-table :data="userList">
        <el-table-column prop="id" label="ID" width="80"/>
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="group.name" label="分组" />
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
        <el-table-column label="操作" fixed="right" width="150">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-end mt-4">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

      <user-edit-drawer
        v-model:visible="showEdit"
        :user-id="currentUser.id"
        :user-data="{
          id: currentUser.id,
          username: currentUser.username,
          email: currentUser.email || '',
          role: currentUser.role,
          status: currentUser.status,
          password: currentUser.password
        }"
        @success="handleEditSuccess"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getUserList, deleteUser } from '@/services/user';
import type { User } from '@/services/user';
import UserEditDrawer from '@/components/manage/UserEditDrawer.vue';

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

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const loadUserList = async () => {
  loading.value = true;
  try {
    const res = await getUserList(currentPage.value, pageSize.value);
    userList.value = res.list || [];
    total.value = res.total || 0;
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

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  loadUserList();
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  loadUserList();
};

onMounted(loadUserList);
</script> 