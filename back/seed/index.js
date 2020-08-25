const {
  sequelize,
  User,
  Entry,
  Bookmark
} = require('../src/models')

const users = require('./users.json')
const entries = require('./entries.json')
const bookmarks = require('./bookmarks.json')

/* the nature of promises makes the creation of users
to occur later than the creation of bookmarks. To overcome this
we require a sleep function that guarantees that boookmarks are created
at the end */
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

sequelize.sync({ force: true })
  .then(
    async function () {
      await Promise.all(
        users.map(user => {
          User.create(user)
        })
      )
  })
  .then (async function () {
    await Promise.all(
      entries.map(entry => {
        Entry.create(entry)
      })
    )
  })
  // why 1.25 s? Try and error, friend
  sleep(1250)
  .then (async function () {
    await Promise.all(
      bookmarks.map(bookmark => {
        Bookmark.create(bookmark)
      })
    )
  })
