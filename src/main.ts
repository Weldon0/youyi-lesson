import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入vant的全局样式
import 'vant/lib/index.css'
import '@/styles/main.scss'
import 'virtual:svg-icons-register'
import pinia from '@/stores'
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
// 把我们自己写的代码格式化，别人的代码不要动。
//lint-staged不会格式化别人的代码，只会格式化你自己的代码
