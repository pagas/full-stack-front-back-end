import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'
import path from 'path'
import { fileURLToPath } from 'url'

// Resolve __dirname for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    server: {
      port: Number(env.VITE_PORT) || 3000, // Use VITE_PORT or default to 3000
    },
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'), // Alias for components
        '@api': path.resolve(__dirname, 'src/api'), // Alias for components
      },
    },
  }
})
