import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import contentIndexPlugin from './src/plugins/content-index-plugin'

export default defineConfig({
  plugins: [react(), contentIndexPlugin()],
  base: '/',
  assetsInclude: ['**/*.md']
})
