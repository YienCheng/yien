const postSql = require('../../db/sql/post.sql')
// const debug = require()
module.exports = {
  add (req, res, next) {
    let title = req.body.title
    let content = req.body.content
    let keywords = req.body.keywords
    let description = req.body.description
    if (!title) return next({ status: 3001, message: '标题不能为空' })
    if (!keywords) return next({ status: 3005, message: '关键字不能为空' })
    if (!description) return next({ status: 3006, message: '描述不能为空' })
    postSql.add({
      title,
      content,
      keywords,
      description
    })
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  getList (req, res, next) {
    postSql.getList({
      id: req.query.id,
      title: req.query.title,
      createTime: req.query.createTime,
      pageSize: req.query.pageSize,
      pageNumber: req.query.pageNumber
    })
      .then(docs => {
        res.locals.result = docs
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  deleteById (req, res, next) {
    postSql.deleteById(req.body.id)
      .then(status => {
        res.locals.result = status
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  getById (req, res, next) {
    postSql.getById(req.query.id)
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  updateById (req, res, next) {
    let title = req.body.title
    let content = req.body.content
    let keywords = req.body.keywords
    let description = req.body.description
    let id = req.body.id

    if (!id) return next({ status: 5005, message: 'id不能为空' })
    if (!title) return next({ status: 5002, message: '标题不能为空' })
    if (!keywords) return next({ status: 5003, message: '关键字不能为空' })
    if (!description) return next({ status: 5004, message: '描述不能为空' })

    postSql.updateById({ id, title, content, keywords, description })
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  getByTitleFuzzy (req, res, next) {
    postSql.getByTitleFuzzy(req.query.title)
      .then(docs => {
        res.locals.result = docs
        next()
      })
      .catch(error => {
        next(error)
      })
  }
}
