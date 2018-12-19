/**
 * 标签表
 */
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  enable: {
    type: Boolean,
    default: true
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  posts: [{
    type: ObjectId,
    ref: 'Post'
  }]
})

module.exports = mongoose.model('Tag', TagSchema)
