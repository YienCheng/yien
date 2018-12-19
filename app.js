const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
// const _ = require('lodash')
const MongoStore = require('connect-mongo')(session)
const favicon = require('express-favicon')

const connection = require('./db').connection
const config = require('./config')
const debug = require('debug')(`yien:express`)
const sessionConfig = config.session
const version = require('./config/version')

const updateUserInfoMiddleware = require('./middleware/updateUserInfo.middleware')

const indexRouter = require('./routes/index.router')
const userRouter = require('./routes/user.router')
const apiRouter = require('./routes/api.router')

debug(`当前版本：${version}`)
debug('初始化"express"应用中...')
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// 设置网站图标
app.use(favicon(path.join(__dirname, 'favicon.ico')))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  store: new MongoStore({
    mongooseConnection: connection
  }),
  rolling: true,
  resave: false,
  saveUninitialized: true,
  secret: sessionConfig.salt,
  name: sessionConfig.name,
  cookie: {
    maxAge: sessionConfig.expires
  }
}))

// 每次路由都去数据库获取当前用户的最新信息
app.use(updateUserInfoMiddleware)

app.use('/api', apiRouter)
app.use('/', indexRouter)
app.use('/user', userRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  let error = req.app.get('env') === 'development' ? err.stack : {}
  let status = err.status || 500
  let message = err.message || '资源请求失败'
  res.locals.status = status
  res.locals.message = message
  res.locals.error = err
  // 如果是接口请求
  if (req.xhr) {
    return res.json({
      code: status,
      message: message,
      result: error
    })
  }
  // render the error page
  res.status(status)
  // res.send(err)
  res.render('error')
})
debug('"express"应用初始化成功！')
module.exports = app
