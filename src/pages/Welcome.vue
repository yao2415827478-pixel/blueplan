<template>
  <div class="welcome-page">
    <!-- 动态背景 -->
    <div class="liquid-bg"></div>
    <div class="liquid-orb liquid-orb-1"></div>
    <div class="liquid-orb liquid-orb-2"></div>
    <div class="liquid-orb liquid-orb-3"></div>

    <!-- 主要内容 -->
    <div class="content">
      <!-- Logo区域 -->
      <div class="logo-section">
        <div class="logo-container">
          <span class="logo-icon">🧠</span>
        </div>
        <h1 class="app-name gradient-text">布鲁计划</h1>
        <p class="app-tagline">科学戒色，重塑人生</p>
      </div>

      <!-- 功能介绍 -->
      <div class="features-section">
        <div class="feature-item glass-card">
          <span class="feature-icon">📊</span>
          <div class="feature-text">
            <h3 class="feature-title">智能评估</h3>
            <p class="feature-desc">AI驱动的个性化依赖程度分析</p>
          </div>
        </div>

        <div class="feature-item glass-card">
          <span class="feature-icon">📅</span>
          <div class="feature-text">
            <h3 class="feature-title">90天计划</h3>
            <p class="feature-desc">基于神经科学的科学恢复方案</p>
          </div>
        </div>

        <div class="feature-item glass-card">
          <span class="feature-icon">🆘</span>
          <div class="feature-text">
            <h3 class="feature-title">紧急求助</h3>
            <p class="feature-desc">一键触发即时干预机制</p>
          </div>
        </div>

        <div class="feature-item glass-card">
          <span class="feature-icon">📈</span>
          <div class="feature-text">
            <h3 class="feature-title">进度追踪</h3>
            <p class="feature-desc">实时记录戒色天数与里程碑</p>
          </div>
        </div>
      </div>

      <!-- 开始按钮 -->
      <div class="action-section">
        <button class="start-button glass-button" @click="startAssessment">
          开始评估
        </button>
        <p class="notice">完成评估后即可登录</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startAssessment = () => {
  router.push('/survey')
}
</script>

<style scoped>
.welcome-page {
  min-height: 100vh;
  min-height: 100dvh;
  position: relative;
  overflow: hidden;
  padding-bottom: 40px;
}

.content {
  position: relative;
  z-index: 1;
  padding: 80px 32px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 48px;
}

.logo-container {
  width: 90px;
  height: 90px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 20px 60px rgba(59, 130, 246, 0.3);
}

.logo-icon {
  font-size: 40px;
}

.app-name {
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.app-tagline {
  font-size: 16px;
  color: #94A3B8;
  letter-spacing: 1px;
}

.features-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 20px;
}

.feature-icon {
  font-size: 28px;
  margin-right: 16px;
  flex-shrink: 0;
}

.feature-text {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.feature-title {
  font-size: 17px;
  font-weight: 600;
  color: #F8FAFC;
  margin-bottom: 4px;
}

.feature-desc {
  font-size: 14px;
  color: #94A3B8;
}

.action-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.start-button {
  width: 100%;
  height: 56px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.notice {
  font-size: 14px;
  color: #64748B;
}
</style>
