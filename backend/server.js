/**
 * 布鲁计划后端API服务
 */

// 加载环境变量
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ==================== 健康检查端点 ====================
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '布鲁计划后端API服务运行正常',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '欢迎使用布鲁计划后端API',
    timestamp: new Date().toISOString()
  });
});

// ==================== 阿里云短信配置 ====================
// 使用环境变量保护敏感信息 - 禁止硬编码密钥
const ALIYUN_SMS_CONFIG = {
  accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
  accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
  signName: process.env.ALIYUN_SMS_SIGN_NAME,
  templateCode: process.env.ALIYUN_SMS_TEMPLATE_CODE,
  region: process.env.ALIYUN_REGION || 'cn-hangzhou'
};

// 验证阿里云配置
const isAliyunConfigured = () => {
  return ALIYUN_SMS_CONFIG.accessKeyId && 
         ALIYUN_SMS_CONFIG.accessKeySecret &&
         ALIYUN_SMS_CONFIG.accessKeyId !== 'YOUR_ALIYUN_ACCESS_KEY_ID';
};

// ==================== 支付宝配置 ====================
// 使用环境变量保护敏感信息 - 禁止硬编码密钥
const ALIPAY_CONFIG = {
  appId: process.env.ALIPAY_APP_ID,
  privateKey: process.env.ALIPAY_PRIVATE_KEY,
  alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY,
  gateway: process.env.ALIPAY_GATEWAY || 'https://openapi.alipay.com/gateway.do',
  notifyUrl: process.env.ALIPAY_NOTIFY_URL,
  returnUrl: process.env.ALIPAY_RETURN_URL
};

// 验证支付宝配置
const isAlipayConfigured = () => {
  return ALIPAY_CONFIG.appId && 
         ALIPAY_CONFIG.privateKey && 
         ALIPAY_CONFIG.alipayPublicKey;
};

// ==================== 模拟数据库（演示用）====================
const db = {
  users: new Map(),
  verificationCodes: new Map(),
  orders: new Map()
};

// ==================== 阿里云短信发送函数 ====================
async function sendAliyunSms(phone, code) {
  if (!isAliyunConfigured()) {
    console.log('[模拟] 短信发送至', phone, '验证码:', code);
    return { success: true, message: '短信发送成功（模拟模式）' };
  }

  try {
    const params = {
      AccessKeyId: ALIYUN_SMS_CONFIG.accessKeyId,
      Action: 'SendSms',
      Format: 'JSON',
      PhoneNumbers: phone,
      SignatureMethod: 'HMAC-SHA1',
      SignatureNonce: Math.random().toString(36).substr(2, 32),
      SignatureVersion: '1.0',
      SignName: ALIYUN_SMS_CONFIG.signName,
      TemplateCode: ALIYUN_SMS_CONFIG.templateCode,
      TemplateParam: JSON.stringify({ code: code }),
      Timestamp: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
      Version: '2017-05-25',
      RegionId: ALIYUN_SMS_CONFIG.region
    };

    const signature = computeSignature(params, ALIYUN_SMS_CONFIG.accessKeySecret);
    params.Signature = signature;

    const result = await requestRPC('dysmsapi.aliyuncs.com', params);
    
    if (result.Code === 'OK') {
      return { success: true, result };
    } else {
      return { success: false, error: result.Message };
    }
  } catch (error) {
    console.error('短信发送失败:', error);
    return { success: false, error: error.message };
  }
}

function computeSignature(parameters, accessKeySecret) {
  const sortedParams = Object.keys(parameters).sort();
  const queryString = sortedParams
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key]))
    .join('&');

  const stringToSign = 'POST&' + encodeURIComponent('/') + '&' + encodeURIComponent(queryString);

  return crypto
    .createHmac('sha1', accessKeySecret + '&')
    .update(stringToSign)
    .digest('base64');
}

