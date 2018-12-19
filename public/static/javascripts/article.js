/* global layui hljs SimpleMDE */
layui.define(['element', 'util', 'headerNav', 'service', 'carousel', 'form', 'layer'], function (exports) {
  const $ = layui.$
  const util = layui.util
  const service = layui.service
  const layer = layui.layer
  // 初始化代码高亮
  hljs.initHighlightingOnLoad()

  // 标签
  let backgroundLib = ['#0593d3', '#FE0002', '#FBB033', '#00BBE8', '#6B727A', '#FFD700', '#49AA43', '#E15047']
  let $tags = $('.post-tags .tag')
  $tags.each((index, tag) => {
    let round = Math.floor(Math.random() * (backgroundLib.length - 0 + 1) + 0)
    let $tag = $(tag)
    $tag.css('background-color', backgroundLib[round])
  })

  // 评论
  let simplemde = new SimpleMDE({
    el: document.getElementById('comment-textarea'),
    hideIcons: ['side-by-side', 'fullscreen', 'guide'],
    placeholder: '请在此输入您的评论，支持 markdonw 语法'
  })

  $('#comment-submit').on('click', function () {
    let content = simplemde.value()
    let pathname = location.pathname
    let lastIndex = pathname.lastIndexOf('/')
    let post = pathname.slice(lastIndex + 1)
    let params = $.param({
      post,
      content
    })
    service.addComment(params)
      .then(res => {
        if (res.code === 0) {
          simplemde.value('')
        }
      })
  })
  // 返回顶部
  util.fixbar({
    showHeight: 100
  })
  exports('article', {})
})
