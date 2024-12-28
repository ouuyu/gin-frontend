<template>
  <div class="p-8">
    <el-card v-loading="loading">
      <template #header>
        <div class="flex justify-between items-center">
          <span>用户组管理</span>
          <el-button text bg type="primary" @click="showAdd = true">添加用户组</el-button>
        </div>
      </template>
      <el-table :data="groupList">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="名称" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>

  <el-dialog v-model="showAdd" title="添加用户组" width="30%">
    <el-form>
      <el-form-item label="名称">
        <el-input v-model="newGroupname" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { createGroup, getGroupList, deleteGroup } from '@/services/group'

const loading = ref(false)
const newGroupname = ref('')
const showAdd = ref(false)
const groupList = ref([])

const handleAdd = async () => {
  try {
    await createGroup(newGroupname.value)
    ElMessage.success('添加成功')
  } finally {
    showAdd.value = false
    newGroupname.value = ''
    await loadGroupList()
  }
}

const loadGroupList = async () => {
  loading.value = true
  const response = await getGroupList()
  groupList.value = response
  loading.value = false
}

const handleEdit = (row: any) => {
  console.log("edit", row)
}

const handleDelete = async (row: any) => {
  await deleteGroup(row.id)
  await loadGroupList()
}

onMounted(() => {
  loadGroupList()
})
</script>
