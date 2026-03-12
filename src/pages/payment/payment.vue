<template>
  <div class="payment-page">
    <div class="payment-header">
      <h1 class="payment-title">完成支付</h1>
      <p class="payment-subtitle">开启你的戒色之旅</p>
    </div>
    <div class="payment-card">
      <div class="plan-info">
        <h2 class="plan-name">布鲁计划永久会员</h2>
        <p class="plan-desc">一次付费，终身使用</p>
        <div class="plan-price">
          <span class="price-symbol">¥</span>
          <span class="price-value">99</span>
        </div>
      </div>
    </div>
    <div class="bottom-action">
      <button class="pay-button" @click="handlePayment" :disabled="isProcessing">
        <span v-if="isProcessing">处理中...</span>
        <span v-else>确认支付 ¥99</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isProcessing = ref(false)

const handlePayment = async () => {
  if (isProcessing.value) return
  isProcessing.value = true
  
  try {
    localStorage.setItem('hasPaid', 'true')
    localStorage.setItem('paymentTime', new Date().toISOString())
    router.push('/login')
  } catch (error) {
    console.error('支付错误:', error)
    alert('支付处理失败，请重试')
  } finally {
    isProcessing.value = false
  }
}
</script>

<style scoped>
.payment-page {
  min-height: 100vh;
  padding: 60px 20px;
  background: #0F172A;
}
.payment-header {
  text-align: center;
  margin-bottom: 32px;
}
.payment-title {
  font-size: 32px;
  font-weight: 700;
  color: #F8FAFC;
  margin-bottom: 8px;
}
.payment-subtitle {
  font-size: 16px;
  color: #94A3B8;
}
.payment-card {
  background: rgba(255,255,255,0.05);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
}
.plan-info {
  text-align: center;
}
.plan-name {
  font-size: 20px;
  font-weight: 600;
  color: #F8FAFC;
  margin-bottom: 4px;
}
.plan-desc {
  font-size: 14px;
  color: #94A3B8;
  margin-bottom: 12px;
}
.plan-price {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
}
.price-symbol {
  font-size: 20px;
  font-weight: 600;
  color: #F8FAFC;
}
.price-value {
  font-size: 48px;
  font-weight: 700;
  color: #F8FAFC;
}
.pay-button {
  width: 100%;
  height: 54px;
  font-size: 18px;
  font-weight: 600;
  background: linear-gradient(135deg, #3B82F6, #8B5CF6);
  border: none;
  border-radius: 16px;
  color: white;
  cursor: pointer;
}
.pay-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
