import { createRouter, createWebHistory } from 'vue-router'

console.log(import.meta.env.BASE_URL)
const router = createRouter({
  // 路由模式
  // 传入的这个值是路由的基准地址
  // import.meta.env.BASE_URL：vite.config.js里面的base属性
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    }
  ]
})

export default router
