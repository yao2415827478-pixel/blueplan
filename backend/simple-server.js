/**
 * 简单支付宝支付测试服务器
 * 端口3000，与前端配置匹配
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '支付宝支付测试服务器运行正常',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 支付宝创建订单接口
app.post('/alipay/create-order', (req, res) => {
  console.log('[支付宝] 收到创建订单请求:', req.body);
  
  const { amount, subject, description, userId } = req.body;
  
  if (!amount || !subject) {
    return res.status(400).json({
      success: false,
      message: '缺少必要参数',
      data: null
    });
  }
  
  // 生成订单ID
  const orderId = 'ALIPAY_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  
  // 模拟支付宝返回的订单信息
  const orderInfo = {
    success: true,
    message: '订单创建成功',
    orderId: orderId,
    payParams: {
      orderStr: `alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=2021006132651155&biz_content={"out_trade_no":"${orderId}","total_amount":"${amount}","subject":"${subject}","product_code":"QUICK_MSECURITY_PAY"}&charset=utf-8&format=json&method=alipay.trade.app.pay&sign_type=RSA2&timestamp=${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}&version=1.0`,
      sign: 'test_sign_' + Math.random().toString(36).substr(2, 10)
    },
    data: {
      amount: amount,
      subject: subject,
      description: description || '',
      userId: userId || '',
      createTime: new Date().toISOString()
    }
  };
  
  console.log('[支付宝] 订单创建成功:', orderInfo.orderId);
  
  res.json(orderInfo);
});

// 订单查询接口
app.get('/alipay/query-order/:orderId', (req, res) => {
  const { orderId } = req.params;
  console.log('[支付宝] 查询订单:', orderId);
  
  res.json({
    success: true,
    message: '订单查询成功',
    data: {
      orderId: orderId,
      status: 'WAIT_BUYER_PAY', // 等待支付
      amount: '9.90',
      subject: '布鲁计划',
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString()
    }
  });
});

// 短信验证码接口（简化）
app.post('/send-sms-code', (req, res) => {
  const { phone } = req.body;
  console.log('[短信] 发送验证码:', phone);
  
  res.json({
    success: true,
    message: '验证码已发送',
    code: '123456' // 测试用验证码
  });
});

app.post('/verify-sms-code', (req, res) => {
  const { phone, code } = req.body;
  console.log('[短信] 验证验证码:', phone, code);
  
  res.json({
    success: true,
    message: '验证成功',
    token: 'test_token_' + Date.now()
  });
});

// 用户相关接口
app.post('/api/users/create', (req, res) => {
  console.log('[用户] 创建用户:', req.body);
  res.json({ success: true, userId: 'user_' + Date.now() });
});

app.post('/api/users/update', (req, res) => {
  console.log('[用户] 更新用户:', req.body);
  res.json({ success: true });
});

app.get('/api/users/get', (req, res) => {
  console.log('[用户] 获取用户信息');
  res.json({ success: true, user: { nickname: '测试用户' } });
});

app.post('/api/users/sync', (req, res) => {
  console.log('[用户] 同步用户数据:', req.body);
  res.json({ success: true });
});

// 根路径
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '布鲁计划后端API服务',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    endpoints: [
      'GET  /api/health',
      'POST /alipay/create-order',
      'GET  /alipay/query-order/:orderId',
      'POST /send-sms-code',
      'POST /verify-sms-code',
      'POST /api/users/create',
      'POST /api/users/update',
      'GET  /api/users/get',
      'POST /api/users/sync'
    ]
  });
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log('=====================================');
  console.log('  支付宝支付测试服务器已启动');
  console.log('=====================================');
  console.log(`  地址: http://localhost:${PORT}`);
  console.log('  接口列表:');
  console.log('  - POST /alipay/create-order (支付宝创建订单)');
  console.log('  - GET  /alipay/query-order/:orderId');
  console.log('  - POST /send-sms-code');
  console.log('  - POST /verify-sms-code');
  console.log('=====================================');
  console.log('  前端配置应指向: http://localhost:3000');
  console.log('=====================================');
});