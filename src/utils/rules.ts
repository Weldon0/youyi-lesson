// 手机号的校验规则

import type { FieldRule } from 'vant'

export const mobileRules: FieldRule[] = [
  {
    required: true,
    message: '手机号不能为空'
  },
  {
    pattern: /^1[3-9]\d{9}$/,
    message: '手机号格式不正确'
  }
]

export const passwordRules: FieldRule[] = [
  {
    required: true,
    message: '密码不能为空'
  },
  {
    pattern: /^\w{8,24}$/,
    message: '密码必须是8-24位'
  }
]

// 短信验证码校验规则
export const codeRules: FieldRule[] = [
  {
    required: true,
    message: '短信验证码不能为空'
  },
  {
    pattern: /^\d{6}$/,
    message: '短信验证码需要6位'
  }
]
