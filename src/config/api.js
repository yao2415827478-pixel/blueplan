// API 配置文件
// 等您办好微信/支付宝/邮箱API和数据库后，在此配置即可

const API_CONFIG = {
  // ===== 数据库 API =====
  // 配置您的数据库API地址
  // 示例: 'http://120.27.139.123:3000' 或 'http://blue-plan1.cn:3000'
  database: {
    baseUrl: 'http://localhost:3000'
  },

  // ===== 短信验证码 API (阿里云) =====
  // 您的阿里云短信服务API
  smsApi: {
    baseUrl: 'http://localhost:3000', // 后端API地址
    sendCode: '/send-sms-code',      // 发送验证码接口
    verifyCode: '/verify-sms-code'   // 验证验证码接口
  },

  // ===== 阿里云短信配置 =====
  // 阿里云短信服务配置（在服务器端使用）
  aliyunSms: {
    accessKeyId: 'fhyHmw7I2ILL8jo2Aw+Y0XqAZbOzp1HEVCbu69p4XdY', // 您的AccessKey
    // 以下配置需要在阿里云控制台获取并填写
    signName: '布鲁计划',           // 短信签名
    templateCode: 'SMS_xxxxxxxx',  // 短信模板CODE
    region: 'cn-hangzhou'
  },

  // ===== 微信支付 API =====
  // 配置您的微信支付API地址
  wechatPay: {
    baseUrl: '', // 微信支付API域名
    createOrder: '/create-order', // 创建订单
    queryOrder: '/query-order', // 查询订单状态
    notifyUrl: '/wechat-notify' // 支付回调通知
  },

  // ===== 支付宝支付 API =====
  // 配置您的支付宝API地址
  alipay: {
    baseUrl: 'http://localhost:3000', // 您的后端API地址
    createOrder: '/alipay/create-order', // 创建订单
    queryOrder: '/alipay/query-order', // 查询订单状态
    notifyUrl: '/alipay-notify' // 支付回调通知
  }
}

// 判断是否配置了真实API
export const isDatabaseConfigured = () => !!API_CONFIG.database.baseUrl
export const isSmsApiConfigured = () => !!API_CONFIG.smsApi.baseUrl
export const isWechatPayConfigured = () => !!API_CONFIG.wechatPay.baseUrl
export const isAlipayConfigured = () => !!API_CONFIG.alipay.baseUrl

// 获取完整API地址
export const getDatabaseApiUrl = (endpoint) => {
  return `${API_CONFIG.database.baseUrl}${endpoint}`
}

export const getSmsApiUrl = (endpoint) => {
  return `${API_CONFIG.smsApi.baseUrl}${API_CONFIG.smsApi[endpoint]}`
}

export const getWechatPayApiUrl = (endpoint) => {
  return `${API_CONFIG.wechatPay.baseUrl}${API_CONFIG.wechatPay[endpoint]}`
}

export const getAlipayApiUrl = (endpoint) => {
  return `${API_CONFIG.alipay.baseUrl}${API_CONFIG.alipay[endpoint]}`
}

// 导出阿里云短信配置（仅在后端使用）
export const getAliyunSmsConfig = () => {
  return API_CONFIG.aliyunSms
}

export default API_CONFIG
