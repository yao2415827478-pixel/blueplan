---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022019b372bdc57ad5d928ecaeb3c86ea5db0b0248e7f34d5eb4e48e6d707f11e004022100e506c0b8b3712badd7dda08f364f034d2fb660e409c1724497741f799f8faee6
    ReservedCode2: 304502202022a128bac5ae05ec015d4818c4d4de2ca4e9a034f0a8c687e867f89e7ae72a022100933ea67e8571ba2d8cf7fc5954a34af10f2917a73b514ecadcaa650bd23522bc
---

# 布鲁计划后端部署指南

## 服务器信息
- **IP:** 120.27.139.123
- **域名:** blue-plan1.cn

## 部署步骤

### 1. 连接服务器
```bash
ssh root@120.27.139.123
```

### 2. 安装 Node.js（如果未安装）
```bash
# 安装 Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# 验证安装
node --version
npm --version
```

### 3. 上传后端代码
```bash
# 在本地执行（需要先压缩）
cd /workspace
zip -r blue-plan-backend.zip blue-plan-backend/

# 或使用 scp 上传
scp blue-plan-backend.zip root@120.27.139.123:/root/
```

### 4. 在服务器上解压并安装
```bash
# 解压
unzip blue-plan-backend.zip

# 进入目录
cd blue-plan-backend

# 安装依赖
npm install
```

### 5. 启动服务
```bash
# 启动服务（前台运行测试）
npm start

# 或使用 PM2 后台运行（推荐）
npm install -g pm2
pm2 start server.js --name blue-plan

# 查看状态
pm2 status
```

### 6. 配置 Nginx（可选，用于域名访问）
```nginx
# /etc/nginx/sites-available/blue-plan

server {
    listen 80;
    server_name blue-plan1.cn;

    location / {
        # 前端
        proxy_pass http://localhost:8080;
    }

    location /api {
        # 后端API
        proxy_pass http://localhost:3000;
    }
}
```

### 7. 开放防火墙端口
```bash
# 开放端口
ufw allow 3000
ufw allow 80
ufw allow 443
```

---

## API 接口列表

### 邮箱验证码
| 接口 | 方法 | 路径 |
|------|------|------|
| 发送验证码 | POST | /send-verification-code |
| 验证验证码 | POST | /verify-code |

### 用户管理
| 接口 | 方法 | 路径 |
|------|------|------|
| 创建用户 | POST | /api/users/create |
| 更新用户 | POST | /api/users/update |
| 获取用户 | POST | /api/users/get |
| 同步数据 | POST | /api/users/sync |

### 微信支付
| 接口 | 方法 | 路径 |
|------|------|------|
| 创建订单 | POST | /create-order |
| 查询订单 | POST | /query-order |
| 支付回调 | POST | /wechat-notify |

### 支付宝
| 接口 | 方法 | 路径 |
|------|------|------|
| 创建订单 | POST | /alipay/create-order |
| 查询订单 | POST | /alipay/query-order |
| 支付回调 | POST | /alipay-notify |

---

## 前端配置

部署后，在前端配置您的API地址：

```javascript
// /workspace/blue-plan/src/config/api.js

const API_CONFIG = {
  database: {
    baseUrl: 'http://blue-plan1.cn:3000'
  },
  emailApi: {
    baseUrl: 'http://blue-plan1.cn:3000'
  },
  wechatPay: {
    baseUrl: 'http://blue-plan1.cn:3000'
  },
  alipay: {
    baseUrl: 'http://blue-plan1.cn:3000'
  }
}
```

---

## 后续配置

### 1. 配置微信支付
- 申请微信支付商户号
- 在 `/create-order` 中填入真实AppID和商户密钥

### 2. 配置支付宝
- 在支付宝开放平台创建应用
- 在 `/alipay/create-order` 中填入真实AppID和密钥

### 3. 配置邮箱发送
- 申请阿里云邮件推送
- 在 `/send-verification-code` 中配置SMTP

### 4. 替换数据库
- 当前使用内存存储（重启会丢失）
- 建议配置 MySQL/SQLite 持久化存储
