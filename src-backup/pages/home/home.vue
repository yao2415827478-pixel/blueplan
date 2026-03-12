<template>
  <view class="home-page">
    <!-- 动态背景 -->
    <view class="liquid-bg"></view>
    <view class="liquid-orb liquid-orb-1"></view>
    <view class="liquid-orb liquid-orb-2"></view>
    <view class="liquid-orb liquid-orb-3"></view>

    <!-- 顶部状态栏 -->
    <view class="status-bar">
      <view class="user-info">
        <text class="user-name">你好，战士</text>
        <text class="user-motto">今天也要坚持下去</text>
      </view>
      <view class="settings-icon" @click="openSettings">
        <text>⚙️</text>
      </view>
    </view>

    <!-- 主戒色天数展示 -->
    <view class="streak-section">
      <view class="streak-card glass-card">
        <text class="streak-label">戒色天数</text>
        <view class="streak-display">
          <text class="streak-days gradient-text">{{ streakData.days }}</text>
          <text class="streak-unit">天</text>
        </view>
        <view class="streak-time">
          <text>{{ streakData.hours }}小时 {{ streakData.minutes }}分钟</text>
        </view>
      </view>
    </view>

    <!-- 进度追踪 -->
    <view class="progress-section">
      <view class="section-header">
        <text class="section-title">里程碑进度</text>
      </view>
      <view class="milestones">
        <view
          v-for="milestone in milestones"
          :key="milestone.days"
          class="milestone-item"
          :class="{ achieved: streakData.days >= milestone.days }"
        >
          <view class="milestone-icon">
            <text v-if="streakData.days >= milestone.days">🏆</text>
            <text v-else>⭕</text>
          </view>
          <text class="milestone-days">{{ milestone.days }}天</text>
        </view>
      </view>
    </view>

    <!-- 今日任务 -->
    <view class="task-section">
      <view class="section-header">
        <text class="section-title">今日任务</text>
        <text class="section-action" @click="goToPlan">查看全部</text>
      </view>
      <view class="task-card glass-card">
        <view class="task-header">
          <text class="task-day">第{{ todayTask.day }}天</text>
          <text class="task-theme">{{ todayTask.theme }}</text>
        </view>
        <text class="task-content">{{ todayTask.task }}</text>
        <view class="task-actions">
          <button
            class="task-button"
            :class="{ completed: todayTask.completed }"
            @click="toggleTask"
          >
            {{ todayTask.completed ? '✅ 已完成' : '✅ 完成任务' }}
          </button>
        </view>
      </view>
    </view>

    <!-- 底部功能区 -->
    <view class="bottom-section">
      <!-- 快捷功能 -->
      <view class="quick-actions">
        <view class="action-item glass-card" @click="goToPlan">
          <text class="action-icon">📅</text>
          <text class="action-text">90天计划</text>
        </view>
        <view class="action-item glass-card" @click="showHistory">
          <text class="action-icon">📊</text>
          <text class="action-text">历史记录</text>
        </view>
      </view>

      <!-- 紧急求助按钮 -->
      <view class="panic-section">
        <text class="panic-label">需要帮助？</text>
        <view class="panic-button" @click="triggerPanic">
          <text class="panic-icon">🆘</text>
          <text class="panic-text">紧急求助</text>
        </view>
      </view>
    </view>

    <!-- 设置弹窗 -->
    <view v-if="showSettings" class="modal-overlay" @click="closeSettings">
      <view class="settings-modal glass-card" @click.stop>
        <text class="modal-title">设置</text>

        <view class="settings-item" @click="resetStreak">
          <text class="settings-text">重置戒色天数</text>
          <text class="settings-arrow">→</text>
        </view>

        <view class="settings-item" @click="viewReport">
          <text class="settings-text">查看评估报告</text>
          <text class="settings-arrow">→</text>
        </view>

        <view class="settings-item" @click="logout">
          <text class="settings-text">退出登录</text>
          <text class="settings-arrow">→</text>
        </view>

        <button class="close-button" @click="closeSettings">关闭</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 状态变量
