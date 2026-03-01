<template>
  <div class="home-page">
    <div class="liquid-bg"></div>
    <div class="liquid-orb liquid-orb-1"></div>
    <div class="liquid-orb liquid-orb-2"></div>
    <div class="liquid-orb liquid-orb-3"></div>

    <div class="status-bar">
      <div class="user-info">
        <span class="user-name">你好，战士</span>
        <span class="user-motto">{{ getMotto() }}</span>
      </div>
      <div class="settings-icon" @click="showSettings = true">
        <span>S</span>
      </div>
    </div>

    <div class="streak-section">
      <div class="streak-card glass-card">
        <span class="streak-label">戒色天数</span>
        <div class="streak-display">
          <span class="streak-days gradient-text">{{ streakData.days }}</span>
          <span class="streak-unit">天</span>
        </div>
        <div class="streak-time">
          <span>{{ streakData.hours }}小时 {{ streakData.minutes }}分钟</span>
        </div>
        <div class="stats-row">
          <div class="stat-item">
            <span class="stat-value">{{ stats.timeSaved }}</span>
            <span class="stat-label">节省时间</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">{{ stats.currentStreak }}</span>
            <span class="stat-label">当前连续</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">{{ stats.totalDays }}</span>
            <span class="stat-label">总计天数</span>
          </div>
        </div>
      </div>
    </div>

    <div class="progress-section">
      <div class="section-header">
        <span class="section-title">里程碑进度</span>
        <span class="section-action" @click="showMilestones = true">查看全部</span>
      </div>

      <!-- 进度条 -->
      <div class="progress-bar-container glass-card">
        <div class="progress-info">
          <span class="progress-label">距离下一个里程碑</span>
          <span class="progress-value">{{ nextMilestone.days - streakData.days }} 天</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill-quitter" :style="{ width: progressToNextMilestone + '%' }"></div>
        </div>
        <div class="milestone-markers">
          <span>第{{ currentMilestone.days }}天</span>
          <span>第{{ nextMilestone.days }}天</span>
        </div>
      </div>

      <!-- 里程碑徽章 -->
      <div class="milestones">
        <div v-for="milestone in milestones" :key="milestone.days" class="milestone-item" :class="{ achieved: streakData.days >= milestone.days }">
          <div class="milestone-icon">
            <span v-if="streakData.days >= milestone.days">{{ milestone.icon }}</span>
            <span v-else>{{ milestone.days }}</span>
          </div>
          <span class="milestone-days">{{ milestone.days }}天</span>
        </div>
      </div>
    </div>

    <div class="calendar-section">
      <div class="section-header">
        <span class="section-title">进度日历</span>
      </div>
      <div class="calendar-container glass-card">
        <!-- 月份导航 -->
        <div class="calendar-nav">
          <span class="calendar-month">{{ currentMonthName }}</span>
        </div>
        <!-- 日历头部 -->
        <div class="calendar-weekdays">
          <span>日</span>
          <span>一</span>
          <span>二</span>
          <span>三</span>
          <span>四</span>
          <span>五</span>
          <span>六</span>
        </div>
        <!-- 日历网格 -->
        <div class="calendar-grid">
          <div
            v-for="day in monthCalendarDays"
            :key="day.date"
            class="calendar-day"
            :class="{
              'completed': day.completed,
              'today': day.isToday,
              'future': day.isFuture,
              'has-entry': day.mood,
              'other-month': day.isOtherMonth
            }"
            @click="selectCalendarDay(day)"
          >
            <span class="day-number">{{ day.dayNum }}</span>
            <span v-if="day.mood" class="day-mood">{{ day.mood }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 日历日期详情弹窗 -->
    <div v-if="showCalendarDay" class="modal-overlay" @click="showCalendarDay = false">
      <div class="calendar-day-modal glass-card" @click.stop>
        <h3 class="modal-title">{{ selectedDayTitle }}</h3>

        <div v-if="selectedDayEntries.length > 0" class="day-entries">
          <div v-for="entry in selectedDayEntries" :key="entry.id" class="day-entry">
            <div v-if="entry.topic" class="entry-topic">
              <span class="topic-badge">主题：{{ entry.topic }}</span>
            </div>
            <div class="entry-time-mood">
              <span class="entry-mood-large">{{ getMoodEmoji(entry.mood) }}</span>
              <span class="entry-time-text">{{ formatEntryTime(entry.date) }}</span>
            </div>
            <p class="entry-content">{{ entry.text }}</p>
          </div>
        </div>

        <div v-else class="no-entries">
          <span class="no-entries-emoji">📝</span>
          <p>这一天没有日记记录</p>
        </div>

        <button class="close-btn" @click="showCalendarDay = false">关闭</button>
      </div>
    </div>

    <div class="quick-actions">
      <div class="action-item glass-card" @click="router.push('/plan')">
        <span class="action-icon">C</span>
        <span class="action-text">90天计划</span>
      </div>
      <div class="action-item glass-card" @click="showJournal = true">
        <span class="action-icon">J</span>
        <span class="action-text">日记</span>
      </div>
      <div class="action-item glass-card" @click="showStats = true">
        <span class="action-icon">S</span>
        <span class="action-text">详细统计</span>
      </div>
    </div>

    <div class="bottom-section">
      <div class="panic-section">
        <span class="panic-label">需要帮助？</span>
        <div class="panic-button" @click="router.push('/panic')">
          <span class="panic-icon">P</span>
          <span class="panic-text">紧急求助</span>
        </div>
      </div>
    </div>

    <div v-if="showMilestones" class="modal-overlay" @click="showMilestones = false">
      <div class="milestones-modal glass-card" @click.stop>
        <h3 class="modal-title">里程碑</h3>
        <div class="milestones-list">
          <div v-for="m in allMilestones" :key="m.days" class="milestone-row" :class="{ achieved: streakData.days >= m.days }">
            <span class="milestone-badge">{{ m.icon }}</span>
            <div class="milestone-info">
              <span class="milestone-name">{{ m.name }}</span>
              <span class="milestone-desc">{{ m.desc }}</span>
            </div>
            <span v-if="streakData.days >= m.days" class="milestone-check">完成</span>
            <span v-else class="milestone-progress">{{ Math.min(100, Math.round((streakData.days / m.days) * 100)) }}%</span>
          </div>
        </div>
        <button class="close-btn" @click="showMilestones = false">关闭</button>
      </div>
    </div>

    <div v-if="showJournal" class="modal-overlay" @click="showJournal = false">
      <div class="journal-modal glass-card" @click.stop>
        <h3 class="modal-title">日记</h3>

        <!-- 心情选择 -->
        <div class="mood-section">
          <span class="mood-label">今天心情如何？</span>
          <div class="mood-selector">
            <div
              v-for="mood in moods"
              :key="mood.value"
              class="mood-item"
              :class="{ selected: selectedMood === mood.value }"
              @click="selectedMood = mood.value"
            >
              <span class="mood-emoji">{{ mood.emoji }}</span>
              <span class="mood-text">{{ mood.label }}</span>
            </div>
          </div>
        </div>

        <!-- 写作提示 -->
        <div class="prompt-section" v-if="!journalText && !selectedTopic">
          <div class="prompt-card">
            <span class="prompt-text">{{ currentPrompt }}</span>
            <div class="prompt-actions">
              <span class="prompt-shuffle" @click.stop="shufflePrompt">换一条</span>
              <span class="prompt-confirm" @click.stop="confirmTopic">使用此主题</span>
            </div>
          </div>
        </div>

        <!-- 已选主题提示 -->
        <div v-if="selectedTopic" class="topic-selected">
          <span class="topic-label">主题：</span>
          <span class="topic-text">{{ selectedTopic }}</span>
          <span class="topic-clear" @click="clearTopic">清除</span>
        </div>

        <div class="journal-input">
          <textarea
            v-model="journalText"
            placeholder="写下你的想法..."
            class="journal-textarea"
          ></textarea>
        </div>

        <button class="save-journal-btn glass-button" @click="saveJournal">
          {{ editingEntryId ? '更新' : '保存' }}
        </button>

        <button v-if="editingEntryId" class="cancel-edit-btn" @click="cancelEdit">
          取消编辑
        </button>

        <!-- 日记列表 -->
        <div class="journal-entries">
          <h4>历史记录</h4>
          <div v-if="groupedJournalEntries.length === 0" class="empty-journal">
            <span class="empty-emoji">📝</span>
            <p>还没有日记记录</p>
            <p class="empty-hint">记录你的第一天日记吧</p>
          </div>

          <div v-for="group in groupedJournalEntries" :key="group.label" class="journal-group">
            <div class="group-header">{{ group.label }}</div>
            <div v-for="entry in group.entries" :key="entry.id" class="journal-entry">
              <div v-if="entry.topic" class="entry-topic-inline">
                <span class="topic-label">主题：</span>
                <span class="topic-value">{{ entry.topic }}</span>
              </div>
              <div class="entry-header">
                <span class="entry-mood">{{ getMoodEmoji(entry.mood) }}</span>
                <span class="entry-time">{{ formatRelativeTime(entry.date) }}</span>
                <div class="entry-actions">
                  <span class="action-edit" @click="editEntry(entry)">编辑</span>
                  <span class="action-delete" @click="deleteEntry(entry.id)">删除</span>
                </div>
              </div>
              <p class="entry-text">{{ entry.text }}</p>
            </div>
          </div>
        </div>
        <button class="close-btn" @click="showJournal = false">关闭</button>
      </div>
    </div>

    <div v-if="showStats" class="modal-overlay" @click="showStats = false">
      <div class="stats-modal glass-card" @click.stop>
        <h3 class="modal-title">统计数据</h3>
        <div class="stats-detail">
          <div class="stat-detail-row">
            <span class="stat-detail-label">当前连续</span>
            <span class="stat-detail-value">{{ streakData.days }} 天</span>
          </div>
          <div class="stat-detail-row">
            <span class="stat-detail-label">开始日期</span>
            <span class="stat-detail-value">{{ formatDate(startDate) }}</span>
          </div>
          <div class="stat-detail-row">
            <span class="stat-detail-label">总时长</span>
            <span class="stat-detail-value">{{ totalTime }}</span>
          </div>
          <div class="stat-detail-row">
            <span class="stat-detail-label">完成任务</span>
            <span class="stat-detail-value">{{ completedTasks }}</span>
          </div>
        </div>
        <button class="close-btn" @click="showStats = false">关闭</button>
      </div>
    </div>

    <div v-if="showSettings" class="modal-overlay" @click="showSettings = false">
      <div class="settings-modal glass-card" @click.stop>
        <h3 class="modal-title">设置</h3>
        <div class="settings-item" @click="resetStreak">
          <span class="settings-text">重置连续</span>
          <span class="settings-arrow">></span>
        </div>
        <div class="settings-item" @click="startNewJourney">
          <span class="settings-text">新旅程</span>
          <span class="settings-arrow">></span>
        </div>
        <div class="settings-item" @click="showGoals = true">
          <span class="settings-text">设定目标</span>
          <span class="settings-arrow">></span>
        </div>
        <div class="settings-item" @click="logout">
          <span class="settings-text">退出登录</span>
          <span class="settings-arrow">></span>
        </div>
        <button class="close-button" @click="showSettings = false">关闭</button>
      </div>
    </div>

    <div v-if="showGoals" class="modal-overlay" @click="showGoals = false">
      <div class="goals-modal glass-card" @click.stop>
        <h3 class="modal-title">目标</h3>
        <div class="goal-input-group">
          <label>你的目标</label>
          <input v-model="userGoal" class="glass-input" placeholder="输入你的目标..." />
        </div>
        <div class="goal-motivations">
          <h4>动力</h4>
          <div v-for="(motivation, idx) in motivations" :key="idx" class="motivation-item" @click="selectMotivation(motivation)">
            {{ motivation }}
          </div>
        </div>
        <button class="save-goals-btn glass-button" @click="saveGoals">保存</button>
        <button class="close-btn" @click="showGoals = false">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showSettings = ref(false)
const showMilestones = ref(false)
const showJournal = ref(false)
const showStats = ref(false)
const showGoals = ref(false)
const timer = ref(null)
const currentDay = ref(1)
const journalText = ref('')
const userGoal = ref('')

// 日历相关
const showCalendarDay = ref(false)
const selectedDayTitle = ref('')
const selectedDayEntries = ref([])
const selectedDate = ref(null)

// 心情相关
const selectedMood = ref(3)
const editingEntryId = ref(null)
const currentPromptIndex = ref(0)
const selectedTopic = ref('')

const confirmTopic = () => {
  selectedTopic.value = currentPrompt.value
}

const clearTopic = () => {
  selectedTopic.value = ''
}

const moods = [
  { value: 1, emoji: '😢', label: '很差' },
  { value: 2, emoji: '😔', label: '不好' },
  { value: 3, emoji: '😐', label: '一般' },
  { value: 4, emoji: '😊', label: '不错' },
  { value: 5, emoji: '😄', label: '很好' }
]

const writingPrompts = [
  '今天是什么触发了你的冲动？',
  '列出三件你感激的事情',
  '今天你的能量水平与昨天相比如何？',
  '你明天的主要目标是什么？',
  '今天你克服了什么困难？',
  '有什么事情让你感到自豪？',
  '描述一下今天让你微笑的事情',
  '今天你学到了什么？',
  '有什么事情你想要改变吗？',
  '你对明天有什么期望？',
  '今天你最感激身边的谁？',
  '描述一下你现在的感受',
  '今天遇到的最大挑战是什么？',
  '你觉得自己今天表现如何？',
  '有什么事情让你感到平静？'
]

const currentPrompt = computed(() => writingPrompts[currentPromptIndex.value])

const shufflePrompt = () => {
  currentPromptIndex.value = (currentPromptIndex.value + 1) % writingPrompts.length
}

const getMoodEmoji = (mood) => {
  const found = moods.find(m => m.value === mood)
  return found ? found.emoji : '😐'
}

const formatRelativeTime = (timestamp) => {
  const now = Date.now()
  const diff = now - parseInt(timestamp)
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days === 1) return '昨天'
  if (days < 7) return `${days}天前`

  const date = new Date(parseInt(timestamp))
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

const groupedJournalEntries = computed(() => {
  const entries = journalEntries.value
  const groups = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const todayEntries = []
  const yesterdayEntries = []
  const olderEntries = []

  entries.forEach(entry => {
    const entryDate = new Date(parseInt(entry.date))
    entryDate.setHours(0, 0, 0, 0)

    if (entryDate.getTime() === today.getTime()) {
      todayEntries.push(entry)
    } else if (entryDate.getTime() === yesterday.getTime()) {
      yesterdayEntries.push(entry)
    } else {
      olderEntries.push(entry)
    }
  })

  if (todayEntries.length > 0) {
    groups.push({ label: '今天', entries: todayEntries })
  }
  if (yesterdayEntries.length > 0) {
    groups.push({ label: '昨天', entries: yesterdayEntries })
  }
  if (olderEntries.length > 0) {
    groups.push({ label: '更早', entries: olderEntries })
  }

  return groups
})

const editEntry = (entry) => {
  editingEntryId.value = entry.id
  journalText.value = entry.text
  selectedMood.value = entry.mood || 3
  selectedTopic.value = entry.topic || ''
}

const cancelEdit = () => {
  editingEntryId.value = null
  journalText.value = ''
  selectedMood.value = 3
  selectedTopic.value = ''
}

const deleteEntry = (id) => {
  if (confirm('确定要删除这条日记吗？')) {
    const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]')
    const filtered = entries.filter(e => e.id !== id)
    localStorage.setItem('journalEntries', JSON.stringify(filtered))
    // 刷新日记列表和日历
    loadJournalEntries()
  }
}

