<template>
  <div class="plan-page">
    <!-- 动态背景 -->
    <div class="liquid-bg"></div>
    <div class="liquid-orb liquid-orb-1"></div>
    <div class="liquid-orb liquid-orb-2"></div>

    <!-- 顶部导航 -->
    <div class="nav-header">
      <div class="back-button" @click="router.back()">
        <span>←</span>
      </div>
      <h2 class="nav-title">90天恢复计划</h2>
      <div class="placeholder"></div>
    </div>

    <!-- 进度指示 -->
    <div class="progress-indicator">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressWidth + '%' }"></div>
      </div>
      <span class="progress-text">第 {{ currentDay }} / 90 天</span>
    </div>

    <!-- 任务列表 -->
    <div class="task-list">
      <div
        v-for="task in allTasks"
        :key="task.day"
        class="task-item glass-card"
        :class="{ locked: task.day > currentDay, completed: isCompleted(task.day) }"
        @click="selectTask(task)"
      >
        <div class="task-day-badge">
          <span>第{{ task.day }}天</span>
        </div>
        <div class="task-info">
          <h3 class="task-theme">{{ task.theme }}</h3>
          <p class="task-preview">{{ task.task.substring(0, 40) }}...</p>
        </div>
        <div class="task-status">
          <span v-if="isCompleted(task.day)" class="status-completed">✓</span>
          <span v-else-if="task.day > currentDay" class="status-locked">🔒</span>
          <span v-else class="status-current">进行中</span>
        </div>
      </div>
    </div>

    <!-- 任务详情弹窗 -->
    <div v-if="selectedTask" class="modal-overlay" @click="closeModal">
      <div class="task-modal glass-card" @click.stop>
        <div class="modal-header">
          <div class="modal-day-badge">
            <span>第 {{ selectedTask.day }} 天</span>
          </div>
          <h2 class="modal-theme">{{ selectedTask.theme }}</h2>
        </div>

        <div class="modal-content">
          <p class="content-text">{{ selectedTask.task }}</p>

          <!-- 神经科学知识 -->
          <div class="knowledge-section">
            <span class="section-label">🧠 神经科学知识</span>
            <p class="knowledge-text">{{ selectedTask.knowledge }}</p>
          </div>

          <!-- 行动任务 -->
          <div class="action-section">
            <span class="section-label">🎯 今日行动</span>
            <p class="action-text">{{ selectedTask.action }}</p>
          </div>

          <!-- 反思提示 -->
          <div class="reflection-section">
            <span class="section-label">💭 自我反思</span>
            <p class="reflection-text">{{ selectedTask.reflection }}</p>
          </div>
        </div>

        <div class="modal-actions">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 状态变量
const selectedTask = ref(null)

// 获取当前天数
const getCurrentDay = () => {
  const startDate = localStorage.getItem('startDate')
  if (!startDate) return 1

  const now = Date.now()
  const diff = now - parseInt(startDate)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  return Math.min(days + 1, 90)
}

const currentDay = ref(getCurrentDay())

// 计算进度
const progressWidth = computed(() => {
  return (currentDay.value / 90) * 100
})

// 检查任务是否完成
const isCompleted = (day) => {
  const completedDays = JSON.parse(localStorage.getItem('completedDays') || '[]')
  return completedDays.includes(day)
}

