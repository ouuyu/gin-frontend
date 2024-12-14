import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { presetIcons, presetUno } from 'unocss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      presets: [
        presetUno(),
        presetIcons({
          warn: true,
          collections: {
            ic: () => import('@iconify-json/ic/icons.json').then(i => i.default)
          }
        })
      ]
    })
  ],
})
