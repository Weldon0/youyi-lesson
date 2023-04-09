import { request } from '@/utils/request'
import type { CodeType, User } from '@/types/user'

export const loginByPassword = (mobile: string, password: string) => {
  return request<User>('/login/password', 'POST', { mobile, password })
}

//发送验证码接口
export const sendMobileCode = (mobile: string, type: CodeType) => {
  return request('/code', 'GET', {
    mobile,
    type
  })
}

/**
 * 短信验证码登录
 * @param mobile 手机号
 * @param code 短信验证码
 * @returns {Promise<Data<User>>}
 * @example
 *  loginByCode('13800000000','234234')
 */
export const loginByCode = (mobile: string, code: string) => {
  return request<User>('/login', 'POST', {
    mobile,
    code
  })
}