const motivations = [
  '为了自信',
  '为了更好的生活',
  '为了家人',
  '为了自我提升',
  '为了梦想',
  '为了健康'
]

const getMotto = () => {
  const mottos = [
    '今天继续加油',
    '每一步都重要',
    '坚持就是胜利',
    '相信自己',
    '你很棒',
    '比昨天更好'
  ]
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % mottos.length
  return mottos[dayIndex]
}

const streakData = computed(() => {
  const startDate = localStorage.getItem('startDate')
  if (!startDate) {
    return { days: 0, hours: 0, minutes: 0 }
  }

  const now = Date.now()
  const diff = now - parseInt(startDate)

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  currentDay.value = Math.min(days + 1, 90)

  return { days, hours, minutes }
})

const stats = computed(() => {
  const days = streakData.value.days
  return {
    timeSaved: `${days * 2}+ 小时`,
    currentStreak: `${days} 天`,
    totalDays: `${days} 天`
  }
})

const totalTime = computed(() => {
  const { days, hours } = streakData.value
  return `${days}d ${hours}h`
})

const startDate = computed(() => {
  return localStorage.getItem('startDate') || Date.now()
})

const completedTasks = computed(() => {
  const completedDays = JSON.parse(localStorage.getItem('completedDays') || '[]')
  return completedDays.length
})

