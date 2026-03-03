<template>
  <div class="panic-page" :class="{ 'flash-mode': flashMode, 'camera-mode': cameraMode }">
    <!-- 正常模式背景 -->
    <div v-if="!cameraMode" class="liquid-bg"></div>
    <div v-if="!cameraMode" class="liquid-orb liquid-orb-1"></div>
    <div v-if="!cameraMode" class="liquid-orb liquid-orb-2"></div>

    <!-- 闪烁模式 -->
    <div v-if="flashMode" class="flash-overlay"></div>

    <!-- 关闭按钮 -->
    <div class="close-btn" @click="closePanic">
      <span>✕</span>
    </div>

    <!-- 主内容区 -->
    <div v-if="!cameraMode" class="content">
      <h1 class="panic-title">紧急求助</h1>
      <p class="panic-subtitle">选择一种干预方式帮助你度过这个时刻</p>

      <!-- 干预选项 -->
      <div class="intervention-options">
        <!-- 断念口诀模式 -->
        <div class="option-card glass-card mantra-card" @click="showMantra = true">
          <span class="option-icon">🧘</span>
          <h3 class="option-title">断念口诀</h3>
          <p class="option-desc">默念断念口诀，断除邪念</p>
        </div>

        <!-- 摄像头模式 -->
        <div class="option-card glass-card" @click="triggerCamera">
          <span class="option-icon">📷</span>
          <h3 class="option-title">看看现在的自己</h3>
          <p class="option-desc">打开前置摄像头，看着镜子中的自己</p>
        </div>

        <!-- 视觉冲击模式 -->
        <div class="option-card glass-card" @click="triggerFlash">
          <span class="option-icon">⚡</span>
          <h3 class="option-title">视觉冲击</h3>
          <p class="option-desc">屏幕快速闪烁，打破冲动思维</p>
        </div>

        <!-- 目标提醒模式 -->
        <div class="option-card glass-card" @click="showGoalsModal = true">
          <span class="option-icon">🎯</span>
          <h3 class="option-title">目标提醒</h3>
          <p class="option-desc">查看你戒色的初心和目标</p>
        </div>

        <!-- 震动模式 -->
        <div class="option-card glass-card" @click="triggerVibrate">
          <span class="option-icon">📳</span>
          <h3 class="option-title">强力震动</h3>
          <p class="option-desc">手机持续震动，打断冲动</p>
        </div>
      </div>

      <!-- 鼓励话语 -->
      <div class="encourage-section">
        <p class="encourage-text">{{ currentEncourage }}</p>
      </div>
    </div>

    <!-- 摄像头模式内容 -->
    <div v-if="cameraMode" class="camera-content">
      <div class="camera-overlay">
        <h2 class="camera-prompt">看着现在的自己</h2>
        <p class="camera-question">你确定要这样做吗？</p>
        <p class="camera-message">{{ cameraMessage }}</p>
      </div>
    </div>

    <!-- 目标提醒弹窗 -->
    <div v-if="showGoalsModal" class="modal-overlay" @click="showGoalsModal = false">
      <div class="goals-modal glass-card" @click.stop>
        <h2 class="goals-title">你的初心</h2>
        <div class="goals-list">
          <div v-for="(goal, idx) in goals" :key="idx" class="goal-item">
            <span class="goal-icon">{{ goal.icon }}</span>
            <span class="goal-text">{{ goal.text }}</span>
          </div>
        </div>
        <button class="close-goals-btn" @click="showGoalsModal = false">我记住了</button>
      </div>
    </div>

    <!-- 震动模式 -->
    <div v-if="vibrateMode" class="vibrate-overlay">
      <h2 class="vibrate-text">深呼吸...</h2>
      <p class="vibrate-hint">放松，深呼吸</p>
    </div>

    <!-- 断念口诀弹窗 -->
    <div v-if="showMantra" class="modal-overlay" @click="showMantra = false">
      <div class="mantra-modal glass-card" @click.stop>
        <h2 class="mantra-title">断念口诀</h2>
        <div class="mantra-content">
          <p class="mantra-line">念起即断</p>
          <p class="mantra-line">念起不随</p>
          <p class="mantra-line">念起即觉</p>
          <p class="mantra-line">觉之既无</p>
        </div>
        <p class="mantra-hint">默念四句，邪念自断</p>
        <button class="close-mantra-btn" @click="showMantra = false">我明白了</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 状态变量
const flashMode = ref(false)
const cameraMode = ref(false)
const vibrateMode = ref(false)
const showGoalsModal = ref(false)
const showMantra = ref(false)
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
    clearTimeout(flashTimer)
    flashMode.value = false
  }
  if (vibrateTimer) {
    clearTimeout(vibrateTimer)
    vibrateMode.value = false
  }

  router.back()
}

