const articleSql = require('../../db/sql/article.sql')
const moment = require('moment')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const _ = require('lodash')

function creatObjectId (id) {
  return new ObjectId(id)
}

module.exports = {
  addArticle (req, res, next) {
    let title = req.body.title
    let abstract = req.body.abstract
    let author = req.body.author
    let content = req.body.content
    let createTime = moment(req.body.createTime || new Date()).toDate()
    let category = req.body.category ? creatObjectId(req.body.category) : null
    let tags = _.map(req.body.tags ? req.body.tags.split(',') : [], creatObjectId)
    let published = req.body.published !== 'false'
    let type = req.body.type
    let poster = creatObjectId(req.session.userInfo._id)
    let keywords = req.body.keywords
    let description = req.body.description
    let banner = req.body.banner
    let authorLink = req.body.authorLink || '/about'
    if (!title) return next({ status: 3001, message: '标题不能为空' })
    if (!author) return next({ status: 3002, message: '作者不能为空' })
    if (!abstract) return next({ status: 3003, message: '摘要不能为空' })
    if (!keywords) return next({ status: 3005, message: '关键字不能为空' })
    if (!description) return next({ status: 3006, message: '描述不能为空' })
    if (!banner) return next({ status: 3008, message: '图片不能为空' })
    articleSql.add({
      title,
      abstract,
      author,
      content,
      createTime,
      category,
      tags,
      published,
      type,
      poster,
      keywords,
      description,
      banner,
      authorLink
    })
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  getArticleList (req, res, next) {
    let pageSize = req.query.pageSize || 10
    let pageNumber = req.query.pageNumber || 1
    articleSql.getList({
      pageSize,
      pageNumber
    })
      .then(docs => {
        res.locals.result = docs
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  switchPublished (req, res, next) {
    let _id = req.body.id
    let published = req.body.published
    articleSql.switchPublished({ _id, published })
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  switchRecommend (req, res, next) {
    let _id = req.body.id
    let recommend = req.body.recommend
    articleSql.switchRecommend({ _id, recommend })
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  getArticleById (req, res, next) {
    let id = req.query.id
    articleSql.getById(id)
      .then(doc => {
        res.locals.result = doc || {}
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  updateArticleById (req, res, next) {
    let title = req.body.title
    let abstract = req.body.abstract
    let author = req.body.author
    let content = req.body.content
    let createTime = moment(req.body.createTime || new Date()).toDate()
    let category = req.body.category ? creatObjectId(req.body.category) : null
    let tags = _.map(req.body.tags ? req.body.tags.split(',') : [], creatObjectId)
    let published = req.body.published !== 'false'
    let type = req.body.type
    let poster = creatObjectId(req.session.userInfo._id)
    let keywords = req.body.keywords
    let description = req.body.description
    let banner = req.body.banner
    let id = req.body.id
    let authorLink = req.body.authorLink || '/about'
    if (!title) return next({ status: 3001, message: '标题不能为空' })
    if (!author) return next({ status: 3002, message: '作者不能为空' })
    if (!abstract) return next({ status: 3003, message: '摘要不能为空' })
    if (!keywords) return next({ status: 3005, message: '关键字不能为空' })
    if (!description) return next({ status: 3006, message: '描述不能为空' })
    if (!banner) return next({ status: 3008, message: '图片不能为空' })
    articleSql.updateById({
      id,
      title,
      abstract,
      author,
      content,
      createTime,
      category,
      tags,
      published,
      type,
      poster,
      keywords,
      description,
      banner,
      authorLink
    })
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  deleteArticleById (req, res, next) {
    let id = req.body.id
    articleSql.deleteById(id)
      .then(status => {
        res.locals.result = status
        next()
      })
      .catch(error => {
        next(error)
      })
  }
}