const journalEntries = ref([])

// 加载日记数据
const loadJournalEntries = () => {
  journalEntries.value = JSON.parse(localStorage.getItem('journalEntries') || '[]').reverse()
}

// 初始加载
loadJournalEntries()

const milestones = ref([
  { days: 3, icon: '3' },
  { days: 7, icon: '7' },
  { days: 30, icon: '30' },
  { days: 60, icon: '60' },
  { days: 90, icon: '90' }
])

// 当前里程碑
const currentMilestone = computed(() => {
  const days = streakData.value.days
  let current = milestones.value[0]
  for (const m of milestones.value) {
    if (days >= m.days) {
      current = m
    }
  }
  return current
})

// 下一个里程碑
const nextMilestone = computed(() => {
  const days = streakData.value.days
  for (const m of milestones.value) {
    if (days < m.days) {
      return m
    }
  }
  return milestones.value[milestones.value.length - 1]
})

// 距离下一个里程碑的进度百分比
const progressToNextMilestone = computed(() => {
  const days = streakData.value.days
  const current = currentMilestone.value
  const next = nextMilestone.value

  if (days >= next.days) return 100

  const total = next.days - current.days
  const progress = days - current.days

  return Math.min(100, Math.max(0, Math.round((progress / total) * 100)))
})

