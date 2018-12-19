const userSql = require('../db/sql/user.sql')
// const debug = require('debug')(`yien:updateUserInfoMiddleware`)
module.exports = (req, res, next) => {
  res.locals.userInfo = {}
  if (!req.session.userInfo || req.session.userInfo === {}) {
    req.session.userInfo = {}
    return next()
  }
  userSql.getUserInfoById(req.session.userInfo._id)
    .then(doc => {
      if (!doc) {
        req.session.userInfo = {}
        return next()
      }
      req.session.userInfo = doc
      res.locals.userInfo = doc
      return next()
    }, error => {
      return next(error)
    })
}
