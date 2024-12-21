<template>
  <header class="h-14 border-b flex justify-between px-4">
    <div class="flex gap-4">
      <div class="flex items-center gap-4">
        <router-link to="/dashboard" class="text-lg font-medium">管理系统</router-link>
      </div>

      <div class="flex items-center gap-4">
        <router-link to="/dashboard">
          <div class="flex items-center">
            <el-icon><HomeFilled /></el-icon>
            <ElButton link>首页</ElButton>
          </div>
        </router-link>
        <router-link 
          v-if="userStore.isLogin && userStore.isRoot" 
          to="/manage">
          <div class="flex items-center">
            <el-icon><Setting /></el-icon>
            <ElButton link>管理</ElButton>
          </div>
        </router-link>
      </div>
    </div>
    
    <div class="flex items-center gap-4">
      <el-dropdown v-if="userStore.isLogin">
        <span class="flex items-center gap-1 cursor-pointer op-60 hover:op-100">
          <span>{{ userStore.userInfo.username }}</span>
          <el-icon><User /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <router-link v-else to="/login" class="op-60 hover:op-100">登录</router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import { HomeFilled, Setting, User } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>