<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 环境变量控制：VITE_ENABLE_DEV_BYPASS=true 时显示
// 临时调试：设为 true 确保按钮显示
const isDevMode = import.meta.env.VITE_ENABLE_DEV_BYPASS === 'true' || true

const props = defineProps({
  text: {
    type: String,
    default: '跳过'
  },
  action: {
    type: Function,
    required: true
  }
})

const handleSkip = async () => {
  console.log('[DevSkip] 执行跳过逻辑...')
  try {
    await props.action()
  } catch (e) {
    console.error('[DevSkip] 错误:', e)
    alert('跳过失败: ' + e.message)
  }
}
</script>

<template>
  <button
    v-if="isDevMode"
    class="dev-skip-btn"
    @click.stop="handleSkip"
  >
    {{ text }}
  </button>
</template>

<style scoped>
.dev-skip-btn {
  position: fixed;
  right: 16px;
  bottom: 24px;
  z-index: 9999;
  background: linear-gradient(135deg, #F59E0B, #EF4444);
  color: white;
  padding: 8px 14px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s ease;
  /* 安全区域适配 */
  padding-bottom: calc(8px + env(safe-area-inset-bottom, 0px));
}

.dev-skip-btn:hover {
  opacity: 0.9;
  transform: scale(1.05);
}

.dev-skip-btn:active {
  transform: scale(0.95);
}
</style>
