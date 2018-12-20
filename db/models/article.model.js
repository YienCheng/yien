/**
 * 文章表
 */
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const PostSchema = new mongoose.Schema({
  // 标题
  title: {
    type: String,
    required: true,
    trim: true
  },
  // 摘要
  abstract: {
    type: String,
    required: true,
    trim: true
  },
  // 内容
  content: {
    type: String,
    default: ''
  },
  // 作者
  author: {
    type: String,
    required: true,
    trim: true
  },
  // 作者链接
  authorLink: {
    type: String,
    trim: true,
    default: '/about'
  },
  // 提交者
  poster: {
    type: ObjectId,
    ref: 'User'
  },
  // 创建时间
  createTime: {
    type: Date,
    default: Date.now
  },
  // 分类
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  // 标签
  tags: [{
    type: ObjectId,
    ref: 'Tag'
  }],
  // 点击量
  click: {
    type: Number,
    default: 0
  },
  // 最后修改时间
  lastUpdateTime: {
    type: Date,
    default: Date.now
  },
  // 原创 转载
  type: {
    type: String,
    enum: ['original', 'reprint'],
    default: 'original'
  },
  // 是否发布
  published: {
    type: Boolean,
    default: false
  },
  // 是否推荐
  recommend: {
    type: Boolean,
    default: false
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
  },
  // 图片
  banner: {
    type: String,
    trim: true
  },
  // 评论
  comments: [{
    type: ObjectId,
    ref: 'Comment'
  }]
})

module.exports = mongoose.model('Artile', PostSchema)
