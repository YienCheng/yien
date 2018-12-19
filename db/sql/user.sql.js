const User = require('../models/user.model')
const _ = require('lodash')
const md5 = require('md5')
module.exports = {
  addUser (fields) {
    let username = fields.username
    let loginPassword = fields.loginPassword
    let email = fields.email
    let nickname = fields.nickname
    let role = fields.role || 'user'
    return new Promise((resolve, reject) => {
      User.find({ $or: [{ username: username }, { email: email }, { nickname: nickname }] })
        .exec((error, docs) => {
          if (error) return reject(error)
          if (docs.length) {
            let message = ''
            let status = 1004
            _.forEach(docs, model => {
              if (model.username === username) {
                message += '用户名，'
              }
              if (model.email === email) {
                message += '邮箱, '
              }
              if (model.nickname === nickname) {
                message += '昵称, '
              }
            })
            let e = new Error(_.trimEnd(message, ', ') + '已存在')
            e.status = status
            return reject(e)
          }
          new User({
            username: username,
            loginPassword: md5(loginPassword),
            email: email,
            nickname: nickname,
            avatar: `/default_avatar/default_${Math.floor(Math.random() * (20))}.png`,
            role: role
          })
            .save((error, doc) => {
              if (error) return reject(error)
              resolve(doc)
            })
        })
    })
  },
  getUserInfoById (id) {
    return new Promise((resolve, reject) => {
      User.findById(id)
        .exec((error, doc) => {
          if (error) return reject(error)
          return resolve(doc)
        })
    })
  },
  authUserInfo (fields) {
    let username = fields.username
    let loginPassword = fields.loginPassword
    return new Promise((resolve, reject) => {
      User.findOne({ username })
        .exec((error, doc) => {
          if (error) return reject(error)
          let e = new Error()
          if (!doc) {
            e.status = 1005
            e.message = '用户名不存在'
            return reject(e)
          }
          if (doc.loginPassword !== md5(loginPassword)) {
            e.status = 1006
            e.message = '密码错误'
            return reject(e)
          }
          doc.updateOne({ $inc: { loginCount: 1 }, lastLoginTime: new Date() }, { new: true })
            .exec((error, status) => {
              if (error) return reject(error)
              resolve(doc)
            })
        })
    })
  },
  getUserList () {
    return new Promise((resolve, reject) => {
      User.find()
        .exec((error, docs) => {
          if (error) return reject(error)
          resolve(docs)
        })
    })
  },
  getUserInfoByAccount (account) {
    return new Promise((resolve, reject) => {
      User.findByAccount(account, function (error, doc) {
        if (error) return reject(error)
        if (!doc) {
          let e = new Error('账号不存在!')
          e.status = 1007
          return reject(e)
        }
        resolve(doc)
      })
    })
  },
  updateUserInfo (fields) {
    let username = fields.username
    let nickname = fields.nickname
    let email = fields.email
    let loginAccount = parseInt(fields.loginAccount)
    let role = fields.role || 'user'
    let _thisDoc = null
    return new Promise((resolve, reject) => {
      User.find({ $or: [{ username: username }, { email: email }, { nickname: nickname }, { loginAccount: loginAccount }] })
        .exec((error, docs) => {
          if (error) return reject(error)
          if (!docs.length) {
            let e = new Error('账号不存在!')
            e.status = 1007
            return reject(e)
          }
          let message = ''
          let status = 1004
          let result = {}
          _.forEach(docs, model => {
            if (loginAccount === model.loginAccount) {
              _thisDoc = model
              return
            }
            if (model.username === username) {
              message += '用户名，'
              result.username = true
            }
            if (model.email === email) {
              message += '邮箱, '
              result.email = true
            }
            if (model.nickname === nickname) {
              message += '昵称, '
              result.nickname = true
            }
          })
          if (result.username || result.email || result.nickname) {
            let e = new Error(_.trimEnd(message, ', ') + '已存在')
            e.status = status
            return reject(e)
          }
          _thisDoc.updateOne({
            username,
            nickname,
            email,
            role
          })
            .exec((error, status) => {
              if (error) return reject(error)
              resolve(status)
            })
        })
    })
  },
  updateAvatar (fields) {
    let loginAccount = fields.loginAccount
    let avatar = fields.avatar
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate({ loginAccount }, { avatar }, { new: true, upsert: false })
        .exec(function (error, doc) {
          if (error) return reject(error)
          if (!doc) {
            let e = new Error('账号不存在!')
            e.status = 1007
            return reject(e)
          }
          resolve({
            avatar: doc.avatar
          })
        })
    })
  },
  updateLoginPass (fields) {
    let loginAccount = fields.loginAccount
    let loginPassword = fields.loginPassword
    let newPassword = fields.newPassword
    return new Promise((resolve, reject) => {
      User.findOne({ loginAccount })
        .exec((error, doc) => {
          if (error) return reject(error)
          if (!doc) {
            let e = new Error('账号不存在!')
            e.status = 1007
            return reject(e)
          }
          if (md5(loginPassword) !== doc.loginPassword) {
            let e = new Error('原密码错误!')
            e.status = 1008
            return reject(e)
          }
          doc.updateOne({ loginPassword: md5(newPassword) })
            .exec((error, status) => {
              if (error) return reject(error)
              resolve(status)
            })
        })
    })
  }
}
