const Category = require('../models/category.model')

module.exports = {
  add ({ name, description, enable }) {
    return new Promise((resolve, reject) => {
      Category.findOne({ name: name })
        .exec((error, doc) => {
          if (error) return reject(error)
          if (doc) {
            let e = new Error('分类名称已存在')
            e.status = 2006
            return reject(e)
          }
          new Category({
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
      Category.find()
        .exec((error, docs) => {
          if (error) return reject(error)
          resolve(docs)
        })
    })
  }
}
