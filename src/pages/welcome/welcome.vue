<template>
  <view class="welcome-page">
    <!-- 动态背景 -->
    <view class="liquid-bg"></view>
    <view class="liquid-orb liquid-orb-1"></view>
    <view class="liquid-orb liquid-orb-2"></view>
    <view class="liquid-orb liquid-orb-3"></view>

    <!-- 主要内容 -->
    <view class="content">
      <!-- Logo区域 -->
      <view class="logo-section">
        <view class="logo-container">
          <text class="logo-icon">🧠</text>
        </view>
        <text class="app-name gradient-text">布鲁计划</text>
        <text class="app-tagline">科学戒色，重塑人生</text>
      </view>

      <!-- 功能介绍 -->
      <view class="features-section">
        <view class="feature-item glass-card">
          <text class="feature-icon">📊</text>
          <view class="feature-text">
            <text class="feature-title">智能评估</text>
            <text class="feature-desc">AI驱动的个性化依赖程度分析</text>
          </view>
        </view>

        <view class="feature-item glass-card">
          <text class="feature-icon">📅</text>
          <view class="feature-text">
            <text class="feature-title">90天计划</text>
            <text class="feature-desc">基于神经科学的科学恢复方案</text>
          </view>
        </view>

        <view class="feature-item glass-card">
          <text class="feature-icon">🆘</text>
          <view class="feature-text">
            <text class="feature-title">紧急求助</text>
            <text class="feature-desc">一键触发即时干预机制</text>
          </view>
        </view>

        <view class="feature-item glass-card">
          <text class="feature-icon">📈</text>
          <view class="feature-text">
            <text class="feature-title">进度追踪</text>
            <text class="feature-desc">实时记录戒色天数与里程碑</text>
          </view>
        </view>
      </view>

      <!-- 开始按钮 -->
      <view class="action-section">
        <button class="start-button glass-button" @click="startAssessment">
          开始评估
        </button>
        <text class="notice">完成评估后即可登录</text>
      </view>
    </view>
  </view>
</template>

<script setup>
const startAssessment = () => {
  uni.navigateTo({
    url: '/pages/survey/survey'
  })
}
</script>

<style lang="scss" scoped>
.welcome-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.content {
  position: relative;
  z-index: 1;
  padding: 120rpx 64rpx 48rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80rpx;
}

.logo-container {
  width: 180rpx;
  height: 180rpx;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32rpx;
  box-shadow: 0 20rpx 60rpx rgba(59, 130, 246, 0.3);
}

.logo-icon {
  font-size: 80rpx;
}

.app-name {
  font-size: 64rpx;
  font-weight: 700;
  letter-spacing: 4rpx;
  margin-bottom: 16rpx;
}

.app-tagline {
  font-size: 28rpx;
  color: #94A3B8;
  letter-spacing: 2rpx;
}

.features-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-bottom: 64rpx;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 32rpx;
}

.feature-icon {
  font-size: 48rpx;
  margin-right: 24rpx;
  flex-shrink: 0;
}

.feature-text {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.feature-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #F8FAFC;
  margin-bottom: 8rpx;
}

.feature-desc {
  font-size: 24rpx;
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
  height: 100rpx;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24rpx;
}

.notice {
  font-size: 24rpx;
  color: #64748B;
}
</style>
