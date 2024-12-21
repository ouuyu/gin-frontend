import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'element-plus/dist/index.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'

NProgress.configure({ 
  showSpinner: false,  // 是否显示加载微调器
  easing: 'ease',      // 动画方式
  speed: 500,          // 递增进度条的速度
  minimum: 0.3         // 最小百分比
})

const app = createApp(App)
const pinia = createPinia()

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}  

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
