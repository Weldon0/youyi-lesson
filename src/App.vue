<script setup lang="ts">
import { Button } from 'vant'
import { useUserStore } from '@/stores'
// 获取store仓库，这里的userStore是一个对象，里面包含了userStore中的所有方法
const userStore = useUserStore()
</script>
<template>
  <div>
    {{ userStore.user }}
  </div>
  <Button
    type="primary"
    @click="
      userStore.setUser({
        account: '',
        avatar: '',
        id: '',
        mobile: '',
        token: ''
      })
    "
  >
    点击登录
  </Button>
  <Button type="primary" @click="userStore.delUser()">退出登录</Button>
</template>

<style scoped></style>
