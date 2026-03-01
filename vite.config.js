const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')

module.exports = defineConfig({
  plugins: [vue.default()],
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
})
