<template>
  <div class="payment-page">
    <!-- 动态背景 -->
    <div class="liquid-bg"></div>
    <div class="liquid-orb liquid-orb-1"></div>
    <div class="liquid-orb liquid-orb-2"></div>

    <!-- 主内容 -->
    <div class="content">
      <!-- 标题 -->
      <div class="header-section">
        <h1 class="title">布鲁计划</h1>
        <p class="subtitle">给当下的自己一个改变的机会</p>
      </div>

      <!-- 价值主张 -->
      <div class="value-section">
        <div class="value-card glass-card">
          <div class="value-icon">🌟</div>
          <h3 class="value-title">你值得拥有更好的自己</h3>
          <p class="value-desc">
            每一个戒色成功的人，都曾面对同样的挣扎。<br/>
            现在的你，只差一个决心。
          </p>
        </div>

        <div class="value-card glass-card">
          <div class="value-icon">💪</div>
          <h3 class="value-title">科学的方法，陪你走过90天</h3>
          <p class="value-desc">
            神经科学证实的90天周期，<br/>
            每天一个小目标，让改变自然而然发生。
          </p>
        </div>

        <div class="value-card glass-card">
          <div class="value-icon">🤝</div>
          <h3 class="value-title">你不必独自前行</h3>
          <p class="value-desc">
            当冲动来临时，紧急求助功能就在身边。<br/>
            还有专属客服，为你提供支持。
          </p>
        </div>
      </div>

      <!-- 功能列表 -->
      <div class="features-section">
        <h2 class="section-title">你将获得</h2>
        <div class="feature-list">
          <div class="feature-item">
            <span class="feature-icon">✓</span>
            <span class="feature-text">90天科学戒色计划</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">✓</span>
            <span class="feature-text">每日心理引导</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">✓</span>
            <span class="feature-text">进度日历追踪</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">✓</span>
            <span class="feature-text">日记记录系统</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">✓</span>
            <span class="feature-text">紧急求助功能</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">✓</span>
            <span class="feature-text">专属客服支持</span>
          </div>
        </div>
      </div>

      <!-- 价格部分 - 强调咖啡价 -->
      <div class="price-section">
        <div class="price-card glass-card">
          <div class="price-badge">☕ 一杯咖啡的钱</div>
          <p class="price-desc">
            9.9元，给自己一个彻底改变的机会<br/>
            <span class="price-note">一次付费，永久使用</span>
          </p>

          <!-- 支付方式选择 -->
          <div class="payment-methods">
            <div
              class="payment-method"
              :class="{ active: selectedMethod === 'wechat' }"
              @click="selectedMethod = 'wechat'"
            >
              <span class="method-icon">💬</span>
              <span class="method-name">微信支付</span>
              <span class="check-icon" v-if="selectedMethod === 'wechat'">✓</span>
            </div>
            <div
              class="payment-method"
              :class="{ active: selectedMethod === 'alipay' }"
              @click="selectedMethod = 'alipay'"
            >
              <span class="method-icon">💳</span>
              <span class="method-name">支付宝</span>
              <span class="check-icon" v-if="selectedMethod === 'alipay'">✓</span>
            </div>
          </div>

          <!-- 支付按钮 -->
          <button
            class="pay-button glass-button"
            :disabled="!selectedMethod || isProcessing"
            @click="handlePayment"
          >
            {{ isProcessing ? '处理中...' : `立即支付 ¥9.9` }}
          </button>

          <p class="payment-notice">
            支付即表示同意<span class="link-text">《用户协议》</span>
          </p>
        </div>
      </div>
    </div>

    <!-- 支付结果弹窗 -->
    <div v-if="showResultModal" class="modal-overlay">
      <div class="result-modal glass-card">
        <div v-if="paymentSuccess" class="success-content">
          <span class="success-icon">🎉</span>
          <h2 class="result-title">支付成功</h2>
          <p class="result-message">欢迎加入布鲁计划！</p>
          <button class="confirm-button glass-button" @click="goToLogin">
            开始使用
          </button>
        </div>
        <div v-else class="failed-content">
          <span class="failed-icon">😞</span>
          <h2 class="result-title">支付失败</h2>
          <p class="result-message">{{ errorMessage }}</p>
          <button class="confirm-button glass-button" @click="showResultModal = false">
            重试
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createPaymentOrder } from '../services/payment'
import { syncUserToDatabase } from '../services/database'

const router = useRouter()

// 状态变量
const selectedMethod = ref('')
const isProcessing = ref(false)
const showResultModal = ref(false)
const paymentSuccess = ref(false)
const errorMessage = ref('')

