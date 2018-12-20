const tagSql = require('../db/sql/tag.sql')
const postSql = require('../db/sql/article.sql')
module.exports = {
  setTags (req, res, next) {
    tagSql.getEnable()
      .then(docs => {
        res.locals.tags = docs
        next()
      })
      .catch(() => {
        next()
      })
  },
  getRecommend (req, res, next) {
    postSql.getRecommend()
      .then(docs => {
        res.locals.recommends = docs
        next()
      })
      .catch(() => {
        next()
      })
  }
}
