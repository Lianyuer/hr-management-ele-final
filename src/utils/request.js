import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

const request1 = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 添加请求拦截器
request1.interceptors.request.use(function (config) {
  const token = store.state.token
  if (token) {
    config.headers.Authorization = `Bearer {${token}}`
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request1.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  console.log(response, 'response')
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message({ type: 'error', message })
    return Promise.reject(new Error(message))
  }
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})

export default request1