// 触发摄像头模式
const triggerCamera = () => {
  cameraMessage.value = cameraMessages[Math.floor(Math.random() * cameraMessages.length)]
  cameraMode.value = true

  // 尝试震动
  if (navigator.vibrate) {
    navigator.vibrate(1000)
  }
}

// 触发闪烁模式
const triggerFlash = () => {
  flashMode.value = true

  // 尝试震动
  if (navigator.vibrate) {
    navigator.vibrate(1000)
  }

  // 5秒后自动停止
  flashTimer = setTimeout(() => {
    flashMode.value = false
    alert('你已经度过了危机时刻')
  }, 5000)
}

// 触发震动模式
const triggerVibrate = () => {
  vibrateMode.value = true

  // 震动3秒
  if (navigator.vibrate) {
    navigator.vibrate(3000)
  }

  // 3秒后停止
  vibrateTimer = setTimeout(() => {
    vibrateMode.value = false
    alert('你已经度过了危机时刻')
  }, 3000)
}

// 页面卸载时清理
onUnmounted(() => {
  if (flashTimer) {
    clearTimeout(flashTimer)
  }
  if (vibrateTimer) {
    clearTimeout(vibrateTimer)
  }
})
</script>

<style scoped>
.panic-page {
  min-height: 100vh;
  min-height: 100dvh;
  position: relative;
  overflow: hidden;
  transition: background 0.1s ease;
}

.panic-page.flash-mode {
  background: #FF0000;
}

.panic-page.camera-mode {
  background: #000000;
}

.close-btn {
  position: fixed;
  top: 80px;
  right: 24px;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  font-size: 20px;
  color: #F8FAFC;
  cursor: pointer;
}

.content {
  position: relative;
  z-index: 5;
  padding: 120px 24px 32px;
}

.panic-title {
  font-size: 32px;
  font-weight: 700;
  color: #F8FAFC;
  text-align: center;
  margin-bottom: 10px;
}

.panic-subtitle {
  font-size: 15px;
  color: #94A3B8;
  text-align: center;
  margin-bottom: 32px;
}

.intervention-options {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.option-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option-card:active {
  transform: scale(0.98);
}

.option-icon {
  font-size: 28px;
  margin-bottom: 10px;
}

.option-title {
  font-size: 18px;
  font-weight: 600;
  color: #F8FAFC;
  margin-bottom: 4px;
}

.option-desc {
  font-size: 14px;
  color: #94A3B8;
}

.encourage-section {
  margin-top: 32px;
  text-align: center;
  padding: 20px;
}

.encourage-text {
  font-size: 18px;
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
  padding: 32px;
}

.camera-prompt {
  font-size: 28px;
  font-weight: 700;
  color: #F8FAFC;
  margin-bottom: 16px;
}

.camera-question {
  font-size: 20px;
  color: #EF4444;
  margin-bottom: 20px;
}

.camera-message {
  font-size: 18px;
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
  padding: 24px;
}

.goals-modal {
  width: 100%;
  padding: 28px;
}

.goals-title {
  font-size: 24px;
  font-weight: 700;
  color: #F8FAFC;
  text-align: center;
  margin-bottom: 20px;
}

.goals-list {
  margin-bottom: 20px;
}

.goal-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.goal-icon {
  font-size: 24px;
  margin-right: 12px;
}

.goal-text {
  font-size: 16px;
  color: #F8FAFC;
}

.close-goals-btn {
  width: 100%;
  height: 52px;
  background: linear-gradient(135deg, #3B82F6, #6366F1);
  border: none;
  border-radius: 12px;
  color: #F8FAFC;
  font-size: 17px;
  cursor: pointer;
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
  font-size: 36px;
  font-weight: 700;
  color: #F8FAFC;
  margin-bottom: 16px;
}

.vibrate-hint {
  font-size: 18px;
  color: #94A3B8;
}

/* 断念口诀样式 */
.mantra-card {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(99, 102, 241, 0.3));
  border: 1px solid rgba(139, 92, 246, 0.5);
}

.mantra-modal {
  width: 100%;
  padding: 32px 24px;
  text-align: center;
}

.mantra-title {
  font-size: 28px;
  font-weight: 700;
  color: #F8FAFC;
  margin-bottom: 28px;
  background: linear-gradient(135deg, #8B5CF6, #6366F1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.mantra-content {
  margin-bottom: 24px;
}

.mantra-line {
  font-family: 'KaiTi', 'STKaiti', '楷体', serif;
  font-size: 32px;
  font-weight: 700;
  color: #F8FAFC;
  margin: 16px 0;
  letter-spacing: 8px;
  text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
}

.mantra-hint {
  font-size: 14px;
  color: #94A3B8;
  margin-bottom: 24px;
}

.close-mantra-btn {
  width: 100%;
  height: 52px;
  background: linear-gradient(135deg, #8B5CF6, #6366F1);
  border: none;
  border-radius: 12px;
  color: #F8FAFC;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
}
</style>
