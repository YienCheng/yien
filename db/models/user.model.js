/**
 * 用户表
 */
const mongoose = require('mongoose')
const Counter = require('./counter.model')
const rules = require('../../config/rules')
const ObjectId = mongoose.Schema.Types.ObjectId
const UserSchema = new mongoose.Schema({
  // 用户名
  username: {
    type: String,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return rules.username.test(v)
      },
      message: 'username check failed!'
    }
  },
  // 登录账号
  loginAccount: {
    type: Number,
    index: true,
    default: 10000
  },
  // 登录密码
  loginPassword: {
    type: String,
    validate: {
      validator: function (v) {
        return rules.md5.test(v)
      },
      message: 'password check failed!'
    }
  },
  // 用户邮箱
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validator: function (v) {
      return rules.email.test(v)
    }
  },
  // 昵称
  nickname: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    minlength: 1,
    maxlength: 20
  },
  // 创建时间
  createTime: {
    type: Date,
    default: Date.now
  },
  // 上次登陆时间
  lastLoginTime: {
    type: Date,
    default: Date.now
  },
  // 登陆次数
  loginCount: {
    type: Number,
    default: 1
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'manager']
  },
  avatar: {
    type: String,
    default: ''
  },
  posts: [{ type: ObjectId, ref: 'Post' }]
})

UserSchema.statics.findByAccount = function (account, cb) {
  return this.findOne({ loginAccount: account }, cb)
}

UserSchema.pre('save', function (next) {
  let doc = this
  Counter.findOneAndUpdate({ counterName: 'userCouter' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, counter) {
    if (error) { return next(error) }
    if (counter.seq <= 10000) {
      doc.loginAccount = counter.seq + 10000
    } else {
      doc.loginAccount = counter.seq
    }
    next()
  })
})

module.exports = mongoose.model('User', UserSchema)
