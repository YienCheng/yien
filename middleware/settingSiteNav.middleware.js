/*
* 设置网站导航
*/
const siteNavSql = require('../db/sql/siteNav.sql')
// const debug = require('debug')(`yien:siteNavMiddleware`)
module.exports = function (req, res, next) {
  siteNavSql.getSiteNavList()
    .then(docs => {
      res.locals.navList = docs
      next()
    })
    .catch(error => {
      next(error)
    })
}
