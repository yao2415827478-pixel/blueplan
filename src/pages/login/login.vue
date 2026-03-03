<template>
  <view class="login-page">
    <!-- 动态背景 -->
    <view class="liquid-bg"></view>
    <view class="liquid-orb liquid-orb-1"></view>
    <view class="liquid-orb liquid-orb-2"></view>

    <!-- 主要内容 -->
    <view class="content">
      <!-- 标题 -->
      <view class="header-section">
        <text class="title">欢迎回来</text>
        <text class="subtitle">登录后开始你的戒色之旅</text>
      </view>

      <!-- 评估结果卡片 -->
      <view class="result-card glass-card">
        <text class="result-label">你的依赖程度评估</text>
        <view class="result-score">
          <text class="score-value gradient-text">{{ surveyScore }}</text>
          <text class="score-unit">分</text>
        </view>
        <text class="result-level">{{ scoreLevel }}</text>
      </view>

      <!-- 登录表单 -->
      <view class="form-section">
        <!-- 手机号输入 -->
        <view class="input-group">
          <text class="input-label">手机号</text>
          <input
            class="glass-input"
            type="number"
            v-model="phoneNumber"
            placeholder="请输入手机号"
            maxlength="11"
          />
        </view>

        <!-- 验证码输入 -->
        <view class="input-group">
          <text class="input-label">验证码</text>
          <view class="code-input-row">
            <input
              class="glass-input code-input"
              type="number"
              v-model="code"
              placeholder="请输入验证码"
              maxlength="6"
            />
            <button
              class="code-button"
              :disabled="countdown > 0"
              @click="sendCode"
            >
              {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
            </button>
          </view>
        </view>

        <!-- 登录按钮 -->
        <button class="login-button glass-button" @click="handleLogin">
          登录
        </button>
      </view>

      <!-- 其他提示 -->
      <view class="notice-section">
        <text class="notice-text">未注册的手机号将自动创建账号</text>
        <text class="notice-text">登录即表示同意</text>
        <text class="link-text">《用户协议》</text>
        <text class="notice-text">和</text>
        <text class="link-text">《隐私政策》</text>
      </view>
    </view>

    <!-- 验证码输入弹窗 -->
    <view v-if="showCodeModal" class="modal-overlay">
      <view class="modal-content glass-card">
        <text class="modal-title">输入验证码</text>
        <text class="modal-desc">验证码已发送至 {{ phoneNumber }}</text>
        <view class="code-dots">
          <view
            v-for="i in 6"
            :key="i"
            class="code-dot"
            :class="{ filled: codeModal.length >= i }"
          >
            <view v-if="codeModal.length >= i" class="dot-filled"></view>
          </view>
        </view>
        <input
          class="hidden-input"
          type="number"
          v-model="codeModal"
          maxlength="6"
          focus
        />
        <button class="modal-button glass-button" @click="confirmCode">
          确认
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 状态变量
const phoneNumber = ref('')
const code = ref('')
const countdown = ref(0)
const showCodeModal = ref(false)
const codeModal = ref('')

// 获取评估结果
const surveyResult = uni.getStorageSync('surveyResult') || {}
const surveyScore = ref(surveyResult.score || 0)

// 计算评分等级
const scoreLevel = computed(() => {
  const score = surveyScore.value
  if (score < 20) return '轻度依赖 - 状态良好'
  if (score < 40) return '轻度依赖 - 需保持'
  if (score < 60) return '中度依赖 - 建议干预'
  if (score < 80) return '高度依赖 - 需要帮助'
  return '重度依赖 - 建议专业帮助'
})

// 发送验证码
const sendCode = () => {
  if (!phoneNumber.value || phoneNumber.value.length !== 11) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    })
    return
  }

  // 开始倒计时
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)

  uni.showToast({
    title: '验证码已发送',
    icon: 'success'
  })

  // 显示验证码输入弹窗（模拟）
  setTimeout(() => {
    showCodeModal.value = true
  }, 500)
}

