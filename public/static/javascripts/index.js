/* global layui */
layui.define(['element', 'tree', 'util', 'siderNav', 'headerNav', 'service', 'carousel', 'form', 'layer'], function (exports) {
  const $ = layui.$
  const util = layui.util
  const carousel = layui.carousel
  const service = layui.service
  const layer = layui.layer
  const form = layui.form

  // 轮播
  carousel.render({
    elem: '#new-carousel',
    width: '100%', // 设置容器宽度
    height: '100%',
    arrow: 'hover',
    anim: 'fade',
    interval: 5000
  })
  // 意见反馈
  form.on('submit(formDemo)', function (data) {
    let parmas = $('#qa-form').serialize()
    console.log(parmas)
    service.feedback(parmas)
      .then(res => {
        if (res.code !== 0) {
          layer.msg('反馈成功！', {
            icon: 6,
            time: 2000
          })
        }
      })
    return false
  })

  // 标签云
  let backgroundLib = ['#0593d3', '#FE0002', '#FBB033', '#00BBE8', '#6B727A', '#FFD700', '#49AA43', '#E15047']
  let $tags = $('.tags-container .tag')
  $tags.each((index, tag) => {
    let round = Math.floor(Math.random() * (backgroundLib.length - 0 + 1) + 0)
    let $tag = $(tag)
    $tag.css('background-color', backgroundLib[round])
  })
  // 设置SideNav

  // 让swiper保持比例
  function resizeSwiper () {
    let width = $('#swiper-container').width()
    let height = width * 0.618
    $('#swiper-container').height(height)
  }
  resizeSwiper()
  $(window).on('resize', resizeSwiper)

  // 返回顶部
  util.fixbar({
    showHeight: 100
  })
  exports('index', {})
})
