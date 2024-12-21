<template>
  <header class="h-14 border-b flex items-center justify-between px-4 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex items-center gap-4">
      <h1 class="text-lg font-medium dark:text-white">管理系统</h1>
    </div>
    
    <div class="flex items-center gap-4">
      <el-dropdown v-if="userStore.isLogin">
        <span class="flex items-center gap-2 cursor-pointer op-60 hover:op-100 dark:text-white">
          <span>{{ userStore.userInfo.username }}</span>
          <div class="i-fa-solid:user text-lg" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
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

const router = useRouter()
const userStore = useUserStore()
const isDark = ref(document.documentElement.classList.contains('dark'))

const toggleDark = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>