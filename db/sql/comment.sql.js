const Comment = require('../models/comment.model')

module.exports = {
  addComment ({ content, post, user }) {
    return new Promise((resolve, reject) => {
      new Comment({
        content,
        post,
        user
      })
        .save((error, doc) => {
          if (error) return reject(error)
          resolve(doc)
        })
    })
  }
}
