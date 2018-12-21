const router = require('express').Router()
const multer = require('multer')
const path = require('path')

// const debug = require('debug')('yien:apiRouter')

const userController = require('../controller/api/user.controller')
const siteController = require('../controller/api/site.controller')
const tagController = require('../controller/api/tag.controller')
const categoryController = require('../controller/api/category.controller')
const articleController = require('../controller/api/article.contrller')
const commentController = require('../controller/api/comment.controller')
const frinedLinkController = require('../controller/api/frinedLink.controller')
const navController = require('../controller/api/nav.controller')
const postController = require('../controller/api/post.controller')

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
router.post('/regist', userController.regist)
// 用户登入接口
router.post('/login', userController.login)
// 用户登入接口
router.post('/logout', userController.logout)
// 管理员登录
router.post('/manageLogin', userController.manageLogin)

/**
 * 用户接口
 */
router.use('/user', loginAuth)
// 修改改密码
router.post('/user/changeUserPass', userController.changeUserPass)
// 修改头像
router.post('/user/updateUserAvatar', multer({ storage: userAvatarStorage }).single('avatar'), userController.updateUserAvatar)
// 用户更新
router.post('/user/updateUserInfo', userController.updateCurrentUserInfo)
// 新增评论
router.post('/user/addComment', commentController.addComment)

/**
 * 网站后台接口
 */
// 添加登录验证和权限校验
router.use('/manage', loginAuth, managerAuth)

// 获取管理员用户信息
router.get('/manage/getCurrentUserInfo', userController.getCurrentUserInfo)
// 退出管理员账户
router.post('/manage/logout', userController.logout)
// 获取网站设置
router.get('/manage/getSiteSetting', siteController.getSiteSetting)
// 更新网站设置
router.post('/manage/updateSiteSetting', siteController.updateSiteSetting)
// 更新网站图标
router.post('/manage/updateSiteIcon', multer({ storage: siteIconStorage }).single('favicon'), siteController.updateSiteIcon)
// 获取用户列表
router.get('/manage/getUserList', userController.getUserList)
// 添加用户
router.post('/manage/addUser', userController.addUser)
// 获取传入account用户信息getUserInfoAccount
router.get('/manage/getUserInfoByAccount', userController.getUserInfoByAccount)
// 更新用户信息
router.post('/manage/updateUserInfo', userController.updateUserInfo)
// 更新用户头像
router.post('/manage/updateUserAvatar', multer({ storage: userAvatarStorage }).single('avatar'), userController.updateUserAvatar)
// 新增友情链接
router.post('/manage/addFriendLink', frinedLinkController.addFriendLink)
// 获取友情链接列表
router.get('/manage/getFriendLinkList', frinedLinkController.getFriendLinkList)
// 获取友情链接
router.get('/manage/getFriendLink', frinedLinkController.getFriendLinkById)
// 删除友情链接
router.post('/manage/deleteFriendLink', frinedLinkController.deleteFriendLink)
// 更新友情链接
router.post('/manage/updateFriendLink', frinedLinkController.updateFriendLink)
// 新增网站导航
router.post('/manage/addSiteNav', navController.addSiteNav)
// 获取网站导航列表
router.get('/manage/getSiteNavList', navController.getSiteNavList)
// 删除导航
router.post('/manage/deleteSiteNav', navController.deleteSiteNavById)
// 获取导航
router.get('/manage/getSiteNav', navController.getSiteNavById)
// 更新导航
router.post('/manage/updateSiteNav', navController.updateSiteNav)
// 新增标签
router.post('/manage/addTag', tagController.addTag)
// 获取标签列表
router.get('/manage/getTagList', tagController.getTagList)
// 新增分类
router.post('/manage/addCategory', categoryController.addCategory)
// 获取分类列表
router.get('/manage/getCategoryList', categoryController.getCategoryList)

// 新增文章
router.post('/manage/addArticle', articleController.addArticle)
// 获取文章列表
router.get('/manage/getArticleList', articleController.getArticleList)
// 切换文章发布状态
router.post('/manage/switchPublished', articleController.switchPublished)
// 切换文章推荐状态
router.post('/manage/switchRecommend', articleController.switchRecommend)
// 获取文章
router.get('/manage/getArticle', articleController.getArticleById)
// 更新文章
router.post('/manage/updateArticle', articleController.updateArticleById)
// 删除文章
router.post('/manage/deleteArticle', articleController.deleteArticleById)

// 新增文章资源
router.post('/manage/addPost', postController.add)
// 获取文章资源列表
router.get('/manage/getPostList', postController.getList)
// 删除文章资源
router.post('/manage/deletePost', postController.deleteById)
// 获取文章资源
router.get('/manage/getPost', postController.getById)
// 更新文章资源
router.post('/manage/updatePost', postController.updateById)
// 通过title模糊查询
router.get('/manage/getByTitleFuzzy', postController.getByTitleFuzzy)

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
