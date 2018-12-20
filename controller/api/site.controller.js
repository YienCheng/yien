const siteSettingSql = require('../../db/sql/siteSetting.sql')

module.exports = {
  getSiteSetting (req, res, next) {
    siteSettingSql.getSiteSetting()
      .then(doc => {
        res.locals.result = doc || {}
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  updateSiteSetting (req, res, next) {
    siteSettingSql.updateSiteSetting(req.body)
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  updateSiteIcon (req, res, next) {
    res.locals.result = {}
    next()
  }
}
