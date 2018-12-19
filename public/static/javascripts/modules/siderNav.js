/*
*扩展一个 siderNav 模块
*
*/
/* global layui */
layui.define(['tree'], function (exports) { // 提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
  const $ = layui.$
  // const tree = layui.tree
  let $body = $('body')
  let $siteShadow = $('#site-shadow')
  let $siteBtn = $('#site-btn')
  $siteBtn.on('click', function () {
    $body.addClass('site-mobile')
  })

  $siteShadow.on('click', function () {
    $body.removeClass('site-mobile')
  })

  // 解决在shadow滑动页面滚动的情况
  $siteShadow.on('touchmove', function (e) {
    e.preventDefault()
  })
  function setOptins (opts) {

  }
  // 填充结构
  // tree({
  //   elem: '#site-container',
  //   nodes: [{
  //     name: '父节点1',
  //     children: [{
  //       name: '子节点11'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点11'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }, {
  //       name: '子节点12'
  //     }]
  //   }, {
  //     name: '父节点2（可以点左侧箭头，也可以双击标题）',
  //     children: [{
  //       name: '子节点21',
  //       children: [{
  //         name: '子节点211'
  //       }]
  //     }]
  //   }]
  // })
  exports('siderNav', {
    setOptins
  })
})
