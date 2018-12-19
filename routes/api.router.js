const router = require('express').Router()
const multer = require('multer')
const path = require('path')

const apiController = require('../controller/api.controller')
// const debug = require('debug')('yien:apiRouter')

// const userController = require('../controller/user.controller')
// const siteController = require('../controller/site.controller')
// const tagController = require('../controller/tag.controller')
// const categoryController = require('../controller/category.controller')
// const postController = require('../controller/post.controller')
const loginAuth = require('../middleware/loginAuth.middleware')
const managerAuth = require('../middleware/managerAuth.middleware')

// 网站图标存储位置
const siteIconStorage = multer.diskStorage({
  destination: path.join(__dirname, '../'),
  filename: function (req, file, cb) {
    cb(null, 'favicon.ico')
  }
})

// 用户头像存储位置
const userAvatarStorage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads/usersAvatar'),
  filename: function (req, file, cb) {
    let extname = path.extname(file.originalname)
    let loginAccount = req.body.loginAccount
    cb(null, loginAccount + '_avatar' + extname)
  }
})

/**
 * 开放接口
 */
// 用户注册接口
router.post('/regist', apiController.regist)
// 用户登入接口
router.post('/login', apiController.login)
// 用户登入接口
router.post('/logout', apiController.logout)

/**
 * 用户接口
 */
router.use('/user', loginAuth)
// 修改改密码
router.post('/user/changeUserPass', apiController.changeUserPass)
// 修改头像
router.post('/user/updateUserAvatar', multer({ storage: userAvatarStorage }).single('avatar'), apiController.updateUserAvatar)
// 用户更新
router.post('/user/updateUserInfo', apiController.updateCurrentUserInfo)
// 新增评论
router.post('/user/addComment', apiController.addComment)

/**
 * 网站后台接口
 */
// 添加登录验证和权限校验
router.use('/manage', loginAuth, managerAuth)
// 获取管理员用户信息
router.get('/manage/getCurrentUserInfo', apiController.getCurrentUserInfo)
// 退出管理员账户
router.post('/manage/logout', apiController.logout)
// 获取网站设置
router.get('/manage/getSiteSetting', apiController.getSiteSetting)
// 更新网站设置
router.post('/manage/updateSiteSetting', apiController.updateSiteSetting)
// 更新网站图标
router.post('/manage/updateSiteIcon', multer({ storage: siteIconStorage }).single('favicon'), apiController.updateSiteIcon)
// 获取用户列表
router.get('/manage/getUserList', apiController.getUserList)
// 添加用户
router.post('/manage/addUser', apiController.addUser)
// 获取传入account用户信息getUserInfoAccount
router.get('/manage/getUserInfoByAccount', apiController.getUserInfoByAccount)
// 更新用户信息
router.post('/manage/updateUserInfo', apiController.updateUserInfo)
// 更新用户头像
router.post('/manage/updateUserAvatar', multer({ storage: userAvatarStorage }).single('avatar'), apiController.updateUserAvatar)
// 新增友情链接
router.post('/manage/addFriendLink', apiController.addFriendLink)
// 获取友情链接列表
router.get('/manage/getFriendLinkList', apiController.getFriendLinkList)
// 获取友情链接
router.get('/manage/getFriendLink', apiController.getFriendLinkById)
// 删除友情链接
router.post('/manage/deleteFriendLink', apiController.deleteFriendLink)
// 更新友情链接
router.post('/manage/updateFriendLink', apiController.updateFriendLink)
// 新增网站导航
router.post('/manage/addSiteNav', apiController.addSiteNav)
// 获取网站导航列表
router.get('/manage/getSiteNavList', apiController.getSiteNavList)
// 删除导航
router.post('/manage/deleteSiteNav', apiController.deleteSiteNavById)
// 获取导航
router.get('/manage/getSiteNav', apiController.getSiteNavById)
// 更新导航
router.post('/manage/updateSiteNav', apiController.updateSiteNav)
// 新增标签
router.post('/manage/addTag', apiController.addTag)
// 获取标签列表
router.get('/manage/getTagList', apiController.getTagList)
// 新增分类
router.post('/manage/addCategory', apiController.addCategory)
// 获取分类列表
router.get('/manage/getCategoryList', apiController.getCategoryList)

// 新增文章
router.post('/manage/addArticle', apiController.addArticle)
// 获取文章列表
router.get('/manage/getArticleList', apiController.getArticleList)
// 切换文章发布状态
router.post('/manage/switchPublished', apiController.switchPublished)
// 切换文章推荐状态
router.post('/manage/switchRecommend', apiController.switchRecommend)
// 获取文章
router.get('/manage/getArticle', apiController.getArticleById)
// 更新文章
router.post('/manage/updateArticle', apiController.updateArticleById)
// 删除文章
router.post('/manage/deleteArticle', apiController.deleteArticleById)

router.use((req, res, next) => {
  if (res.locals.result) {
    return res.json({
      code: 0,
      messsage: '',
      result: res.locals.result
    })
  }
  return next()
})
module.exports = router
