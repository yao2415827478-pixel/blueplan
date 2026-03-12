<template>
  <div class="home-page" style="background: #000; min-height: 100vh; color: #fff; padding: 50px 20px;">
    <h1 style="color: #0f0; font-size: 24px; margin-bottom: 20px;">Home 加载成功!</h1>
    <p style="color: #888; margin-bottom: 20px;">登录成功到达首页</p>
    <button @click="$router.push('/welcome')" style="padding: 10px 20px; background: #333; color: #fff; border: 1px solid #555; border-radius: 8px;">
      返回 Welcome
    </button>
  </div>
</template>

<script setup>
console.log('[Home 最小版] 开始加载')

// 故意加个延迟确保能看到日志
setTimeout(() => {
  console.log('[Home 最小版] 页面渲染完成')
}, 100)
</script>
