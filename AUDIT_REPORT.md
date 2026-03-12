# BluePlan 全仓整改报告

## 1. 基线确认

```
正式整改基线分支 = clean-main
基线 commit = 6d95f32
消息 = Initial secure commit - Remove all hardcoded credentials
```

---

## 2. 安全修复确认 ✅

| 检查项 | 状态 | 位置 |
|--------|------|------|
| 前端无阿里云 AccessKey | ✅ 通过 | `src/config/api.js` 仅保留 API_BASE_URL |
| 后端无支付宝私钥 fallback | ✅ 通过 | `backend/server.js` 强制使用 `process.env` |
| backend/.env.example 存在 | ✅ 通过 | 包含所有必需配置项模板 |
| SECURITY.md 完整 | ✅ 通过 | 详细记录问题和修复措施 |

---

## 3. 敏感信息扫描结果

### 3.1 硬编码密钥扫描
```
扫描路径: src/, backend/
扫描规则: LTAI.*|AK.*|MIIEvg.*|-----BEGIN.*KEY-----
结果: 未发现硬编码密钥
```

### 3.2 演示代码发现 ⚠️

**文件**: `src/pages/Login.vue` (第 120-122 行)
```javascript
} else {
  // 演示模式：使用固定验证码
  alert('验证码已发送到您的手机 (演示: 123456)')
  code.value = '123456'  // ← 硬编码演示验证码
}
```

**整改要求**: 生产环境必须删除演示模式代码

---

## 4. 密钥轮换清单（服务器操作，不提交 GitHub）

### 4.1 阿里云 AccessKey 轮换
- **泄露 Key ID**: `fhyHmw7I2ILL8jo2Aw+Y0XqAZbOzp1HEVCbu69p4XdY`
- **操作**: 登录 https://ram.console.aliyun.com/manage/ak
- **步骤**:
  1. 禁用并删除旧 AccessKey
  2. 创建新的 AccessKey
  3. 更新服务器 `backend/.env` 文件
  4. 重启后端服务

### 4.2 支付宝密钥轮换
- **操作**: 登录 https://open.alipay.com/develop/manage
- **步骤**:
  1. 进入应用管理
  2. 重新生成 RSA 密钥对
  3. 更新服务器 `backend/.env` 文件
  4. 重启后端服务

### 4.3 服务器 .env 文件模板
```bash
# 阿里云短信配置
ALIYUN_ACCESS_KEY_ID=你的新AccessKeyID
ALIYUN_ACCESS_KEY_SECRET=你的新AccessKeySecret
ALIYUN_SMS_SIGN_NAME=武汉市洪山区乔乔尼服装店
ALIYUN_SMS_TEMPLATE_CODE=SMS_501700483

# 支付宝配置
ALIPAY_APP_ID=2021006132651155
ALIPAY_PRIVATE_KEY=-----BEGIN RSA PRIVATE KEY-----
你的新私钥
-----END RSA PRIVATE KEY-----
ALIPAY_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----
你的新公钥
-----END PUBLIC KEY-----
ALIPAY_GATEWAY=https://openapi.alipay.com/gateway.do
ALIPAY_NOTIFY_URL=https://blue-plan1.cn/alipay-notify
ALIPAY_RETURN_URL=https://blue-plan1.cn/payment-result

# 服务器端口
PORT=3000
```

---

## 5. 文件结构收敛清单

### 5.1 重复文件（需删除）

| 保留 | 删除 | 说明 |
|------|------|------|
| `pages/welcome/welcome.vue` | `pages/Welcome.vue` | 大写文件重复 |
| `pages/login/login.vue` | `pages/Login.vue` | 大写文件重复 |
| `pages/home/home.vue` | `pages/Home.vue` | 大写文件重复 |
| `pages/plan/plan.vue` | `pages/Plan.vue` | 大写文件重复 |
| `pages/panic/panic.vue` | `pages/Panic.vue` | 大写文件重复 |
| `pages/survey/survey.vue` | `pages/Survey.vue` | 大写文件重复 |

**注意**: 检查确认 `pages.json` 使用的是小写路径

### 5.2 未使用文件（需确认删除）

| 文件 | 状态 | 操作 |
|------|------|------|
| `pages/Payment.vue` | 未在 pages.json 中注册 | 确认删除 |
| `pages/ProductIntro.vue` | 未在 pages.json 中注册 | 确认删除 |

### 5.3 备份目录（需归档/删除）

```
src-backup/          → 归档到外部存储后删除
backend-backup/      → 归档到外部存储后删除
android-backup/      → 归档到外部存储后删除
backend/server.js.backup  → 已删除 ✅
```

---

## 6. 正式链路检查

### 6.1 演示代码清理清单

| 文件 | 问题 | 整改措施 |
|------|------|----------|
| `src/pages/Login.vue:122` | 硬编码演示验证码 `code.value = '123456'` | 删除演示分支，强制使用真实短信API |
| `src/pages/Login.vue:119-122` | 演示模式 alert | 删除 |

