import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

console.log('[main.js] 开始创建App')

const app = createApp(App)
app.use(router)
app.mount('#app')

console.log('[main.js] App已挂载')
