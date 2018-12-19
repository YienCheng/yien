/**
 *
 * 创建mongodb数据库连接
 *
 */
const mongoose = require('mongoose')
const config = require('../config')
const dbConfig = config.db
const debug = require('debug')('yien:mongodb')
const db = mongoose.connection

/**
 * 创建一个标准的 mongodb uri，用来连接mongodb数据库
 */
function normalizeUri (db) {
  let uri = 'mongodb://'
  if (db.username && db.password) {
    uri += `${db.username}:${db.password}@`
  }

  if (db.host) {
    uri += `${db.host}:`
  } else {
    uri += `localhost:`
  }

  if (db.port) {
    uri += `${db.port}`
  } else {
    uri += `27017`
  }

  if (db.database) {
    uri += `/${db.database}`
  }
  return uri
}

// 开始连接数据库
debug('创建数据库连接中...')
mongoose.connect(normalizeUri(dbConfig), dbConfig.options)
db.on('error', function (error) {
  debug('数据库连接失败！: ' + error)
})
db.once('open', function () {
  debug('数据库连接成功！')
})

module.exports = {
  connection: db
}
