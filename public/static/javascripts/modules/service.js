/*
*扩展一个 service 模块
*
*/
/* global axios layui */
layui.define(['layer'], function (exports) {
  const layer = layui.layer
  // baseUrl
  axios.defaults.baseURL = '/api'

  // 指定请求超时时间
  axios.defaults.timeout = 10000

  // 设置跨域时允许携带cookie
  axios.defaults.withCredentials = true

  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers['X-Requested-With'] = 'XMLHttpRequest'

    if (config.method === 'post') {
      config.data += `&timer=${new Date().getTime()}`
    }
    if (config.method === 'get') {
      config.params['timer'] += new Date().getTime()
    }
    return config
  }, function (error) {
  // 对请求错误做些什么
    return Promise.reject(error)
  })

  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
    if (response.data.code !== 0) {
      layer.msg(response.data.message, {
        icon: 5,
        time: 2000
      })
    }
    return response
  }, function (error) {
  // 对响应错误做点什么
    layer.msg('资源请求失败，请稍后再试！', {
      time: 2000
    })
    return Promise.reject(error)
  })
  /**
 * get请求方法
 *
 * @export
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @param {any} log 暂时没用
 * @returns
 */
  function requestGet (url, params, log) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      })
        .then(response => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
 * Post请求方法
 *
 * @export
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @param {'payload' || [null]} payload 传原始对象还是stringify对象
 * @returns
 */
  function requestPost (url, params, payload) {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
    })
  }

  // 用户登录接口
  const login = (options) => requestPost('/login', options)
  // 用户注册接口
  const regist = (options) => requestPost('/regist', options)
  // 用户登出
  const logout = (options) => requestPost('/logout', options)
  // 意见反馈
  const feedback = (options) => requestPost('/user/feedback', options)
  // 修改密码
  const changeUserPass = (options) => requestPost('/user/changeUserPass', options)
  // 新增评论
  const addComment = (options) => requestPost('/user/addComment', options)

  // 输出
  exports('service', {
    login,
    regist,
    logout,
    feedback,
    changeUserPass,
    addComment
  })
})
