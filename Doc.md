# 相关文档
## 数据库设计
---
### 用户表（user.model.js）

- 用户名(username) - 必填项、不可重复、验证请看配置文件“rules.js”
- 账号(loginAccount) - 系统自动生成、默认值10000、预留备用
- 登录密码(loginPassword) - 必填项、验证请看配置文件“rules.js”
- 邮箱(email) - 必填项、验证请看配置文件“rules.js”
- 昵称(nickname) - 必填项、不可重复、最少一个字符，最大20个字符
- 创建时间(createTime) - 系统自动生成、默认值为创建时间
- 最后登录时间(lastLoginTime) - 每次登录时更新
- 登录次数(loginCount) - 每次登录时更新
- 用户角色(role) - 必填项、默认为普通用户
- 头像地址(avatar) - 必填项
- 文章关联(posts) - 关联用户文章

---
### 自增计数表（counter.model.js）
- 自增名称(counterName) - 必填项、不可重复
- 计数值(seq) - 默认为0
- 创建时间(createTime) -  文档创建时间
---
## 接口API