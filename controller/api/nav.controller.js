const siteNavSql = require('../../db/sql/siteNav.sql')

module.exports = {
  addSiteNav (req, res, next) {
    let description = req.body.description
    let link = req.body.link
    let name = req.body.name
    let target = req.body.target
    let status = parseInt(req.body.status) !== 0
    let level = parseInt(req.body.level)
    siteNavSql.addSiteNav({ name, link, description, status, level, target })
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  getSiteNavList (req, res, next) {
    siteNavSql.getSiteNavList()
      .then(docs => {
        res.locals.result = docs
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  deleteSiteNavById (req, res, next) {
    let _id = req.body._id
    siteNavSql.deleteSiteNavById(_id)
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  getSiteNavById (req, res, next) {
    let _id = req.query._id
    siteNavSql.getSiteNavById(_id)
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  updateSiteNav (req, res, next) {
    let _id = req.body._id
    let name = req.body.name
    let description = req.body.description
    let link = req.body.link
    let status = req.body.status === 'true' || parseInt(req.body.status) === 1
    let level = parseInt(req.body.level)
    let target = req.body.target
    siteNavSql.updateSiteNav({ _id, name, link, status, description, level, target })
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  }
}
