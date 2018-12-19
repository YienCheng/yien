/**
 * 网站导航表
 */
const mongoose = require('mongoose')

const SiteNavSchema = new mongoose.Schema({
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
  target: {
    type: String,
    enum: ['_blank', '_self'],
    default: '_self'
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

module.exports = mongoose.model('SiteNav', SiteNavSchema)
