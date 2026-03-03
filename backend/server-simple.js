/**
 * 布鲁计划后端API服务 - 简化版（专注于支付宝测试）
 */

// 加载环境变量
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ==================== 支付宝配�?====================
const ALIPAY_CONFIG = {
  appId: process.env.ALIPAY_APP_ID || '2021006132651155',
  privateKey: process.env.ALIPAY_PRIVATE_KEY || 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCPwujDmGR6kan5ywxkC5lUoMBIxQ9XIXXN/QXnmH/17N5XCZqlIEqoAT+ixYFqfiqYKfjJxsfdRG6+nS7HDkwUiHm9sZqwK3nzL/8icNFYCliIe5/f/fFmnj11QcEVP1iH7N6jyUWucwDqmu/muwQqmkCzizmVBskA2lUBwIZaXbN7nRq1eWcX5uqWohsvnDfK0+UC01a5Jjal5ZsfSi6xLh3Id4XQ6rOUSNx24FsEWfTRNf7FTMdqsL+RtnAIYxP/h0fypFZk5dXoZHcOHZJsY2gcRZuB5YkQ2pMXg5cVs2xdlyW4mRZBNU2/RUXm76zfpAwyj2LpHhtEMiTmCDJTAgMBAAECggEAG0Ffsd2NhzNgn2wgkEMmscW8Ts+VhfZhCEmlOfBOqkhbKvM2L4I8xTdfYjPBwnfjCXBDq7WVJN0Zhef0+2Y5hFcPhahLZIUJnNKHs3biKafkexO9DtFtWAA+NKHfwnB9D2AYIcNCA73n+ZKgUwU31//grmmB5EAiEZhTL37Zuf3q9Pq9NZFAxte0E0MlqSWqVO0IE4egLkUCV4k0hr01ucpbIoeKrsZ0Rc1hhTOx1Y98JJ31jqa/b0C+1s3o/ZytyRGpIn86nOFFqhC1FNGG5xoCbYcno9P6AickU/V1tYHa/I24PktSj045+BoG+DaZw918DB4sirtXj+gvVyZaSQKBgQDKgogUTNuIlgFuA9p2vKBvwgk3A9aXhdPJkL/U7pZzp4bMWCVToITUygzfexJfsQeMatn4dOZ+8y2bAMTQbji0QAxm4+2fSUpiryiHeFgjbQmG5ht7I6vElL/0M0FYkkkFTPOpsTae6StzKtrWDoEv2gLrbfGW3VMTi8nx+9FnrwKBgQC1u+ACDhMok1E0PBiIphgpzpQ5aMB3dfiFGF79OUINBP7YBiL9INGbCjx/JTFfdC2YYjIH6JebO0jAEizH2dZn9BJk2whIYblF3jhjl9w6GFMR0zbGCsn0fRG7CLtG1n+X8u8qcC8AWFTTIpSxhlsJ+3y+ah7oBxkMzebdZykknQKBgQCpIbGjOrmTbq0NBBzeVBWuoSDvGL6N2FCUpNcCcK2pND5pxiiOmp611XZA49npn8HNLaSUVJX5awIo1dCKv7OOH3v8Jtrb0OtWVjIESqdaFwQA7YgAJT+dNBrJSlGGNs7TpXxPulkDCXyneCBC7ORKYctUc4N1W625wmNMPeObswKBgQCDULTlZzwqtoAXqVDk9HdDRjTOYsWnzEN+EIUanlP+ylxGxfBkTWGHkNbz3HEXkwAbOuEB2+woS6ceukNHST1msfLUk3whqRNRy+ec9y83fzoPCDps0YDqO7EjH4ULA5UAu5ZbaOJdcnYgdb1RpU6FIQYbJN0eNXrBSMqHsrIE9QKBgEIgWGRUh42AkD7lmkvEUlthK5CbCdpuL5sDUBpGegXiKbmoB6ZtdAug6hPdA9d1GVXp/CjVBkHGyD2yL+bLZ1UPoUysN8ifR857wDyebe0zAq/dbvw/jKfRiFgejLH++NTrJzhbFqv0swFLgCpzfXDZ/GsePL84oNg5ekaFp+5f',
  alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY || 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3BYEZ1oYVzkPZg9NH5PrPkQZHj0sJV4/KWl8kdmAxLWQEvzLOaZUAIbSQ7+4kKpvhaMrYrsQtzFbCKsLQE1kQ4YjE+IpNEOwBcF6rk1JbDXU4VyOT4+A9KNLkF7VpKHu1DTq4HNccn++e6T6qa7nNlQB3/O/6l7ZMcrVnp7fxq+0+U1ik6wrECa/GtdeyEwclq3L7TYHHrmhoWQjTmsKAW20X7Quv5ZH6KWQrXhuVY0N8EeGXcEk4xwpYvebpsnJy4v2VfWTZiTbjbIK04zzUFLLlKy3a/Empz2dSLz5dKpptusBcum1YwTVTqmJXPxc9GXT1EdUVFEZJcwm4eVXOwIDAQAB',
  gateway: process.env.ALIPAY_GATEWAY || 'https://openapi.alipay.com/gateway.do',
  notifyUrl: process.env.ALIPAY_NOTIFY_URL || 'https://blue-plan1.cn/alipay-notify',
  returnUrl: process.env.ALIPAY_RETURN_URL || 'https://blue-plan1.cn/alipay-return'
};

