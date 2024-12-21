import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(JSON.parse(localStorage.getItem('user') || '{}'))

  const isLogin = computed(() => !!token.value)
  const isRoot = computed(() => userInfo.value.role === 100)

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const setUserInfo = (info: any) => {
    userInfo.value = info
    localStorage.setItem('user', JSON.stringify(info))
  }

  const logout = () => {
    token.value = ''
    userInfo.value = {}
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return {
    token,
    userInfo,
    isLogin,
    isRoot,
    setToken,
    setUserInfo,
    logout
  }
}) 