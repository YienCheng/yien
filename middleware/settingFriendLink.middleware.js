/*
* 设置友情链接
*/
const friendLinkSql = require('../db/sql/friendLink.sql')
const debug = require('debug')(`yien:friendLinkMiddleware`)
module.exports = (req, res, next) => {
  debug('中间件：friendLinkMiddleware')
  friendLinkSql.getFriendLinkList()
    .then(docs => {
      res.locals.friendLink = docs
      next()
    })
    .catch(error => {
      next(error)
    })
}
