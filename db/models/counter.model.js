/**
 * 自增计数表
 */
const mongoose = require('mongoose')
const CounterSchema = new mongoose.Schema({
  // 需要计数的名字
  counterName: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true
  },
  // 计数的初始值
  seq: {
    type: Number,
    default: 0
  },
  createTime: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Counter', CounterSchema)
