const categorySql = require('../../db/sql/category.sql')

module.exports = {
  addCategory (req, res, next) {
    let name = req.body.name
    let enable = parseInt(req.body.enable) !== 0
    let description = req.body.description
    if (!name) return next({ status: 2007, message: '分类名称不能为空' })
    categorySql.add({ name, description, enable })
      .then(doc => {
        res.locals.result = doc
        next()
      })
      .catch(error => {
        next(error)
      })
  },
  getCategoryList (req, res, next) {
    categorySql.getList()
      .then(docs => {
        res.locals.result = docs
        next()
      })
      .catch(error => {
        next(error)
      })
  }
}
