<template>
  <div class="w-full max-w-sm mx-auto p-4">
    <h2 class="text-xl font-medium text-center mb-4">{{ isLogin ? '登录系统' : '注册账号' }}</h2>
    
    <el-form class="space-y-4">
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
        @click="handleSubmit"
      >
        {{ isLogin ? '登录' : '注册' }}
      </el-button>

      <div class="text-center text-sm">
        <a 
          class="op-60 hover:op-100 cursor-pointer" 
          @click="isLogin = !isLogin"
        >
          {{ isLogin ? '没有账号？去注册' : '已有账号？去登录' }}
        </a>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { login, register } from '../../services/user'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'

const router = useRouter()
const userStore = useUserStore()
const username = ref('')
const password = ref('')
const loading = ref(false)
const isLogin = ref(true)

const handleSubmit = async () => {
  if (!username.value || !password.value) {
    ElMessage.warning('请填写完整信息')
    return
  }
  if (!isLogin.value && password.value.length < 8) {
    ElMessage.warning('密码长度至少为8位')
    return
  }
  
  loading.value = true
  try {
    if (isLogin.value) {
      const data = await login(username.value, password.value)
      userStore.setToken(data.token)
      userStore.setUserInfo(data)
      ElMessage.success('登录成功')
      router.push('/dashboard')
    } else {
      await register(username.value, password.value)
      ElMessage.success('注册成功')
      isLogin.value = true
      username.value = ''
      password.value = ''
    }
  } catch (error: any) {
    ElMessage.error(error.message || `${isLogin.value ? '登录' : '注册'}失败，请重试`)
  } finally {
    loading.value = false
  }
}
</script>
