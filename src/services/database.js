// 数据库服务模块
// 用于将用户数据同步到服务器数据库
// 配置好API后，在此实现真实的数据上传

import { isDatabaseConfigured, getDatabaseApiUrl } from '../config/api'

// API端点配置
const DB_ENDPOINTS = {
  createUser: '/api/users/create',
  updateUser: '/api/users/update',
  getUser: '/api/users/get',
  syncData: '/api/users/sync'
}

// 获取完整API地址
const getApiUrl = (endpoint) => {
  return getDatabaseApiUrl(DB_ENDPOINTS[endpoint])
}

/**
 * 创建新用户
 * @param {object} userInfo - 用户信息
 * @returns {Promise<object>} 创建结果
 */
export const createUser = async (userInfo) => {
  if (!isDatabaseConfigured()) {
    console.log('数据库演示模式 - 创建用户:', userInfo)
    return {
      success: true,
      demo: true,
      message: '演示模式：用户创建',
      userId: 'demo_user_' + Date.now()
    }
  }

  try {
    const apiUrl = getApiUrl('createUser')
    console.log('创建用户:', apiUrl, userInfo)

    // TODO: 真实API调用示例
    // const response = await fetch(apiUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + getAuthToken()
    //   },
    //   body: JSON.stringify(userInfo)
    // })
    // const data = await response.json()
    // return data

    return {
      success: true,
      demo: true,
      message: '数据库API已配置，请实现真实调用'
    }
  } catch (error) {
    console.error('创建用户失败:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * 更新用户信息
 * @param {string} userId - 用户ID
 * @param {object} userInfo - 用户信息
 * @returns {Promise<object>} 更新结果
 */
export const updateUser = async (userId, userInfo) => {
  if (!isDatabaseConfigured()) {
    console.log('数据库演示模式 - 更新用户:', userId, userInfo)
    return {
      success: true,
      demo: true,
      message: '演示模式：用户更新'
    }
  }

  try {
    const apiUrl = getApiUrl('updateUser')
    console.log('更新用户:', apiUrl, userId, userInfo)

    // TODO: 真实API调用
    return {
      success: true,
      demo: true,
      message: '数据库API已配置，请实现真实调用'
    }
  } catch (error) {
    console.error('更新用户失败:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * 获取用户信息
 * @param {string} userId - 用户ID
 * @returns {Promise<object>} 用户信息
 */
export const getUser = async (userId) => {
  if (!isDatabaseConfigured()) {
    console.log('数据库演示模式 - 获取用户:', userId)
    return {
      success: true,
      demo: true,
      user: {
        id: userId,
        email: localStorage.getItem('email'),
        hasPaid: localStorage.getItem('hasPaid') === 'true',
        startDate: localStorage.getItem('startDate')
      }
    }
  }

  try {
    const apiUrl = getApiUrl('getUser')
    console.log('获取用户:', apiUrl, userId)

    // TODO: 真实API调用
    return {
      success: true,
      demo: true
    }
  } catch (error) {
    console.error('获取用户失败:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * 同步用户所有数据到数据库
 * 包含：支付信息、日记、里程碑等
 * @returns {Promise<object>} 同步结果
 */
export const syncUserToDatabase = async () => {
  if (!isDatabaseConfigured()) {
    console.log('数据库演示模式 - 同步用户数据')
    return {
      success: true,
      demo: true,
      message: '演示模式：数据同步'
    }
  }

  // 收集用户所有数据
  const userData = {
    // 基本信息
    email: localStorage.getItem('email'),
    hasPaid: localStorage.getItem('hasPaid') === 'true',
    paymentMethod: localStorage.getItem('paymentMethod'),
    paymentTime: localStorage.getItem('paymentTime'),
    orderId: localStorage.getItem('orderId'),

    // 戒色进度
    startDate: localStorage.getItem('startDate'),
    surveyResult: localStorage.getItem('surveyResult'),

    // 日记数据
    journalEntries: localStorage.getItem('journalEntries'),

    // 里程碑
    milestones: localStorage.getItem('milestones'),

    // 90天计划进度
    planProgress: localStorage.getItem('planProgress')
  }

  try {
    const apiUrl = getApiUrl('syncData')
    console.log('同步用户数据:', apiUrl, userData)

    // TODO: 真实API调用
    // const response = await fetch(apiUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + getAuthToken()
    //   },
    //   body: JSON.stringify(userData)
    // })
    // const data = await response.json()
    // return data

    return {
      success: true,
      demo: true,
      message: '数据库API已配置，请实现真实调用'
    }
  } catch (error) {
    console.error('同步用户数据失败:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * 支付成功后保存用户信息
 * @param {object} paymentResult - 支付结果
 */
export const savePaymentUser = async (paymentResult) => {
  // 保存支付信息
  localStorage.setItem('hasPaid', 'true')
  localStorage.setItem('paymentMethod', paymentResult.method)
  localStorage.setItem('paymentTime', paymentResult.time)
  localStorage.setItem('orderId', paymentResult.orderId)

  // 同步到数据库
  await syncUserToDatabase()
}

export default {
  isDatabaseConfigured,
  createUser,
  updateUser,
  getUser,
  syncUserToDatabase,
  savePaymentUser
}
