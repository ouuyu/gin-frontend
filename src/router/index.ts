import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../pages/Dashboard.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../pages/Login.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../pages/Register.vue')
        },
        {
          path: 'manage/config',
          name: 'manageConfig',
          component: () => import('../pages/manage/SystemConfig.vue'),
          meta: { requiresAdmin: true }
        },
        {
          path: 'manage/user',
          name: 'manageUser',
          component: () => import('../pages/manage/User.vue'),
          meta: { requiresAdmin: true }
        },
        {
          path: 'manage/group',
          name: 'manageGroup',
          component: () => import('../pages/manage/Group.vue'),
          meta: { requiresAdmin: true }
        },
        {
          path: 'store',
          name: 'store',
          component: () => import('../pages/Store.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, _, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/dashboard')
  } else if (to.meta.requiresAdmin && !useUserStore().isRoot) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router 