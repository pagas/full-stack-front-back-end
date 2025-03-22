import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    server: {
      port: Number(env.VITE_PORT) || 3000, // Use VITE_PORT or default to 3000
    },
  }
})
