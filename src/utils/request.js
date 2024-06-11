import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (Object.keys(res).length == 0) {
      res.code = 4000
      res.message = '账号异常'
    }
    // if the custom code is not 20000, it is judged as an error.
    if (res.success !== true) {
      // Message({
      //   message: res.message || '账号异常',
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else if (res.code === 4000 || res.code === -1) {
        Message({
          message: error.message || error.msg || '',
          type: 'error',
          duration: 5 * 1000
        })
      } else {
        MessageBox(res.msg)
      }
      return Promise.reject(new Error(res.message || error.msg || 'Error'))
    } else {


      return res
    }
  },
  error => {
    console.log('err2' + error) // for debug
    if (error.response && error.response.data) {
      const { code } = error.response.data
      // token 过期,重新登录
      if (code === 'A0230') {
        MessageBox.confirm('当前页面已失效，请重新登录', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          localStorage.clear()
          window.location.href = process.env.NODE_ENV == 'development' ? '/' : '/dist/index.html'
        })
      }
    } else {
      Message({
        message: error.message || error.msg || '',
        type: 'error',
        duration: 5 * 1000
      })
    }
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
