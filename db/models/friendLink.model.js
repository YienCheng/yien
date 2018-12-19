/**
 * 友情链接表
 */
const mongoose = require('mongoose')

const FriendLinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('FriendLink', FriendLinkSchema)
