import axios from 'axios'
import type { Method } from 'axios'
import { useUserStore } from '@/stores'
import { showToast } from 'vant'
import router from '@/router'

export const baseURL = 'https://consult-api.itheima.net/'

export const instance = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 判断用户是否有token，如果有token携带到请求头
    const userStore = useUserStore()
    if (userStore.user?.token) {
      config.headers.Authorization = `Bearer ${userStore.user.token}`
    }

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截器：处理相应数据

instance.interceptors.response.use(
  (response) => {
    //   状态码200-300
    // 1、判断返回的数据是否可用
    console.log(response)
    if (response.data.code !== 10000) {
      showToast({
        message: response.data.message
      })
      return Promise.reject(response.data)
    }

    // 如果数据可用，直接把data返回
    return response.data
  },
  (err) => {
    //401
    if (err.response.status === 401) {
      // token失效
      // 退出登录
      const userStore = useUserStore()
      userStore.delUser() // 清空用户信息
      showToast('登录过期，请重新登录')
      // 提示用户、跳转登录页面
      // 把用户正在访问的页面记录下来，传递给登录页面，目的：登录成功以后，可以返回到我之前浏览的页面
      router.push(`/login?returnUrl=${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(err)
  }
)

// 后端接口返回的数据
type Data<T> = {
  code: number
  message: string
  data: T
}

export const request = <T>(
  url: string,
  method: Method = 'get', // 指定method的类型
  submitData?: object
) => {
  //   第二个泛型直接指定接口的返回数据类型，不使用data包裹
  return instance.request<T, Data<T>>({
    url,
    method,
    //     get请求和post请求传递参数的key是不一样的，params，data
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
