const Post = require('../models/post.model')

module.exports = {
  add ({ title, content, createTime, keywords, description }) {
    return new Promise((resolve, reject) => {
      new Post({
        title,
        content,
        createTime,
        keywords,
        description
      })
        .save((error, doc) => {
          if (error) return reject(error)
          resolve(doc)
        })
    })
  },
  getList ({ id, title, createTime }) {
        
  }
}
