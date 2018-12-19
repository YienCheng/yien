const Post = require('../models/post.model')

module.exports = {
  add ({ authorLink, title, abstract, author, content, createTime, category, tags, published, type, poster, keywords, description, banner }) {
    return new Promise((resolve, reject) => {
      new Post({
        title,
        abstract,
        author,
        content,
        createTime,
        category,
        tags,
        published,
        type,
        poster,
        keywords,
        description,
        banner
      })
        .save((error, doc) => {
          if (error) return reject(error)
          resolve(doc)
        })
    })
  },
  getPublishedById (_id) {
    return new Promise((resolve, reject) => {
      Post.findOneAndUpdate({ _id, published: true }, { $inc: { click: 1 } }, { new: true })
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
  getList ({ pageSize, pageNumber }) {
    let size = parseInt(pageSize) || 10
    let number = parseInt(pageNumber) || 1
    return new Promise((resolve, reject) => {
      Post.count()
        .exec((error, count) => {
          if (error) return reject(error)
          Post.find()
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
  switchPublished ({ _id, published }) {
    return new Promise((resolve, reject) => {
      Post.findByIdAndUpdate(_id, {
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
      Post.findByIdAndUpdate(_id, {
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
      Post.findById(_id)
        .exec((error, doc) => {
          if (error) return reject(error)
          resolve(doc)
        })
    })
  },
  updateById ({ authorLink, id, title, abstract, author, content, createTime, category, tags, published, type, poster, keywords, description, banner }) {
    return new Promise((resolve, reject) => {
      Post.findByIdAndUpdate(
        id,
        { authorLink, title, abstract, author, content, createTime, category, tags, published, type, poster, keywords, description, banner, lastUpdateTime: new Date() },
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
      Post.findByIdAndDelete(id)
        .exec((error, status) => {
          if (error) return reject(error)
          resolve(status)
        })
    })
  },
  getRecommend () {
    return new Promise((resolve, reject) => {
      Post.find({
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
