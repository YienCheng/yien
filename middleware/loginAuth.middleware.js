/*
* 登录验证中间件
*/
const createError = require('http-errors')
module.exports = function (req, res, next) {
  if (req.session.userInfo.loginAccount) {
    return next()
  }
  return next(createError(401))
}