function requestRPC(host, params) {
  return new Promise((resolve, reject) => {
    const data = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    const options = {
      hostname: host,
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ==================== 短信验证码API ====================
app.post('/send-sms-code', async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ success: false, message: '手机号格式不正确' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    db.verificationCodes.set(phone, {
      code,
      expiresAt: Date.now() + 5 * 60 * 1000
    });

    const smsResult = await sendAliyunSms(phone, code);

    res.json({
      success: smsResult.success,
      message: smsResult.message || '验证码已发送',
      code: code  // 开发环境返回，生产环境请删除
    });
  } catch (error) {
    console.error('发送验证码失败:', error);
    res.status(500).json({ success: false, message: '发送失败' });
  }
});

app.post('/verify-sms-code', (req, res) => {
  try {
    const { phone, code } = req.body;

    if (!phone || !code) {
      return res.status(400).json({ success: false, message: '参数不完整' });
    }

    const stored = db.verificationCodes.get(phone);

    if (!stored) {
      return res.status(400).json({ success: false, message: '请先获取验证码' });
    }

    if (Date.now() > stored.expiresAt) {
      db.verificationCodes.delete(phone);
      return res.status(400).json({ success: false, message: '验证码已过期' });
    }

    if (stored.code !== code) {
      return res.status(400).json({ success: false, message: '验证码错误' });
    }

    db.verificationCodes.delete(phone);
    res.json({ success: true, message: '验证成功' });
  } catch (error) {
    res.status(500).json({ success: false, message: '验证失败' });
  }
});

// ==================== 用户API ====================
app.post('/api/users/create', (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ success: false, message: '手机号不能为空' });
  }

  db.users.set(phone, {
    phone,
    createdAt: Date.now(),
    hasPaid: false
  });

  res.json({ success: true, message: '用户创建成功', userId: phone });
});

app.post('/api/users/sync', (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ success: false, message: '手机号不能为空' });
  }
  res.json({ success: true, message: '同步成功' });
});

// ==================== 支付宝官方SDK ====================
let alipaySdk = null;

try {
  if (isAlipayConfigured()) {
    const AlipaySdkFactory = require('alipay-sdk').default || require('alipay-sdk');
    alipaySdk = new AlipaySdkFactory({
      appId: ALIPAY_CONFIG.appId,
      privateKey: ALIPAY_CONFIG.privateKey,
      alipayPublicKey: ALIPAY_CONFIG.alipayPublicKey,
      gateway: ALIPAY_CONFIG.gateway,
      signType: 'RSA2'
    });
    console.log('[支付宝] SDK初始化成功');
  } else {
    console.log('[支付宝] 未配置，使用模拟模式');
  }
} catch (error) {
  console.error('[支付宝] SDK初始化失败:', error.message);
}

// ==================== 支付宝支付API ====================
app.post('/alipay/create-order', async (req, res) => {
  try {
    const { amount, subject, userId } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: '金额不正确' });
    }

    const orderId = 'ALI' + Date.now();

    db.orders.set(orderId, {
      orderId,
      amount,
      subject,
      userId,
      status: 'pending',
      createdAt: Date.now()
    });

    let orderStr = 'demo_order_str_' + orderId;

    if (alipaySdk && isAlipayConfigured()) {
      try {
        orderStr = await alipaySdk.exec('alipay.trade.app.pay', {
          bizContent: {
            out_trade_no: orderId,
            total_amount: amount,
            subject: subject || '布鲁计划充值',
            product_code: 'FAST_INSTANT_TRADE_PAY'
          }
        }, { notifyUrl: ALIPAY_CONFIG.notifyUrl });
      } catch (e) {
        console.error('支付宝SDK调用失败:', e.message);
      }
    }

    res.json({
      success: true,
      orderId,
      payParams: { orderStr }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '创建订单失败' });
  }
});

app.post('/alipay-notify', (req, res) => {
  const { out_trade_no, trade_status } = req.body;
  console.log('支付宝回调:', out_trade_no, trade_status);
  res.json({ success: true });
});

// ==================== 启动服务器 ====================
app.listen(PORT, () => {
  console.log('=====================================');
  console.log('  布鲁计划后端API服务已启动');
  console.log(`  端口: ${PORT}`);
  console.log(`  阿里云短信: ${isAliyunConfigured() ? '已配置' : '模拟模式'}`);
  console.log(`  支付宝: ${isAlipayConfigured() ? '已配置' : '模拟模式'}`);
  console.log('=====================================');
});
