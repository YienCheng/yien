/**
 * 配置文件集成
 */
const _ = require('lodash')
const defaultConfig = require('./env/default.config')

// 获取环境变量
const ENV = process.env.NODE_ENV || ''

// 根据环境变量 NODE_ENV 加载相应的配置文件
let config = ENV ? _.merge(defaultConfig, require('./env/' + ENV + '.config')) : defaultConfig

module.exports = config
