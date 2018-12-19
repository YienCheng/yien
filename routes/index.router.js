const router = require('express').Router()
const moment = require('moment')
const marked = require('marked')

const indexController = require('../controller/index.controller')
const articleController = require('../controller/article.controller')
const updateSiteSettingMiddleware = require('../middleware/updateSiteSetting.middleware')
const settingSiteNavMiddleware = require('../middleware/settingSiteNav.middleware')
const settingFriendLinkMiddleware = require('../middleware/settingFriendLink.middleware')

router.use(updateSiteSettingMiddleware, settingSiteNavMiddleware, settingFriendLinkMiddleware)

// 首页路由
router.get('/',
  indexController.setTags,
  indexController.getRecommend,
  function (req, res) {
    res.render('index', {
      title: '首页'
    })
  }
)

router.get('/regist', function (req, res) {
  res.render('regist', {
    title: '注册'
  })
})

router.get('/login', function (req, res) {
  res.render('login', {
    title: '登录'
  })
})

router.get('/article/:postId',
  articleController.getArticle,
  function (req, res) {
    res.render('article', {
      title: res.locals.post.title,
      author: res.locals.post.author,
      createTime: moment(res.locals.post.createTime).format('YYYY-MM-DD HH:mm:ss'),
      click: res.locals.post.click,
      content: marked(res.locals.post.content),
      category: res.locals.post.category,
      tags: res.locals.post.tags,
      authorLink: res.locals.post.authorLink,
      postId: res.locals.post._id
    })
  })
// // 分类页路由
// router.get('/category', settingSiteNavMiddleware, settingFriendLinkMiddleware, function (req, res) {
//   res.render('category', {
//     title: '分类'
//   })
// })
module.exports = router
