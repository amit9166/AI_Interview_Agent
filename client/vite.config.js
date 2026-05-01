import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      'lodash': 'lodash-es',
      // Force all Axios imports to use the same path
      'axios': 'axios',
    },
  },
  optimizeDeps: {
    // Explicitly include axios so it's bundled only once
    include: ['axios', 'lodash-es']
  }
})
