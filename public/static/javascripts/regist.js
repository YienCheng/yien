/* global layui */
layui.define(['util', 'headerNav', 'form', 'service'], function (exports) {
  const util = layui.util
  const layer = layui.layer
  const $ = layui.$
  const service = layui.service

  let $registForm = $('#regist-form')
  $registForm.on('submit', function () {
    let parmas = $(this).serialize()
    service.regist(parmas)
      .then(res => {
        if (res.code === 0) {
          layer.msg('注册成功！', {
            icon: 6,
            time: 2000
          })
          setTimeout(function () {
            location.href = '/'
          }, 1000)
        }
      })
    return false
  })
  // 返回顶部
  util.fixbar()
  exports('regist', {})
})
