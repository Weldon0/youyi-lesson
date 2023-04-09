import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'

console.log(import.meta.env.BASE_URL)
const router = createRouter({
  // 路由模式
  // 传入的这个值是路由的基准地址
  // import.meta.env.BASE_URL：vite.config.js里面的base属性
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