// 确认验证码
const confirmCode = () => {
  if (codeModal.value.length === 6) {
    code.value = codeModal.value
    showCodeModal.value = false
    handleLogin()
  }
}

// 处理登录
const handleLogin = () => {
  if (!phoneNumber.value || phoneNumber.value.length !== 11) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    })
    return
  }

  if (!code.value || code.value.length < 4) {
    uni.showToast({
      title: '请输入验证码',
      icon: 'none'
    })
    return
  }

  // 模拟登录
  uni.showLoading({
    title: '登录中...'
  })

  setTimeout(() => {
    uni.hideLoading()

    // 保存登录状态
    uni.setStorageSync('isLoggedIn', true)
    uni.setStorageSync('phoneNumber', phoneNumber.value)
    uni.setStorageSync('loginTime', Date.now())

    // 如果没有开始日期，设置开始日期
    if (!uni.getStorageSync('startDate')) {
      uni.setStorageSync('startDate', Date.now())
    }

    uni.showToast({
      title: '登录成功',
      icon: 'success'
    })

    setTimeout(() => {
      uni.reLaunch({
        url: '/pages/home/home'
      })
    }, 500)
  }, 1000)
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.content {
  position: relative;
  z-index: 1;
  padding: 140rpx 48rpx 48rpx;
}

.header-section {
  text-align: center;
  margin-bottom: 48rpx;
}

.title {
  font-size: 56rpx;
  font-weight: 700;
  color: #F8FAFC;
  display: block;
  margin-bottom: 16rpx;
}

.subtitle {
  font-size: 28rpx;
  color: #94A3B8;
}

.result-card {
  padding: 40rpx;
  text-align: center;
  margin-bottom: 48rpx;
}

.result-label {
  font-size: 24rpx;
  color: #94A3B8;
  display: block;
  margin-bottom: 16rpx;
}

.result-score {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 12rpx;
}

.score-value {
  font-size: 72rpx;
  font-weight: 700;
}

.score-unit {
  font-size: 28rpx;
  color: #94A3B8;
  margin-left: 8rpx;
}

.result-level {
  font-size: 26rpx;
  color: #8B5CF6;
}

.form-section {
  margin-bottom: 48rpx;
}

.input-group {
  margin-bottom: 32rpx;
}

.input-label {
  font-size: 26rpx;
  color: #94A3B8;
  display: block;
  margin-bottom: 12rpx;
}

.code-input-row {
  display: flex;
  gap: 20rpx;
}

.code-input {
  flex: 1;
}

.code-button {
  width: 240rpx;
  height: 96rpx;
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.5);
  border-radius: 16rpx;
  color: #3B82F6;
  font-size: 26rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;

  &[disabled] {
    opacity: 0.5;
  }
}

.login-button {
  width: 100%;
  height: 100rpx;
  font-size: 32rpx;
  margin-top: 16rpx;
}

.notice-section {
  text-align: center;
}

.notice-text {
  font-size: 24rpx;
  color: #64748B;
}

.link-text {
  font-size: 24rpx;
  color: #3B82F6;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 48rpx;
}

.modal-content {
  width: 100%;
  padding: 48rpx;
  text-align: center;
}

.modal-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #F8FAFC;
  display: block;
  margin-bottom: 12rpx;
}

.modal-desc {
  font-size: 26rpx;
  color: #94A3B8;
  display: block;
  margin-bottom: 40rpx;
}

.code-dots {
  display: flex;
  justify-content: center;
  gap: 20rpx;
  margin-bottom: 24rpx;
}

.code-dot {
  width: 80rpx;
  height: 80rpx;
  border: 2rpx solid rgba(255, 255, 255, 0.3);
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &.filled {
    border-color: #3B82F6;
    background: rgba(59, 130, 246, 0.1);
  }
}

.dot-filled {
  width: 16rpx;
  height: 16rpx;
  background: #3B82F6;
  border-radius: 50%;
}

.hidden-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.modal-button {
  width: 100%;
  height: 96rpx;
  font-size: 32rpx;
}
</style>
