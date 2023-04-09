<template>
  <van-nav-bar
    left-arrow
    @click-left="clickLeft"
    fixed
    :title="title"
    :right-text="rightText"
    @click-right="clickRight"
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
// vue3里面setup里面如何获取路由参数，如何跳转路由

const router = useRouter() // this.$router
// const route = useRoute() // 可以获取到路由参数信息
const clickLeft = () => {
  //     点击了左侧按钮，判断当前页面是否可以继续回退
  if (history.state.back) {
    router.back()
  } else {
    router.push('/')
  }
}
const clickRight = () => {
  emits('clickRight')
}

// 接收父组件传递过来的事件
const emits = defineEmits<{
  (e: 'clickRight'): void
}>()

// 1、title/rightText从父组件接收【可选参数，需要给默认值】

// 指定title和right和text的默认值
const { title = '', rightText = '' } = defineProps<{
  title?: string
  rightText?: string
}>()
</script>

<style scoped lang="scss">
.van-nav-bar {
  :deep &__arrow {
    font-size: 18px;
    color: var(--cp-text1);
  }
  :deep &__text {
    font-size: 15px;
  }
}
</style>
