import { createRouter, createWebHashHistory } from 'vue-router'

// 导入页面组件
const Welcome = () => import('./pages/welcome/welcome.vue')
const Survey = () => import('./pages/Survey.vue')
const ProductIntro = () => import('./pages/ProductIntro.vue')
const Payment = () => import('./pages/Payment.vue')
const Login = () => import('./pages/Login.vue')
const Home = () => import('./pages/Home.vue')
const Plan = () => import('./pages/plan/plan.vue')
const Panic = () => import('./pages/panic/panic.vue')

const routes = [
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/survey',
    name: 'Survey',
    component: Survey
  },
  {
    path: '/product-intro',
    name: 'ProductIntro',
    component: ProductIntro
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/plan',
    name: 'Plan',
    component: Plan
  },
  {
    path: '/panic',
    name: 'Panic',
    component: Panic
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router