const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')

module.exports = defineConfig({
  base: './',
  plugins: [vue.default()],
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  build: {
    rollupOptions: {
      external: ['@capacitor/core']
    }
  },
  css: {
    postcss: {
      plugins: [
        // 将 rpx 转换为 px (基于 750px 设计稿)
        require('postcss-px-to-viewport')({
          unitToConvert: 'rpx',
          viewportWidth: 750,
          unitPrecision: 5,
          propList: ['*'],
          viewportUnit: 'px',
          fontViewportUnit: 'px',
          minPixelValue: 1,
          mediaQuery: false
        })
      ]
    }
  }
})