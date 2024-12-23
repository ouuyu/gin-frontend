import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'

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
          path: 'manage/users',
          name: 'manageUsers',
          component: () => import('../pages/manage/UserList.vue'),
          meta: { requiresAdmin: true }
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
  } else {
    next()
  }
})

export default router 