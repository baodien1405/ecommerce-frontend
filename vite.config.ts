import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), visualizer()] as any,
  test: {
    environment: 'jsdom'
  },
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  }
})
