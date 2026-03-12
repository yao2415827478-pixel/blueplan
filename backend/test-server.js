/**
 * 支付宝支付测试服务器
 * 用于调试支付宝支付失败问题
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

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

// 创建订单接口（简化版）
app.post('/api/alipay/create-order', (req, res) => {
  console.log('[支付宝] 收到创建订单请求:', req.body);
  
  const { amount, productName, orderId } = req.body;
  
  if (!amount || !productName || !orderId) {
    return res.status(400).json({
      success: false,
      message: '缺少必要参数',
      data: null
    });
  }
  
  // 模拟订单创建成功
  const orderInfo = {
    orderId: orderId,
    amount: amount,
    productName: productName,
    timestamp: new Date().toISOString(),
    // 模拟支付宝返回的订单信息
    alipayInfo: {
      orderString: `alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_id=2021006132651155&biz_content={"out_trade_no":"${orderId}","total_amount":"${amount}","subject":"${productName}","product_code":"QUICK_MSECURITY_PAY"}&charset=utf-8&format=json&method=alipay.trade.app.pay&sign_type=RSA2&timestamp=2026-03-02 12:30:00&version=1.0`,
      sign: 'test_sign_1234567890'
    }
  };
  
  console.log('[支付宝] 订单创建成功:', orderInfo);
  
  res.json({
    success: true,
    message: '订单创建成功',
    data: orderInfo
  });
});

// 订单查询接口
app.get('/api/alipay/query-order/:orderId', (req, res) => {
  const { orderId } = req.params;
  console.log('[支付宝] 查询订单:', orderId);
  
  res.json({
    success: true,
    message: '订单查询成功',
    data: {
      orderId: orderId,
      status: 'WAIT_BUYER_PAY', // 等待支付
      amount: '9.90',
      productName: '布鲁计划VIP会员',
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString()
    }
  });
});

// 错误日志接口
app.post('/api/log/error', (req, res) => {
  const { error, context, timestamp } = req.body;
  console.error('[前端错误]', timestamp, context, error);
  res.json({ success: true, message: '错误日志已记录' });
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log('=====================================');
  console.log('  支付宝支付测试服务器已启动');
  console.log('=====================================');
  console.log(`  地址: http://localhost:${PORT}`);
  console.log('  接口列表:');
  console.log('  - GET  /api/health');
  console.log('  - POST /api/alipay/create-order');
  console.log('  - GET  /api/alipay/query-order/:orderId');
  console.log('  - POST /api/log/error');
  console.log('=====================================');
});