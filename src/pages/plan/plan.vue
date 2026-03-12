<template>
  <view class="plan-page">
    <!-- 动态背景 -->
    <view class="liquid-bg"></view>
    <view class="liquid-orb liquid-orb-1"></view>
    <view class="liquid-orb liquid-orb-2"></view>

    <!-- 顶部导航 -->
    <view class="nav-header">
      <view class="back-button" @click="goBack">
        <text>←</text>
      </view>
      <text class="nav-title">90天恢复计划</text>
      <view class="placeholder"></view>
    </view>

    <!-- 进度指示 -->
    <view class="progress-indicator">
      <view class="progress-bar">
        <view class="progress-fill" :style="{ width: progressWidth }"></view>
      </view>
      <text class="progress-text">第 {{ currentDay }} / 90 天</text>
    </view>

    <!-- 任务列表 -->
    <scroll-view class="task-list" scroll-y>
      <view
        v-for="task in allTasks"
        :key="task.day"
        class="task-item glass-card"
        :class="{ locked: task.day > currentDay, completed: isCompleted(task.day) }"
        @click="selectTask(task)"
      >
        <view class="task-day-badge">
          <text>Day {{ task.day }}</text>
        </view>
        <view class="task-info">
          <text class="task-theme">{{ task.theme }}</text>
          <text class="task-preview">{{ task.task.substring(0, 50) }}...</text>
        </view>
        <view class="task-status">
          <text v-if="isCompleted(task.day)" class="status-completed">✓</text>
          <text v-else-if="task.day > currentDay" class="status-locked">🔒</text>
          <text v-else class="status-current">进行中</text>
        </view>
      </view>
    </scroll-view>

    <!-- 任务详情弹窗 -->
    <view v-if="selectedTask" class="modal-overlay" @click="closeModal">
      <view class="task-modal glass-card" @click.stop>
        <view class="modal-header">
          <view class="modal-day-badge">
            <text>第 {{ selectedTask.day }} 天</text>
          </view>
          <text class="modal-theme">{{ selectedTask.theme }}</text>
        </view>

        <view class="modal-content">
          <text class="content-text">{{ selectedTask.task }}</text>

          <!-- 神经科学知识 -->
          <view class="knowledge-section">
            <text class="section-label">🧠 神经科学知识</text>
            <text class="knowledge-text">{{ selectedTask.knowledge }}</text>
          </view>

          <!-- 行动任务 -->
          <view class="action-section">
            <text class="section-label">🎯 今日行动</text>
            <text class="action-text">{{ selectedTask.action }}</text>
          </view>

          <!-- 反思提示 -->
          <view class="reflection-section">
            <text class="section-label">💭 自我反思</text>
            <text class="reflection-text">{{ selectedTask.reflection }}</text>
          </view>
        </view>

        <view class="modal-actions">
          <button
            class="complete-button glass-button"
            :class="{ completed: isCompleted(selectedTask.day) }"
            @click="completeTask(selectedTask.day)"
          >
            {{ isCompleted(selectedTask.day) ? '✅ 已完成' : '完成任务' }}
          </button>
          <button class="close-modal-button" @click="closeModal">
            关闭
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 状态变量
const selectedTask = ref(null)

// 获取当前天数
const getCurrentDay = () => {
  const startDate = uni.getStorageSync('startDate')
  if (!startDate) return 1

  const now = Date.now()
  const diff = now - startDate
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  return Math.min(days + 1, 90)
}

const currentDay = ref(getCurrentDay())

// 计算进度
const progressWidth = computed(() => {
  return `${(currentDay.value / 90) * 100}%`
})

// 检查任务是否完成
const isCompleted = (day) => {
  const completedDays = uni.getStorageSync('completedDays') || []
  return completedDays.includes(day)
}

