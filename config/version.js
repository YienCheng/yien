// 获取环境变量
const config = require('./index.js')
let version = process.env.NODE_ENV === 'development' ? new Date().getTime() : config.version

module.exports = version
