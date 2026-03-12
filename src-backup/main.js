import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// 页面组件
import Welcome from './pages/Welcome.vue'
import Survey from './pages/Survey.vue'
import ProductIntro from './pages/ProductIntro.vue'
import Payment from './pages/Payment.vue'
import Login from './pages/Login.vue'
import Home from './pages/Home.vue'
import Plan from './pages/Plan.vue'
import Panic from './pages/Panic.vue'

// 路由配置
const routes = [
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', component: Welcome },
  { path: '/survey', component: Survey },
  { path: '/product-intro', component: ProductIntro },
  { path: '/payment', component: Payment },
  { path: '/login', component: Login, meta: { requiresPayment: true } },
  { path: '/home', component: Home, meta: { requiresPayment: true } },
  { path: '/plan', component: Plan, meta: { requiresPayment: true } },
  { path: '/panic', component: Panic, meta: { requiresPayment: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫 - 检查支付状态
router.beforeEach((to, from, next) => {
  const hasPaid = localStorage.getItem('hasPaid') === 'true'

  // 如果页面需要支付但用户未支付，跳转到产品介绍页
  if (to.meta.requiresPayment && !hasPaid) {
    // 如果用户已完成问卷，去产品介绍页
    const hasCompletedSurvey = localStorage.getItem('hasCompletedSurvey') === 'true'
    if (hasCompletedSurvey) {
      next('/product-intro')
    } else {
      next('/survey')
    }
  } else {
    next()
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