// 90天任务数据
const allTasks = ref([
  {
    day: 1,
    theme: '开始新旅程',
    task: '今天是你戒色的第一天。这是一个全新的开始。闭上眼睛，深呼吸5分钟，感受内心的平静。告诉自己：我值得拥有更好的生活。',
    knowledge: '戒色的第一天，你的大脑开始适应没有额外多巴胺刺激的状态。这是重塑神经通路的开始。',
    action: '花5分钟静坐冥想，专注于呼吸。写下你戒色的三个主要原因。',
    reflection: '今天你感觉如何？是什么让你决定开始这个旅程？'
  },
  {
    day: 2,
    theme: '认识诱因',
    task: '了解自己的诱因是成功的关键。哪些时间、场景或情绪最容易触发你的冲动？提前识别它们。',
    knowledge: '大脑会形成\"触发-反应\"的神经通路。通过识别诱因，你可以提前准备替代方案。',
    action: '列出最近让你产生冲动的3个场景。为每个场景想一个替代行为。',
    reflection: '你发现自己最大的诱因是什么？你打算如何应对？'
  },
  {
    day: 3,
    theme: '建立新习惯',
    task: '用积极的新习惯替代旧习惯。运动、学习、社交都是很好的选择。',
    knowledge: '习惯形成需要66天。持续的重复会帮助大脑建立新的神经通路。',
    action: '选择一个你感兴趣的活动，如跑步、阅读或学习新技能。今天开始行动。',
    reflection: '今天你尝试了什么新活动？感觉如何？'
  },
  {
    day: 4,
    theme: '身体觉察',
    task: '身体和心理是紧密连接的。运动能促进内啡肽分泌，提升情绪。',
    knowledge: '运动可以增加前额叶皮层的活动，提高自控能力。每次运动后，大脑会进入更平静的状态。',
    action: '进行至少15分钟的中等强度运动，如跑步、游泳或健身。',
    reflection: '运动后你感觉有什么不同？'
  },
  {
    day: 5,
    theme: '情绪管理',
    task: '情绪波动是正常的。学会用健康的方式处理负面情绪，而不是逃避。',
    knowledge: '情绪低落时，大脑会寻求快速的慰藉。了解这一点可以帮助你做出更好的选择。',
    action: '当感到焦虑或沮丧时，尝试深呼吸、冥想或散步。记录下你的感受。',
    reflection: '今天你遇到了什么情绪挑战？你是如何应对的？'
  },
  {
    day: 6,
    theme: '社交支持',
    task: '与支持你的人在一起可以获得正能量。孤独会让我们更容易受到诱惑。',
    knowledge: '社会支持可以降低压力激素皮质醇的水平，提高自控力。',
    action: '与朋友或家人聊天，或者参加一个社交活动。',
    reflection: '谁是你最坚强的后盾？今天你和他们联系了吗？'
  },
  {
    day: 7,
    theme: '一周回顾',
    task: '回顾第一周的成功和挑战。为下一周制定更好的计划。',
    knowledge: '自我反思是持续成长的关键。每周回顾可以帮助你发现问题并改进。',
    action: '写下这一周的收获和挑战。制定下周的3个目标。',
    reflection: '这一周你最大的成就是什么？学到了什么？'
  },
  {
    day: 8,
    theme: '应对无聊',
    task: '无聊时最容易产生冲动。学会用有意义的方式填充时间。',
    knowledge: '无聊是大脑寻找刺激的信号。提前准备一些活动可以避免冲动。',
    action: '创建一个\"当我无聊时\"的活动清单。今天开始尝试。',
    reflection: '什么时候你最容易感到无聊？你会怎么做？'
  },
  {
    day: 9,
    theme: '睡前仪式',
    task: '睡前的习惯对第二天有很大影响。建立健康的睡前仪式。',
    knowledge: '睡眠不足会削弱前额叶的功能，影响自控力。良好的睡眠是成功的基础。',
    action: '建立睡前30分钟的放松仪式，如阅读、冥想或听音乐。避免使用手机。',
    reflection: '你的睡眠质量如何？有什么需要改进的？'
  },
  {
    day: 10,
    theme: '应对复发',
    task: '如果不小心破戒了，不要自责。重要的是如何重新开始。',
    knowledge: '复发是恢复过程的一部分，不是终点。每次复发都是学习的机会。',
    action: '分析今天破戒的原因。制定避免再次发生的具体计划。',
    reflection: '如果发生了，你会怎么对待自己？'
  },
  // 继续更多任务...
  {
    day: 11,
    theme: '正念练习',
    task: '正念可以帮助你在冲动来临时保持清醒。',
    knowledge: '正念训练可以增强前额叶对边缘系统的控制。',
    action: '每天进行10分钟的正念冥想。',
    reflection: '正念练习给你带来了什么感受？'
  },
  {
    day: 12,
    theme: '目标设定',
    task: '设定清晰的长期和短期目标可以保持动力。',
    knowledge: '具体的目标更容易实现，也更能激励我们。',
    action: '写下30天、60天、90天的目标。',
    reflection: '90天后你希望成为什么样的人？'
  },
  {
    day: 13,
    theme: '环境管理',
    task: '优化你的生活环境，减少诱惑的出现。',
    knowledge: '环境线索会触发特定的行为。控制环境就是控制行为。',
    action: '清理可能触发你的物品和内容。',
    reflection: '你需要做出什么环境改变？'
  },
  {
    day: 14,
    theme: '两周里程碑',
    task: '恭喜你完成了两周！这是一个重要的里程碑。',
    knowledge: '研究表明，习惯形成通常需要2-4周。你已经走在正确的道路上。',
    action: '庆祝这个里程碑。给自己一个小奖励。',
    reflection: '这两周你感觉有什么变化？'
  },
  {
    day: 15,
    theme: '压力应对',
    task: '学会健康地处理压力，而不是用旧习惯逃避。',
    knowledge: '压力会降低自控力。学会放松技巧很重要。',
    action: '尝试一种新的放松方式，如瑜伽或太极。',
    reflection: '你通常如何应对压力？'
  },
  {
    day: 16,
    theme: '数字排毒',
    task: '减少使用手机和电脑的时间，特别是晚上。',
    knowledge: '屏幕发出的蓝光会影响睡眠质量。',
    action: '设定每天的\"屏幕时间\"限制。',
    reflection: '你每天花多少时间在屏幕上？'
  },
  {
    day: 17,
    theme: '感恩日记',
    task: '每天写下感恩的事情可以提升幸福感。',
    knowledge: '感恩练习可以改变大脑的消极倾向。',
    action: '写下今天让你感恩的三件事。',
    reflection: '今天你感恩什么？'
  },
  {
    day: 18,
    theme: '自我同情',
    task: '对自己温柔一点。自我批评会降低动力。',
    knowledge: '自我同情与更大的心理弹性相关。',
    action: '对自己说一些鼓励的话。',
    reflection: '你通常如何评价自己？'
  },
  {
    day: 19,
    theme: '早晨仪式',
    task: '建立积极的早晨习惯，为一天奠定基础。',
    knowledge: '早晨的决定会影响全天的选择。',
    action: '创建一个早晨仪式，包括运动和积极的自我对话。',
    reflection: '你的早晨习惯是什么？'
  },
  {
    day: 20,
    theme: '能量管理',
    task: '保持身体能量充足，避免因疲劳而冲动。',
    knowledge: '血糖波动会影响情绪和自控力。',
    action: '保持规律的饮食习惯。',
    reflection: '你的饮食规律吗？'
  }
])

