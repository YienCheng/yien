/**
 * 文章资源表
 */
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  // 标题
  title: {
    type: String,
    required: true,
    trim: true
  },
  // 内容
  content: {
    type: String,
    default: ''
  },
  // 创建时间
  createTime: {
    type: Date,
    default: Date.now
  },
  // 最后修改时间
  lastUpdateTime: {
    type: Date,
    default: Date.now
  },
  // seo 文章描述
  description: {
    type: String,
    required: true,
    trim: true
  },
  // seo 关键字
  keywords: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = mongoose.model('Post', PostSchema)
