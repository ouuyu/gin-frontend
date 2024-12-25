<template>
  <div class="w-full max-w-sm mx-auto p-4">
    <h2 class="text-xl font-medium text-center mb-4">注册账号</h2>
    
    <el-form @submit.prevent="handleRegister" class="space-y-4">
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
        :loading="loading"
        text bg
        @click="handleRegister"
      >
        注册
      </el-button>

      <div class="text-center text-sm">
        <router-link to="/login" class="op-60 hover:op-100">已有账号？去登录</router-link>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { register } from '../../services/user'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)

const handleRegister = async () => {
  if (!username.value || !password.value) {
    ElMessage.warning('请填写完整信息')
    return
  }
  
  loading.value = true
  try {
    await register(username.value, password.value)
    ElMessage.success('注册成功，请登录')
    router.push('/login')
  } finally {
    loading.value = false
  }
}
</script> 