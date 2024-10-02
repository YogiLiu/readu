import { defineConfig } from '@solidjs/start/config'
import Icons from 'unplugin-icons/vite'
import path from 'path'

export default defineConfig({
  server: {
    preset: 'vercel-edge'
  },
  vite: {
    plugins: [Icons({ compiler: 'solid' })],
    resolve: {
      alias: {
        '~styled-system': path.resolve(import.meta.dirname, './styled-system'),
      },
    },
  },
})
