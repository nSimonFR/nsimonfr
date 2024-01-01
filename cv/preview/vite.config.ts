import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  publicDir: '../public',
  assetsInclude: ['**/*.md', '**/*.woff2'],
  plugins: [react()],
})
