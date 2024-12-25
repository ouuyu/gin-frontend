import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getConfig } from '../services/config'
import type { SystemConfig } from '../services/config'

export const useConfigStore = defineStore('config', () => {
  const config = ref<SystemConfig>({} as SystemConfig)
  const loading = ref(false)

  const fetchConfig = async () => {
    loading.value = true
    try {
      const res = await getConfig()
      config.value = res
    } finally {
      loading.value = false
    }
  }

  return {
    config,
    loading,
    fetchConfig
  }
}) 