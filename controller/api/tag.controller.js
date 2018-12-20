const tagSql = require('../../db/sql/tag.sql')

module.exports = {
  addTag (req, res, next) {
    let name = req.body.name
    let enable = parseInt(req.body.enable) !== 0
    let description = req.body.description
    if (!name) return next({ status: 2007, message: '标签名称不能为空' })
    tagSql.add({ name, description, enable })
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  getTagList (req, res, next) {
    tagSql.getList()
      .then(docs => {
        res.locals.result = docs
        next()
      })
      .catch(error => {
        next(error)
      })
  }
}
