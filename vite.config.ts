/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@src': '/src',
      '@components': '/src/components',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
      '@services': '/src/services',
      '@layouts': '/src/layouts',
      '@pages': '/src/pages',
      '@contexts': '/src/contexts',
      '@constants': '/src/constants',
    },
  },
})
