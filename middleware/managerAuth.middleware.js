/*
* 管理员校验中间件
*/
const debug = require('debug')('yien:managerAuth')
const createError = require('http-errors')
module.exports = function (req, res, next) {
  debug(req.session.userInfo.role)
  if (req.session.userInfo.role === 'manager') {
    return next()
  }
  return next(createError(403))
}
