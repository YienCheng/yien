const Tag = require('../models/tag.model')

module.exports = {
  add ({ name, description, enable }) {
    return new Promise((resolve, reject) => {
      Tag.findOne({ name: name })
        .exec((error, doc) => {
          if (error) return reject(error)
          if (doc) {
            let e = new Error('标签名称已存在')
            e.status = 2006
            return reject(e)
          }
          new Tag({
            name,
            description,
            enable
          })
            .save((error, doc) => {
              if (error) return reject(error)
              resolve(doc)
            })
        })
    })
  },
  getList () {
    return new Promise((resolve, reject) => {
      Tag.find()
        .exec((error, docs) => {
          if (error) return reject(error)
          resolve(docs)
        })
    })
  },
  getEnable () {
    return new Promise((resolve, reject) => {
      Tag.find({ enable: true })
        .exec((error, docs) => {
          if (error) return reject(error)
          resolve(docs)
        })
    })
  }
}
