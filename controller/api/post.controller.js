const postSql = require('../../db/sql/post.sql')
const moment = require('moment')
// const debug = require()
module.exports = {
  add (req, res, next) {
    let title = req.body.title
    let content = req.body.content
    let createTime = moment(req.body.createTime || new Date()).toDate()
    let keywords = req.body.keywords
    let description = req.body.description
    if (!title) return next({ status: 3001, message: '标题不能为空' })
    if (!keywords) return next({ status: 3005, message: '关键字不能为空' })
    if (!description) return next({ status: 3006, message: '描述不能为空' })
    postSql.add({
      title,
      content,
      createTime,
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
    let id = req.body.id
    let title = req.body.title
    let createTime = moment(req.body.createTime || new Date()).toDate()
    console.log(id, title, createTime)
    next()
    // postSql.getList({
    //   id,
    //   title,
    //   createTime
    // })
    //   .then(doc => {
    //     res.locals.result = doc
    //     next()
    //   })
    //   .catch(error => {
    //     next(error)
    //   })
  }
}
