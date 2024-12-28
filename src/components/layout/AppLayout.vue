<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <AppHeader class="sticky top-0 z-10" />
    
    <main class="flex-1 relative">
      <div class="absolute inset-0 overflow-y-auto dark:bg-gray-900">
        <router-view />
      </div>
    </main>
    
    <AppFooter class="sticky bottom-0 z-10" />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
</script> 