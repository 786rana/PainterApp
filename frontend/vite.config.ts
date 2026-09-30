import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API calls to the app service
      '/api': {
        // Aspire injects SERVER_HTTPS/SERVER_HTTP; fall back to the API's launch profile
        target: process.env.SERVER_HTTPS || process.env.SERVER_HTTP || 'http://localhost:5393',
        changeOrigin: true
      }
    }
  }
})
