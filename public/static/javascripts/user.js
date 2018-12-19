/* global layui */
layui.define(['element', 'util', 'headerNav', 'service', 'layer', 'form', 'upload'], function (exports) {
  const $ = layui.$
  const util = layui.util
  const service = layui.service
  const layer = layui.layer
  const upload = layui.upload

  // 修改改密码
  $('#changepsw-btn').on('click', function () {
    layer.open({
      title: '修改密码',
      type: 1,
      closeBtn: 2,
      content: $('#changepass-form'),
      btn: ['确认', '取消'],
      btnAlign: 'c',
      yes: function (index, layero) {
        let params = $('#changepass-form').serialize()
        service.changeUserPass(params)
          .then(res => {
            if (res.code === 0) {
              layer.msg('密码修改成功', {
                icon: 6,
                time: 2000
              })
              setTimeout(function () {
                location.href = '/login'
              }, 1000)
            }
          })
        return false
      },
      end: function () {
        $('#changepass-form').find('#oldPass').val('')
        $('#changepass-form').find('#newPass').val('')
        $('#changepass-form').find('#rePass').val('')
      }
    })
  })
  // 修改改头像
  upload.render({
    elem: '#uploadAvatar',
    url: '/api/user/updateUserAvatar',
    accept: 'images',
    acceptMime: 'image/jpeg, image/png, image/jpg',
    field: 'avatar',
    size: 200,
    before () {
      console.log('开始上传文件了')
    },
    done (res) {
      if (res.code === 0) {
        layer.msg('头像上传成功', {
          icon: 6,
          time: 2000
        })
        $('#user-avatar-img').attr('src', res.result.avatar)
        $('#user-avatar img').attr('src', res.result.avatar)
        return
      }
      layer.msg('头像上传失败', {
        icon: 5,
        time: 1500
      })
    },
    error () {
      layer.msg('头像上传失败', {
        icon: 5,
        time: 1500
      })
    }
  })

  // 返回顶部
  util.fixbar({
    showHeight: 100
  })
  exports('user', {})
})