const allMilestones = ref([
  { days: 1, icon: '1', name: '第1天', desc: '开启新旅程' },
  { days: 3, icon: '2', name: '第3天', desc: '初步习惯' },
  { days: 7, icon: '3', name: '第7天', desc: '习惯形成中' },
  { days: 14, icon: '4', name: '第14天', desc: '神经变化' },
  { days: 21, icon: '5', name: '第21天', desc: '21天习惯' },
  { days: 30, icon: '6', name: '第30天', desc: '里程碑' },
  { days: 45, icon: '7', name: '第45天', desc: '持续进步' },
  { days: 60, icon: '8', name: '第60天', desc: '重大突破' },
  { days: 75, icon: '9', name: '第75天', desc: '即将成功' },
  { days: 90, icon: '10', name: '第90天', desc: '完成目标' }
])

const calendarDays = computed(() => {
  const days = []
  const today = new Date()
  const startDateVal = parseInt(localStorage.getItem('startDate') || Date.now())
  const completedDays = JSON.parse(localStorage.getItem('completedDays') || '[]')

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.getFullYear() + '-' +
      String(date.getMonth() + 1).padStart(2, '0') + '-' +
      String(date.getDate()).padStart(2, '0')
    const dayNum = date.getDate()
    const isToday = i === 0
    const isFuture = i > 0

    const daySinceStart = Math.floor((today.getTime() - startDateVal) / (1000 * 60 * 60 * 24))
    const dayNumber = daySinceStart - i + 1
    const completed = completedDays.includes(dayNumber) && dayNumber > 0

    days.push({
      date: dateStr,
      dayNum,
      isToday,
      isFuture,
      completed
    })
  }
  return days
})

