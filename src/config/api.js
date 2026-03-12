// API 配置文件 - 安全版本
// 所有敏感配置已迁移到后端环境变量
// 前端只保留 API 基础地址

// 获取环境变量中的 API 地址
const getBaseUrl = () => {
  // 生产环境：必须从环境变量读取
  if (import.meta.env.PROD) {
    const prodUrl = import.meta.env.VITE_API_BASE_URL
    if (!prodUrl) {
      throw new Error(
        '[配置错误] 生产环境必须设置 VITE_API_BASE_URL 环境变量\n' +
        '请在构建前配置: VITE_API_BASE_URL=https://your-api-domain.com'
      )
    }
    return prodUrl
  }
  
  // 开发环境：允许使用 localhost，但优先使用环境变量
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
}

const API_CONFIG = {
  // ===== 后端 API 基础地址 =====
  // 生产环境必须通过 VITE_API_BASE_URL 环境变量配置
  // 开发环境默认: http://localhost:3000
  baseUrl: getBaseUrl(),

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
