<template>
  <view class="panic-page" :class="{ 'flash-mode': flashMode, 'camera-mode': cameraMode }">
    <!-- 正常模式背景 -->
    <view v-if="!cameraMode" class="liquid-bg"></view>
    <view v-if="!cameraMode" class="liquid-orb liquid-orb-1"></view>
    <view v-if="!cameraMode" class="liquid-orb liquid-orb-2"></view>

    <!-- 摄像头画面 -->
    <camera
      v-if="cameraMode"
      class="camera-view"
      device-position="front"
      flash="off"
    ></camera>

    <!-- 闪烁模式 -->
    <view v-if="flashMode" class="flash-overlay"></view>

    <!-- 关闭按钮 -->
    <view class="close-btn" @click="closePanic">
      <text>✕</text>
    </view>

    <!-- 主内容区 -->
    <view v-if="!cameraMode" class="content">
      <text class="panic-title">紧急求助</text>
      <text class="panic-subtitle">选择一种干预方式帮助你度过这个时刻</text>

      <!-- 干预选项 -->
      <view class="intervention-options">
        <!-- 摄像头模式 -->
        <view class="option-card glass-card" @click="triggerCamera">
          <text class="option-icon">📷</text>
          <text class="option-title">看看现在的自己</text>
          <text class="option-desc">打开前置摄像头，看着镜子中的自己</text>
        </view>

        <!-- 视觉冲击模式 -->
        <view class="option-card glass-card" @click="triggerFlash">
          <text class="option-icon">⚡</text>
          <text class="option-title">视觉冲击</text>
          <text class="option-desc">屏幕快速闪烁，打破冲动思维</text>
        </view>

        <!-- 目标提醒模式 -->
        <view class="option-card glass-card" @click="showGoals">
          <text class="option-icon">🎯</text>
          <text class="option-title">目标提醒</text>
          <text class="option-desc">查看你戒色的初心和目标</text>
        </view>

        <!-- 震动模式 -->
        <view class="option-card glass-card" @click="triggerVibrate">
          <text class="option-icon">📳</text>
          <text class="option-title">强力震动</text>
          <text class="option-desc">手机持续震动，打断冲动</text>
        </view>
      </view>

      <!-- 鼓励话语 -->
      <view class="encourage-section">
        <text class="encourage-text">{{ currentEncourage }}</text>
      </view>
    </view>

    <!-- 摄像头模式内容 -->
    <view v-if="cameraMode" class="camera-content">
      <view class="camera-overlay">
        <text class="camera-prompt">看着现在的自己</text>
        <text class="camera-question">你确定要这样做吗？</text>
        <text class="camera-message">{{ cameraMessage }}</text>
      </view>
    </view>

    <!-- 目标提醒弹窗 -->
    <view v-if="showGoalsModal" class="modal-overlay" @click="closeGoals">
      <view class="goals-modal glass-card" @click.stop>
        <text class="goals-title">你的初心</text>
        <view class="goals-list">
          <view v-for="(goal, idx) in goals" :key="idx" class="goal-item">
            <text class="goal-icon">{{ goal.icon }}</text>
            <text class="goal-text">{{ goal.text }}</text>
          </view>
        </view>
        <button class="close-goals-btn" @click="closeGoals">我记住了</button>
      </view>
    </view>

    <!-- 震动模式 -->
    <view v-if="vibrateMode" class="vibrate-overlay">
      <text class="vibrate-text">深呼吸...</text>
      <text class="vibrate-hint">放松，深呼吸</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 状态变量
const flashMode = ref(false)
const cameraMode = ref(false)
const vibrateMode = ref(false)
const showGoalsModal = ref(false)
const cameraMessage = ref('')
let flashTimer = null
let vibrateTimer = null

// 鼓励话语
const encourages = [
  '你可以的！你是最棒的！',
  '坚持就是胜利！',
  '想想你的目标和梦想！',
  '你比冲动更强大！',
  '这一刻的坚持将成就更好的你！',
  '记住你为什么开始！',
  '相信自己能战胜一切！',
  '你已经在正确的道路上了！'
]

const currentEncourage = ref(encourages[Math.floor(Math.random() * encourages.length)])

// 目标列表
const goals = ref([
  { icon: '💪', text: '重获自信' },
  { icon: '🧠', text: '提升专注力' },
  { icon: '💼', text: '更好的工作学习状态' },
  { icon: '❤️', text: '建立健康的人际关系' },
  { icon: '🌟', text: '成为更好的自己' }
])

// 摄像头消息
const cameraMessages = [
  '这是你想要的生活吗？',
  '想想你的家人和朋友。',
  '你值得拥有更好的人生。',
  '坚持就是胜利！',
  '这一刻的选择决定你的未来。',
  '相信自己能行！'
]

