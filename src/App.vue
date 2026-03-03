<template>
  <div class="app-container">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // 检查用户状态
  const hasCompletedSurvey = localStorage.getItem('hasCompletedSurvey')
  const isLoggedIn = localStorage.getItem('isLoggedIn')

  // 如果没有完成问卷，重定向到欢迎页
  if (!hasCompletedSurvey) {
    router.replace('/welcome')
  } else if (!isLoggedIn) {
    router.replace('/login')
  }
})
</script>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  background: #000000;
  color: #F8FAFC;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  touch-action: manipulation;
}

#app {
  min-height: 100vh;
  min-height: 100dvh;
  background: #000000;
}

/* 应用容器 - 适配安卓手机尺寸 360×800 */
.app-container {
  width: 360px;
  min-height: 800px;
  height: 100vh;
  height: 100dvh;
  margin: 0 auto;
  position: relative;
  overflow-x: hidden;
  background: #000000;
}

/* 在更大屏幕上模拟手机显示 */
@media (min-width: 360px) {
  .app-container {
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }
}

/* 液态玻璃卡片 */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border-radius: 24px;
}

/* 液态玻璃按钮 */
.glass-button {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(99, 102, 241, 0.9));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  color: #F8FAFC;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.glass-button:active {
  transform: scale(0.95);
  opacity: 0.9;
}

.glass-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 输入框玻璃风格 */
.glass-input {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: #F8FAFC;
  padding: 24px 32px;
  font-size: 16px;
  width: 100%;
  outline: none;
  transition: border-color 0.3s ease;
}

.glass-input::placeholder {
  color: rgba(248, 250, 252, 0.5);
}

.glass-input:focus {
  border-color: rgba(59, 130, 246, 0.5);
}

/* 动态流体背景 */
.liquid-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at 20% 20%, #1e1b4b 0%, #000000 50%),
              radial-gradient(ellipse at 80% 80%, #172554 0%, #000000 50%),
              radial-gradient(ellipse at 50% 50%, #0f172a 0%, #000000 100%);
  z-index: -1;
}

/* 流动光斑动画 */
.liquid-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: float 20s ease-in-out infinite;
  z-index: -1;
}

.liquid-orb-1 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #3B82F6, #6366F1);
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.liquid-orb-2 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  top: 60%;
  right: 10%;
  animation-delay: -7s;
}

.liquid-orb-3 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #06B6D4, #3B82F6);
  bottom: 20%;
  left: 30%;
  animation-delay: -14s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(30px, -30px) scale(1.05);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.95);
  }
  75% {
    transform: translate(-30px, -20px) scale(1.02);
  }
}

/* 标题样式 */
.title {
  font-size: 28px;
  font-weight: 700;
  color: #F8FAFC;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 16px;
  color: #94A3B8;
  line-height: 1.6;
}

/* 紧急按钮 */
.panic-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #EF4444, #DC2626);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
  animation: pulse 2s ease-in-out infinite;
  cursor: pointer;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 30px rgba(239, 68, 68, 0.8);
    transform: scale(1.05);
  }
}

/* 进度条 */
.progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3B82F6, #6366F1);
  border-radius: 3px;
  transition: width 0.5s ease;
}

/* 渐变文字 */
.gradient-text {
  background: linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 页面切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 通用按钮样式 */
button {
  border: none;
  outline: none;
  cursor: pointer;
  font-family: inherit;
}

button:active {
  transform: scale(0.98);
}
</style>
