/**
 * 网站设置表
 */
const mongoose = require('mongoose')

const siteSettingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  keywords: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true,
    trim: true,
    default: '/favicon.ico'
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  lastUpdateTime: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('siteSetting', siteSettingSchema)
