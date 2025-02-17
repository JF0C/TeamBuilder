/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.ts'
  }, 
  build: {
    outDir: '../TeamBuilder.Api/wwwroot',
    emptyOutDir: true
  },
  plugins: [react(), tailwindcss()]
})
