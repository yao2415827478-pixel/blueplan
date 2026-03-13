---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 30460221009b35ffc0ae132c3913e46b341f03b726d74f884bb8c896f29aac02a34fc7c832022100c7f3d382e54c31a7b9547c20bca50a70fed4621127f1ce35ee32643a90b8efc7
    ReservedCode2: 3045022053e1ed15603b4ede9499cf57226dd4af9c3d50f4a6552a22ed999fdc6eff1a60022100ebc2e7b291b5e9dcee3a2ab87a6597dcb9c37152d18478af90c1962d19f862c9
---

# 支付宝 App 支付接入说明

## 最新配置方式 ✅

支付宝 Android SDK 已发布到 **Maven Central**，只需在 build.gradle 添加依赖：

```gradle
// android/app/build.gradle
dependencies {
    api 'com.alipay.sdk:alipaysdk-android:+@aar'
}
```

## ⚠️ 支付宝后台还需要确认

在支付宝开放平台的应用中，显示 **"接入检测不通过"**：
- 需要在 **应用详情 → 开发设置** 中配置：
  1. **应用公钥** - 生成RSA2密钥对后填入
  2. 确保 **APP支付** 功能已签约

## 你的配置信息

| 项目 | 值 |
|------|-----|
| AppID | 2021006132651155 |
| 包名 | com.blueplan.app |
| SHA256签名 | 83:BA:AF:62:4E:2C:C7:6D:C6:6C:78:11:E5:A6:E7:84:BD:83:84:F3:63:A2:83:4E:A5:80:8A:81:9F:18:10:A4 |

## 接入流程

1. 在支付宝开放平台生成或上传应用公钥
2. 确认APP支付已签约
3. 构建Android APK
4. 测试支付
