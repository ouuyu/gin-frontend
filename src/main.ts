import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useConfigStore } from './stores/config'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'

const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
if (darkMode) {
  document.documentElement.classList.add('dark')
}

NProgress.configure({ 
  showSpinner: false,
  easing: 'ease',
  speed: 500,
  minimum: 0.3
})

const app = createApp(App)
const pinia = createPinia()

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}  

app.use(pinia)
app.use(router)
app.use(ElementPlus)

const configStore = useConfigStore()
configStore.fetchConfig()

app.mount('#app')
