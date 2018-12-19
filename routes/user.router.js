const moment = require('moment')
const express = require('express')
const router = express.Router()

const loginAuth = require('../middleware/loginAuth.middleware')

router.use(loginAuth)

router.get('/', function (req, res, next) {
  let userInfo = req.session.userInfo
  res.render('user', {
    title: '个人信息',
    createTime: moment(userInfo.createTime).format('YYYY-MM-DD HH:mm:ss'),
    lastLoginTime: moment(userInfo.lastLoginTime).format('YYYY-MM-DD HH:mm:ss')
  })
})

module.exports = router
