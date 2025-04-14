import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ Garante que o build funcione na raiz do domínio
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    port: parseInt(process.env.PORT) || 4173,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
