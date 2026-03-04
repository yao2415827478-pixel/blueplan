/**
 * 布鲁计划后端API服务
 * 服务器地址: 120.27.139.123
 * 域名: blue-plan1.cn
 */

// 加载环境变量
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https');
const crypto = require('crypto');
const { URL } = require('url');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间�?app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ==================== 健康检查端�?====================
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '布鲁计划后端API服务运行正常',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    endpoints: [
      '/send-sms-code',
      '/verify-sms-code',
      '/api/users/create',
      '/api/users/update',
      '/api/users/get',
      '/api/users/sync',
      '/create-order',
      '/alipay/create-order'
    ]
  });
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '欢迎使用布鲁计划后端API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// ==================== 阿里云短信配�?====================
// 使用环境变量保护敏感信息
const ALIYUN_SMS_CONFIG = {
  accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID || 'YOUR_ALIYUN_ACCESS_KEY_ID',
  accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET || 'YOUR_ALIYUN_ACCESS_KEY_SECRET',
  signName: '武汉市洪山区乔乔尼服装店',      // 短信签名
  templateCode: 'SMS_501700483', // 短信模板CODE
  region: 'cn-hangzhou'
};

// ==================== 支付宝配�?====================
const ALIPAY_CONFIG = {
  appId: process.env.ALIPAY_APP_ID || '2021006132651155',
  privateKey: process.env.ALIPAY_PRIVATE_KEY || 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCPwujDmGR6kan5ywxkC5lUoMBIxQ9XIXXN/QXnmH/17N5XCZqlIEqoAT+ixYFqfiqYKfjJxsfdRG6+nS7HDkwUiHm9sZqwK3nzL/8icNFYCliIe5/f/fFmnj11QcEVP1iH7N6jyUWucwDqmu/muwQqmkCzizmVBskA2lUBwIZaXbN7nRq1eWcX5uqWohsvnDfK0+UC01a5Jjal5ZsfSi6xLh3Id4XQ6rOUSNx24FsEWfTRNf7FTMdqsL+RtnAIYxP/h0fypFZk5dXoZHcOHZJsY2gcRZuB5YkQ2pMXg5cVs2xdlyW4mRZBNU2/RUXm76zfpAwyj2LpHhtEMiTmCDJTAgMBAAECggEAG0Ffsd2NhzNgn2wgkEMmscW8Ts+VhfZhCEmlOfBOqkhbKvM2L4I8xTdfYjPBwnfjCXBDq7WVJN0Zhef0+2Y5hFcPhahLZIUJnNKHs3biKafkexO9DtFtWAA+NKHfwnB9D2AYIcNCA73n+ZKgUwU31//grmmB5EAiEZhTL37Zuf3q9Pq9NZFAxte0E0MlqSWqVO0IE4egLkUCV4k0hr01ucpbIoeKrsZ0Rc1hhTOx1Y98JJ31jqa/b0C+1s3o/ZytyRGpIn86nOFFqhC1FNGG5xoCbYcno9P6AickU/V1tYHa/I24PktSj045+BoG+DaZw918DB4sirtXj+gvVyZaSQKBgQDKgogUTNuIlgFuA9p2vKBvwgk3A9aXhdPJkL/U7pZzp4bMWCVToITUygzfexJfsQeMatn4dOZ+8y2bAMTQbji0QAxm4+2fSUpiryiHeFgjbQmG5ht7I6vElL/0M0FYkkkFTPOpsTae6StzKtrWDoEv2gLrbfGW3VMTi8nx+9FnrwKBgQC1u+ACDhMok1E0PBiIphgpzpQ5aMB3dfiFGF79OUINBP7YBiL9INGbCjx/JTFfdC2YYjIH6JebO0jAEizH2dZn9BJk2whIYblF3jhjl9w6GFMR0zbGCsn0fRG7CLtG1n+X8u8qcC8AWFTTIpSxhlsJ+3y+ah7oBxkMzebdZykknQKBgQCpIbGjOrmTbq0NBBzeVBWuoSDvGL6N2FCUpNcCcK2pND5pxiiOmp611XZA49npn8HNLaSUVJX5awIo1dCKv7OOH3v8Jtrb0OtWVjIESqdaFwQA7YgAJT+dNBrJSlGGNs7TpXxPulkDCXyneCBC7ORKYctUc4N1W625wmNMPeObswKBgQCDULTlZzwqtoAXqVDk9HdDRjTOYsWnzEN+EIUanlP+ylxGxfBkTWGHkNbz3HEXkwAbOuEB2+woS6ceukNHST1msfLUk3whqRNRy+ec9y83fzoPCDps0YDqO7EjH4ULA5UAu5ZbaOJdcnYgdb1RpU6FIQYbJN0eNXrBSMqHsrIE9QKBgEIgWGRUh42AkD7lmkvEUlthK5CbCdpuL5sDUBpGegXiKbmoB6ZtdAug6hPdA9d1GVXp/CjVBkHGyD2yL+bLZ1UPoUysN8ifR857wDyebe0zAq/dbvw/jKfRiFgejLH++NTrJzhbFqv0swFLgCpzfXDZ/GsePL84oNg5ekaFp+5f',
  alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY || 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3BYEZ1oYVzkPZg9NH5PrPkQZHj0sJV4/KWl8kdmAxLWQEvzLOaZUAIbSQ7+4kKpvhaMrYrsQtzFbCKsLQE1kQ4YjE+IpNEOwBcF6rk1JbDXU4VyOT4+A9KNLkF7VpKHu1DTq4HNccn++e6T6qa7nNlQB3/O/6l7ZMcrVnp7fxq+0+U1ik6wrECa/GtdeyEwclq3L7TYHHrmhoWQjTmsKAW20X7Quv5ZH6KWQrXhuVY0N8EeGXcEk4xwpYvebpsnJy4v2VfWTZiTbjbIK04zzUFLLlKy3a/Empz2dSLz5dKpptusBcum1YwTVTqmJXPxc9GXT1EdUVFEZJcwm4eVXOwIDAQAB',
  gateway: process.env.ALIPAY_GATEWAY || 'https://openapi.alipay.com/gateway.do',
  notifyUrl: process.env.ALIPAY_NOTIFY_URL || 'https://blue-plan1.cn/alipay-notify',
  returnUrl: process.env.ALIPAY_RETURN_URL || 'https://blue-plan1.cn/alipay-return'
};

