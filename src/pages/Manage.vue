<template>
  <div class="p-4">
    <el-tabs>
      <el-tab-pane label="基本信息配置">
        <SystemConfig />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import SystemConfig from '../components/manage/SystemConfig.vue'
</script>