<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <AppHeader />
    
    <main class="flex-1">
      <router-view />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
</script> 