// 获取日记中的心情数据 - 使用本地时区，依赖journalEntries响应式更新
const journalMoodMap = computed(() => {
  const entries = journalEntries.value
  const map = {}
  entries.forEach(entry => {
    const date = new Date(entry.date)
    const dateStr = date.getFullYear() + '-' +
      String(date.getMonth() + 1).padStart(2, '0') + '-' +
      String(date.getDate()).padStart(2, '0')
    if (!map[dateStr]) {
      map[dateStr] = entry.mood
    }
  })
  return map
})

// 当前月份的日历
const currentMonthName = computed(() => {
  const today = new Date()
  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  return `${today.getFullYear()}年 ${monthNames[today.getMonth()]}`
})

// 月历显示 - 依赖journalEntries实现响应式更新
const monthCalendarDays = computed(() => {
  // 访问journalEntries确保响应式更新
  const entries = journalEntries.value

  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDateVal = parseInt(localStorage.getItem('startDate') || Date.now())
  const completedDays = JSON.parse(localStorage.getItem('completedDays') || '[]')

  const days = []

  // 添加上月末尾的空白日期
  const firstDayWeekday = firstDay.getDay()
  if (firstDayWeekday > 0) {
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      days.push({
        dayNum: prevMonthLastDay - i,
        isOtherMonth: true,
        date: '',
        isToday: false,
        isFuture: false,
        mood: null,
        completed: false
      })
    }
  }

  // 添加当月日期 - 使用本地时区
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i)
    const dateStr = date.getFullYear() + '-' +
      String(date.getMonth() + 1).padStart(2, '0') + '-' +
      String(date.getDate()).padStart(2, '0')
    const isToday = date.toDateString() === today.toDateString()
    const isFuture = date > today

    const daySinceStart = Math.floor((today.getTime() - startDateVal) / (1000 * 60 * 60 * 24))
    const dayNumber = daySinceStart - (today.getDate() - i) + 1
    const completed = completedDays.includes(dayNumber) && dayNumber > 0 && !isFuture

    // 获取当天的心情
    const mood = journalMoodMap.value[dateStr]

    days.push({
      dayNum: i,
      date: dateStr,
      isOtherMonth: false,
      isToday,
      isFuture,
      mood: mood ? getMoodEmoji(mood) : null,
      completed,
      moodValue: mood
    })
  }

  // 添加下月开头的空白日期
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      dayNum: i,
      isOtherMonth: true,
      date: '',
      isToday: false,
      isFuture: false,
      mood: null,
      completed: false
    })
  }

  return days
})

// 选择日历日期
const selectCalendarDay = (day) => {
  if (!day.date || day.isFuture || day.isOtherMonth) return

  selectedDate.value = day.date

  // 获取当天的日记 - 使用本地时区比较日期
  const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]')
  selectedDayEntries.value = entries.filter(entry => {
    const entryDate = new Date(entry.date)
    const entryDateStr = entryDate.getFullYear() + '-' +
      String(entryDate.getMonth() + 1).padStart(2, '0') + '-' +
      String(entryDate.getDate()).padStart(2, '0')
    return entryDateStr === day.date
  }).sort((a, b) => b.date - a.date)

  // 设置标题 - 使用本地时区
  const date = new Date(day.date + 'T00:00:00')
  const today = new Date()
  const todayStr = today.getFullYear() + '-' +
    String(today.getMonth() + 1).padStart(2, '0') + '-' +
    String(today.getDate()).padStart(2, '0')
  const yesterday = new Date(Date.now() - 86400000)
  const yesterdayStr = yesterday.getFullYear() + '-' +
    String(yesterday.getMonth() + 1).padStart(2, '0') + '-' +
    String(yesterday.getDate()).padStart(2, '0')

  if (day.date === todayStr) {
    selectedDayTitle.value = '今天'
  } else if (day.date === yesterdayStr) {
    selectedDayTitle.value = '昨天'
  } else {
    selectedDayTitle.value = `${date.getMonth() + 1}月${date.getDate()}日`
  }

  showCalendarDay.value = true
}