// 内存数据库（简化）
const db = {
  orders: new Map(),
  verificationCodes: new Map()
};

// ==================== 支付宝SDK初始化 ====================
let alipaySdk = null;

try {
  console.log('[支付宝] 开始初始化SDK...');
  console.log('[支付宝] AppID:', ALIPAY_CONFIG.appId);
  console.log('[支付宝] 私钥长度:', ALIPAY_CONFIG.privateKey ? ALIPAY_CONFIG.privateKey.length : 0);
  console.log('[支付宝] 公钥长度:', ALIPAY_CONFIG.alipayPublicKey ? ALIPAY_CONFIG.alipayPublicKey.length : 0);
  console.log('[支付宝] 网关:', ALIPAY_CONFIG.gateway);
  
  // 尝试导入支付宝SDK
  let AlipaySdkFactory;
  try {
    AlipaySdkFactory = require('alipay-sdk').default;
    console.log('[支付宝] 使用默认导入方式');
  } catch (e1) {
    try {
      AlipaySdkFactory = require('alipay-sdk');
      console.log('[支付宝] 使用直接导入方式');
    } catch (e2) {
      console.error('[支付宝] 无法导入alipay-sdk模块');
      console.error('[支付宝] 错误详情:', e2.message);
      throw new Error('无法导入alipay-sdk');
    }
  }

  // 初始化SDK
  alipaySdk = new AlipaySdkFactory({
    appId: ALIPAY_CONFIG.appId,
    privateKey: ALIPAY_CONFIG.privateKey,
    alipayPublicKey: ALIPAY_CONFIG.alipayPublicKey,
    gateway: ALIPAY_CONFIG.gateway,
    signType: 'RSA2'
  });
  
  console.log('[支付宝] 官方SDK初始化成功！');
  console.log('[支付宝] SDK版本:', alipaySdk.sdkVersion);
  
} catch (error) {
  console.error('[支付宝] SDK初始化失败:', error.message);
  console.error('[支付宝] 错误堆栈:', error.stack);
}

// ==================== 健康检查端�?====================
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '布鲁计划后端API服务运行正常',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    alipayStatus: alipaySdk ? '已初始化' : '未初始化'
  });
});

// ==================== 支付宝订单API ====================
app.post('/alipay/create-order', async (req, res) => {
  try {
    const { amount, subject, description } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: '金额不正确' });
    }

    const orderId = 'ALI' + Date.now() + Math.random().toString(36).substr(2, 6);
    
    console.log(`[支付宝] 创建订单: ${orderId}, 金额: ${amount}`);

    // 存储订单
    db.orders.set(orderId, {
      orderId,
      amount,
      subject: subject || '布鲁计划充值',
      description,
      method: 'alipay',
      status: 'pending',
      createdAt: Date.now()
    });

    let orderStr = '';

    // 使用官方SDK生成支付参数
    if (alipaySdk) {
      try {
        console.log(`[支付宝] 调用SDK生成支付参数...`);
        
        const result = await alipaySdk.exec(
          'alipay.trade.app.pay',
          {
            bizContent: {
              out_trade_no: orderId,
              total_amount: amount.toString(),
              subject: subject || '布鲁计划充值',
              product_code: 'QUICK_MSECURITY_PAY'
            }
          },
          {
            notifyUrl: ALIPAY_CONFIG.notifyUrl
          }
        );
        
        orderStr = result;
        console.log(`[支付宝] SDK生成订单成功: ${orderId}`);
        console.log(`[支付宝] 订单字符串长度: ${orderStr.length}`);
        
      } catch (sdkError) {
        console.error('[支付宝] SDK调用失败:', sdkError.message);
        console.error('[支付宝] 错误详情:', sdkError);
        
        // 如果SDK失败，回退到模拟模式
        orderStr = 'demo_order_str_' + orderId;
        console.log(`[支付宝] 使用模拟模式: ${orderId}`);
      }
    } else {
      // SDK未初始化，使用模拟模式
      orderStr = 'demo_order_str_' + orderId;
      console.log(`[支付宝] SDK未初始化，使用模拟模式: ${orderId}`);
    }

    res.json({
      success: true,
      orderId,
      payParams: {
        orderStr: orderStr
      },
      sdkStatus: alipaySdk ? 'active' : 'inactive'
    });

  } catch (error) {
    console.error('[支付宝] 创建订单异常:', error);
    res.status(500).json({
      success: false,
      message: '创建订单失败',
      error: error.message
    });
  }
});

// ==================== 启动服务 ====================
app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`🚀 布鲁计划后端API服务已启动`);
  console.log(`📡 地址: http://localhost:${PORT}`);
  console.log(`⏰ 时间: ${new Date().toLocaleString()}`);
  console.log(`💰 支付宝状态: ${alipaySdk ? '✅ 已初始化' : '❌ 未初始化'}`);
  console.log(`========================================`);
});