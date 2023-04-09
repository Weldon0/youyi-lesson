import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
console.log('23')

app.use(router)

app.mount('#app')

// 把我们自己写的代码格式化，别人的代码不要动。