const showSettings = ref(false)
const timer = ref(null)
const currentDay = ref(1)

// 计算戒色数据
const streakData = computed(() => {
  const startDate = uni.getStorageSync('startDate')
  if (!startDate) {
    return { days: 0, hours: 0, minutes: 0 }
  }

  const now = Date.now()
  const diff = now - startDate

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  // 计算当前是第几天
  currentDay.value = Math.min(days + 1, 90)

  return { days, hours, minutes }
})

// 里程碑数据
const milestones = ref([
  { days: 3 },
  { days: 7 },
  { days: 30 },
  { days: 60 },
  { days: 90 }
])

// 今日任务
const todayTask = computed(() => {
  const tasks = getTasks()
  const dayIndex = Math.min(currentDay.value - 1, tasks.length - 1)
  const task = tasks[dayIndex] || tasks[0]
  const completedDays = uni.getStorageSync('completedDays') || []
  return {
    ...task,
    completed: completedDays.includes(currentDay.value)
  }
})

// 获取任务数据
const getTasks = () => {
  return [
    { day: 1, theme: '开始新旅程', task: '今天是你戒色的第一天。花5分钟静坐，深呼吸，告诉自己：我值得拥有更好的生活。' },
    { day: 2, theme: '认识诱因', task: '写下最近让你产生冲动的时间和场景，提前做好应对准备。' },
    { day: 3, theme: '建立新习惯', task: '培养一个新的兴趣爱好，如运动、阅读或学习新技能。' },
    { day: 4, theme: '身体觉察', task: '进行15分钟的运动，让身体产生内啡肽，提升心情。' },
    { day: 5, theme: '情绪管理', task: '当感到焦虑或沮丧时，尝试用冥想或散步来转移注意力。' },
    { day: 6, theme: '社交支持', task: '与支持你的朋友或家人聊天，获得正能量。' },
    { day: 7, theme: '一周回顾', task: '回顾这一周的成功和挑战，为下一周制定计划。' }
  ]
}

// 切换任务完成状态
const toggleTask = () => {
  const completedDays = uni.getStorageSync('completedDays') || []
  const day = currentDay.value

  if (completedDays.includes(day)) {
    const index = completedDays.indexOf(day)
    completedDays.splice(index, 1)
  } else {
    completedDays.push(day)
  }

  uni.setStorageSync('completedDays', completedDays)
}

// 打开设置
const openSettings = () => {
  showSettings.value = true
}

// 关闭设置
const closeSettings = () => {
  showSettings.value = false
}

// 重置戒色天数
const resetStreak = () => {
  uni.showModal({
    title: '确认重置',
    content: '确定要重置戒色天数吗？这将重新开始你的戒色之旅。',
    success: (res) => {
      if (res.confirm) {
        uni.setStorageSync('startDate', Date.now())
        uni.setStorageSync('completedDays', [])
        closeSettings()
        uni.showToast({
          title: '已重置，开始新的旅程',
          icon: 'success'
        })
      }
    }
  })
}

// 查看报告
const viewReport = () => {
  closeSettings()
  uni.showToast({
    title: '查看评估报告',
    icon: 'none'
  })
}

// 退出登录
const logout = () => {
  uni.showModal({
    title: '确认退出',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        uni.removeStorageSync('isLoggedIn')
        uni.reLaunch({
          url: '/pages/login/login'
        })
      }
    }
  })
}

// 前往计划页面
const goToPlan = () => {
  uni.navigateTo({
    url: '/pages/plan/plan'
  })
}

// 显示历史记录
const showHistory = () => {
  uni.showToast({
    title: '历史记录功能开发中',
    icon: 'none'
  })
}

// 触发紧急求助
const triggerPanic = () => {
  uni.navigateTo({
    url: '/pages/panic/panic'
  })
}

