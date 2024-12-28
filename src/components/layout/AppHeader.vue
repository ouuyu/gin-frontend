<template>
  <header class="border-b bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
    <div class="flex items-center justify-between px-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mr-6">
          {{ configStore.config.system_name || '管理系统' }}
        </h1>
        
        <el-menu
          :default-active="activeMenu"
          mode="horizontal"
          :ellipsis="false"
          class="!border-none"
          :background-color="isDark ? '#1f2937' : '#ffffff'"
          :text-color="isDark ? '#e5e7eb' : '#4b5563'"
          :active-text-color="isDark ? '#60a5fa' : '#3b82f6'"
        >
          <el-menu-item index="/dashboard" @click="router.push('/dashboard')">
            <el-icon><HomeFilled /></el-icon>
            主页
          </el-menu-item>
          
          <el-sub-menu index="/manage" v-if="userStore.isRoot">
            <template #title>
              <el-icon><Management /></el-icon>
              管理
            </template>
            <el-menu-item index="/manage/config" @click="router.push('/manage/config')">
              <el-icon><Setting /></el-icon>
              系统配置
            </el-menu-item>
            <el-menu-item index="/manage/user" @click="router.push('/manage/user')">
              <el-icon><UserFilled /></el-icon>
              用户管理
            </el-menu-item>
            <el-menu-item index="/manage/group" @click="router.push('/manage/group')">
              <el-icon><Compass /></el-icon>
              用户组管理
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>

      <div class="flex items-center gap-4">
        <el-dropdown v-if="userStore.isLogin" trigger="hover">
          <span class="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">
            <div class="i-fa-solid:user text-sm" />
            <span>{{ userStore.userInfo.username }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleResetPassword">
                <el-icon><Key /></el-icon>
                重置密码
              </el-dropdown-item>
              <el-dropdown-item @click="handleLogout">
                <el-icon><Remove /></el-icon>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-button
          class="!w-9 !h-9 !p-0 flex items-center justify-center"
          :class="isDark ? '!text-yellow-400' : '!text-gray-600'"
          circle
          @click="toggleDark()"
        >
          <el-icon v-if="isDark"><Sunny class="text-lg" /></el-icon>
          <el-icon v-else><Moon class="text-lg" /></el-icon>
        </el-button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useConfigStore } from '@/stores/config'
import { resetUserPassword } from '@/services/user'
import { ElMessageBox, ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const configStore = useConfigStore()
const isDark = ref(document.documentElement.classList.contains('dark'))

const activeMenu = computed(() => route.path)

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
      if (!value) return '密码不能为空'
      if (value.length < 8) return '密码长度至少为8位'
      return true
    }
  })
  
  if (password) {
    await resetUserPassword(undefined, password)
    ElMessage.success('密码重置成功')
  }
}
</script>