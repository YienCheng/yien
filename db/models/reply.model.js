/**
 * 回复表
 */
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const ReplySchema = new mongoose.Schema({
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
  comment: {
    type: ObjectId,
    ref: 'Comment'
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  to: {
    type: ObjectId,
    ref: 'Reply'
  },
  from: {
    type: ObjectId,
    ref: 'Reply'
  }
})

module.exports = mongoose.model('Reply', ReplySchema)