// ==================== MySQL数据库配�?====================
const MYSQL_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blueplan'
};

// 导入MySQL
let mysql;
try {
  mysql = require('mysql2/promise');
} catch (e) {
  console.log('MySQL驱动未安装，使用内存存储');
}

// MySQL连接�?let pool = null;
if (mysql) {
  pool = mysql.createPool({
    host: MYSQL_CONFIG.host,
    user: MYSQL_CONFIG.user,
    password: MYSQL_CONFIG.password,
    database: MYSQL_CONFIG.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  console.log('[数据库] MySQL连接池已创建');
}

// 初始化数据库�?async function initDatabase() {
  if (!pool) return;

  let connection;
  try {
    connection = await pool.getConnection();
    // 创建用户�?    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        phone VARCHAR(20) UNIQUE NOT NULL,
        nickname VARCHAR(50),
        avatar VARCHAR(255),
        gender VARCHAR(10),
        age INT,
        vip_level INT DEFAULT 0,
        vip_expire DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // 创建验证码表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS verification_codes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        phone VARCHAR(20) NOT NULL,
        code VARCHAR(10) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP,
        INDEX idx_phone (phone)
      )
    `);

    // 创建订单�?    await connection.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id VARCHAR(50) UNIQUE NOT NULL,
        user_id INT NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        payment_method VARCHAR(20),
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('[数据库] 数据表初始化完成');
  } catch (error) {
    console.error('[数据库] 初始化失�?', error.message);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// 模拟数据库（备用�?const db = {
  users: new Map(),
  verificationCodes: new Map(),
  orders: new Map()
};

// ==================== 阿里云短信发送函�?====================
// 使用阿里云POP API发送短�?async function sendAliyunSms(phone, code) {
  // 检查是否配置了AccessKeySecret
  if (!ALIYUN_SMS_CONFIG.accessKeySecret || ALIYUN_SMS_CONFIG.accessKeySecret === 'YOUR_ACCESS_KEY_SECRET') {
    console.log('[警告] 未配置AccessKeySecret，使用模拟模�?);
    console.log(`[模拟] 阿里云短信发送到 ${phone}, 验证�? ${code}`);
    return { success: true, message: '短信发送成功（模拟�? };
  }

  try {
    // 公共参数
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

    // 计算签名
    const signature = computeSignature(params, ALIYUN_SMS_CONFIG.accessKeySecret);
    params.Signature = signature;

    // 发送请�?    const result = await requestRPC('dysmsapi.aliyuncs.com', params);
    console.log('阿里云短信发送结�?', result);

    if (result.Code === 'OK') {
      return { success: true, result };
    } else {
      return { success: false, error: result.Message };
    }
  } catch (error) {
    console.error('阿里云短信发送失�?', error);
    return { success: false, error: error.message };
  }
}

// 计算阿里云API签名
function computeSignature(parameters, accessKeySecret) {
  // 参数排序
  const sortedParams = Object.keys(parameters).sort();
  const queryString = sortedParams
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key]))
    .join('&');

  // 构造待签名字符�?  const stringToSign = 'POST&' + encodeURIComponent('/') + '&' + encodeURIComponent(queryString);

  // HMAC-SHA1签名
  const signature = crypto
    .createHmac('sha1', accessKeySecret + '&')
    .update(stringToSign)
    .digest('base64');

  return signature;
}

// 发送RPC请求
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

// 发送短信验证码
app.post('/send-sms-code', async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: '手机号不能为�? });
    }

    // 验证手机号格�?    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ success: false, message: '手机号格式不正确' });
    }

    // 检查是否频繁发送（1分钟内只能发一次）
    const existing = db.verificationCodes.get(phone);
    if (existing && Date.now() - existing.createdAt < 60000) {
      return res.status(400).json({ success: false, message: '发送太频繁，请稍后再试' });
    }

    // 生成6位验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // 存储验证�?    db.verificationCodes.set(phone, {
      code: code,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5分钟有效
      createdAt: Date.now()
    });

    // 调用阿里云短信API发送验证码
    const smsResult = await sendAliyunSms(phone, code);

    if (smsResult.success) {
      console.log(`验证码已发送至 ${phone}: ${code}`);
      res.json({
        success: true,
        message: '验证码已发�?,
        // ⚠️ 开发环境返回验证码，生产环境请删除
        code: code
      });
    } else {
      res.status(500).json({
        success: false,
        message: smsResult.error || '发送失败，请稍后重�?
      });
    }
  } catch (error) {
    console.error('发送验证码失败:', error);
    res.status(500).json({ success: false, message: '发送失�? });
  }
});

// 验证短信验证�?app.post('/verify-sms-code', (req, res) => {
  try {
    const { phone, code } = req.body;

    if (!phone || !code) {
      return res.status(400).json({ success: false, message: '参数不完�? });
    }

    const stored = db.verificationCodes.get(phone);

    if (!stored) {
      return res.status(400).json({ success: false, message: '请先获取验证�? });
    }

    if (Date.now() > stored.expiresAt) {
      db.verificationCodes.delete(phone);
      return res.status(400).json({ success: false, message: '验证码已过期' });
    }

    if (stored.code !== code) {
      return res.status(400).json({ success: false, message: '验证码错�? });
    }

    // 验证成功，删除验证码
    db.verificationCodes.delete(phone);

    res.json({
      success: true,
      message: '验证成功'
    });
  } catch (error) {
    console.error('验证失败:', error);
    res.status(500).json({ success: false, message: '验证失败' });
  }
});

// ==================== 用户API ====================

// 创建用户
app.post('/api/users/create', (req, res) => {
  try {
    const { phone, surveyResult, startDate } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: '手机号不能为�? });
    }

    // 检查用户是否已存在
    if (db.users.has(phone)) {
      return res.json({
        success: true,
        message: '用户已存�?,
        userId: phone
      });
    }

    // 创建新用�?    db.users.set(phone, {
    phone,
    username: username || null,
    email: email || null,
    surveyResult: surveyResult || null,
    startDate: startDate || Date.now(),
    createdAt: Date.now(),
    hasPaid: false,
    paymentTime: null,
    orderId: null
});

    console.log(`新用户创�? ${phone}`);

    res.json({
      success: true,
      message: '用户创建成功',
      userId: phone
    });
  } catch (error) {
    console.error('创建用户失败:', error);
    res.status(500).json({ success: false, message: '创建失败' });
  }
});

// 更新用户
app.post('/api/users/update', (req, res) => {
  try {
    const { userId, ...updates } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: '用户ID不能为空' });
    }

    const user = db.users.get(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: '用户不存�? });
    }

    // 更新用户信息
    db.users.set(userId, { ...user, ...updates });

    res.json({
      success: true,
      message: '更新成功'
    });
  } catch (error) {
    console.error('更新用户失败:', error);
    res.status(500).json({ success: false, message: '更新失败' });
  }
});

// 获取用户
app.post('/api/users/get', (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: '用户ID不能为空' });
    }

    const user = db.users.get(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: '用户不存�? });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('获取用户失败:', error);
    res.status(500).json({ success: false, message: '获取失败' });
  }
});

// 同步用户数据
app.post('/api/users/sync', (req, res) => {
  try {
    const { phone, hasPaid, paymentMethod, paymentTime, orderId, surveyResult, startDate, journalEntries, milestones, planProgress } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: '手机号不能为�? });
    }

    const existingUser = db.users.get(phone);

    if (existingUser) {
      // 更新现有用户
      db.users.set(phone, {
        ...existingUser,
        hasPaid: hasPaid || existingUser.hasPaid,
        paymentMethod: paymentMethod || existingUser.paymentMethod,
        paymentTime: paymentTime || existingUser.paymentTime,
        orderId: orderId || existingUser.orderId,
        surveyResult: surveyResult || existingUser.surveyResult,
        startDate: startDate || existingUser.startDate,
        journalEntries: journalEntries || existingUser.journalEntries,
        milestones: milestones || existingUser.milestones,
        planProgress: planProgress || existingUser.planProgress,
        updatedAt: Date.now()
      });
    } else {
      // 创建新用�?      db.users.set(phone, {
        phone,
        hasPaid: hasPaid || false,
        paymentMethod: paymentMethod || null,
        paymentTime: paymentTime || null,
        orderId: orderId || null,
        surveyResult: surveyResult || null,
        startDate: startDate || null,
        journalEntries: journalEntries || null,
        milestones: milestones || null,
        planProgress: planProgress || null,
        createdAt: Date.now()
      });
    }

    console.log(`用户数据同步: ${phone}`);

    res.json({
      success: true,
      message: '同步成功'
    });
  } catch (error) {
    console.error('同步失败:', error);
    res.status(500).json({ success: false, message: '同步失败' });
  }
});

// ==================== 微信支付API ====================

// 创建微信支付订单
app.post('/create-order', (req, res) => {
  try {
    const { amount, subject, description, userId } = req.body;

    const orderId = 'WX' + Date.now() + Math.random().toString(36).substr(2, 6);

    // 存储订单
    db.orders.set(orderId, {
      orderId,
      amount,
      subject,
      description,
      userId,
      method: 'wechat',
      status: 'pending',
      createdAt: Date.now()
    });

    console.log(`微信订单创建: ${orderId}, 金额: ${amount}`);

    res.json({
      success: true,
      orderId,
      payParams: {
        appId: 'your_app_id',
        timeStamp: Math.floor(Date.now() / 1000).toString(),
        nonceStr: Math.random().toString(36).substr(2),
        package: 'prepay_id=wx123456789',
        signType: 'MD5'
      }
    });
  } catch (error) {
    console.error('创建微信订单失败:', error);
    res.status(500).json({ success: false, message: '创建订单失败' });
  }
});

// 微信支付回调
app.post('/wechat-notify', (req, res) => {
  try {
    const { orderId, transactionId, resultCode } = req.body;

    console.log(`微信支付回调: ${orderId}, 状�? ${resultCode}`);

    if (resultCode === 'SUCCESS') {
      const order = db.orders.get(orderId);
      if (order) {
        order.status = 'success';
        order.transactionId = transactionId;
        order.paidAt = Date.now();
        db.orders.set(orderId, order);

        if (order.userId) {
          const user = db.users.get(order.userId);
          if (user) {
            user.hasPaid = true;
            user.paymentTime = Date.now();
            user.orderId = orderId;
            db.users.set(order.userId, user);
          }
        }
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error('微信支付回调处理失败:', error);
    res.status(500).json({ success: false });
  }
});

// 查询微信订单
app.post('/query-order', (req, res) => {
  try {
    const { orderId } = req.body;

    const order = db.orders.get(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: '订单不存�? });
    }

    res.json({
      success: true,
      status: order.status,
      order
    });
  } catch (error) {
    console.error('查询订单失败:', error);
    res.status(500).json({ success: false, message: '查询失败' });
  }
});

// ==================== 支付宝官方SDK ====================
let alipaySdk = null;

try {
  // 尝试不同的导入方�?  let AlipaySdkFactory;
  try {
    AlipaySdkFactory = require('alipay-sdk').default;
  } catch (e1) {
    try {
      AlipaySdkFactory = require('alipay-sdk');
    } catch (e2) {
      throw new Error('无法导入alipay-sdk');
    }
  }

  alipaySdk = new AlipaySdkFactory({
    appId: ALIPAY_CONFIG.appId,
    privateKey: ALIPAY_CONFIG.privateKey,
    alipayPublicKey: ALIPAY_CONFIG.alipayPublicKey,
    gateway: ALIPAY_CONFIG.gateway,
    signType: 'RSA2'
  });
  console.log('[支付宝] 官方SDK初始化成�?);
} catch (error) {
  console.error('[支付宝] SDK初始化失�?', error.message);
}

// 创建支付宝订单（使用官方SDK�?app.post('/alipay/create-order', async (req, res) => {
  try {
    const { amount, subject, description, userId } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: '金额不正�? });
    }

    const orderId = 'ALI' + Date.now() + Math.random().toString(36).substr(2, 6);

    // 存储订单
    db.orders.set(orderId, {
      orderId,
      amount,
      subject: subject || '布鲁计划充�?,
      description,
      userId,
      method: 'alipay',
      status: 'pending',
      createdAt: Date.now()
    });

    let orderStr = '';

    // 使用官方SDK生成支付参数
    if (alipaySdk) {
      try {
        const result = await alipaySdk.exec(
          'alipay.trade.app.pay',
          {
            bizContent: {
              out_trade_no: orderId,
              total_amount: amount,
              subject: subject || '布鲁计划充值',
              product_code: 'FAST_INSTANT_TRADE_PAY'
            }
          },
          {
            notifyUrl: ALIPAY_CONFIG.notifyUrl,
            returnUrl: ALIPAY_CONFIG.returnUrl
          }
        );
        orderStr = result;
        console.log(`[支付宝] SDK生成订单成功: ${orderId}`);
      } catch (sdkError) {
        console.error('[支付宝] SDK调用失败:', sdkError.message);
        // 如果SDK失败，回退到模拟模�?        orderStr = 'demo_order_str_' + orderId;
      }
    } else {
      // SDK未初始化，使用模拟模�?      orderStr = 'demo_order_str_' + orderId;
      console.log(`[支付宝] SDK未初始化，使用模拟模�? ${orderId}`);
    }

    console.log(`支付宝订单创�? ${orderId}, 金额: ${amount}`);

    res.json({
      success: true,
      orderId,
      payParams: {
        orderStr: orderStr
      }
    });
  } catch (error) {
    console.error('创建支付宝订单失�?', error);
    res.status(500).json({ success: false, message: '创建订单失败' });
  }
});

// 支付宝授权回调（同步返回）
app.get('/alipay-return', (req, res) => {
  try {
    const { out_trade_no, trade_no, trade_status } = req.query;

    console.log(`支付宝同步回调: ${out_trade_no}, 状态: ${trade_status}`);

    // 跳转到前端支付结果页面
    const success = trade_status === 'TRADE_SUCCESS' || trade_status === 'TRADE_FINISHED';
    const redirectUrl = `/payment-result?orderId=${out_trade_no}&status=${success ? 'success' : 'failed'}`;

    res.redirect(redirectUrl);
  } catch (error) {
    console.error('支付宝同步回调处理失败:', error);
    res.redirect('/payment-result?status=failed');
  }
});

// 支付宝异步通知app.post('/alipay-notify', (req, res) => {
  try {
    const { out_trade_no, trade_no, trade_status } = req.body;

    console.log(`支付宝回�? ${out_trade_no}, 状�? ${trade_status}`);

    if (trade_status === 'TRADE_SUCCESS' || trade_status === 'TRADE_FINISHED') {
      const order = db.orders.get(out_trade_no);
      if (order) {
        order.status = 'success';
        order.transactionId = trade_no;
        order.paidAt = Date.now();
        db.orders.set(out_trade_no, order);

        if (order.userId) {
          const user = db.users.get(order.userId);
          if (user) {
            user.hasPaid = true;
            user.paymentTime = Date.now();
            user.orderId = out_trade_no;
            db.users.set(order.userId, user);
          }
        }
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error('支付宝回调处理失�?', error);
    res.status(500).json({ success: false });
  }
});

// 查询支付宝订�?app.post('/alipay/query-order', (req, res) => {
  try {
    const { orderId } = req.body;

    const order = db.orders.get(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: '订单不存�? });
    }

    res.json({
      success: true,
      status: order.status,
      order
    });
  } catch (error) {
    console.error('查询订单失败:', error);
    res.status(500).json({ success: false, message: '查询失败' });
  }
});

// ==================== 启动服务�?====================

// 初始化数据库
initDatabase().then(() => {
  console.log('[数据库] 初始化完�?);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('=====================================');
  console.log('  布鲁计划后端API服务已启�?);
  console.log('=====================================');
  console.log(`  服务器地址: http://0.0.0.0:${PORT}`);
  console.log(`  您的域名:   http://blue-plan1.cn:${PORT}`);
  console.log(`  IP访问:     http://120.27.139.123:${PORT}`);
  console.log('=====================================');
  console.log('');
  console.log('API接口列表:');
  console.log('  短信验证�? POST /send-sms-code');
  console.log('  验证验证�? POST /verify-sms-code');
  console.log('  用户创建:   POST /api/users/create');
  console.log('  用户更新:   POST /api/users/update');
  console.log('  用户获取:   POST /api/users/get');
  console.log('  数据同步:   POST /api/users/sync');
  console.log('  微信订单:   POST /create-order');
  console.log('  支付宝订�? POST /alipay/create-order');
  console.log('=====================================');
  console.log('');
  console.log('⚠️ 阿里云短信配�?');
  console.log(`  模板CODE: ${ALIYUN_SMS_CONFIG.templateCode}`);
  console.log(`  签名: ${ALIYUN_SMS_CONFIG.signName}`);
  console.log('  AccessKeySecret: ' + (ALIYUN_SMS_CONFIG.accessKeySecret === 'YOUR_ACCESS_KEY_SECRET' ? '未配�?模拟模式)' : '已配�?));
  console.log('=====================================');
});

