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