// 处理支付
const handlePayment = async () => {
  if (!selectedMethod.value || isProcessing.value) return

  isProcessing.value = true

  try {
    // ====== 真实支付模式 ======
    // 创建支付订单
    const result = await createPaymentOrder(selectedMethod.value, {
      amount: 990, // 9.9元 = 990分
      subject: '布鲁计划',
      description: '90天戒色计划 + 每日心理引导 + 永久使用'
    })

    if (result.success) {
      // 如果是支付宝
      if (selectedMethod.value === 'alipay') {
        // 检查是否有 orderStr（App 支付需要的参数）
        if (result.orderStr) {
          // 在原生 App 中调用支付宝 SDK
          // 支付逻辑已封装在 payment.js 的 createAlipayOrder 中
          // 这里直接根据 result 判断支付结果
          
          if (result.paymentSuccess) {
            // 支付成功
            handlePaymentSuccess(result.orderId)
            return
          } else if (result.cancelled) {
            // 用户取消
            handlePaymentFailure('用户取消支付')
            return
          } else if (result.demo) {
            // 演示模式
            handlePaymentSuccess(result.orderId)
            return
          }
        }
        
        // 如果没有 orderStr 或创建失败
        handlePaymentFailure(result.error || '支付失败，请重试')
      } else if (selectedMethod.value === 'wechat') {
        // 微信支付处理 - 暂时显示提示
        alert('微信支付暂未开通，请使用支付宝支付')
        isProcessing.value = false
      } else {
        // 其他情况
        handlePaymentFailure('请选择支付方式')
      }
    } else {
      // 创建订单失败
      handlePaymentFailure(result.error || '支付失败，请重试')
    }
  } catch (error) {
    console.error('支付错误:', error)
    handlePaymentFailure('支付出错，请重试')
  } finally {
    isProcessing.value = false
  }
}

// 支付等待中处理（等待支付宝回调）
const handlePaymentWaiting = (orderId) => {
  isProcessing.value = false
  // 可以在这里添加一个轮询来查询订单状态
  // 或者提示用户支付完成后刷新页面
  alert('请在支付宝APP中完成支付，支付完成后可查询订单状态')
}

// 支付成功处理
const handlePaymentSuccess = (orderId) => {
  // 保存支付状态
  localStorage.setItem('hasPaid', 'true')
  localStorage.setItem('paymentMethod', selectedMethod.value)
  localStorage.setItem('paymentTime', Date.now().toString())
  localStorage.setItem('orderId', orderId || 'demo_' + Date.now())

  // 同步用户数据到数据库（如果已注册）
  syncUserToDatabase()

  paymentSuccess.value = true
  showResultModal.value = true
}

// 支付失败处理
const handlePaymentFailure = (error) => {
  errorMessage.value = error
  paymentSuccess.value = false
  showResultModal.value = true
}

// 跳转登录
const goToLogin = () => {
  router.replace('/login')
}
</script>

<style scoped>
.payment-page {
  min-height: 100vh;
  min-height: 100dvh;
  position: relative;
  overflow-x: hidden;
  padding-bottom: 40px;
}

.content {
  position: relative;
  z-index: 1;
  padding: 50px 20px 20px;
}

.header-section {
  text-align: center;
  margin-bottom: 28px;
}

.title {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 15px;
  color: #94A3B8;
}

/* 价值主张 */
.value-section {
  margin-bottom: 24px;
}

.value-card {
  padding: 20px;
  margin-bottom: 12px;
  text-align: center;
}

.value-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.value-title {
  font-size: 17px;
  font-weight: 600;
  color: #F8FAFC;
  margin-bottom: 8px;
}

.value-desc {
  font-size: 14px;
  color: #94A3B8;
  line-height: 1.6;
}

/* 功能列表 */
.features-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #F8FAFC;
  margin-bottom: 16px;
  text-align: center;
}

.feature-list {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 8px 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-icon {
  color: #10B981;
  margin-right: 12px;
  font-size: 14px;
}

.feature-text {
  font-size: 14px;
  color: #E2E8F0;
}

/* 价格部分 */
.price-section {
  margin-top: 20px;
}

.price-card {
  padding: 24px 20px;
  text-align: center;
}

.price-badge {
  display: inline-block;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #3B82F6;
  font-size: 14px;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 20px;
  margin-bottom: 16px;
}

.price-desc {
  font-size: 15px;
  color: #E2E8F0;
  margin-bottom: 20px;
  line-height: 1.6;
}

.price-note {
  font-size: 13px;
  color: #64748B;
  display: block;
  margin-top: 4px;
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.payment-method {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.payment-method.active {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3B82F6;
}

.method-icon {
  font-size: 20px;
  margin-right: 12px;
}

.method-name {
  flex: 1;
  font-size: 15px;
  color: #F8FAFC;
  font-weight: 500;
}

.check-icon {
  color: #3B82F6;
  font-size: 16px;
  font-weight: 700;
}

.pay-button {
  width: 100%;
  height: 50px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}

.payment-notice {
  font-size: 12px;
  color: #64748B;
}

.link-text {
  color: #3B82F6;
}

/* 弹窗样式 */
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

.result-modal {
  width: 100%;
  padding: 36px 24px;
  text-align: center;
}

.success-icon,
.failed-icon {
  font-size: 56px;
  display: block;
  margin-bottom: 16px;
}

.result-title {
  font-size: 22px;
  font-weight: 700;
  color: #F8FAFC;
  margin-bottom: 10px;
}

.result-message {
  font-size: 15px;
  color: #94A3B8;
  margin-bottom: 24px;
}

.confirm-button {
  width: 100%;
  height: 48px;
  font-size: 16px;
}
</style>
