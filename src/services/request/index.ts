import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

interface CHInterceptor {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

interface CHRequestConfig extends AxiosRequestConfig {
  interceptors?: CHInterceptor
}

class CHRequest {
  instance: AxiosInstance
  interceotors?: CHInterceptor
  loading?: LoadingInstance

  constructor(config: CHRequestConfig) {
    this.instance = axios.create(config)
    this.interceotors = config.interceptors

    /*
      请求拦截器后面的会比前面的先执行
      响应拦截器前面的会比后面的先执行
    */
    this.instance.interceptors.request.use(
      this.interceotors?.requestInterceptor,
      this.interceotors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceotors?.responseInterceptor,
      this.interceotors?.responseInterceptorCatch
    )

    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('all')
        this.loading = ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.4)'
        })
        console.log(this.loading)

        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        return res
      },
      (err) => {
        return err
      }
    )
  }

  request(config: CHRequestConfig) {
    // 每个请求对应的拦截
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      console.log(res)
    })
  }
}

export default CHRequest
