<template>
  <div style="background: #fff; color: #000; min-height: 100vh; padding: 50px 20px; text-align: center;">
    <h1 style="color: #000; font-size: 24px;">App loaded - 白色背景</h1>
    <p style="margin-top: 20px;">这是最小化测试版本</p>
    <p style="margin-top: 10px; color: #666;">如果看到这个，说明App正常</p>
    <router-view />
  </div>
</template>

<script setup>
console.log('[App最小版] 组件加载')
</script>
