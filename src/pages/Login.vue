<template>
  <div class="login-page">
    <!-- 动态背景 -->
    <div class="liquid-bg"></div>
    <div class="liquid-orb liquid-orb-1"></div>
    <div class="liquid-orb liquid-orb-2"></div>

    <!-- 主要内容 -->
    <div class="content">
      <!-- 标题 -->
      <div class="header-section">
        <h1 class="title">欢迎回来</h1>
        <p class="subtitle">登录后开始你的戒色之旅</p>
      </div>

      <!-- 评估结果卡片 -->
      <div class="result-card glass-card">
        <span class="result-label">你的依赖程度评估</span>
        <div class="result-score">
          <span class="score-value gradient-text">{{ surveyScore }}</span>
          <span class="score-unit">分</span>
        </div>
        <span class="result-level">{{ scoreLevel }}</span>
      </div>

      <!-- 登录表单 -->
      <div class="form-section">
        <!-- 手机号输入 -->
        <div class="input-group">
          <label class="input-label">手机号码</label>
          <input
            class="glass-input"
            type="tel"
            v-model="phone"
            placeholder="请输入手机号码"
            maxlength="11"
          />
        </div>

        <!-- 验证码输入 -->
        <div class="input-group">
          <label class="input-label">验证码</label>
          <div class="code-input-row">
            <input
              class="glass-input code-input"
              type="text"
              v-model="code"
              placeholder="请输入验证码"
              maxlength="6"
            />
            <button
              class="code-button"
              :disabled="countdown > 0 || !isPhoneValid"
              @click="sendCode"
            >
              {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
            </button>
          </div>
        </div>

        <!-- 登录按钮 -->
        <button class="login-button glass-button" @click="handleLogin">
          登录
        </button>
      </div>

      <!-- 其他提示 -->
      <div class="notice-section">
        <span class="notice-text">未注册的手机号将自动创建账号</span>
        <span class="notice-text">登录即表示同意</span>
        <span class="link-text">《用户协议》</span>
        <span class="notice-text">和</span>
        <span class="link-text">《隐私政策》</span>
      </div>
    </div>

    <!-- 开发者跳过按钮 -->
    <DevSkipButton
      text="跳过登录"
      :action="skipLogin"
    />
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { isSmsApiConfigured, getSmsApiUrl } from '../config/api'
import DevSkipButton from '../components/DevSkipButton.vue'

const router = useRouter()

// 状态变量
const phone = ref('')
const code = ref('')
const countdown = ref(0)
let countdownTimer = null

// 手机号格式验证（中国大陆手机号）
const isPhoneValid = computed(() => {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone.value.trim())
})

// 获取评估结果
const surveyResult = JSON.parse(localStorage.getItem('surveyResult') || '{}')
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
const sendCode = async () => {
  if (!phone.value.trim()) {
    alert('请输入手机号码')
    return
  }

  if (!isPhoneValid.value) {
    alert('请输入有效的手机号码')
    return
  }

  // 开始倒计时
  countdown.value = 60
  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(countdownTimer)
    }
  }, 1000)

  // 检查是否配置了真实API
  if (isSmsApiConfigured()) {
    try {
      // 调用真实API发送验证码
      const apiUrl = getSmsApiUrl('sendCode')
      console.log('发送验证码到:', apiUrl, phone.value)

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.value.trim() })
      })

      const data = await response.json()

      if (data.success) {
        alert('验证码已发送到您的手机')
      } else {
        alert(data.message || '发送失败，请稍后重试')
      }
    } catch (error) {
      console.error('发送验证码失败:', error)
      alert('发送失败，请稍后重试')
    }
  } else {
    // 演示模式：使用固定验证码
    alert('验证码已发送到您的手机 (演示: 123456)')
    code.value = '123456'
  }
}

// 处理登录
const handleLogin = async () => {
  if (!phone.value.trim()) {
    alert('请输入手机号码')
    return
  }

  if (!isPhoneValid.value) {
    alert('请输入有效的手机号码')
    return
  }

  if (!code.value || code.value.length < 4) {
    alert('请输入验证码')
    return
  }

  // 检查是否配置了真实API进行验证码验证
  if (isSmsApiConfigured()) {
    try {
      const apiUrl = getSmsApiUrl('verifyCode')
      console.log('验证验证码:', apiUrl)

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.value.trim(), code: code.value })
      })

      const data = await response.json()

      if (!data.success) {
        alert(data.message || '验证码错误')
        return
      }

      // 验证码验证成功
      performLogin()
    } catch (error) {
      console.error('登录失败:', error)
      alert('登录失败，请稍后重试')
    }
  } else {
    // 演示模式：接受任意4位及以上数字
    if (code.value.length >= 4) {
      performLogin()
    } else {
      alert('请输入验证码')
    }
  }
}

// 执行登录操作
const performLogin = () => {
  // 保存登录状态
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('phone', phone.value.trim())
  localStorage.setItem('loginTime', Date.now().toString())

  // 如果没有开始日期，设置开始日期
  if (!localStorage.getItem('startDate')) {
    localStorage.setItem('startDate', Date.now().toString())
  }

  alert('登录成功！')

  setTimeout(() => {
    // 使用 push 跳转，确保导航成功
    router.push('/home')
  }, 500)
}

// 清理定时器
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})

// 开发者跳过登录
const skipLogin = () => {
  // 写入测试登录状态
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('phone', '17762539752')
  localStorage.setItem('loginTime', Date.now().toString())
  localStorage.setItem('isInternalStaff', 'true')

  // 如果没有开始日期，设置开始日期
  if (!localStorage.getItem('startDate')) {
    localStorage.setItem('startDate', Date.now().toString())
  }

  alert('[Dev] 登录已跳过，已写入测试登录状态')
  router.push('/home')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  min-height: 100dvh;
  position: relative;
  overflow: hidden;
}

.content {
  position: relative;
  z-index: 1;
  padding: 80px 24px 32px;
}

.header-section {
  text-align: center;
  margin-bottom: 32px;
}

.title {
  font-size: 32px;
  font-weight: 700;
  color: #F8FAFC;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 16px;
  color: #94A3B8;
}

.result-card {
  padding: 24px;
  text-align: center;
  margin-bottom: 32px;
}

.result-label {
  font-size: 14px;
  color: #94A3B8;
  display: block;
  margin-bottom: 10px;
}

.result-score {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 8px;
}

.score-value {
  font-size: 42px;
  font-weight: 700;
}

.score-unit {
  font-size: 16px;
  color: #94A3B8;
  margin-left: 4px;
}

.result-level {
  font-size: 15px;
  color: #8B5CF6;
}

.form-section {
  margin-bottom: 32px;
}

.input-group {
  margin-bottom: 20px;
}

.input-label {
  font-size: 14px;
  color: #94A3B8;
  display: block;
  margin-bottom: 8px;
}

.code-input-row {
  display: flex;
  gap: 12px;
}

.code-input {
  flex: 1;
}

.code-button {
  width: 120px;
  height: 52px;
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.5);
  border-radius: 12px;
  color: #3B82F6;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.code-button:disabled {
  opacity: 0.5;
}

.login-button {
  width: 100%;
  height: 56px;
  font-size: 18px;
  margin-top: 12px;
}

.notice-section {
  text-align: center;
}

.notice-text {
  font-size: 13px;
  color: #64748B;
  display: inline;
}

.link-text {
  font-size: 13px;
  color: #3B82F6;
  display: inline;
}
</style>
