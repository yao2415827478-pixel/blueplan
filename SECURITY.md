# 安全修复记录

## 🚨 修复时间
2026-03-12

## 发现的问题

### 1. 阿里云 AccessKey 泄露
**位置**: `src/config/api.js`
- **问题**: 阿里云短信 AccessKeyId 硬编码在前端代码中
- **风险**: 任何人都能从GitHub仓库获取密钥，可用于发送短信或进行其他阿里云操作

### 2. 支付宝私钥泄露
**位置**: `backend/server.js`
- **问题**: 支付宝 RSA 私钥硬编码在代码中作为 fallback 值
- **风险**: 私钥泄露可导致资金损失

### 3. 其他敏感信息
- 阿里云短信签名、模板CODE
- 服务器IP地址暴露在代码注释中

## 修复措施

### 1. 前端安全化 (`src/config/api.js`)
- ✅ 移除所有敏感配置（阿里云、支付宝密钥）
- ✅ 只保留 API 基础地址配置
- ✅ 所有敏感操作移至后端

### 2. 后端安全化 (`backend/server.js`)
- ✅ 移除所有硬编码密钥 fallback 值
- ✅ 强制使用环境变量
- ✅ 添加配置验证函数 `isAliyunConfigured()` 和 `isAlipayConfigured()`
- ✅ 未配置时自动使用模拟模式，不会报错

### 3. 环境变量模板 (`backend/.env.example`)
- ✅ 创建示例文件，不含真实密钥
- ✅ 包含所有需要的配置项说明

### 4. 更新服务文件
- ✅ 更新 `src/services/payment.js` 适配新 API 结构
- ✅ 更新 `src/services/database.js` 适配新 API 结构

## 配置文件结构

### 前端 (`src/config/api.js`)
```javascript
// 只保留基础配置
const API_CONFIG = {
  baseUrl: 'http://localhost:3000',
  endpoints: {
    sendSmsCode: '/send-sms-code',
    // ... 其他端点
  }
}
```

### 后端 (`backend/.env`)
```bash
# 阿里云短信配置
ALIYUN_ACCESS_KEY_ID=your_key_here
ALIYUN_ACCESS_KEY_SECRET=your_secret_here
ALIYUN_SMS_SIGN_NAME=your_sign_name
ALIYUN_SMS_TEMPLATE_CODE=SMS_xxxxxx

# 支付宝配置
ALIPAY_APP_ID=your_app_id
ALIPAY_PRIVATE_KEY=your_private_key
ALIPAY_PUBLIC_KEY=your_public_key
ALIPAY_NOTIFY_URL=https://your-domain.com/alipay-notify
ALIPAY_RETURN_URL=https://your-domain.com/payment-result

# 数据库配置
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=blueplan

# 服务器端口
PORT=3000
```

## 你必须立即执行的操作

### 1. 轮换阿里云密钥 ⚠️ 紧急
1. 登录 [阿里云控制台](https://ram.console.aliyun.com/manage/ak)
2. 找到泄露的 AccessKey: `fhyHmw7I2ILL8jo2Aw+Y0XqAZbOzp1HEVCbu69p4XdY`
3. **立即禁用并删除此密钥**
4. 创建新的 AccessKey
5. 更新服务器上的 `backend/.env` 文件

### 2. 重新生成支付宝密钥对 ⚠️ 紧急
1. 登录 [支付宝开放平台](https://open.alipay.com/develop/manage)
2. 进入你的应用
3. 重新生成 RSA 密钥对
4. 更新服务器上的 `backend/.env` 文件

### 3. 服务器部署
1. 将新的 `.env` 文件上传到服务器 `backend/` 目录
2. 确保 `.env` 文件权限设置为 `600` (只有所有者能读写)
3. 重启后端服务

## 部署检查清单

- [ ] 阿里云密钥已轮换
- [ ] 支付宝密钥已重新生成
- [ ] 服务器 `.env` 文件已更新
- [ ] 服务器 `.env` 文件权限设置为 600
- [ ] 后端服务已重启
- [ ] 短信发送功能测试正常
- [ ] 支付宝支付功能测试正常

## 安全建议

1. **永远不要在前端代码中存放任何密钥**
2. **定期轮换密钥**（建议每3-6个月）
3. **使用 IP 白名单** 限制阿里云 AccessKey 的使用范围
4. **启用操作审计** 记录所有 API 调用
5. **使用密钥管理服务** 如 AWS KMS、阿里云 KMS 等

## GitHub 提交记录

修复提交: 见最新 commit

## 相关文件变更

- `src/config/api.js` - 安全化前端配置
- `backend/server.js` - 安全化后端配置
- `backend/.env.example` - 新增环境变量模板
- `src/services/payment.js` - 适配新API结构
- `src/services/database.js` - 适配新API结构
- `SECURITY.md` - 本文档
