const Post = require('../models/post.model')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
// const debug = require('debug')('yien:postSql')
module.exports = {
  add ({ title, content, keywords, description }) {
    return new Promise((resolve, reject) => {
      new Post({
        title,
        content,
        keywords,
        description
      })
        .save((error, doc) => {
          if (error) return reject(error)
          resolve(doc)
        })
    })
  },
  getList ({ id, title, createTime, pageSize, pageNumber }) {
    return new Promise((resolve, reject) => {
      let query = {}
      let size = parseInt(pageSize) || 10
      let number = parseInt(pageNumber) || 1
      if (id) {
        try {
          query._id = new ObjectId(id)
        } catch (e) {
          return resolve([])
        }
      }
      if (title) query.title = { $regex: new RegExp(title, 'i') }
      if (createTime) query.createTime = { $gte: new Date(parseInt(createTime)).setHours(0, 0, 0), $lt: new Date(parseInt(createTime)).setHours(23, 59, 59) }
      Post.count()
        .exec((error, count) => {
          if (error) return reject(error)
          Post.find(query)
            .limit(size)
            .skip(size * (number - 1))
            .exec((error, docs) => {
              if (error) return reject(error)
              resolve({
                total: count,
                list: docs
              })
            })
        })
    })
  },
  deleteById (id) {
    return new Promise((resolve, reject) => {
      Post.findByIdAndDelete(id)
        .exec((error, status) => {
          if (error) return reject(error)
          resolve(status)
        })
    })
  },
  getById (id) {
    return new Promise((resolve, reject) => {
      try {
        id = new ObjectId(id)
      } catch (e) {
        e.status = 5001
        e.message = '未查询到文章:' + id
        return reject(e)
      }
      Post.findById(id)
        .exec((error, doc) => {
          if (error) return reject(error)
          resolve(doc)
        })
    })
  },
  updateById ({ id, title, content, keywords, description }) {
    return new Promise((resolve, reject) => {
      try {
        id = new ObjectId(id)
      } catch (e) {
        e.status = 5001
        e.message = '未查询到文章:' + id
        return reject(e)
      }
      Post.findByIdAndUpdate(
        id,
        { title, content, keywords, description, lastUpdateTime: new Date() },
        { new: true }
      )
        .exec((error, doc) => {
          if (error) return reject(error)
          resolve(doc)
        })
    })
  },
  getByTitleFuzzy (title) {
    const reg = new RegExp(title, 'i')
    return new Promise((resolve, reject) => {
      Post.find(
        { title: { $regex: reg } },
        { title: 1, _id: 1 }
      )
        .exec((error, docs) => {
          if (error) return reject(error)
          resolve(docs)
        })
    })
  }
}
