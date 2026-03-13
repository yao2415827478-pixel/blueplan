<template>
  <view class="login-page">
    <!-- 动态背景 -->
    <view class="liquid-bg"></view>
    <view class="liquid-orb liquid-orb-1"></view>
    <view class="liquid-orb liquid-orb-2"></view>

    <!-- Toast 提示 -->
    <view v-if="toastVisible" class="toast" :class="toastType">
      {{ toastMessage }}
    </view>

    <!-- Loading 遮罩 -->
    <view v-if="loadingVisible" class="loading-overlay">
      <view class="loading-spinner"></view>
      <text class="loading-text">登录中...</text>
    </view>

    <!-- 主要内容 -->
    <view class="content">
      <!-- 标题 -->
      <view class="header-section">
        <text class="title">欢迎回来</text>
        <text class="subtitle">登录后开始你的戒色之旅</text>
      </view>

      <!-- 评估结果卡片 -->
      <view class="result-card glass-card">
        <text class="result-label">你的依赖程度评估</text>
        <view class="result-score">
          <text class="score-value gradient-text">{{ surveyScore }}</text>
          <text class="score-unit">分</text>
        </view>
        <text class="result-level">{{ scoreLevel }}</text>
      </view>

      <!-- 登录表单 -->
      <view class="form-section">
        <!-- 手机号输入 -->
        <view class="input-group">
          <text class="input-label">手机号</text>
          <input
            class="glass-input"
            type="number"
            v-model="phoneNumber"
            placeholder="请输入手机号"
            maxlength="11"
          />
        </view>

        <!-- 验证码输入 -->
        <view class="input-group">
          <text class="input-label">验证码</text>
          <view class="code-input-row">
            <input
              class="glass-input code-input"
              type="number"
              v-model="code"
              placeholder="请输入验证码"
              maxlength="6"
            />
            <button
              class="code-button"
              :disabled="countdown > 0"
              @click="sendCode"
            >
              {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
            </button>
          </view>
        </view>

        <!-- 登录按钮 -->
        <button class="login-button glass-button" @click="handleLogin">
          登录
        </button>
      </view>

      <!-- 其他提示 -->
      <view class="notice-section">
        <text class="notice-text">未注册的手机号将自动创建账号</text>
        <text class="notice-text">登录即表示同意</text>
        <text class="link-text">《用户协议》</text>
        <text class="notice-text">和</text>
        <text class="link-text">《隐私政策》</text>
      </view>
    </view>

    <!-- 验证码输入弹窗 -->
    <view v-if="showCodeModal" class="modal-overlay">
      <view class="modal-content glass-card">
        <text class="modal-title">输入验证码</text>
        <text class="modal-desc">验证码已发送至 {{ phoneNumber }}</text>
        <view class="code-dots">
          <view
            v-for="i in 6"
            :key="i"
            class="code-dot"
            :class="{ filled: codeModal.length >= i }"
          >
            <view v-if="codeModal.length >= i" class="dot-filled"></view>
          </view>
        </view>
        <input
          class="hidden-input"
          type="number"
          v-model="codeModal"
          maxlength="6"
          focus
        />
        <button class="modal-button glass-button" @click="confirmCode">
          确认
        </button>
      </view>
    </view>

