const userSql = require('../db/sql/user.sql')
const tagSql = require('../db/sql/tag.sql')
const siteSettingSql = require('../db/sql/siteSetting.sql')
const friendLinkSql = require('../db/sql/friendLink.sql')
const siteNavSql = require('../db/sql/siteNav.sql')
const categorySql = require('../db/sql/category.sql')
const postSql = require('../db/sql/post.sql')
const commentSql = require('../db/sql/comment.sql')
const moment = require('moment')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const _ = require('lodash')

const rules = require('../config/rules')

function creatObjectId (id) {
  return new ObjectId(id)
}

module.exports = {
  // 用户相关
  regist (req, res, next) {
    let username = req.body.username
    let loginPassword = req.body.loginPassword
    let loginRePassword = req.body.loginRePassword
    let email = req.body.email
    let nickname = req.body.nickname
    if (!username || !rules.username.test(username)) return next({ status: 1001, message: '用户名验证失败' })
    if (!loginPassword || !rules.loginPassword.test(loginPassword)) return next({ status: 1002, message: '密码验证失败' })
    if (loginPassword !== loginRePassword) return next({ status: 1009, message: '两次密码不一致' })
    if (!email || !rules.email.test(email)) return next({ status: 1003, message: '邮箱验证失败' })
    userSql.addUser({
      username,
      loginPassword,
      email,
      nickname
    })
      .then(doc => {
        req.session.userInfo = doc
        res.locals.result = doc
        next()
      }, error => {
        next(error)
      })
  },
  login (req, res, next) {
    let username = req.body.username
    let loginPassword = req.body.loginPassword
    if (!rules.username.test(username)) {
      return res.json({
        code: 1005,
        message: '用户名不存在',
        result: {}
      })
    }
    if (!rules.loginPassword.test(loginPassword)) {
      return res.json({
        code: 1006,
        message: '密码错误',
        result: {}
      })
    }
    userSql.authUserInfo({
      username,
      loginPassword
    })
      .then(doc => {
        req.session.userInfo = doc
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  logout (req, res, next) {
    req.session.userInfo = {}
    res.locals.result = {}
    next()
  },
  getCurrentUserInfo (req, res, next) {
    let id = req.session.userInfo._id
    userSql.getUserInfoById(id)
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  getUserList (req, res, next) {
    userSql.getUserList()
      .then(docs => {
        res.locals.result = docs
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  addUser (req, res, next) {
    let username = req.body.username
    let loginPassword = req.body.loginPassword
    let loginRePassword = req.body.loginRePassword
    let email = req.body.email
    let nickname = req.body.nickname
    let role = req.body.role
    if (!username || !rules.username.test(username)) return next({ status: 1001, message: '用户名验证失败' })
    if (!loginPassword || !rules.loginPassword.test(loginPassword)) return next({ status: 1002, message: '密码验证失败' })
    if (loginPassword !== loginRePassword) return next({ status: 1009, message: '两次密码不一致' })
    if (!email || !rules.email.test(email)) return next({ status: 1003, message: '邮箱验证失败' })
    userSql.addUser({
      username,
      loginPassword,
      email,
      nickname,
      role
    })
      .then(doc => {
        res.locals.result = doc
        next()
      }, error => {
        next(error)
      })
  },
  getUserInfoByAccount (req, res, next) {
    let loginAccount = req.query.loginAccount
    userSql.getUserInfoByAccount(loginAccount)
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch((error) => {
        next(error)
      })
  },
  updateUserInfo (req, res, next) {
    let username = req.body.username
    // let nickname = req.body.nickname
    let email = req.body.email
    if (!username || !rules.username.test(username)) return next({ status: 1001, message: '用户名验证失败' })
    if (!email || !rules.email.test(email)) return next({ status: 1003, message: '邮箱验证失败' })
    userSql.updateUserInfo(req.body)
      .then(status => {
        res.locals.result = status
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  updateCurrentUserInfo (req, res, next) {
    let username = req.body.username
    let nickname = req.body.nickname
    let email = req.body.email
    let loginAccount = req.session.userInfo.loginAccount
    if (!username || !rules.username.test(username)) return next({ status: 1001, message: '用户名验证失败' })
    if (!email || !rules.email.test(email)) return next({ status: 1003, message: '邮箱验证失败' })
    userSql.updateUserInfo({
      username,
      nickname,
      loginAccount
    })
      .then(status => {
        res.locals.result = status
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  updateUserAvatar (req, res, next) {
    let loginAccount = req.body.loginAccount || req.session.userInfo.loginAccount
    let avatar = '/uploads/usersAvatar/' + req.file.filename + '?v=' + new Date().getTime()
    userSql.updateAvatar({
      loginAccount,
      avatar
    })
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  changeUserPass (req, res, next) {
    let loginAccount = req.session.userInfo.loginAccount
    let loginPassword = req.body.loginPassword
    let newPassword = req.body.newPassword
    let loginRePassword = req.body.loginRePassword
    if (!rules.loginPassword.test(loginPassword)) return next({ status: 1008, message: '原密码错误' })
    if (!rules.loginPassword.test(newPassword)) return next({ status: 1002, message: '新密码格式错误' })
    if (newPassword !== loginRePassword) return next({ status: 1009, message: '两次密码不一致' })
    if (newPassword === loginPassword) {
      req.session.userInfo = {}
      res.locals.result = {}
      return next()
    }
    userSql.updateLoginPass({
      loginAccount,
      loginPassword,
      newPassword
    })
      .then(status => {
        req.session.userInfo = {}
        res.locals.result = status
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  // 标签相关
  addTag (req, res, next) {
    let name = req.body.name
    let enable = parseInt(req.body.enable) !== 0
    let description = req.body.description
    if (!name) return next({ status: 2007, message: '标签名称不能为空' })
    tagSql.add({ name, description, enable })
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  getTagList (req, res, next) {
    tagSql.getList()
      .then(docs => {
        res.locals.result = docs
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  // 网站设置相关
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
  },
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
  },
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
  },
  // 文章相关
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
    postSql.add({
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
    postSql.getList({
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
    postSql.switchPublished({ _id, published })
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
    postSql.switchRecommend({ _id, recommend })
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
    postSql.getById(id)
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
    postSql.updateById({
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
    postSql.deleteById(id)
      .then(status => {
        res.locals.result = status
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  // 分类相关
  addCategory (req, res, next) {
    let name = req.body.name
    let enable = parseInt(req.body.enable) !== 0
    let description = req.body.description
    if (!name) return next({ status: 2007, message: '分类名称不能为空' })
    categorySql.add({ name, description, enable })
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  getCategoryList (req, res, next) {
    categorySql.getList()
      .then(docs => {
        res.locals.result = docs
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  // 评论相关
  addComment (req, res, next) {
    let content = req.body.content
    let post = creatObjectId(req.body.post)
    let user = creatObjectId(req.session.userInfo._id)
    if (!content) return next({ status: 4001, message: '评论内容不能为空' })
    commentSql.addComment({
      content,
      post,
      user
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
