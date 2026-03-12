<template>
  <view class="survey-page">
    <!-- 动态背景 -->
    <view class="liquid-bg"></view>
    <view class="liquid-orb liquid-orb-1"></view>
    <view class="liquid-orb liquid-orb-2"></view>

    <!-- 顶部进度 -->
    <view class="progress-header">
      <view class="progress-bar">
        <view class="progress-fill" :style="{ width: progressWidth }"></view>
      </view>
      <text class="progress-text">{{ currentIndex + 1 }} / {{ questions.length }}</text>
    </view>

    <!-- 问卷内容 -->
    <view class="question-container">
      <view class="question-card glass-card" :class="{ 'slide-out': isSlidingOut, 'slide-in': isSlidingIn }">
        <text class="question-number">问题 {{ currentIndex + 1 }}</text>
        <text class="question-text">{{ currentQuestion.text }}</text>

        <!-- 选项列表 -->
        <view class="options-list">
          <view
            v-for="(option, idx) in currentQuestion.options"
            :key="idx"
            class="option-item"
            :class="{ selected: answers[currentIndex] === option.score }"
            @click="selectOption(option.score)"
          >
            <view class="option-indicator">
              <view v-if="answers[currentIndex] === option.score" class="option-checked"></view>
            </view>
            <text class="option-text">{{ option.text }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="action-bar">
      <button
        v-if="currentIndex > 0"
        class="nav-button prev-button"
        @click="prevQuestion"
      >
        上一题
      </button>
      <button
        class="nav-button next-button glass-button"
        :disabled="answers[currentIndex] === null"
        @click="nextQuestion"
      >
        {{ currentIndex === questions.length - 1 ? '查看结果' : '下一题' }}
      </button>
    </view>

    <!-- 结果弹窗 -->
    <view v-if="showResult" class="result-overlay">
      <view class="result-modal glass-card">
        <text class="result-title">评估结果</text>

        <!-- 依赖程度评分 -->
        <view class="score-section">
          <view class="score-circle">
            <text class="score-value gradient-text">{{ dependencyScore }}</text>
            <text class="score-label">依赖程度</text>
          </view>
          <view class="score-level">
            <text class="level-text">{{ getScoreLevel() }}</text>
            <text class="level-desc">{{ getScoreDescription() }}</text>
          </view>
        </view>

        <!-- 详细分析 -->
        <view class="analysis-section">
          <text class="analysis-title">详细分析</text>
          <view class="analysis-item" v-for="(item, idx) in analysisItems" :key="idx">
            <text class="analysis-label">{{ item.label }}</text>
            <text class="analysis-value">{{ item.value }}</text>
          </view>
        </view>

        <!-- 建议 -->
        <view class="suggestion-section">
          <text class="suggestion-title">个性化建议</text>
          <text class="suggestion-text">{{ suggestion }}</text>
        </view>

        <!-- 按钮 -->
        <button class="result-button glass-button" @click="goToLogin">
          继续登录
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 问卷问题
const questions = ref([
  {
    text: '你多久会遇到一次强烈的冲动？',
    options: [
      { text: '很少，几乎没有', score: 1 },
      { text: '偶尔，每周1-2次', score: 2 },
      { text: '经常，每周3-5次', score: 3 },
      { text: '很频繁，每天都有', score: 4 },
      { text: '极度频繁，一天多次', score: 5 }
    ]
  },
  {
    text: '当冲动来临时，你通常能控制自己吗？',
    options: [
      { text: '完全能控制', score: 1 },
      { text: '大部分时候能', score: 2 },
      { text: '有时能，有时不能', score: 3 },
      { text: '很少能控制', score: 4 },
      { text: '完全无法控制', score: 5 }
    ]
  },
  {
    text: '你平均多久会破戒一次？',
    options: [
      { text: '从未破戒', score: 1 },
      { text: '每月不到1次', score: 2 },
      { text: '每月1-3次', score: 3 },
      { text: '每周1-3次', score: 4 },
      { text: '几乎每天', score: 5 }
    ]
  },
  {
    text: '破戒后你通常有什么感受？',
    options: [
      { text: '轻微自责，能很快调整', score: 1 },
      { text: '有些后悔和沮丧', score: 2 },
      { text: '强烈的自责和愧疚', score: 3 },
      { text: '极度的自我厌恶', score: 4 },
      { text: '麻木，无所谓', score: 5 }
    ]
  },
  {
    text: '这个问题对你的生活影响有多大？',
    options: [
      { text: '几乎没有影响', score: 1 },
      { text: '轻微影响', score: 2 },
      { text: '中等影响', score: 3 },
      { text: '严重影响', score: 4 },
      { text: '完全失控', score: 5 }
    ]
  },
  {
    text: '你尝试过戒色吗？',
    options: [
      { text: '从未想过', score: 1 },
      { text: '想过但没行动', score: 2 },
      { text: '尝试过但失败了', score: 3 },
      { text: '多次尝试，有成功有失败', score: 4 },
      { text: '一直在努力戒色', score: 5 }
    ]
  },
  {
    text: '你破戒的主要诱因是什么？',
    options: [
      { text: '压力和情绪', score: 3 },
      { text: '无聊和孤独', score: 3 },
      { text: '接触了相关内容', score: 4 },
      { text: '没有特定诱因', score: 2 },
      { text: '习惯性行为', score: 5 }
    ]
  },
  {
    text: '你的社交生活受影响了吗？',
    options: [
      { text: '完全没有', score: 1 },
      { text: '轻微影响', score: 2 },
      { text: '中等影响', score: 3 },
      { text: '很大影响', score: 4 },
      { text: '完全封闭自己', score: 5 }
    ]
  },
  {
    text: '你的工作/学习效率受影响了吗？',
    options: [
      { text: '完全没有', score: 1 },
      { text: '轻微影响', score: 2 },
      { text: '中等影响', score: 3 },
      { text: '很大影响', score: 4 },
      { text: '完全无法正常工作学习', score: 5 }
    ]
  },
  {
    text: '你对戒色有多大决心？',
    options: [
      { text: '非常坚定', score: 1 },
      { text: '比较坚定', score: 2 },
      { text: '一般', score: 3 },
      { text: '有些动摇', score: 4 },
      { text: '不确定', score: 5 }
    ]
  }
])

// 状态变量
const currentIndex = ref(0)
const answers = ref(new Array(questions.value.length).fill(null))
const isSlidingOut = ref(false)
const isSlidingIn = ref(false)
const showResult = ref(false)
const dependencyScore = ref(0)

// 计算属性
const progressWidth = computed(() => {
  return `${((currentIndex.value + 1) / questions.value.length) * 100}%`
})

const currentQuestion = computed(() => {
  return questions.value[currentIndex.value]
})

// 选择选项
const selectOption = (score) => {
  answers.value[currentIndex.value] = score
}

// 下一题
const nextQuestion = () => {
  if (currentIndex.value === questions.value.length - 1) {
    calculateResult()
  } else {
    isSlidingOut.value = true
    setTimeout(() => {
      currentIndex.value++
      isSlidingOut.value = false
      isSlidingIn.value = true
      setTimeout(() => {
        isSlidingIn.value = false
      }, 300)
    }, 300)
  }
}

// 上一题
const prevQuestion = () => {
  if (currentIndex.value > 0) {
    isSlidingOut.value = true
    setTimeout(() => {
      currentIndex.value--
      isSlidingOut.value = false
      isSlidingIn.value = true
      setTimeout(() => {
        isSlidingIn.value = false
      }, 300)
    }, 300)
  }
}

// 计算结果
const calculateResult = () => {
  let totalScore = 0
  let answeredCount = 0

  answers.value.forEach(score => {
    if (score !== null) {
      totalScore += score
      answeredCount++
    }
  })

  // 转换为0-100分
  const maxScore = answeredCount * 5
  dependencyScore.value = Math.round((totalScore / maxScore) * 100)

  // 保存评估结果
  uni.setStorageSync('surveyResult', {
    score: dependencyScore.value,
    answers: answers.value,
    timestamp: Date.now()
  })

  showResult.value = true
}

// 获取评分等级
const getScoreLevel = () => {
  const score = dependencyScore.value
  if (score < 20) return '轻度依赖'
  if (score < 40) return '轻度依赖'
  if (score < 60) return '中度依赖'
  if (score < 80) return '高度依赖'
  return '重度依赖'
}

// 获取评分描述
const getScoreDescription = () => {
  const score = dependencyScore.value
  if (score < 20) return '你的状态很好，只需要保持即可'
  if (score < 40) return '你有轻微的依赖倾向，建议开始90天计划'
  if (score < 60) return '你处于中度依赖状态，需要认真对待'
  if (score < 80) return '你的依赖程度较高，需要系统性的帮助'
  return '你的情况比较严重，建议寻求专业帮助'
}

// 分析项目
const analysisItems = computed(() => {
  const score = dependencyScore.value
  return [
    { label: '冲动频率', value: getImpulseFrequency() },
    { label: '自控能力', value: getSelfControl() },
    { label: '破戒周期', value: getRelapseCycle() },
    { label: '建议周期', value: getRecommendedDuration() }
  ]
})

const getImpulseFrequency = () => {
  const answer = answers.value[0]
  if (answer <= 2) return '良好'
  if (answer <= 3) return '一般'
  return '需要改善'
}

const getSelfControl = () => {
  const answer = answers.value[1]
  if (answer <= 2) return '较强'
  if (answer <= 3) return '一般'
  return '较弱'
}

const getRelapseCycle = () => {
  const answer = answers.value[2]
  if (answer <= 2) return '较长'
  if (answer <= 3) return '一般'
  return '较短'
}

const getRecommendedDuration = () => {
  const score = dependencyScore.value
  if (score < 40) return '30天'
  if (score < 70) return '60天'
  return '90天'
}

// 建议
const suggestion = computed(() => {
  const score = dependencyScore.value
  if (score < 20) {
    return '你的状态非常好！建议从30天计划开始，保持当前良好的生活习惯，坚持每日冥想和运动。如果出现特殊情况，可以使用紧急求助功能。'
  }
  if (score < 40) {
    return '你有一定的依赖倾向，建议从60天计划开始。每天完成计划任务，保持积极的生活态度。如果遇到困难，记得使用紧急求助按钮。'
  }
  if (score < 70) {
    return '你的依赖程度中等，建议从90天计划开始。神经科学的恢复需要时间，请保持耐心。每天完成计划任务，必要时使用紧急求助功能。'
  }
  return '你的情况需要认真对待。建议从90天计划开始，并考虑寻求专业帮助。记住，你不是一个人，我们一起努力。每日坚持使用紧急求助功能，它会在关键时刻帮助你。'
})

// 前往登录
const goToLogin = () => {
  uni.setStorageSync('hasCompletedSurvey', true)
  uni.navigateTo({
    url: '/pages/login/login'
  })
}
</script>

<style lang="scss" scoped>
.survey-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.progress-header {
  position: relative;
  z-index: 10;
  padding: 140rpx 48rpx 32rpx;
}

.progress-bar {
  height: 8rpx;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4rpx;
  overflow: hidden;
  margin-bottom: 16rpx;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3B82F6, #8B5CF6);
  border-radius: 4rpx;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 24rpx;
  color: #94A3B8;
}

.question-container {
  flex: 1;
  padding: 0 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.question-card {
  width: 100%;
  padding: 48rpx;
  transition: all 0.3s ease;
}

.slide-out {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-in {
  transform: translateX(100%);
  opacity: 0;
}

.question-number {
  font-size: 24rpx;
  color: #8B5CF6;
  font-weight: 600;
  margin-bottom: 16rpx;
  display: block;
}

.question-text {
  font-size: 36rpx;
  font-weight: 600;
  color: #F8FAFC;
  line-height: 1.5;
  margin-bottom: 40rpx;
  display: block;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.option-item {
  display: flex;
  align-items: center;
  padding: 28rpx 24rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  transition: all 0.2s ease;

  &.selected {
    background: rgba(59, 130, 246, 0.15);
    border-color: #3B82F6;
  }

  &:active {
    transform: scale(0.98);
  }
}

.option-indicator {
  width: 40rpx;
  height: 40rpx;
  border: 2rpx solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  margin-right: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-checked {
  width: 24rpx;
  height: 24rpx;
  background: #3B82F6;
  border-radius: 50%;
}

.option-text {
  font-size: 28rpx;
  color: #F8FAFC;
  flex: 1;
}

.action-bar {
  position: relative;
  z-index: 10;
  padding: 32rpx 48rpx 48rpx;
  display: flex;
  gap: 24rpx;
}

.nav-button {
  flex: 1;
  height: 96rpx;
  border-radius: 24rpx;
  font-size: 30rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: #F8FAFC;

  &.next-button {
    background: linear-gradient(135deg, #3B82F6, #6366F1);
    border: none;
  }

  &[disabled] {
    opacity: 0.5;
  }
}

.result-overlay {
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

.result-modal {
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 48rpx;
}

.result-title {
  font-size: 40rpx;
  font-weight: 700;
  color: #F8FAFC;
  display: block;
  text-align: center;
  margin-bottom: 40rpx;
}

.score-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40rpx;
}

.score-circle {
  width: 200rpx;
  height: 200rpx;
  background: rgba(59, 130, 246, 0.1);
  border: 4rpx solid #3B82F6;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 24rpx;
}

.score-value {
  font-size: 64rpx;
  font-weight: 700;
}

.score-label {
  font-size: 24rpx;
  color: #94A3B8;
}

.score-level {
  text-align: center;
}

.level-text {
  font-size: 32rpx;
  font-weight: 600;
  color: #F8FAFC;
  display: block;
  margin-bottom: 8rpx;
}

.level-desc {
  font-size: 26rpx;
  color: #94A3B8;
}

.analysis-section {
  margin-bottom: 40rpx;
}

.analysis-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #F8FAFC;
  display: block;
  margin-bottom: 20rpx;
}

.analysis-item {
  display: flex;
  justify-content: space-between;
  padding: 16rpx 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.analysis-label {
  font-size: 26rpx;
  color: #94A3B8;
}

.analysis-value {
  font-size: 26rpx;
  color: #F8FAFC;
}

.suggestion-section {
  margin-bottom: 40rpx;
}

.suggestion-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #F8FAFC;
  display: block;
  margin-bottom: 16rpx;
}

.suggestion-text {
  font-size: 26rpx;
  color: #94A3B8;
  line-height: 1.8;
}

.result-button {
  width: 100%;
  height: 96rpx;
  font-size: 32rpx;
}
</style>
