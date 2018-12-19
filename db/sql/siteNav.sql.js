const SiteNav = require('../models/siteNav.model')

module.exports = {
  addSiteNav ({ name, link, description, status, level, target }) {
    return new Promise((resolve, reject) => {
      SiteNav.find({ name })
        .exec((error, docs) => {
          if (error) return reject(error)
          if (docs.length) {
            let e = new Error('导航名称已存在')
            e.status = 2002
            return reject(e)
          }
          new SiteNav({
            name,
            description,
            link,
            status,
            target,
            level
          })
            .save((error, doc) => {
              if (error) return reject(error)
              return resolve(doc)
            })
        })
    })
  },
  getSiteNavList () {
    return new Promise((resolve, reject) => {
      SiteNav.find()
        .sort({ level: 1 })
        .exec((error, docs) => {
          if (error) return reject(error)
          return resolve(docs)
        })
    })
  },
  deleteSiteNavById (id) {
    return new Promise((resolve, reject) => {
      SiteNav.findByIdAndDelete(id)
        .exec((error, doc) => {
          if (error) return reject(error)
          resolve(doc)
        })
    })
  },
  getSiteNavById (id) {
    return new Promise((resolve, reject) => {
      SiteNav.findById(id)
        .exec((error, doc) => {
          if (error) return reject(error)
          resolve(doc)
        })
    })
  },
  updateSiteNav ({ _id, name, link, status, description, level, target }) {
    return new Promise((resolve, reject) => {
      SiteNav.findOneAndUpdate({ _id }, { name, link, description, status, level, target }, { new: true })
        .exec((error, doc) => {
          if (error) return reject(error)
          resolve(doc)
        })
    })
  }
}
