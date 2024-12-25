import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { presetIcons, presetUno } from 'unocss'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
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
