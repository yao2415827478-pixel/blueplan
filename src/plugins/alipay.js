// 支付宝 App 支付插件封装
// 用于在 App 中调用支付宝原生 SDK 进行支付

import { registerPlugin } from '@capacitor/core'

// 定义插件接口类型
let AlipayPlugin = null

// 尝试获取插件（仅在原生环境中可用）
try {
  AlipayPlugin = registerPlugin('AlipayPlugin')
} catch (e) {
  console.warn('AlipayPlugin 不可用:', e.message)
}

/**
 * 支付宝支付
 * @param {string} orderStr - 后端返回的支付参数字符串
 * @returns {Promise<object>} 支付结果
 */
export const alipayPay = async (orderStr) => {
  if (!AlipayPlugin) {
    // 在浏览器环境中，返回模拟结果
    console.warn('支付宝插件在浏览器环境中不可用')
    return {
      success: true,
      demo: true,
      message: '浏览器环境演示模式',
      resultCode: '9000'
    }
  }

  try {
    const result = await AlipayPlugin.pay({ orderStr })
    console.log('支付宝支付结果:', result)
    return result
  } catch (error) {
    console.error('支付宝支付失败:', error)
    return {
      success: false,
      error: error.message || '支付失败'
    }
  }
}

/**
 * 检查支付宝是否安装
 * @returns {Promise<boolean>} 是否安装了支付宝
 */
export const isAlipayInstalled = async () => {
  if (!AlipayPlugin) {
    return false
  }

  try {
    const result = await AlipayPlugin.isAlipayInstalled()
    return result?.installed || false
  } catch (error) {
    console.error('检查支付宝安装状态失败:', error)
    return false
  }
}

/**
 * 支付宝授权（获取用户信息）
 * @param {string} authInfo - 授权信息字符串
 * @returns {Promise<object>} 授权结果
 */
export const alipayAuth = async (authInfo) => {
  if (!AlipayPlugin) {
    console.warn('支付宝插件在浏览器环境中不可用')
    return {
      success: false,
      demo: true,
      message: '浏览器环境演示模式'
    }
  }

  try {
    const result = await AlipayPlugin.auth({ authInfo })
    console.log('支付宝授权结果:', result)
    return result
  } catch (error) {
    console.error('支付宝授权失败:', error)
    return {
      success: false,
      error: error.message || '授权失败'
    }
  }
}

export default {
  pay: alipayPay,
  isInstalled: isAlipayInstalled,
  auth: alipayAuth
}