// 关闭紧急求助
const closePanic = () => {
  // 停止所有模式
  if (flashTimer) {
    clearInterval(flashTimer)
    flashMode.value = false
  }
  if (vibrateTimer) {
    clearInterval(vibrateTimer)
    vibrateMode.value = false
  }

  uni.navigateBack()
}

// 触发摄像头模式
const triggerCamera = () => {
  cameraMessage.value = cameraMessages[Math.floor(Math.random() * cameraMessages.length)]
  cameraMode.value = true

  // 开启震动
  uni.vibrateLong({
    success: () => {
      console.log('震动成功')
    }
  })
}

// 触发闪烁模式
const triggerFlash = () => {
  flashMode.value = true

  // 开启震动
  uni.vibrateLong({
    success: () => {
      console.log('震动成功')
    }
  })

  // 5秒后自动停止
  flashTimer = setTimeout(() => {
    flashMode.value = false
    uni.showToast({
      title: '你已经度过了危机时刻',
      icon: 'success'
    })
  }, 5000)
}

// 显示目标提醒
const showGoals = () => {
  showGoalsModal.value = true
}

// 关闭目标提醒
const closeGoals = () => {
  showGoalsModal.value = false
}

// 触发震动模式
const triggerVibrate = () => {
  vibrateMode.value = true

  // 震动3秒
  uni.vibrateLong({
    success: () => {
      console.log('震动成功')
    }
  })

  // 3秒后停止
  vibrateTimer = setTimeout(() => {
    vibrateMode.value = false
    uni.showToast({
      title: '你已经度过了危机时刻',
      icon: 'success'
    })
  }, 3000)
}

// 页面卸载时清理
onUnmounted(() => {
  if (flashTimer) {
    clearInterval(flashTimer)
  }
  if (vibrateTimer) {
    clearInterval(vibrateTimer)
  }
})
</script>

<style lang="scss" scoped>
.panic-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  transition: background 0.1s ease;

  &.flash-mode {
    background: #FF0000;
  }

  &.camera-mode {
    background: #000000;
  }
}

.camera-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.close-btn {
  position: fixed;
  top: 140rpx;
  right: 48rpx;
  width: 80rpx;
  height: 80rpx;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  font-size: 36rpx;
  color: #F8FAFC;
}

.content {
  position: relative;
  z-index: 5;
  padding: 180rpx 48rpx 48rpx;
}

.panic-title {
  font-size: 56rpx;
  font-weight: 700;
  color: #F8FAFC;
  display: block;
  text-align: center;
  margin-bottom: 16rpx;
}

.panic-subtitle {
  font-size: 28rpx;
  color: #94A3B8;
  display: block;
  text-align: center;
  margin-bottom: 48rpx;
}

.intervention-options {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.option-card {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.98);
  }
}

.option-icon {
  font-size: 48rpx;
  margin-bottom: 16rpx;
}

.option-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #F8FAFC;
  margin-bottom: 8rpx;
}

.option-desc {
  font-size: 26rpx;
  color: #94A3B8;
}

.encourage-section {
  margin-top: 48rpx;
  text-align: center;
  padding: 32rpx;
}

.encourage-text {
  font-size: 32rpx;
  font-weight: 600;
  color: #F8FAFC;
  line-height: 1.6;
}

.camera-content {
  position: relative;
  z-index: 5;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.camera-overlay {
  text-align: center;
  padding: 48rpx;
}

.camera-prompt {
  font-size: 48rpx;
  font-weight: 700;
  color: #F8FAFC;
  display: block;
  margin-bottom: 24rpx;
}

.camera-question {
  font-size: 36rpx;
  color: #EF4444;
  display: block;
  margin-bottom: 32rpx;
}

.camera-message {
  font-size: 32rpx;
  color: #94A3B8;
  line-height: 1.8;
}

.flash-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #FF0000;
  z-index: 2;
  animation: flash 0.2s ease-in-out infinite;
}

@keyframes flash {
  0%, 100% {
    background: #FF0000;
  }
  50% {
    background: #000000;
  }
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

.goals-modal {
  width: 100%;
  padding: 48rpx;
}

.goals-title {
  font-size: 40rpx;
  font-weight: 700;
  color: #F8FAFC;
  display: block;
  text-align: center;
  margin-bottom: 32rpx;
}

.goals-list {
  margin-bottom: 32rpx;
}

.goal-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.goal-icon {
  font-size: 40rpx;
  margin-right: 20rpx;
}

.goal-text {
  font-size: 30rpx;
  color: #F8FAFC;
}

.close-goals-btn {
  width: 100%;
  height: 96rpx;
  background: linear-gradient(135deg, #3B82F6, #6366F1);
  border: none;
  border-radius: 16rpx;
  color: #F8FAFC;
  font-size: 32rpx;
}

.vibrate-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.vibrate-text {
  font-size: 64rpx;
  font-weight: 700;
  color: #F8FAFC;
  margin-bottom: 24rpx;
}

.vibrate-hint {
  font-size: 32rpx;
  color: #94A3B8;
}
</style>
