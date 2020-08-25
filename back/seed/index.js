const {
  sequelize,
  User,
  Entry,
  Bookmark
} = require('../src/models')

const Promise = require('bluebird')
const users = require('./users.json')
const entries = require('./entries.json')
const bookmarks = require('./bookmarks.json')

sequelize.sync({ force: true })
  .then(
    async function () {
      await Promise.all(
        users.map(user => {
          User.create(user)
        })
      )
  })
  .then(
    async function () {
    await Promise.all(
      entries.map(entry => {
        Entry.create(entry)
      })
    )
  })
  .then(
    async function () {
    await Promise.all(
      bookmarks.map(bookmark => {
        Bookmark.create(bookmark)
      })
    )
  })
  .catch((err) => {
    console.log(err)
  })
