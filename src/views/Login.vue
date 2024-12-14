<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { api } from '../services/api'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)

const login = async () => {
  if (!username.value || !password.value) {
    ElMessage.warning('请输入用户名和密码')
    return
  }
  
  loading.value = true
  try {
    const data = await api.login(username.value, password.value)
    localStorage.setItem('token', data.token)
    ElMessage.success('登录成功')
    router.push('/')
  } catch (e: any) {
    ElMessage.error(e.response?.data?.message || '登录失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="h-screen w-full flex items-center justify-center">
    <el-card class="w-96 hover:shadow-lg">
      <template #header>
        <div class="text-center text-xl font-medium">登录系统</div>
      </template>
      
      <el-form @submit.prevent="login">
        <el-form-item>
          <el-input
            v-model="username"
            placeholder="请输入用户名"
          />
        </el-form-item>
        
        <el-form-item>
          <el-input
            v-model="password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-button
          type="primary"
          class="w-full"
          text bg
          @click="login"
        >
          登录
        </el-button>
      </el-form>
    </el-card>
  </div>
</template> 