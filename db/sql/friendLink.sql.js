const FriendLink = require('../models/friendLink.model')

module.exports = {
  getFriendLinkList () {
    return new Promise((resolve, reject) => {
      FriendLink.find()
        .sort({ level: 1 })
        .exec((error, docs) => {
          if (error) return reject(error)
          return resolve(docs)
        })
    })
  },
  addFriendLink ({ name, link, description, status, level }) {
    return new Promise((resolve, reject) => {
      FriendLink.findOne({ name })
        .exec((error, doc) => {
          if (error) return reject(error)
          if (doc) {
            let e = new Error('友情链接已存在')
            e.status = 2002
            return reject(e)
          }
          new FriendLink({
            name,
            description,
            link,
            status,
            level
          })
            .save((error, doc) => {
              if (error) return reject(error)
              resolve(doc)
            })
        })
    })
  },
  deleteFriendLinkById (id) {
    return new Promise((resolve, reject) => {
      FriendLink.findByIdAndDelete(id)
        .exec((error, doc) => {
          if (error) return reject(error)
          resolve(doc)
        })
    })
  },
  updateFriendLink ({ _id, name, link, status, description, level }) {
    return new Promise((resolve, reject) => {
      FriendLink.findOneAndUpdate({ _id }, { name, link, description, status, level }, { new: true })
        .exec((error, doc) => {
          if (error) return reject(error)
          resolve(doc)
        })
    })
  },
  getFriendLink (id) {
    return new Promise((resolve, reject) => {
      FriendLink.findById(id)
        .exec((error, doc) => {
          if (error) return reject(error)
          resolve(doc)
        })
    })
  }
}
