/**
 *
 * 默认配置
 *
 */
module.exports = {
  // server domain name:
  domain: 'localhost',
  // version:
  version: '1.0.0',
  // app prot:
  port: 3000,
  // mongodb config：
  db: {
    // mongodb host or ip address:
    host: 'localhost',
    // mongodb port (default to 27017):
    port: 27017,
    // mongodb database name:
    database: 'yien',
    // mongodb username:
    username: '',
    // mongodb password:
    password: '',
    // mongodb option:
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      connectTimeoutMS: 300000
    }
  },
  session: {
    // session name:
    name: 'session_id',
    // used to generate secure session cookie, can be set to any random string:
    salt: 'yien',
    // signin expires in N millisecond:
    expires: 1000 * 60 * 60 * 24 * 15
  },
  web: {
    name: '程毅恩的个人网站',
    title: '程毅恩的个人网站',
    keywords: '前端,javascript,html,css,个人网站,博客,程毅恩,程毅恩官方网站',
    description: '程毅恩官方网站',
    icon: '/favicon.ico'
  }
}