// 选择任务
const selectTask = (task) => {
  if (task.day <= currentDay.value) {
    selectedTask.value = task
  }
}

// 关闭弹窗
const closeModal = () => {
  selectedTask.value = null
}

// 完成今日任务
const completeTask = (day) => {
  const completedDays = uni.getStorageSync('completedDays') || []

  if (!completedDays.includes(day)) {
    completedDays.push(day)
    uni.setStorageSync('completedDays', completedDays)

    uni.showToast({
      title: '任务完成！',
      icon: 'success'
    })

    setTimeout(() => {
      closeModal()
    }, 1000)
  }
}

// 返回
const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.plan-page {
  min-height: 100vh;
  position: relative;
}

.nav-header {
  position: relative;
  z-index: 10;
  padding: 140rpx 48rpx 32rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-button {
  width: 80rpx;
  height: 80rpx;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36rpx;
  color: #F8FAFC;
}

.nav-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #F8FAFC;
}

.placeholder {
  width: 80rpx;
}

.progress-indicator {
  padding: 0 48rpx;
  margin-bottom: 32rpx;
}

.progress-bar {
  height: 8rpx;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4rpx;
  overflow: hidden;
  margin-bottom: 12rpx;
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

.task-list {
  padding: 0 48rpx;
  padding-bottom: 48rpx;
  height: calc(100vh - 300rpx);
}

.task-item {
  display: flex;
  align-items: center;
  padding: 28rpx;
  margin-bottom: 20rpx;
  opacity: 1;
  transition: all 0.3s ease;

  &.locked {
    opacity: 0.4;
  }

  &.completed {
    opacity: 0.8;
    border-color: #10B981;
  }

  &:active {
    transform: scale(0.98);
  }
}

.task-day-badge {
  background: linear-gradient(135deg, #3B82F6, #6366F1);
  padding: 12rpx 16rpx;
  border-radius: 12rpx;
  margin-right: 20rpx;
  flex-shrink: 0;

  text {
    font-size: 22rpx;
    font-weight: 600;
    color: #F8FAFC;
  }
}

.task-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.task-theme {
  font-size: 28rpx;
  font-weight: 600;
  color: #F8FAFC;
  margin-bottom: 8rpx;
}

.task-preview {
  font-size: 24rpx;
  color: #94A3B8;
}

.task-status {
  margin-left: 20rpx;
}

.status-completed {
  color: #10B981;
  font-size: 32rpx;
}

.status-locked {
  font-size: 28rpx;
}

.status-current {
  font-size: 22rpx;
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
  padding: 32rpx;
}

.task-modal {
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  padding: 40rpx;
}

.modal-header {
  margin-bottom: 32rpx;
}

.modal-day-badge {
  display: inline-block;
  background: linear-gradient(135deg, #3B82F6, #6366F1);
  padding: 8rpx 20rpx;
  border-radius: 8rpx;
  margin-bottom: 16rpx;

  text {
    font-size: 24rpx;
    font-weight: 600;
    color: #F8FAFC;
  }
}

.modal-theme {
  font-size: 40rpx;
  font-weight: 700;
  color: #F8FAFC;
}

.modal-content {
  margin-bottom: 32rpx;
}

.content-text {
  font-size: 28rpx;
  color: #F8FAFC;
  line-height: 1.8;
  display: block;
  margin-bottom: 32rpx;
}

.knowledge-section,
.action-section,
.reflection-section {
  margin-bottom: 28rpx;
  padding: 24rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16rpx;
}

.section-label {
  font-size: 26rpx;
  font-weight: 600;
  color: #8B5CF6;
  display: block;
  margin-bottom: 12rpx;
}

.knowledge-text,
.action-text,
.reflection-text {
  font-size: 26rpx;
  color: #94A3B8;
  line-height: 1.7;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.complete-button {
  width: 100%;
  height: 96rpx;
  font-size: 32rpx;

  &.completed {
    background: linear-gradient(135deg, #10B981, #059669);
  }
}

.close-modal-button {
  width: 100%;
  height: 80rpx;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16rpx;
  color: #94A3B8;
  font-size: 28rpx;
}
</style>
