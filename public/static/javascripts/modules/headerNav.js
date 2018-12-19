/*
*扩展一个 headerNav 模块
*
*/
/* global layui */
layui.define(['element', 'service'], function (exports) { // 提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
  const $ = layui.$
  const service = layui.service
  console.log('header:')
  console.log(layui)
  let $headerNav = $('#header-nav')
  let $navToggleBtn = $('#nav-toggle-btn')
  let $body = $('body')
  let $userAvatar = $('#user-avatar')
  let $userNav = $('#user-nav')

  // 导航切换
  $navToggleBtn.on('click', function (e) {
    e.stopPropagation()
    $(this).toggleClass('act')
    $headerNav.addClass('layui-anim layui-anim-upbit layui-nav-tree')
    $headerNav.toggleClass('layui-show')
  })
  $headerNav.on('click', function (e) {
    e.stopPropagation()
  })
  $body.on('click', function () {
    $navToggleBtn.removeClass('act')
    $headerNav.removeClass('layui-show')
  })

  // 用户导航切换
  $userAvatar.on('click', function (e) {
    e.stopPropagation()
    $userNav.toggleClass('layui-show')
  })
  $userNav.on('click', function (e) {
    e.stopPropagation()
  })
  $body.on('click', function () {
    $userNav.removeClass('layui-show')
  })

  $('#exit').on('click', function () {
    service.logout()
      .then(res => {
        if (res.code === 0) {
          location.href = '/'
        }
      })
  })
  exports('headerNav', {})
})