const formatEntryTime = (timestamp) => {
  const date = new Date(parseInt(timestamp))
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

const formatDate = (timestamp) => {
  const date = new Date(parseInt(timestamp))
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

const saveJournal = () => {
  if (!journalText.value.trim()) {
    alert('请输入内容')
    return
  }

  const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]')

  if (editingEntryId.value) {
    // 更新现有日记
    const index = entries.findIndex(e => e.id === editingEntryId.value)
    if (index !== -1) {
      entries[index] = {
        ...entries[index],
        text: journalText.value.trim(),
        mood: selectedMood.value,
        topic: selectedTopic.value || entries[index].topic,
        editedAt: Date.now()
      }
    }
    editingEntryId.value = null
  } else {
    // 新增日记
    const newEntry = {
      id: Date.now(),
      date: Date.now(),
      text: journalText.value.trim(),
      mood: selectedMood.value,
      topic: selectedTopic.value
    }
    entries.push(newEntry)
  }

  localStorage.setItem('journalEntries', JSON.stringify(entries))

  // 刷新日记列表和日历
  loadJournalEntries()

  // 重置表单
  journalText.value = ''
  selectedMood.value = 3
  selectedTopic.value = ''

  alert('日记保存成功！')
}

const selectMotivation = (motivation) => {
  userGoal.value = motivation
}

const saveGoals = () => {
  if (userGoal.value.trim()) {
    localStorage.setItem('userGoal', userGoal.value.trim())
  }
  showGoals.value = false
  alert('Saved!')
}

const resetStreak = () => {
  if (confirm('Reset streak?')) {
    localStorage.setItem('startDate', Date.now().toString())
    localStorage.setItem('completedDays', '[]')
    showSettings.value = false
    alert('Reset!')
  }
}

const startNewJourney = () => {
  if (confirm('Start new journey?')) {
    const journeys = JSON.parse(localStorage.getItem('journeys') || '[]')
    const currentJourney = {
      startDate: localStorage.getItem('startDate'),
      days: streakData.value.days,
      createdAt: Date.now()
    }
    journeys.push(currentJourney)
    localStorage.setItem('journeys', JSON.stringify(journeys))

    localStorage.setItem('startDate', Date.now().toString())
    localStorage.setItem('completedDays', '[]')
    showSettings.value = false
    alert('New journey started!')
  }
}

const logout = () => {
  if (confirm('Logout?')) {
    localStorage.removeItem('isLoggedIn')
    router.replace('/login')
  }
}

onMounted(() => {
  userGoal.value = localStorage.getItem('userGoal') || ''
  streakData.value
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})

// 监听日记弹窗打开，重置表单
watch(showJournal, (newVal) => {
  if (newVal) {
    journalText.value = ''
    selectedMood.value = 3
    editingEntryId.value = null
    currentPromptIndex.value = 0
    selectedTopic.value = ''
  }
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  min-height: 100dvh;
  position: relative;
  overflow-x: hidden;
  padding-bottom: 160px;
}

.status-bar {
  position: relative;
  z-index: 10;
  padding: 80px 24px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 24px;
  font-weight: 700;
  color: #F8FAFC;
}

.user-motto {
  font-size: 15px;
  color: #94A3B8;
}

.settings-icon {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #F8FAFC;
  cursor: pointer;
}

.streak-section {
  padding: 0 24px;
  margin-bottom: 16px;
}

.streak-card {
  padding: 24px;
  text-align: center;
}

.streak-label {
  font-size: 15px;
  color: #94A3B8;
  display: block;
  margin-bottom: 8px;
}

.streak-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 6px;
}

.streak-days {
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
}

.streak-unit {
  font-size: 22px;
  color: #94A3B8;
  margin-left: 4px;
}

.streak-time {
  font-size: 14px;
  color: #64748B;
  margin-bottom: 16px;
}

.stats-row {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  color: #F8FAFC;
}

.stat-label {
  font-size: 12px;
  color: #64748B;
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: rgba(255, 255, 255, 0.1);
}

.progress-section {
  padding: 0 24px;
  margin-bottom: 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.section-title {
  font-size: 17px;
  font-weight: 600;
  color: #F8FAFC;
}

/* Quitter风格进度条 */
.progress-bar-container {
  padding: 16px;
  margin-bottom: 16px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.progress-label {
  font-size: 14px;
  color: #94A3B8;
}

.progress-value {
  font-size: 16px;
  font-weight: 600;
  color: #8B5CF6;
}

.progress-track {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill-quitter {
  height: 100%;
  background: linear-gradient(90deg, #8B5CF6, #EC4899);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.milestone-markers {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #64748B;
}

.section-action {
  font-size: 13px;
  color: #3B82F6;
  cursor: pointer;
}

.milestones {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 14px;
}

.milestone-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.4;
  transition: all 0.3s ease;
  cursor: pointer;
}

.milestone-item.achieved {
  opacity: 1;
}

.milestone-item .milestone-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #94A3B8;
  margin-bottom: 6px;
  transition: all 0.3s ease;
}

.milestone-item.achieved .milestone-icon {
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  color: white;
}

.milestone-days {
  font-size: 11px;
  color: #94A3B8;
}

.calendar-section {
  padding: 0 24px;
  margin-bottom: 16px;
}

.calendar-container {
  padding: 16px;
}

.calendar-nav {
  text-align: center;
  margin-bottom: 16px;
}

.calendar-month {
  font-size: 16px;
  font-weight: 600;
  color: #F8FAFC;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 8px;
}

.calendar-weekdays span {
  font-size: 12px;
  color: #64748B;
  padding: 8px 0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  padding: 2px;
}

.calendar-day:active {
  transform: scale(0.95);
}

.calendar-day.completed {
  background: linear-gradient(135deg, #10B981, #059669);
}

.calendar-day.today {
  border: 2px solid #8B5CF6;
  background: rgba(139, 92, 246, 0.2);
}

.calendar-day.future {
  opacity: 0.3;
  cursor: default;
}

.calendar-day.has-entry {
  background: rgba(139, 92, 246, 0.15);
}

.calendar-day.other-month {
  opacity: 0.2;
}

.day-mood {
  font-size: 14px;
  line-height: 1;
  margin-top: 1px;
}

.day-number {
  font-size: 11px;
  color: #94A3B8;
  font-weight: 500;
}

/* 日历日期详情弹窗 */
.calendar-day-modal {
  max-height: 80vh;
  overflow-y: auto;
}

.day-entries {
  max-height: 400px;
  overflow-y: auto;
}

.day-entry {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
}

.entry-time-mood {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.entry-mood-large {
  font-size: 28px;
}

.entry-time-text {
  font-size: 13px;
  color: #94A3B8;
}

.entry-content {
  font-size: 14px;
  color: #F8FAFC;
  line-height: 1.6;
  margin: 0;
}

/* 日记主题样式 */
.entry-topic {
  margin-bottom: 8px;
}

.topic-badge {
  display: inline-block;
  background: linear-gradient(135deg, #8B5CF6, #6366F1);
  color: #fff;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
}

.entry-topic-inline {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 6px;
}

.entry-topic-inline .topic-label {
  color: #8B5CF6;
  font-size: 12px;
  font-weight: 500;
}

.entry-topic-inline .topic-value {
  color: #F8FAFC;
  font-size: 13px;
  font-weight: 500;
}

.no-entries {
  text-align: center;
  padding: 40px 20px;
}

.no-entries-emoji {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}

.no-entries p {
  color: #94A3B8;
  margin: 0;
}

.quick-actions {
  display: flex;
  gap: 12px;
  padding: 0 24px;
}

.action-item {
  flex: 1;
  padding: 14px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.action-icon {
  font-size: 22px;
  margin-bottom: 6px;
  color: #F8FAFC;
}

.action-text {
  font-size: 12px;
  color: #F8FAFC;
}

.bottom-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 24px 28px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.8));
}

.panic-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.panic-label {
  font-size: 12px;
  color: #64748B;
  margin-bottom: 10px;
}

.panic-button {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: linear-gradient(135deg, #EF4444, #DC2626);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
  animation: pulse 2s ease-in-out infinite;
  cursor: pointer;
}

.panic-icon {
  font-size: 22px;
  margin-bottom: 2px;
  color: #F8FAFC;
}

.panic-text {
  font-size: 11px;
  color: #F8FAFC;
  font-weight: 600;
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

.settings-modal,
.milestones-modal,
.journal-modal,
.stats-modal,
.goals-modal {
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  padding: 24px;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: #F8FAFC;
  display: block;
  margin-bottom: 20px;
  text-align: center;
}

.milestones-list {
  margin-bottom: 20px;
}

.milestone-row {
  display: flex;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  opacity: 0.5;
}

.milestone-row.achieved {
  opacity: 1;
}

.milestone-badge {
  font-size: 28px;
  margin-right: 14px;
  color: #F8FAFC;
}

.milestone-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.milestone-name {
  font-size: 15px;
  font-weight: 600;
  color: #F8FAFC;
}

.milestone-desc {
  font-size: 12px;
  color: #64748B;
}

.milestone-check {
  font-size: 20px;
  color: #10B981;
}

.milestone-progress {
  font-size: 14px;
  color: #64748B;
}

.journal-input {
  margin-bottom: 16px;
}

.journal-textarea {
  width: 100%;
  height: 120px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: #F8FAFC;
  padding: 14px;
  font-size: 14px;
  resize: none;
  font-family: inherit;
}

.journal-textarea::placeholder {
  color: rgba(248, 250, 252, 0.5);
}

/* 心情选择器 */
.mood-section {
  margin-bottom: 16px;
}

.mood-label {
  font-size: 14px;
  color: #94A3B8;
  display: block;
  margin-bottom: 10px;
}

.mood-selector {
  display: flex;
  justify-content: space-between;
  gap: 6px;
}

.mood-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 4px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mood-item.selected {
  background: rgba(139, 92, 246, 0.2);
  border-color: #8B5CF6;
  transform: scale(1.05);
}

.mood-emoji {
  font-size: 22px;
  margin-bottom: 4px;
}

.mood-text {
  font-size: 10px;
  color: #94A3B8;
}

.mood-item.selected .mood-text {
  color: #8B5CF6;
}

/* 写作提示 */
.prompt-section {
  margin-bottom: 12px;
}

.prompt-card {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 12px;
  padding: 14px;
  transition: all 0.2s ease;
}

.prompt-text {
  font-size: 14px;
  color: #F8FAFC;
  line-height: 1.5;
  display: block;
}

.prompt-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid rgba(139, 92, 246, 0.2);
}

.prompt-shuffle {
  font-size: 13px;
  color: #94A3B8;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}

.prompt-shuffle:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #F8FAFC;
}

.prompt-confirm {
  font-size: 13px;
  color: #8B5CF6;
  cursor: pointer;
  padding: 4px 12px;
  background: rgba(139, 92, 246, 0.2);
  border-radius: 4px;
  font-weight: 500;
}

.prompt-confirm:hover {
  background: rgba(139, 92, 246, 0.3);
}

/* 已选主题 */
.topic-selected {
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.topic-label {
  font-size: 13px;
  color: #8B5CF6;
  font-weight: 500;
}

.topic-text {
  font-size: 14px;
  color: #F8FAFC;
  flex: 1;
}

.topic-clear {
  font-size: 12px;
  color: #EF4444;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 4px;
}

.topic-clear:hover {
  background: rgba(239, 68, 68, 0.2);
}

/* 取消编辑按钮 */
.cancel-edit-btn {
  width: 100%;
  height: 40px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: #94A3B8;
  font-size: 14px;
  margin-bottom: 12px;
  cursor: pointer;
}

/* 日记分组 */
.journal-group {
  margin-bottom: 16px;
}

.group-header {
  font-size: 13px;
  color: #8B5CF6;
  font-weight: 600;
  margin-bottom: 10px;
  padding-left: 4px;
}

/* 日记条目头部 */
.entry-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.entry-mood {
  font-size: 18px;
  margin-right: 8px;
}

.entry-time {
  font-size: 12px;
  color: #64748B;
  flex: 1;
}

.entry-actions {
  display: flex;
  gap: 12px;
}

.action-edit,
.action-delete {
  font-size: 12px;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
}

.action-edit {
  color: #3B82F6;
}

.action-delete {
  color: #EF4444;
}

.action-edit:hover,
.action-delete:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* 空状态 */
.empty-journal {
  text-align: center;
  padding: 30px 20px;
}

.empty-emoji {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}

.empty-journal p {
  color: #94A3B8;
  margin: 0;
}

.empty-hint {
  font-size: 13px;
  color: #64748B;
  margin-top: 6px !important;
}

.save-journal-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  margin-bottom: 20px;
}

.journal-entries h4 {
  font-size: 15px;
  color: #F8FAFC;
  margin-bottom: 12px;
}

.empty-journal {
  font-size: 14px;
  color: #64748B;
  text-align: center;
  padding: 20px;
}

.journal-entry {
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  margin-bottom: 10px;
}

.entry-date {
  font-size: 12px;
  color: #8B5CF6;
  display: block;
  margin-bottom: 6px;
}

.entry-text {
  font-size: 14px;
  color: #F8FAFC;
  line-height: 1.6;
  margin: 0;
}

.stats-detail {
  margin-bottom: 20px;
}

.stat-detail-row {
  display: flex;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.stat-detail-label {
  font-size: 14px;
  color: #94A3B8;
}

.stat-detail-value {
  font-size: 14px;
  color: #F8FAFC;
  font-weight: 600;
}

.goal-input-group {
  margin-bottom: 20px;
}

.goal-input-group label {
  font-size: 14px;
  color: #94A3B8;
  display: block;
  margin-bottom: 8px;
}

.goal-motivations h4 {
  font-size: 14px;
  color: #94A3B8;
  margin-bottom: 10px;
}

.motivation-item {
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #F8FAFC;
  cursor: pointer;
  transition: background 0.2s;
}

.motivation-item:hover {
  background: rgba(59, 130, 246, 0.2);
}

.save-goals-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  margin-bottom: 12px;
}

.settings-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
}

.settings-text {
  font-size: 15px;
  color: #F8FAFC;
}

.settings-arrow {
  font-size: 15px;
  color: #64748B;
}

.close-btn {
  width: 100%;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #F8FAFC;
  font-size: 15px;
  cursor: pointer;
  margin-top: 12px;
}

.close-button {
  width: 100%;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #F8FAFC;
  font-size: 15px;
  margin-top: 20px;
  cursor: pointer;
}
</style>
