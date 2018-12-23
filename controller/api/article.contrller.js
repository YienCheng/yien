const articleSql = require('../../db/sql/article.sql')
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
    let category = req.body.category ? creatObjectId(req.body.category) : null
    let tags = _.map(req.body.tags ? req.body.tags.split(',') : [], creatObjectId)
    let type = req.body.type
    let poster = creatObjectId(req.session.userInfo._id)
    let banner = req.body.banner
    let authorLink = req.body.authorLink || '/about'
    let post = req.body.post
    if (!title) return next({ status: 3001, message: '标题不能为空' })
    if (!author) return next({ status: 3002, message: '作者不能为空' })
    if (!abstract) return next({ status: 3003, message: '摘要不能为空' })
    if (!banner) return next({ status: 3007, message: '图片不能为空' })
    if (!post) return next({ status: 3008, message: '关联文章ID不能为空' })
    articleSql.add({
      title,
      abstract,
      author,
      category,
      tags,
      type,
      poster,
      banner,
      authorLink,
      post,
      mold: 'article'
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
    articleSql.getList({
      id: req.query.id,
      title: req.query.title,
      createTime: req.query.createTime,
      pageSize: req.query.pageSize,
      pageNumber: req.query.pageNumber,
      mold: 'article'
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
    let id = req.body.id
    let title = req.body.title
    let abstract = req.body.abstract
    let author = req.body.author
    let category = req.body.category ? creatObjectId(req.body.category) : null
    let tags = _.map(req.body.tags ? req.body.tags.split(',') : [], creatObjectId)
    let type = req.body.type
    let poster = creatObjectId(req.session.userInfo._id)
    let banner = req.body.banner
    let authorLink = req.body.authorLink || '/about'
    let post = req.body.post
    if (!title) return next({ status: 3001, message: '标题不能为空' })
    if (!author) return next({ status: 3002, message: '作者不能为空' })
    if (!abstract) return next({ status: 3003, message: '摘要不能为空' })
    if (!banner) return next({ status: 3007, message: '图片不能为空' })
    if (!post) return next({ status: 3008, message: '关联文章ID不能为空' })
    articleSql.updateById(id, {
      title,
      abstract,
      author,
      category,
      tags,
      type,
      post,
      poster,
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
  },
  addWiki (req, res, next) {
    let title = req.body.title
    let abstract = req.body.abstract
    let author = req.body.author
    let category = req.body.category ? creatObjectId(req.body.category) : null
    let tags = _.map(req.body.tags ? req.body.tags.split(',') : [], creatObjectId)
    let type = req.body.type
    let poster = creatObjectId(req.session.userInfo._id)
    let banner = req.body.banner
    let authorLink = req.body.authorLink || '/about'
    if (!title) return next({ status: 3001, message: '标题不能为空' })
    if (!author) return next({ status: 3002, message: '作者不能为空' })
    if (!abstract) return next({ status: 3003, message: '摘要不能为空' })
    if (!banner) return next({ status: 3007, message: '图片不能为空' })
    articleSql.add({
      title,
      abstract,
      author,
      category,
      tags,
      type,
      poster,
      banner,
      authorLink,
      mold: 'wiki'
    })
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  getWikiList (req, res, next) {
    articleSql.getList({
      id: req.query.id,
      title: req.query.title,
      createTime: req.query.createTime,
      pageSize: req.query.pageSize,
      pageNumber: req.query.pageNumber,
      mold: 'wiki'
    })
      .then(docs => {
        res.locals.result = docs
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  updateWikiById (req, res, next) {
    let id = req.body.id
    let title = req.body.title
    let abstract = req.body.abstract
    let author = req.body.author
    let category = req.body.category ? creatObjectId(req.body.category) : null
    let tags = _.map(req.body.tags ? req.body.tags.split(',') : [], creatObjectId)
    let type = req.body.type
    let poster = creatObjectId(req.session.userInfo._id)
    let banner = req.body.banner
    let authorLink = req.body.authorLink || '/about'
    if (!title) return next({ status: 3001, message: '标题不能为空' })
    if (!author) return next({ status: 3002, message: '作者不能为空' })
    if (!abstract) return next({ status: 3003, message: '摘要不能为空' })
    if (!banner) return next({ status: 3007, message: '图片不能为空' })
    articleSql.updateById(id, {
      title,
      abstract,
      author,
      category,
      tags,
      type,
      poster,
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
  }
}
