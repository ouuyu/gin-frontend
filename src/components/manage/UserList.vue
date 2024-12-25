<template>
  <div>
    <el-drawer
      v-model="drawerVisible"
      title="编辑用户"
      size="400px"
    >
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="editForm.role">
            <el-option label="管理员" :value="100" />
            <el-option label="普通用户" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { getUserList, updateUser } from '../../services/user';

const loading = ref(false);
const userList = ref([]);
const drawerVisible = ref(false);
const editForm = ref({
  id: 0,
  username: '',
  email: '',
  role: 1
});

const loadUserList = async () => {
  loading.value = true;
  try {
    const res = await getUserList(1, 100);
    userList.value = res.list;
  } catch (error: any) {
    ElMessage.error(error.message);
  } finally {
    loading.value = false;
  }
};

const handleSave = async () => {
  try {
    await updateUser(editForm.value);
    ElMessage.success('更新成功');
    drawerVisible.value = false;
    loadUserList();
  } catch (error: any) {
    ElMessage.error(error.message);
  }
};
</script> 