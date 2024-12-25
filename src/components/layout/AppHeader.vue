<template>
  <header class="h-14 border-b flex items-center justify-between px-4 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex items-center gap-4">
      <h1 class="text-lg font-medium dark:text-white">{{ configStore.config.system_name || '管理系统' }}</h1>
      <div class="flex items-center gap-1">
        <el-button link @click="router.push('/dashboard')">主页</el-button>
        <el-dropdown v-if="userStore.isRoot">
          <el-button link>管理</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="router.push('/manage/config')">系统配置</el-dropdown-item>
              <el-dropdown-item @click="router.push('/manage/users')">用户管理</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <el-dropdown v-if="userStore.isLogin">
        <span class="flex items-center gap-2 cursor-pointer op-60 hover:op-100 dark:text-white">
          <span>{{ userStore.userInfo.username }}</span>
          <div class="i-fa-solid:user text-lg" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleResetPassword">重置密码</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button
        circle
        @click="toggleDark()"
      >
        <el-icon v-if="isDark"><Sunny /></el-icon>
        <el-icon v-else><Moon /></el-icon>
      </el-button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import { useConfigStore } from '../../stores/config'
import { resetUserPassword } from '../../services/user'
import { ElMessageBox, ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const configStore = useConfigStore()
const isDark = ref(document.documentElement.classList.contains('dark'))

const toggleDark = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}

const handleResetPassword = async () => {
  const { value: password } = await ElMessageBox.prompt('请输入新密码', '重置密码', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputType: 'password',
    inputValidator: (value) => {
      if (!value) {
        return '密码不能为空'
      }
      if (value.length < 8) {
        return '密码长度至少为8位'
      }
      return true
    }
  })
  
  if (password) {
    await resetUserPassword(undefined, password)
    ElMessage.success('密码重置成功')
  }
}
</script>