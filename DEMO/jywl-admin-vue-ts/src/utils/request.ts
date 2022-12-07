import axios, { AxiosRequestConfig, Method } from 'axios'
import { Message, MessageBox } from 'element-ui'
import { UserModule } from '@/store/modules/user'

const request = axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? '/api' : '/management',
  baseURL: '/api',
  timeout: 5000
})

// Request interceptors
request.interceptors.request.use(
  config => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers.Authorization = `Bearer ${UserModule.token}`
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// Response interceptors
request.interceptors.response.use(
  response => {
    const status = response.status
    const res = response.data
    if (status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 401 || res.code === 402 || res.code === 403) {
        MessageBox.confirm('需要重新登录系统!', '登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          UserModule.ResetToken()
          location.reload() // To prevent bugs from vue-router
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response.data
    }
  },
  error => {
    const res = error.response.data
    Message({
      message: res.message || error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export const createAPI = (
  url: string,
  method: Method = 'get',
  params: any = undefined,
  data: any = undefined
) => {
  const config: AxiosRequestConfig = {}
  config.url = url
  config.method = method
  if (params !== undefined) {
    config.params = params
  }
  if (method !== 'get' && data !== undefined) {
    config.data = data
  }

  return request(config)
}

export const createFormAPI = (url: string, method: Method, data: any) => {
  const config: AxiosRequestConfig = {}
  config.url = url
  config.method = method
  config.data = data
  config.headers = {
    'Cache-Control': 'no-cache',
    // 'Content-Type': 'application/x-www-form-urlencoded'
    'Content-Type': 'multipart/form-data'
  }
  // config.responseType = 'json'
  // config.transformRequest = [
  //   function(data) {
  //     let ret = ''
  //     for (let it in data) {
  //       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  //     }
  //     return ret
  //   }
  // ]
  return request(config)
}

export default request
