const siteSettingSql = require('../db/sql/siteSetting.sql')
const config = require('../config')
const debug = require('debug')('yien:updateSiteSettingMiddleware')
const version = require('../config/version')

module.exports = (req, res, next) => {
  debug('中间件:updateSiteSettingMiddleware')
  siteSettingSql.getSiteSetting()
    .then(doc => {
      res.locals.webGlobal = doc || config.web
      res.locals.webGlobal.version = version
      next()
    })
    .catch(error => {
      next(error)
    })
}
