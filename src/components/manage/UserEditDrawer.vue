<template>
  <el-drawer
    v-model="visible"
    :title="props.userId ? '编辑用户' : '添加用户'"
    :size="500"
  >
    <el-form :model="formData" label-width="80px" v-loading="loading">
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
      <el-form-item label="分组">
        <el-select v-model="formData.group_id" filterable placeholder="请选择分组">
          <el-option
            v-for="group in groupList"
            :key="group.id"
            :label="group.name"
            :value="group.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="formData.status" :active-value="1" :inactive-value="2" />
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
import { ref, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { updateUser, createUser, getUserInfo } from '@/services/user'
import { getGroupList } from '@/services/group'
import type { Group } from '@/services/group'
import type { User } from '@/services/user'

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
const loading = ref(false)
const visible = ref(props.visible)
const groupList = ref<Group[]>([])

const getEmptyFormData = (): User => ({
  id: 0,
  username: '',
  email: '',
  role: 1,
  status: 1,
  password: '',
  group_id: 0
})

const formData = ref<User>(getEmptyFormData())

const loadGroupList = async () => {
  const res = await getGroupList()
  groupList.value = res
}

watch(() => props.visible, async (val) => {
  visible.value = val
  if (val && props.userId) {
    loading.value = true
    loadGroupList()
    formData.value = await getUserInfo(props.userId)
    loading.value = false
  }
})

watch(() => visible.value, (val) => {
  emit('update:visible', val)
})

watch(() => props.userData, (val) => {
  if (val) {
    formData.value = { ...val }
  } else {
    formData.value = getEmptyFormData()
  }
}, { immediate: true })

const handleClose = () => {
  visible.value = false
  formData.value = getEmptyFormData()
}

const handleSave = async () => {
  saving.value = true
  try {
    if (props.userId) {
      await updateUser(formData.value)
    } else {
      await createUser(formData.value)
    }
    ElMessage.success('保存成功')
    visible.value = false
    emit('success')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  loadGroupList()
})
</script> 