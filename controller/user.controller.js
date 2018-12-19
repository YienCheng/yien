const userSql = require('../db/sql/user.sql')
const rules = require('../config/rules')
// const debug = require('debug')(`yien:userController`)

module.exports = {
  regist (req, res, next) {
    let username = req.body.username
    let loginPassword = req.body.loginPassword
    let loginRePassword = req.body.loginRePassword
    let email = req.body.email
    let nickname = req.body.nickname
    if (!username || !rules.username.test(username)) return next({ status: 1001, message: '用户名验证失败' })
    if (!loginPassword || !rules.loginPassword.test(loginPassword)) return next({ status: 1002, message: '密码验证失败' })
    if (loginPassword !== loginRePassword) return next({ status: 1009, message: '两次密码不一致' })
    if (!email || !rules.email.test(email)) return next({ status: 1003, message: '邮箱验证失败' })
    userSql.addUser({
      username,
      loginPassword,
      email,
      nickname
    })
      .then(doc => {
        req.session.userInfo = doc
        res.locals.result = doc
        next()
      }, error => {
        next(error)
      })
  },
  login (req, res, next) {
    let username = req.body.username
    let loginPassword = req.body.loginPassword
    if (!rules.username.test(username)) {
      return res.json({
        code: 1005,
        message: '用户名不存在',
        result: {}
      })
    }
    if (!rules.loginPassword.test(loginPassword)) {
      return res.json({
        code: 1006,
        message: '密码错误',
        result: {}
      })
    }
    userSql.authUserInfo({
      username,
      loginPassword
    })
      .then(doc => {
        req.session.userInfo = doc
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  logout (req, res, next) {
    req.session.userInfo = {}
    res.locals.result = {}
    next()
  },
  getCurrentUserInfo (req, res, next) {
    let id = req.session.userInfo._id
    userSql.getUserInfoById(id)
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  getUserList (req, res, next) {
    userSql.getUserList()
      .then(docs => {
        res.locals.result = docs
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  addUser (req, res, next) {
    let username = req.body.username
    let loginPassword = req.body.loginPassword
    let loginRePassword = req.body.loginRePassword
    let email = req.body.email
    let nickname = req.body.nickname
    let role = req.body.role
    if (!username || !rules.username.test(username)) return next({ status: 1001, message: '用户名验证失败' })
    if (!loginPassword || !rules.loginPassword.test(loginPassword)) return next({ status: 1002, message: '密码验证失败' })
    if (loginPassword !== loginRePassword) return next({ status: 1009, message: '两次密码不一致' })
    if (!email || !rules.email.test(email)) return next({ status: 1003, message: '邮箱验证失败' })
    userSql.addUser({
      username,
      loginPassword,
      email,
      nickname,
      role
    })
      .then(doc => {
        res.locals.result = doc
        next()
      }, error => {
        next(error)
      })
  },
  getUserInfoByAccount (req, res, next) {
    let loginAccount = req.query.loginAccount
    userSql.getUserInfoByAccount(loginAccount)
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch((error) => {
        next(error)
      })
  },
  updateUserInfo (req, res, next) {
    let username = req.body.username
    // let nickname = req.body.nickname
    let email = req.body.email
    if (!username || !rules.username.test(username)) return next({ status: 1001, message: '用户名验证失败' })
    if (!email || !rules.email.test(email)) return next({ status: 1003, message: '邮箱验证失败' })
    userSql.updateUserInfo(req.body)
      .then(status => {
        res.locals.result = status
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  updateCurrentUserInfo (req, res, next) {
    let username = req.body.username
    let nickname = req.body.nickname
    let email = req.body.email
    let loginAccount = req.session.userInfo.loginAccount
    if (!username || !rules.username.test(username)) return next({ status: 1001, message: '用户名验证失败' })
    if (!email || !rules.email.test(email)) return next({ status: 1003, message: '邮箱验证失败' })
    userSql.updateUserInfo({
      username,
      nickname,
      loginAccount
    })
      .then(status => {
        res.locals.result = status
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  updateUserAvatar (req, res, next) {
    let loginAccount = req.body.loginAccount || req.session.userInfo.loginAccount
    let avatar = '/uploads/usersAvatar/' + req.file.filename + '?v=' + new Date().getTime()
    userSql.updateAvatar({
      loginAccount,
      avatar
    })
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  changeUserPass (req, res, next) {
    let loginAccount = req.session.userInfo.loginAccount
    let loginPassword = req.body.loginPassword
    let newPassword = req.body.newPassword
    let loginRePassword = req.body.loginRePassword
    if (!rules.loginPassword.test(loginPassword)) return next({ status: 1008, message: '原密码错误' })
    if (!rules.loginPassword.test(newPassword)) return next({ status: 1002, message: '新密码格式错误' })
    if (newPassword !== loginRePassword) return next({ status: 1009, message: '两次密码不一致' })
    if (newPassword === loginPassword) {
      req.session.userInfo = {}
      res.locals.result = {}
      return next()
    }
    userSql.updateLoginPass({
      loginAccount,
      loginPassword,
      newPassword
    })
      .then(status => {
        req.session.userInfo = {}
        res.locals.result = status
        next()
      })
      .catch(error => {
        next(error)
      })
  }
}
