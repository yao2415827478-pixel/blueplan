// 支付服务模块
// 用于处理微信支付和支付宝支付
// 配置好API后，在此调用真实支付接口

import {
  isWechatPayConfigured,
  isAlipayConfigured,
  getWechatPayApiUrl,
  getAlipayApiUrl
} from '../config/api'

// 导入支付宝插件
import { alipayPay, isAlipayInstalled } from '../plugins/alipay'

// 支付方式枚举
export const PaymentMethod = {
  WECHAT: 'wechat',
  ALIPAY: 'alipay'
}

// 支付状态
export const PaymentStatus = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
}

/**
 * 创建支付订单
 * @param {string} method - 支付方式 (wechat/alipay)
 * @param {object} orderInfo - 订单信息
 * @param {number} orderInfo.amount - 支付金额(分)
 * @param {string} orderInfo.subject - 商品标题
 * @param {string} orderInfo.description - 商品描述
 * @returns {Promise<object>} 支付结果
 */
export const createPaymentOrder = async (method, orderInfo) => {
  const { amount, subject, description } = orderInfo

  if (method === PaymentMethod.WECHAT) {
    return await createWechatPayOrder(orderInfo)
  } else if (method === PaymentMethod.ALIPAY) {
    return await createAlipayOrder(orderInfo)
  } else {
    throw new Error('不支持的支付方式')
  }
}

/**
 * 创建微信支付订单
 */
const createWechatPayOrder = async (orderInfo) => {
  // 检查是否配置了真实API
  if (!isWechatPayConfigured()) {
    console.log('微信支付演示模式:', orderInfo)
    return {
      success: true,
      demo: true,
      message: '演示模式：微信支付',
      orderId: 'demo_' + Date.now()
    }
  }

  try {
    const apiUrl = getWechatPayApiUrl('createOrder')
    console.log('创建微信支付订单:', apiUrl, orderInfo)

    // TODO: 真实微信支付API调用示例
    // const response = await fetch(apiUrl, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     amount: orderInfo.amount,
    //     subject: orderInfo.subject,
    //     description: orderInfo.description,
    //     notifyUrl: getWechatPayApiUrl('notifyUrl')
    //   })
    // })
    // const data = await response.json()
    // return {
    //   success: true,
    //   orderId: data.orderId,
    //   prepayId: data.prepayId,
    //   payParams: data.payParams // 微信支付参数
    // }

    return {
      success: true,
      demo: true,
      message: '微信支付API已配置，请实现真实调用'
    }
  } catch (error) {
    console.error('创建微信支付订单失败:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * 创建支付宝订单并调起支付
 */
const createAlipayOrder = async (orderInfo) => {
  try {
    const apiUrl = getAlipayApiUrl('createOrder')
    console.log('创建支付宝订单:', apiUrl, orderInfo)

    // 将金额从分转换为元（支付宝使用元）
    const amountInYuan = (orderInfo.amount / 100).toFixed(2)

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: amountInYuan,
        subject: orderInfo.subject,
        description: orderInfo.description,
        userId: localStorage.getItem('userId') || ''
      })
    })

    const data = await response.json()
    console.log('支付宝订单创建结果:', data)

    if (data.success && data.payParams?.orderStr) {
      // 获取到后端返回的支付参数字符串
      const orderStr = data.payParams.orderStr
      
      // 检查是否在原生环境中
      const isNative = typeof window.android !== 'undefined' || 
                       typeof window.Capacitor !== 'undefined'
      
      if (isNative) {
        // 在原生 App 中，调起支付宝 SDK
        console.log('调起支付宝支付...')
        const payResult = await alipayPay(orderStr)
        
        if (payResult.success) {
          return {
            success: true,
            orderId: data.orderId,
            paymentSuccess: true,
            message: '支付成功'
          }
        } else if (payResult.message === '用户取消支付') {
          return {
            success: false,
            cancelled: true,
            message: '用户取消支付'
          }
        } else {
          return {
            success: false,
            error: payResult.message || '支付失败'
          }
        }
      } else {
        // 在浏览器环境中，尝试使用H5支付或显示支付链接
        console.log('浏览器环境，订单已创建:', data.orderId)

        // 检查是否返回了可以直接跳转的支付链接
        if (orderStr && orderStr.startsWith('https://')) {
          // 如果返回的是URL，直接跳转
          window.location.href = orderStr
          return {
            success: true,
            orderId: data.orderId,
            redirecting: true,
            message: '正在跳转到支付宝...'
          }
        }

        return {
          success: true,
          orderId: data.orderId,
          demo: true,
          message: '请在 App 环境中完成支付'
        }
      }
    } else {
      return {
        success: false,
        error: data.message || '创建订单失败'
      }
    }
  } catch (error) {
    console.error('创建支付宝订单失败:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * 查询订单状态
 * @param {string} method - 支付方式
 * @param {string} orderId - 订单ID
 * @returns {Promise<object>} 订单状态
 */
export const queryPaymentOrder = async (method, orderId) => {
  if (method === PaymentMethod.WECHAT) {
    return await queryWechatPayOrder(orderId)
  } else if (method === PaymentMethod.ALIPAY) {
    return await queryAlipayOrder(orderId)
  } else {
    throw new Error('不支持的支付方式')
  }
}

/**
 * 查询微信支付订单状态
 */
const queryWechatPayOrder = async (orderId) => {
  if (!isWechatPayConfigured()) {
    return {
      success: true,
      demo: true,
      status: PaymentStatus.SUCCESS
    }
  }

  try {
    const apiUrl = getWechatPayApiUrl('queryOrder')
    // TODO: 真实API调用
    return { success: true, status: PaymentStatus.SUCCESS }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

/**
 * 查询支付宝订单状态
 */
const queryAlipayOrder = async (orderId) => {
  if (!isAlipayConfigured()) {
    return {
      success: true,
      demo: true,
      status: PaymentStatus.SUCCESS
    }
  }

  try {
    const apiUrl = getAlipayApiUrl('queryOrder')
    // TODO: 真实API调用
    return { success: true, status: PaymentStatus.SUCCESS }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

/**
 * 检查支付是否配置
 */
export const isPaymentConfigured = (method) => {
  if (method === PaymentMethod.WECHAT) {
    return isWechatPayConfigured()
  } else if (method === PaymentMethod.ALIPAY) {
    return isAlipayConfigured()
  }
  return false
}

export default {
  PaymentMethod,
  PaymentStatus,
  createPaymentOrder,
  queryPaymentOrder,
  isPaymentConfigured
}
