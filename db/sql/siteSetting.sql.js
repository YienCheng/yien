const SiteSetting = require('../models/siteSetting.model')
const config = require('../../config')
// const debug = require('debug')('yien:siteSetttingSql')

module.exports = {
  getSiteSetting () {
    return new Promise((resolve, reject) => {
      SiteSetting.findOne()
        .exec((error, doc) => {
          if (error) return reject(error)
          return resolve(doc)
        })
    })
  },
  addSiteSetting ({ name, title, description, keywords, icon }) {
    return new Promise((resolve, reject) => {
      new SiteSetting({
        name,
        title,
        description,
        keywords,
        icon: icon || config.web.icon
      })
        .save((error, doc) => {
          if (error) return reject(error)
          return resolve(doc)
        })
    })
  },
  updateSiteSetting ({ name, title, description, keywords, icon }) {
    return new Promise((resolve, reject) => {
      SiteSetting.findOne()
        .exec((error, doc) => {
          if (error) return reject(error)
          if (!doc) {
            new SiteSetting({
              name,
              title,
              description,
              keywords,
              icon: icon || config.web.icon
            })
              .save((error, doc) => {
                if (error) return reject(error)
                return resolve(doc)
              })
          } else {
            doc.updateOne({
              name,
              title,
              description,
              keywords,
              icon: icon || doc.icon
            })
              .exec((error, status) => {
                if (error) return reject(error)
                return resolve(status)
              })
          }
        })
    })
  }
}
