const friendLinkSql = require('../../db/sql/friendLink.sql')

module.exports = {
  addFriendLink (req, res, next) {
    let description = req.body.description
    let link = req.body.link
    let name = req.body.name
    let status = parseInt(req.body.status) !== 0
    let level = parseInt(req.body.level)
    friendLinkSql.addFriendLink({ name, link, description, status, level })
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  getFriendLinkList (req, res, next) {
    friendLinkSql.getFriendLinkList()
      .then(docs => {
        res.locals.result = docs
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  deleteFriendLink (req, res, next) {
    let _id = req.body._id
    friendLinkSql.deleteFriendLinkById(_id)
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  updateFriendLink (req, res, next) {
    let _id = req.body._id
    let name = req.body.name
    let description = req.body.description
    let link = req.body.link
    let status = req.body.status === 'true' || parseInt(req.body.status) === 1
    let level = parseInt(req.body.level)
    friendLinkSql.updateFriendLink({ _id, name, link, status, description, level })
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  getFriendLinkById (req, res, next) {
    let _id = req.query._id
    friendLinkSql.getFriendLink(_id)
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  }
}
