/**
 * 评论表
 */
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  post: {
    type: ObjectId,
    ref: 'Post'
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  replies: [{
    type: ObjectId,
    ref: 'Comment'
  }]
})

module.exports = mongoose.model('Comment', CommentSchema)
