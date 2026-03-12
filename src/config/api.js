// API 配置文件 - 安全版本
// 所有敏感配置已迁移到后端环境变量
// 前端只保留 API 基础地址

const API_CONFIG = {
  // ===== 后端 API 基础地址 =====
  // 配置您的后端API地址
  // 开发环境: http://localhost:3000
  // 生产环境: https://your-domain.com 或 https://your-server-ip:3000
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',

  // ===== API 端点配置 =====
  endpoints: {
    // 短信验证码
    sendSmsCode: '/send-sms-code',
    verifySmsCode: '/verify-sms-code',

    // 用户相关
    userCreate: '/api/users/create',
    userUpdate: '/api/users/update',
    userGet: '/api/users/get',
    userSync: '/api/users/sync',

    // 支付相关
    alipayCreateOrder: '/alipay/create-order',
    alipayQueryOrder: '/alipay/query-order',
    wechatCreateOrder: '/create-order',
    wechatQueryOrder: '/query-order'
  }
}

// 获取完整 API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.baseUrl}${endpoint}`
}

// 导出配置
export default API_CONFIG
