const commentSql = require('../../db/sql/comment.sql')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

function creatObjectId (id) {
  return new ObjectId(id)
}

module.exports = {
  addComment (req, res, next) {
    let content = req.body.content
    let post = creatObjectId(req.body.post)
    let user = creatObjectId(req.session.userInfo._id)
    if (!content) return next({ status: 4001, message: '评论内容不能为空' })
    commentSql.addComment({
      content,
      post,
      user
    })
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  }
}
