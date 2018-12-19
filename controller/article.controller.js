const postSql = require('../db/sql/post.sql')
const createError = require('http-errors')
// const debug = require('debug')('articleController')
module.exports = {
  getArticle (req, res, next) {
    postSql.getPublishedById(req.params.postId)
      .then(doc => {
        if (!doc) {
          return next(createError(404))
        }
        res.locals.post = doc
        res.locals.webGlobal.keywords = doc.keywords
        res.locals.webGlobal.description = doc.description
        next()
      })
      .catch(error => {
        next(error)
      })
  }
}
