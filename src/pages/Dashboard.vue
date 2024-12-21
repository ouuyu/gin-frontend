<template>
    <div>
        <h1>Dashboard</h1>
        <h2>用户信息</h2>
        <div>
            <span>用户名：</span>
            <span>{{ userStore.userInfo.username }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
</script>