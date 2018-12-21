// const assert = require('assert')
const postSql = require('../db/sql/post.sql')

// describe('测试 post.sql.js', function () {
//   it('should return -1 when the value is not present', function () {
//     assert.strictEqual(-1, [1, 2, 3].indexOf(4))
//   })
// })
console.log(postSql.getList({ id: undefined, title: 2, createTime: 3 }))
