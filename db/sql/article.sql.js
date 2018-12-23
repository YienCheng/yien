const Article = require('../models/article.model')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

module.exports = {
  add (fields) {
    return new Promise((resolve, reject) => {
      new Article(fields)
        .save((error, doc) => {
          if (error) return reject(error)
          resolve(doc)
        })
    })
  },
  getList ({ id, title, createTime, pageSize, pageNumber, mold }) {
    return new Promise((resolve, reject) => {
      let query = { mold }
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
      Article.count()
        .exec((error, count) => {
          if (error) return reject(error)
          Article.find(query)
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
  getPublishedById (_id) {
    return new Promise((resolve, reject) => {
      Article.findOneAndUpdate({ _id, published: true }, { $inc: { click: 1 } }, { new: true })
        .populate({
          path: 'category',
          select: {
            _id: 1,
            name: 1
          },
          match: {
            enable: true
          }
        })
        .populate({
          path: 'tags',
          select: {
            _id: 1,
            name: 1
          },
          match: {
            enable: true
          }
        })
        .exec((error, doc) => {
          if (error) return reject(error)
          resolve(doc)
        })
    })
  },
  switchPublished ({ _id, published }) {
    return new Promise((resolve, reject) => {
      Article.findByIdAndUpdate(_id, {
        published
      }, { new: true })
        .exec((error, doc) => {
          if (error) return reject(error)
          resolve(doc)
        })
    })
  },
  switchRecommend ({ _id, recommend }) {
    return new Promise((resolve, reject) => {
      Article.findByIdAndUpdate(_id, {
        recommend
      }, { new: true })
        .exec((error, doc) => {
          if (error) return reject(error)
          resolve(doc)
        })
    })
  },
  getById (_id) {
    return new Promise((resolve, reject) => {
      Article.findById(_id)
        .exec((error, doc) => {
          if (error) return reject(error)
          resolve(doc)
        })
    })
  },
  updateById (id, fields) {
    return new Promise((resolve, reject) => {
      Article.findByIdAndUpdate(
        id,
        { ...fields, lastUpdateTime: new Date() },
        { new: true }
      )
        .exec((error, doc) => {
          if (error) return reject(error)
          resolve(doc)
        })
    })
  },
  deleteById (id) {
    return new Promise((resolve, reject) => {
      Article.findByIdAndDelete(id)
        .exec((error, status) => {
          if (error) return reject(error)
          resolve(status)
        })
    })
  },
  getRecommend () {
    return new Promise((resolve, reject) => {
      Article.find({
        recommend: true,
        published: true
      }, {
        _id: 1,
        title: 1,
        abstract: 1,
        banner: 1
      })
        .exec((error, docs) => {
          if (error) return reject(error)
          resolve(docs)
        })
    })
  }
}
