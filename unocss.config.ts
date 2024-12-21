import { presetAttributify, presetUno, presetIcons, defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        'fa-solid': () => import('@iconify-json/fa-solid').then(i => i.icons),
      }
    }),
  ]
}) 