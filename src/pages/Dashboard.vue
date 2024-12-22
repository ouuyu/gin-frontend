<template>
    <div>
        <h1>Dashboard</h1>
        <div>
            <pre>{{ userStore.userInfo }}</pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
</script>