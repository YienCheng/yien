/* global layui */
layui.define(['util', 'form', 'service', 'headerNav'], function (exports) {
  const util = layui.util
  const service = layui.service
  const $ = layui.$
  let $loginForm = $('#login-form')

  $loginForm.on('submit', function () {
    let parmas = $(this).serialize()
    service.login(parmas)
      .then(res => {
        if (res.code === 0) {
          location.href = '/'
        }
      })
    return false
  })

  // 返回顶部
  util.fixbar()
  exports('login', {})
})
