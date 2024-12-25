<template>
  <el-drawer
    v-model="visible"
    :title="props.userId ? '编辑用户' : '添加用户'"
    :size="500"
  >
    <el-form :model="formData" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="formData.username" :disabled="!!props.userId" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formData.email" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="formData.role">
          <el-option label="管理员" :value="100" />
          <el-option label="普通用户" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="!props.userId" label="密码">
        <el-input v-model="formData.password" type="password" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="flex justify-end gap-2">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="saving">保存</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { updateUser } from '@/services/user'

interface User {
  id: number
  username: string
  email: string
  role: number
  status: number
  password?: string
}

const props = defineProps<{
  visible: boolean
  userId?: number
  userData?: User
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'success'): void
}>()

const saving = ref(false)
const visible = ref(props.visible)
const formData = ref<User>({
  id: 0,
  username: '',
  email: '',
  role: 1,
  status: 1,
  password: ''
})

watch(() => props.visible, (val) => {
  visible.value = val
})

watch(() => visible.value, (val) => {
  emit('update:visible', val)
})

watch(() => props.userData, (val) => {
  if (val) {
    formData.value = { ...val }
  } else {
    formData.value = {
      id: 0,
      username: '',
      email: '',
      role: 1,
      status: 1,
      password: ''
    }
  }
}, { immediate: true })

const handleClose = () => {
  visible.value = false
}

const handleSave = async () => {
  saving.value = true
  try {
    await updateUser(formData.value)
    ElMessage.success('保存成功')
    visible.value = false
    emit('success')
  } finally {
    saving.value = false
  }
}
</script> 