// 90天任务数据 - 对标Quitter每日任务
const allTasks = ref([
  // 第一阶段：觉醒期（1-7天）
  {
    day: 1,
    phase: '觉醒',
    theme: '开始新旅程',
    task: '今天是你戒色的第一天。这是一个全新的开始。闭上眼睛，深呼吸5分钟，感受内心的平静。',
    knowledge: '戒色的第一天，你的大脑开始适应没有额外多巴胺刺激的状态。这是重塑神经通路的开始。',
    action: '花5分钟静坐冥想，专注于呼吸。写下你戒色的三个主要原因。',
    reflection: '今天你感觉如何？是什么让你决定开始这个旅程？'
  },
  {
    day: 2,
    phase: '觉醒',
    theme: '认识诱因',
    task: '了解自己的诱因是成功的关键。哪些时间、场景或情绪最容易触发你的冲动？',
    knowledge: '大脑会形成"触发-反应"的神经通路。通过识别诱因，你可以提前准备替代方案。',
    action: '列出最近让你产生冲动的3个场景。为每个场景想一个替代行为。',
    reflection: '你发现自己最大的诱因是什么？你打算如何应对？'
  },
  {
    day: 3,
    phase: '觉醒',
    theme: '环境净化',
    task: '清理你的设备和环境，删除所有可能诱发冲动的内容。',
    knowledge: '环境线索会触发特定的行为。控制环境就是控制行为的第一步。',
    action: '清理手机、电脑中的不良内容。卸载相关app。',
    reflection: '你清理了哪些可能触发你的内容？'
  },
  {
    day: 4,
    phase: '觉醒',
    theme: '身体觉察',
    task: '身体和心理是紧密连接的。开始关注你的身体感受。',
    knowledge: '运动可以增加前额叶皮层的活动，提高自控能力。',
    action: '进行至少15分钟的中等强度运动。',
    reflection: '运动后你感觉有什么不同？'
  },
  {
    day: 5,
    phase: '觉醒',
    theme: '目标明确',
    task: '写下你戒色的具体目标。为什么要改变？改变后你想成为什么样的人？',
    knowledge: '具体的目标更容易实现，也更能激励我们坚持下去。',
    action: '写下你的戒色目标和动机。',
    reflection: '90天后你希望成为什么样的人？'
  },
  {
    day: 6,
    phase: '觉醒',
    theme: '建立支持',
    task: '寻找支持你的力量。可以是家人、朋友，或者加入一个积极向上的社群。',
    knowledge: '社会支持可以降低压力激素皮质醇的水平，提高自控力。',
    action: '与支持你的朋友聊天，或寻找志同道合的社群。',
    reflection: '谁是你最坚强的后盾？'
  },
  {
    day: 7,
    phase: '觉醒',
    theme: '第一周回顾',
    task: '回顾第一周的成功和挑战。为下一周制定更好的计划。',
    knowledge: '自我反思是持续成长的关键。每周回顾可以帮助你发现问题并改进。',
    action: '写下这一周的收获和挑战。制定下周的3个目标。',
    reflection: '这一周你最大的成就是什么？'
  },
  // 第二阶段：习惯期（8-21天）
  {
    day: 8,
    phase: '习惯',
    theme: '应对无聊',
    task: '无聊时最容易产生冲动。学会用有意义的方式填充时间。',
    knowledge: '无聊是大脑寻找刺激的信号。提前准备一些活动可以避免冲动。',
    action: '创建一个"当我无聊时"的活动清单。',
    reflection: '什么时候你最容易感到无聊？你会怎么做？'
  },
  {
    day: 9,
    phase: '习惯',
    theme: '睡前仪式',
    task: '建立健康的睡前仪式，减少夜间冲动。',
    knowledge: '睡眠不足会削弱前额叶的功能，影响自控力。',
    action: '建立睡前30分钟的放松仪式，如阅读或冥想。',
    reflection: '你的睡眠质量如何？'
  },
  {
    day: 10,
    phase: '习惯',
    theme: '情绪管理',
    task: '学会用健康的方式处理负面情绪。',
    knowledge: '情绪低落时，大脑会寻求快速的慰藉。了解这一点可以帮助你做出更好的选择。',
    action: '当感到焦虑时，尝试深呼吸或散步。记录下你的感受。',
    reflection: '今天你遇到了什么情绪挑战？你是如何应对的？'
  },
  {
    day: 11,
    phase: '习惯',
    theme: '正念练习',
    task: '正念可以帮助你在冲动来临时保持清醒。',
    knowledge: '正念训练可以增强前额叶对边缘系统的控制。',
    action: '每天进行10分钟的正念冥想。',
    reflection: '正念练习给你带来了什么感受？'
  },
  {
    day: 12,
    phase: '习惯',
    theme: '运动习惯',
    task: '运动是提升自控力的最佳方式之一。',
    knowledge: '运动促进多巴胺和内啡肽的分泌，提升情绪和自控力。',
    action: '进行至少20分钟的运动。',
    reflection: '你喜欢什么运动方式？'
  },
  {
    day: 13,
    phase: '习惯',
    theme: '应对复发',
    task: '如果不小心破戒了，不要自责。重要的是如何重新开始。',
    knowledge: '复发是恢复过程的一部分，不是终点。每次复发都是学习的机会。',
    action: '分析破戒的原因。制定避免再次发生的具体计划。',
    reflection: '如果发生了，你会怎么对待自己？'
  },
  {
    day: 14,
    phase: '习惯',
    theme: '两周里程碑',
    task: '恭喜你完成了两周！这是重要的里程碑。',
    knowledge: '研究表明，习惯形成通常需要2-4周。你已经走在正确的道路上。',
    action: '庆祝这个里程碑。给自己一个小奖励。',
    reflection: '这两周你感觉有什么变化？'
  },
  {
    day: 15,
    phase: '习惯',
    theme: '压力应对',
    task: '学会健康地处理压力。',
    knowledge: '压力会降低自控力。学会放松技巧很重要。',
    action: '尝试一种新的放松方式，如瑜伽或太极。',
    reflection: '你通常如何应对压力？'
  },
  {
    day: 16,
    phase: '习惯',
    theme: '新习惯养成',
    task: '用积极的新习惯替代旧习惯。',
    knowledge: '习惯形成需要持续的重复。',
    action: '选择一个你感兴趣的新活动，如学习新技能。',
    reflection: '今天你尝试了什么新活动？'
  },
  {
    day: 17,
    phase: '习惯',
    theme: '认知重塑',
    task: '改变你对事物的看法，改变你的反应。',
    knowledge: '我们的想法会影响我们的行为。通过改变思维模式，我们可以改变习惯。',
    action: '记录一个让你产生冲动的想法，然后换一个积极的想法。',
    reflection: '你是如何转变思维的？'
  },
  {
    day: 18,
    phase: '习惯',
    theme: '专注当下',
    task: '专注于当下，而不是过去或未来。',
    knowledge: '活在当下可以减少焦虑和冲动。',
    action: '今天尝试一次完全投入的体验，如认真吃一顿饭。',
    reflection: '专注于当下的感觉如何？'
  },
  {
    day: 19,
    phase: '习惯',
    theme: '自我激励',
    task: '给自己一些正面的鼓励。',
    knowledge: '自我激励可以增强自信心和自控力。',
    action: '写下你的三个优点和今日成就。',
    reflection: '你今天有什么值得骄傲的事？'
  },
  {
    day: 20,
    phase: '习惯',
    theme: '习惯检查',
    task: '检查你的习惯模式，看看哪些做得好，哪些需要改进。',
    knowledge: '定期检查习惯可以帮助我们及时调整。',
    action: '回顾过去两周的习惯表现。',
    reflection: '哪些习惯对你帮助最大？'
  },
  {
    day: 21,
    phase: '习惯',
    theme: '三周里程碑',
    task: '恭喜完成三周！你已经养成了基本的好习惯。',
    knowledge: '21天是形成新习惯的关键点。',
    action: '庆祝这个里程碑。继续坚持！',
    reflection: '这三周你最大的变化是什么？'
  },
  // 第三阶段：巩固期（22-90天）
  {
    day: 22,
    phase: '巩固',
    theme: '习惯巩固',
    task: '继续保持你的好习惯。这是巩固的关键时期。',
    knowledge: '持续的行为会强化神经通路。',
    action: '坚持你的日常习惯。',
    reflection: '习惯变得越来越自然了吗？'
  },
  {
    day: 23,
    phase: '巩固',
    theme: '拒绝借口',
    task: '不要为破戒找借口。坦诚面对自己。',
    knowledge: '借口是进步的敌人。诚实面对自己的行为是改变的第一步。',
    action: '今天无论发生什么，都不要找借口。',
    reflection: '你今天诚实地面对自己了吗？'
  },
  {
    day: 24,
    phase: '巩固',
    theme: '阅读学习',
    task: '学习关于习惯养成的知识。',
    knowledge: '知识就是力量。了解大脑的工作原理可以帮助我们更好地控制行为。',
    action: '阅读一篇关于习惯养成的文章或书籍。',
    reflection: '你学到了什么新知识？'
  },
  {
    day: 25,
    phase: '巩固',
    theme: '冥想练习',
    task: '加强你的冥想练习。',
    knowledge: '持续的冥想可以增强专注力和自控力。',
    action: '进行15分钟的冥想。',
    reflection: '冥想给你带来了什么改变？'
  },
  {
    day: 26,
    phase: '巩固',
    theme: '感恩练习',
    task: '培养感恩的心态。',
    knowledge: '感恩可以提升幸福感，减少负面情绪。',
    action: '写下三件你感激的事。',
    reflection: '今天你感激什么？'
  },
  {
    day: 27,
    phase: '巩固',
    theme: '避免触发',
    task: '远离可能触发你的人事物。',
    knowledge: '预防胜于治疗。避免触发是控制冲动的好方法。',
    action: '识别并远离今天的触发因素。',
    reflection: '你是如何避免触发的？'
  },
  {
    day: 28,
    phase: '巩固',
    theme: '四周里程碑',
    task: '恭喜完成四周！你已经超过了习惯养成的平均时间。',
    knowledge: '研究表明，习惯形成需要约66天。你已经完成了近一半！',
    action: '庆祝这个里程碑！',
    reflection: '这四周你感觉有什么变化？'
  },
  {
    day: 29,
    phase: '巩固',
    theme: '日常复盘',
    task: '每天晚上进行简短的复盘。',
    knowledge: '复盘可以帮助我们发现问题并及时调整。',
    action: '写下今天的表现和需要改进的地方。',
    reflection: '今天你做得好的地方是什么？'
  },
  {
    day: 30,
    phase: '巩固',
    theme: '一个月里程碑',
    task: '恭喜你完成了第一个30天！这是巨大的成就！',
    knowledge: '一个月的坚持说明你已经建立了基本的新习惯。',
    action: '好好庆祝这个重要的里程碑！',
    reflection: '这一个月你最大的收获是什么？'
  },
  {
    day: 31,
    phase: '巩固',
    theme: '长期视角',
    task: '把目光放长远。90天后你想成为什么样的人？',
    knowledge: '长期视角可以帮助我们抵御短期的诱惑。',
    action: '写下90天后的目标和愿景。',
    reflection: '90天后的你会是什么样子？'
  },
  {
    day: 32,
    phase: '巩固',
    theme: '帮助他人',
    task: '尝试帮助其他正在戒色的人。',
    knowledge: '帮助他人可以增强自己的动力和成就感。',
    action: '在社群中鼓励或帮助他人。',
    reflection: '帮助他人给你带来了什么感受？'
  },
  {
    day: 33,
    phase: '巩固',
    theme: '专注训练',
    task: '训练你的专注力。',
    knowledge: '专注力是自控力的重要组成部分。',
    action: '进行一项需要全神贯注的活动。',
    reflection: '你的专注力有提高吗？'
  },
  {
    day: 34,
    phase: '巩固',
    theme: '情绪觉察',
    task: '更深入地觉察你的情绪。',
    knowledge: '了解情绪的来源可以更好地管理情绪。',
    action: '记录你今天的情绪变化。',
    reflection: '什么引发了你的情绪波动？'
  },
  {
    day: 35,
    phase: '巩固',
    theme: '健康生活',
    task: '关注你的整体健康。饮食、睡眠、运动都很重要。',
    knowledge: '身体健康会影响心理健康和自控力。',
    action: '今天注意健康饮食和充足睡眠。',
    reflection: '你的生活习惯有改善吗？'
  },
  {
    day: 36,
    phase: '巩固',
    theme: '五周里程碑',
    task: '恭喜完成五周！你做得非常棒！',
    knowledge: '持续36天的坚持说明新习惯已经相当稳固。',
    action: '继续保持！',
    reflection: '这周你有什么新收获？'
  },
  {
    day: 37,
    phase: '巩固',
    theme: '自我对话',
    task: '关注你内心的对话。',
    knowledge: '我们的内心对话会影响我们的行为。',
    action: '注意你今天对自己说了什么。',
    reflection: '你的内心对话是积极的还是消极的？'
  },
  {
    day: 38,
    phase: '巩固',
    theme: '时间管理',
    task: '合理安排你的时间。',
    knowledge: '忙碌的生活可以减少冲动的时间。',
    action: '制定明天的计划表。',
    reflection: '你的时间安排有效吗？'
  },
  {
    day: 39,
    phase: '巩固',
    theme: '应对欲望',
    task: '当欲望来临时，你知道该怎么做。',
    knowledge: '欲望是暂时的，它会过去。',
    action: '当欲望来临时，使用你学到的技巧应对。',
    reflection: '你是如何应对欲望的？'
  },
  {
    day: 40,
    phase: '巩固',
    theme: '保持警惕',
    task: '不要放松警惕。冲动可能随时袭来。',
    knowledge: '即使感觉好了，也不能放松警惕。',
    action: '继续保持你的防护措施。',
    reflection: '今天你需要特别警惕什么？'
  },
  {
    day: 41,
    phase: '巩固',
    theme: '反思成长',
    task: '回顾你的成长历程。',
    knowledge: '看到自己的成长可以增强信心。',
    action: '对比第一天的自己和现在的自己。',
    reflection: '你最大的变化是什么？'
  },
  {
    day: 42,
    phase: '巩固',
    theme: '六周里程碑',
    task: '恭喜完成六周！你已经走过了将近一半的旅程！',
    knowledge: '42天的坚持说明你已经建立了稳固的新习惯。',
    action: '庆祝这个里程碑！',
    reflection: '这周感觉如何？'
  },
  {
    day: 43,
    phase: '巩固',
    theme: '未来规划',
    task: '规划你的未来，但专注于当下。',
    knowledge: '未来是由一个个当下组成的。',
    action: '写下下个月的三个目标。',
    reflection: '你对未来有什么期望？'
  },
  {
    day: 44,
    phase: '巩固',
    theme: '精力管理',
    task: '管理好你的精力。',
    knowledge: '疲劳时更容易冲动。',
    action: '注意休息，保持精力充沛。',
    reflection: '你今天休息够了吗？'
  },
  {
    day: 45,
    phase: '巩固',
    theme: '习惯升级',
    task: '在现有习惯基础上增加新的好习惯。',
    knowledge: '好习惯可以相互促进。',
    action: '选择一个新习惯开始培养。',
    reflection: '新习惯进行得怎么样？'
  },
  {
    day: 46,
    phase: '巩固',
    theme: '自我控制',
    task: '练习自我控制。',
    knowledge: '自控力像肌肉一样，越练越强。',
    action: '今天主动做一件有点困难但正确的事。',
    reflection: '你挑战了自己吗？'
  },
  {
    day: 47,
    phase: '巩固',
    theme: '内心平静',
    task: '追求内心的平静。',
    knowledge: '平静的内心是最大的财富。',
    action: '今天找一个安静的时刻，享受平静。',
    reflection: '你感受到内心的平静了吗？'
  },
  {
    day: 48,
    phase: '巩固',
    theme: '七周里程碑',
    task: '恭喜完成七周！胜利在望！',
    knowledge: '48天的坚持已经非常了不起了。',
    action: '继续加油！',
    reflection: '你感觉自己的变化大吗？'
  },
  {
    day: 49,
    phase: '巩固',
    theme: '自信建立',
    task: '建立你的自信心。',
    knowledge: '自信是抵抗冲动的重要武器。',
    action: '列出你的成就和优点。',
    reflection: '你对自己更有信心了吗？'
  },
  {
    day: 50,
    phase: '巩固',
    theme: '五十天成就',
    task: '恭喜你完成了50天！这是巨大的成就！',
    knowledge: '50天的坚持说明新习惯已经完全内化。',
    action: '好好庆祝这个成就！',
    reflection: '这50天你学到了什么？'
  },
  {
    day: 51,
    phase: '巩固',
    theme: '习惯检查',
    task: '检查你的习惯是否稳固。',
    knowledge: '定期检查可以确保习惯的持续性。',
    action: '回顾你的日常习惯。',
    reflection: '哪些习惯已经自动化了？'
  },
  {
    day: 52,
    phase: '巩固',
    theme: '应对挑战',
    task: '准备好应对更大的挑战。',
    knowledge: '随着时间推移，可能会遇到更强的冲动。',
    action: '回顾你学到的所有技巧。',
    reflection: '你现在准备好面对挑战了吗？'
  },
  {
    day: 53,
    phase: '巩固',
    theme: '专注目标',
    task: '专注于你的目标。',
    knowledge: '目标是指引我们前进的灯塔。',
    action: '再次确认你的目标和动机。',
    reflection: '你的目标还清晰吗？'
  },
  {
    day: 54,
    phase: '巩固',
    theme: '保持动力',
    task: '保持你的动力。',
    knowledge: '动力需要不断补充。',
    action: '寻找新的激励来源。',
    reflection: '什么最能激励你？'
  },
  {
    day: 55,
    phase: '巩固',
    theme: '八周里程碑',
    task: '恭喜完成八周！你已经走过了大部分旅程！',
    knowledge: '55天的坚持说明成功就在眼前！',
    action: '继续坚持！',
    reflection: '这周你感觉如何？'
  },
  {
    day: 56,
    phase: '巩固',
    theme: '自我超越',
    task: '挑战自己，超越自己。',
    knowledge: '不断挑战可以让我们变得更强。',
    action: '设定一个新的挑战。',
    reflection: '你挑战了自己吗？'
  },
  {
    day: 57,
    phase: '巩固',
    theme: '内心强大',
    task: '让你的内心变得更强大。',
    knowledge: '强大的内心可以抵御一切诱惑。',
    action: '进行冥想和自我暗示。',
    reflection: '你的内心更强大吗？'
  },
  {
    day: 58,
    phase: '巩固',
    theme: '习惯巩固',
    task: '继续巩固你的习惯。',
    knowledge: '习惯需要持续的维护。',
    action: '保持你的日常习惯。',
    reflection: '习惯变得多自然了？'
  },
  {
    day: 59,
    phase: '巩固',
    theme: '保持警惕',
    task: '继续保持警惕。',
    knowledge: '即使接近成功，也不能放松。',
    action: '注意任何可能的触发因素。',
    reflection: '今天一切顺利吗？'
  },
  {
    day: 60,
    phase: '巩固',
    theme: '六十天成就',
    task: '恭喜完成60天！你已经完成了三分之二！',
    knowledge: '60天的坚持是巨大的成就！',
    action: '庆祝这个重要的里程碑！',
    reflection: '这60天最大的改变是什么？'
  },
  {
    day: 61,
    phase: '巩固',
    theme: '新阶段',
    task: '你已经进入了新的阶段。继续前进！',
    knowledge: '61天意味着你已经彻底改变了。',
    action: '规划下一个30天的目标。',
    reflection: '你现在是什么感觉？'
  },
  {
    day: 62,
    phase: '巩固',
    theme: '享受生活',
    task: '学会享受生活的美好。',
    knowledge: '美好的生活不需要那些虚假的刺激。',
    action: '今天做一件让你享受的事。',
    reflection: '什么让你感到快乐？'
  },
  {
    day: 63,
    phase: '巩固',
    theme: '九周里程碑',
    task: '恭喜完成63天！胜利在望！',
    knowledge: '63天的坚持说明新生活已经完全建立。',
    action: '继续保持！',
    reflection: '这一周感觉如何？'
  },
  {
    day: 64,
    phase: '巩固',
    theme: '自我肯定',
    task: '给自己更多的肯定。',
    knowledge: '自我肯定是成功的重要因素。',
    action: '写下你对自己的肯定。',
    reflection: '你肯定自己吗？'
  },
  {
    day: 65,
    phase: '巩固',
    theme: '坚持到底',
    task: '坚持到底就是胜利。',
    knowledge: '65天的坚持说明你已经完全改变了。',
    action: '继续保持你的习惯。',
    reflection: '你感到自豪吗？'
  },
  {
    day: 66,
    phase: '巩固',
    theme: '习惯形成',
    task: '科学研究表明，66天是习惯形成的关键时间点。你已经做到了！',
    knowledge: '你已经形成了终身的好习惯！',
    action: '庆祝这个科学里程碑！',
    reflection: '习惯已经完全内化了吗？'
  },
  {
    day: 67,
    phase: '巩固',
    theme: '展望未来',
    task: '展望你的美好未来。',
    knowledge: '美好的未来正在等着你。',
    action: '写下你对未来的期望。',
    reflection: '你对未来有什么期待？'
  },
  {
    day: 68,
    phase: '巩固',
    theme: '保持初心',
    task: '记住你为什么开始。',
    knowledge: '不忘初心，方得始终。',
    action: '回顾你的初心和动机。',
    reflection: '你的初心还在吗？'
  },
  {
    day: 69,
    phase: '巩固',
    theme: '十周里程碑',
    task: '恭喜完成69天！只剩21天了！',
    knowledge: '69天的坚持说明成功已经不远了！',
    action: '继续保持！',
    reflection: '这周感觉如何？'
  },
  {
    day: 70,
    phase: '巩固',
    theme: '七十天成就',
    task: '恭喜完成70天！',
    knowledge: '70天的坚持是巨大的成就！',
    action: '庆祝这个成就！',
    reflection: '这70天你最大的变化是什么？'
  },
  {
    day: 71,
    phase: '巩固',
    theme: '自信人生',
    task: '你已经变得非常自信。',
    knowledge: '自信是最宝贵的财富。',
    action: '展现你的自信。',
    reflection: '你有多自信？'
  },
  {
    day: 72,
    phase: '巩固',
    theme: '习惯生活',
    task: '好习惯已经成为你生活的一部分。',
    knowledge: '习惯就是生活。',
    action: '继续保持。',
    reflection: '习惯有多自然了？'
  },
  {
    day: 73,
    phase: '巩固',
    theme: '内心富足',
    task: '你的内心变得更加富足。',
    knowledge: '内心的富足是真正的富足。',
    action: '感受内心的富足。',
    reflection: '你感到富足吗？'
  },
  {
    day: 74,
    phase: '巩固',
    theme: '十一周里程碑',
    task: '恭喜完成74天！只剩16天！',
    knowledge: '胜利就在眼前！',
    action: '继续坚持！',
    reflection: '这周你感觉如何？'
  },
  {
    day: 75,
    phase: '巩固',
    theme: '美好人生',
    task: '你正在创造美好的人生。',
    knowledge: '每一个选择都在创造你的未来。',
    action: '继续做出好的选择。',
    reflection: '你的人生变得更美好了吗？'
  },
  {
    day: 76,
    phase: '巩固',
    theme: '坚持不懈',
    task: '坚持不懈直到最后。',
    knowledge: '坚持就是胜利。',
    action: '继续保持。',
    reflection: '你感到骄傲吗？'
  },
  {
    day: 77,
    phase: '巩固',
    theme: '77天成就',
    task: '恭喜完成77天！',
    knowledge: '77天的坚持说明你已经完全改变！',
    action: '庆祝这个成就！',
    reflection: '这77天你学到了什么？'
  },
  {
    day: 78,
    phase: '巩固',
    theme: '新生活',
    task: '你已经开始了全新的生活。',
    knowledge: '新生活已经彻底建立。',
    action: '拥抱你的新生活。',
    reflection: '你喜欢你的新生活吗？'
  },
  {
    day: 79,
    phase: '巩固',
    theme: '十二周里程碑',
    task: '恭喜完成79天！只剩11天！',
    knowledge: '胜利就在眼前！',
    action: '继续保持！',
    reflection: '这周感觉如何？'
  },
  {
    day: 80,
    phase: '巩固',
    theme: '八十天成就',
    task: '恭喜完成80天！',
    knowledge: '80天的坚持是伟大的成就！',
    action: '庆祝这个里程碑！',
    reflection: '这80天最大的改变是什么？'
  },
  {
    day: 81,
    phase: '巩固',
    theme: '完美人生',
    task: '你正在创造完美的人生。',
    knowledge: '每一个好习惯都在完善你的人生。',
    action: '继续努力。',
    reflection: '你的人生完美吗？'
  },
  {
    day: 82,
    phase: '巩固',
    theme: '坚持到底',
    task: '坚持到底就是胜利。',
    knowledge: '82天的坚持说明你是最棒的！',
    action: '继续保持。',
    reflection: '你感到自豪吗？'
  },
  {
    day: 83,
    phase: '巩固',
    theme: '最后冲刺',
    task: '最后7天！加油！',
    knowledge: '最后的冲刺最关键。',
    action: '保持最佳状态。',
    reflection: '你准备好了吗？'
  },
  {
    day: 84,
    phase: '巩固',
    theme: '十二周+里程碑',
    task: '恭喜完成84天！只剩6天！',
    knowledge: '你就要成功了！',
    action: '继续保持！',
    reflection: '这周感觉如何？'
  },
  {
    day: 85,
    phase: '巩固',
    theme: '胜利在望',
    task: '85天！你就要成功了！',
    knowledge: '85天的坚持说明你一定会成功！',
    action: '继续保持！',
    reflection: '你感到激动吗？'
  },
  {
    day: 86,
    phase: '巩固',
    theme: '最后五天',
    task: '最后5天！加油！',
    knowledge: '坚持就是胜利！',
    action: '保持最佳状态。',
    reflection: '你准备好了吗？'
  },
  {
    day: 87,
    phase: '巩固',
    theme: '最后四天',
    task: '最后4天！',
    knowledge: '你就要成功了！',
    action: '继续保持！',
    reflection: '你感到兴奋吗？'
  },
  {
    day: 88,
    phase: '巩固',
    theme: '最后三天',
    task: '最后3天！',
    knowledge: '你就要完成90天挑战了！',
    action: '保持最佳状态！',
    reflection: '你准备好了吗？'
  },
  {
    day: 89,
    phase: '巩固',
    theme: '最后两天',
    task: '最后2天！',
    knowledge: '你就要成功了！',
    action: '继续保持！',
    reflection: '你感到激动吗？'
  },
  {
    day: 90,
    phase: '达成',
    theme: '90天完成！',
    task: '恭喜你完成了90天挑战！你已经彻底改变了自己！',
    knowledge: '90天的坚持说明你已经建立了终身的好习惯！你已经成功了！',
    action: '庆祝这个伟大的成就！你已经成为了更好的自己！',
    reflection: '这90天你最大的收获是什么？你变成了什么样的人？'
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
  const completedDays = JSON.parse(localStorage.getItem('completedDays') || '[]')

  if (!completedDays.includes(day)) {
    completedDays.push(day)
    localStorage.setItem('completedDays', JSON.stringify(completedDays))

    alert('任务完成！')

    setTimeout(() => {
      closeModal()
    }, 500)
  }
}
</script>

<style scoped>
.plan-page {
  min-height: 100vh;
  min-height: 100dvh;
  position: relative;
}

.nav-header {
  position: relative;
  z-index: 10;
  padding: 80px 24px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-button {
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

.nav-title {
  font-size: 20px;
  font-weight: 600;
  color: #F8FAFC;
}

.placeholder {
  width: 44px;
}

.progress-indicator {
  padding: 0 24px;
  margin-bottom: 20px;
}

.progress-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3B82F6, #8B5CF6);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 13px;
  color: #94A3B8;
}

.task-list {
  padding: 0 24px;
  padding-bottom: 32px;
  height: calc(100vh - 220px);
  overflow-y: auto;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.task-item.locked {
  opacity: 0.4;
}

.task-item.completed {
  opacity: 0.8;
  border-color: #10B981;
}

.task-item:active {
  transform: scale(0.98);
}

.task-day-badge {
  background: linear-gradient(135deg, #3B82F6, #6366F1);
  padding: 6px 10px;
  border-radius: 8px;
  margin-right: 12px;
  flex-shrink: 0;
}

.task-day-badge span {
  font-size: 12px;
  font-weight: 600;
  color: #F8FAFC;
}

.task-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.task-theme {
  font-size: 15px;
  font-weight: 600;
  color: #F8FAFC;
  margin-bottom: 4px;
}

.task-preview {
  font-size: 13px;
  color: #94A3B8;
}

.task-status {
  margin-left: 10px;
}

.status-completed {
  color: #10B981;
  font-size: 18px;
}

.status-locked {
  font-size: 14px;
}

.status-current {
  font-size: 12px;
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
  padding: 16px;
}

.task-modal {
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  padding: 24px;
}

.modal-header {
  margin-bottom: 20px;
}

.modal-day-badge {
  display: inline-block;
  background: linear-gradient(135deg, #3B82F6, #6366F1);
  padding: 4px 12px;
  border-radius: 6px;
  margin-bottom: 10px;
}

.modal-day-badge span {
  font-size: 13px;
  font-weight: 600;
  color: #F8FAFC;
}

.modal-theme {
  font-size: 24px;
  font-weight: 700;
  color: #F8FAFC;
}

.modal-content {
  margin-bottom: 20px;
}

.content-text {
  font-size: 15px;
  color: #F8FAFC;
  line-height: 1.8;
  margin-bottom: 20px;
}

.knowledge-section,
.action-section,
.reflection-section {
  margin-bottom: 16px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.section-label {
  font-size: 14px;
  font-weight: 600;
  color: #8B5CF6;
  display: block;
  margin-bottom: 8px;
}

.knowledge-text,
.action-text,
.reflection-text {
  font-size: 14px;
  color: #94A3B8;
  line-height: 1.7;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.complete-button {
  width: 100%;
  height: 52px;
  font-size: 17px;
}

.complete-button.completed {
  background: linear-gradient(135deg, #10B981, #059669);
}

.close-modal-button {
  width: 100%;
  height: 44px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #94A3B8;
  font-size: 15px;
  cursor: pointer;
}
</style>
