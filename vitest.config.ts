import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': resolve(__dirname),
      '@': resolve(__dirname),
      '#app': resolve(__dirname, 'node_modules/nuxt/dist/app'),
      '#build': resolve(__dirname, '.nuxt'), // ★ ДОБАВИЛИ ★
    },
  },
  test: {
    globals: true,
    environment: 'jsdom', // ★ ИЗМЕНИЛИ С 'node' НА 'jsdom' ★
    include: ['tests/**/*.test.js', 'tests/**/*.spec.js'],
    exclude: ['node_modules', '.nuxt', 'dist'],
    setupFiles: ['./tests/setup.js'],
  },
})
