<template>
  <header class="h-14 border-b flex items-center justify-between px-4">
    <div class="flex items-center gap-4">
      <h1 class="text-lg font-medium">管理系统</h1>
    </div>
    
    <div class="flex items-center gap-4">
      <el-dropdown v-if="userStore.isLogin">
        <span class="flex items-center gap-2 cursor-pointer op-60 hover:op-100">
          <span>{{ userStore.userInfo.username }}</span>
          <div class="i-fa-solid:user text-lg" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'

const router = useRouter()
const userStore = useUserStore()

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>