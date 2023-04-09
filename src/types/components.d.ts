import CpNavBar from '@/components/cp-nav-bar.vue'
// 把自己的组件类型添加到vue模块里面的GlobalComponents接口里面去
import CpIcon from '@/components/CpIcon.vue'

declare module 'vue' {
  interface GlobalComponents {
    CpNavBar: typeof CpNavBar
    CpIcon: typeof CpIcon
  }
}