// 定时更新
onMounted(() => {
  timer.value = setInterval(() => {
    // 强制更新视图
    streakData.value
  }, 60000)
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  padding-bottom: 200rpx;
}

.status-bar {
  position: relative;
  z-index: 10;
  padding: 140rpx 48rpx 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 40rpx;
  font-weight: 700;
  color: #F8FAFC;
}

.user-motto {
  font-size: 26rpx;
  color: #94A3B8;
}

.settings-icon {
  width: 80rpx;
  height: 80rpx;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36rpx;
}

.streak-section {
  padding: 0 48rpx;
  margin-bottom: 32rpx;
}

.streak-card {
  padding: 48rpx;
  text-align: center;
}

.streak-label {
  font-size: 28rpx;
  color: #94A3B8;
  display: block;
  margin-bottom: 16rpx;
}

.streak-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 12rpx;
}

.streak-days {
  font-size: 120rpx;
  font-weight: 700;
  line-height: 1;
}

.streak-unit {
  font-size: 40rpx;
  color: #94A3B8;
  margin-left: 8rpx;
}

.streak-time {
  font-size: 26rpx;
  color: #64748B;
}

.progress-section {
  padding: 0 48rpx;
  margin-bottom: 32rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #F8FAFC;
}

.section-action {
  font-size: 26rpx;
  color: #3B82F6;
}

.milestones {
  display: flex;
  justify-content: space-between;
  padding: 24rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24rpx;
}

.milestone-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.5;
  transition: all 0.3s ease;

  &.achieved {
    opacity: 1;
  }
}

.milestone-icon {
  font-size: 40rpx;
  margin-bottom: 8rpx;
}

.milestone-days {
  font-size: 22rpx;
  color: #94A3B8;
}

.task-section {
  padding: 0 48rpx;
}

.task-card {
  padding: 32rpx;
}

.task-header {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.task-day {
  font-size: 24rpx;
  color: #8B5CF6;
  background: rgba(139, 92, 246, 0.2);
  padding: 6rpx 16rpx;
  border-radius: 8rpx;
  margin-right: 16rpx;
}

.task-theme {
  font-size: 28rpx;
  font-weight: 600;
  color: #F8FAFC;
}

.task-content {
  font-size: 26rpx;
  color: #94A3B8;
  line-height: 1.8;
  display: block;
  margin-bottom: 24rpx;
}

.task-actions {
  display: flex;
  justify-content: flex-end;
}

.task-button {
  padding: 16rpx 32rpx;
  background: linear-gradient(135deg, #3B82F6, #6366F1);
  border: none;
  border-radius: 12rpx;
  color: #F8FAFC;
  font-size: 26rpx;

  &.completed {
    background: linear-gradient(135deg, #10B981, #059669);
  }
}

.bottom-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32rpx 48rpx 48rpx;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.8));
}

.quick-actions {
  display: flex;
  gap: 24rpx;
  margin-bottom: 32rpx;
}

.action-item {
  flex: 1;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.action-icon {
  font-size: 40rpx;
  margin-bottom: 12rpx;
}

.action-text {
  font-size: 24rpx;
  color: #F8FAFC;
}

.panic-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.panic-label {
  font-size: 24rpx;
  color: #64748B;
  margin-bottom: 16rpx;
}

.panic-button {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #EF4444, #DC2626);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 40rpx rgba(239, 68, 68, 0.5);
  animation: pulse 2s ease-in-out infinite;
}

.panic-icon {
  font-size: 40rpx;
  margin-bottom: 4rpx;
}

.panic-text {
  font-size: 22rpx;
  color: #F8FAFC;
  font-weight: 600;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 40rpx rgba(239, 68, 68, 0.5);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 60rpx rgba(239, 68, 68, 0.8);
    transform: scale(1.05);
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

.settings-modal {
  width: 100%;
  padding: 48rpx;
}

.modal-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #F8FAFC;
  display: block;
  margin-bottom: 32rpx;
  text-align: center;
}

.settings-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28rpx 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.settings-text {
  font-size: 28rpx;
  color: #F8FAFC;
}

.settings-arrow {
  font-size: 28rpx;
  color: #64748B;
}

.close-button {
  width: 100%;
  height: 80rpx;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16rpx;
  color: #F8FAFC;
  font-size: 28rpx;
  margin-top: 32rpx;
}
</style>
