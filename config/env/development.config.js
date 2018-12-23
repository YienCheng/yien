/**
 *
 * 开发环境配置
 *
 */
module.exports = {
  db: {
    // mongodb host or ip address:
    host: '144.34.165.227',
    // mongodb port (default to 27017):
    port: 27017,
    // mongodb database name:
    database: 'yien',
    // mongodb username:
    username: 'yien',
    // mongodb password:
    password: 'yien',
    // mongodb option:
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      connectTimeoutMS: 300000
    }
  }
}