### 6.2 生产环境检查点

- [ ] 删除所有 `console.log` 调试代码
- [ ] 删除所有 `demo` / `演示` 标识
- [ ] 删除所有 `if (isDevelopment)` 绕过逻辑
- [ ] 确认支付流程无模拟模式

---

## 7. Android 打包 SOP

### 7.1 Java 版本固化

**问题**: Capacitor sync 后 Java 版本回退到 21

**解决方案**:

1. **修改 `android/variables.gradle`**
```gradle
ext {
    minSdkVersion = 22
    compileSdkVersion = 34
    targetSdkVersion = 34
    androidxActivityVersion = '1.8.0'
    androidxAppCompatVersion = '1.6.1'
    androidxCoordinatorLayoutVersion = '1.2.0'
    androidxCoreVersion = '1.12.0'
    androidxFragmentVersion = '1.6.2'
    coreSplashScreenVersion = '1.0.1'
    androidxWebkitVersion = '1.9.0'
    
    // 固化 Java 17
    javaVersion = "17"
}
```

2. **修改 `android/app/build.gradle`**
```gradle
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = '17'
    }
}
```

3. **创建 `capacitor.config.json` 固化配置**
```json
{
  "appId": "com.blueplan.app",
  "appName": "布鲁计划",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "android": {
    "buildOptions": {
      "gradleArgs": ["-Pandroid.useAndroidX=true"]
    }
  }
}
```

### 7.2 打包命令

```bash
# 1. 构建前端
cd blueplan-repo
npm run build

# 2. 同步 Capacitor (保持 Java 17)
npx cap sync android

# 3. 检查 Java 版本是否仍为 17
cd android
./gradlew --version  # 应显示 JVM: 17

# 4. 构建 APK
./gradlew assembleRelease

# 输出位置: android/app/build/outputs/apk/release/app-release.apk
```

### 7.3 Java 17 环境检查

```bash
# 检查系统 Java 版本
java -version  # 应显示 17

# 如果系统 Java 是 25，需要指定 JAVA_HOME
export JAVA_HOME=/path/to/java17
export PATH=$JAVA_HOME/bin:$PATH
```

---

## 8. 合并建议

### 8.1 分支策略

```
clean-main (基线分支)
    │
    ├── feature/login-production    # 登录演示代码清理
    ├── feature/page-cleanup        # 重复页面文件删除
    ├── feature/android-java17      # Android 配置固化
    └── hotfix/remove-demo-code     # 演示代码清理
```

### 8.2 PR 合并顺序

1. **PR#1**: 删除重复页面文件 (pages/Welcome.vue → pages/welcome/welcome.vue)
2. **PR#2**: 清理演示代码 (Login.vue 演示模式删除)
3. **PR#3**: Android Java 17 固化配置
4. **PR#4**: 删除备份目录

### 8.3 生产发布检查清单

- [ ] 所有演示代码已删除
- [ ] 所有备份文件已删除
- [ ] 阿里云密钥已轮换
- [ ] 支付宝密钥已轮换
- [ ] 服务器 .env 已更新
- [ ] Android 打包测试通过
- [ ] 短信发送测试通过
- [ ] 支付宝支付测试通过

---

## 9. 执行命令汇总

### 立即执行（安全相关）
```bash
# 1. 轮换阿里云密钥
# 登录 https://ram.console.aliyun.com/manage/ak
# 禁用: fhyHmw7I2ILL8jo2Aw+Y0XqAZbOzp1HEVCbu69p4XdY

# 2. 轮换支付宝密钥
# 登录 https://open.alipay.com/develop/manage
# 重新生成 RSA 密钥对

# 3. 更新服务器 .env (不提交 GitHub)
# vim /path/to/backend/.env
```

### 文件清理
```bash
# 删除重复页面文件
rm src/pages/Welcome.vue
rm src/pages/Login.vue
rm src/pages/Home.vue
rm src/pages/Plan.vue
rm src/pages/Panic.vue
rm src/pages/Survey.vue
rm src/pages/Payment.vue
rm src/pages/ProductIntro.vue

# 归档备份目录
mv src-backup ../archives/20260312-src-backup
mv backend-backup ../archives/20260312-backend-backup
mv android-backup ../archives/20260312-android-backup
```

### 代码修改
```bash
# 修改 Login.vue 删除演示代码
# 修改 android/variables.gradle 固化 Java 17
# 修改 android/app/build.gradle 固化 Java 17
```

---

## 10. 风险提醒

1. **历史 commit 仍含敏感信息**: 虽然 `clean-main` 分支干净，但 `master` 分支历史仍包含泄露的密钥
2. **必须轮换密钥**: 即使代码已清理，泄露的密钥仍可能被利用
3. **服务器 .env 权限**: 确保设置为 `chmod 600 backend/.env`

---

*报告生成时间: 2026-03-12*
*基线分支: clean-main*
*基线 Commit: 6d95f32*
