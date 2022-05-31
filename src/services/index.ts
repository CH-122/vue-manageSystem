import CHRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const chRequest = new CHRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('request')
      const token = '123'
      if (token) {
        // AxiosRequestConfig 里的 header 的定义可以是undefined
        if (config && config.headers) {
          config.headers.Authorization = token
        }
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('request error')
      return err
    },
    responseInterceptor: (res) => {
      console.log('response')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('response error')
      return err
    }
  }
})
export default chRequest
