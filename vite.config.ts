import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

import proxy from './proxy'

export default defineConfig({
  plugins: [vue(), proxy('http://api.vikingship.xyz')],
})
