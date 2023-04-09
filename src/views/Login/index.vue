<script setup lang="ts">
import CpNavBar from '@/components/cp-nav-bar.vue'
import { onUnmounted, ref } from 'vue'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { showToast } from 'vant'
import type { FormInstance } from 'vant'
import { loginByPassword, sendMobileCode, loginByCode } from '@/services/user'
import { useUserStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

// 添加路由跳转
const agree = ref(true)
const show = ref(false) // 是否展示密码，默认不展示
const mobile = ref('13230000001')
const password = ref('abc12345')
const code = ref()
const isPassword = ref(true) // 默认就是密码登录【密码登录和验证码登录的标识】
const form = ref<FormInstance | null>(null) // 表单的实例的ts类型是formInstance方法，直接从vant里面进行导入即可

// 倒计时时间
const time = ref(0)
const timerId = ref<number>(0)

const labelInfo = {
  passwordInfo: '密码登录',
  codeInfo: '短信验证码登录'
}

// 定义提交表单的方法
const login = async () => {
  //   默认帮我们校验表单
  //  判断一下是否点击了同意协议
  if (!agree.value) return showToast('请勾选我已同意')
  const res = isPassword.value
    ? await loginByPassword(mobile.value, password.value)
    : await loginByCode(mobile.value, code.value)
  // 把后端返回的用户信息内容存储到pinia
  userStore.setUser(res.data)
  // 跳转个人中心,判断是否有回跳的地址
  router.push((route.query.returnUrl as string) || '/user')
  // 给用户一个跳转成功的提示
  showToast({
    message: '登录成功',
    type: 'success'
  })
}

const send = async () => {
  if (time.value > 0) return
  // 校验手机号的表单输入框
  await form.value?.validate('mobile')
  // 可以发送验证码
  await sendMobileCode(mobile.value, 'login')
  showToast('短信验证码发送成功')
  time.value = 60

  timerId.value = window.setInterval(() => {
    time.value--
    //小于等于了0，清除定时器，定时器标识
    if (time.value <= 0) window.clearInterval(timerId.value)
  }, 1000)
  // 处理倒计时的逻辑
  // time的时间变成60
  // 每隔一秒自减1
  // 如果减到了0或者1的时候，清除定时器
  // 组件卸载的时候，定时器清除
}
onUnmounted(() => {
  window.clearInterval(timerId.value)
})
</script>

<template>
  <div class="login-page">
    <cp-nav-bar
      right-text="注册"
      @click-right="router.push('/register')"
    ></cp-nav-bar>
    <div class="login-head">
      <h3>{{ isPassword ? labelInfo.passwordInfo : labelInfo.codeInfo }}</h3>
      <a href="javascript:" @click="isPassword = !isPassword">
        <span>{{
          isPassword ? labelInfo.codeInfo : labelInfo.passwordInfo
        }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- form 表单 -->
    <van-form ref="form" autocomplete="off" @submit="login">
      <van-field
        :rules="mobileRules"
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="tel"
      ></van-field>
      <van-field
        v-if="isPassword"
        v-model="password"
        :rules="passwordRules"
        placeholder="请输入密码"
        :type="show ? 'text' : 'password'"
      >
        <template #button>
          <!-- #icon-文件夹名称-图片名称 -->
          <CpIcon
            @click="show = !show"
            :name="`login-eye-${show ? 'on' : 'off'}`"
          />
        </template>
      </van-field>
      <van-field
        v-model="code"
        :rules="codeRules"
        v-else
        placeholder="短信验证码"
      >
        <template #button>
          <span class="btn-send" :class="{ active: time > 0 }" @click="send">
            {{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}
          </span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:">用户协议</a>
          <span>及</span>
          <a href="javascript:">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit"
          >登 录</van-button
        >
      </div>
      <div class="cp-cell">
        <a href="javascript:">忘记密码？</a>
      </div>
    </van-form>
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="32" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }
  &-head {
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
}
// van-form 下添加
.btn-send {
  color: var(--cp-primary);
  &.active {
    color: rgba(22, 194, 163, 0.5);
  }
}
</style>
