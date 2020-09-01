const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const EntriesController = require('./controllers/EntriesController')
const EntriesControllerPolicy = require('./policies/EntriesControllerPolicy')
const BookmarksController = require('./controllers/BookmarksController')
const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.put('/verify',
    AuthenticationController.verify)

  app.post('/login',
    AuthenticationController.login)

  app.get('/entries',
    EntriesController.index)

  app.get('/entries/topic',
    EntriesController.topicIndex)

  app.get('/entries/count',
    EntriesController.count)

  app.get('/entries/count/topic',
    EntriesController.topicCount)

  app.post('/entries',
    isAuthenticated,
    EntriesControllerPolicy.post,
    EntriesController.post)

  app.get('/entries/:entryId',
    EntriesController.show)

  app.put('/entries/:entryId',
    isAuthenticated,
    EntriesController.put)

  app.delete('/entries/delete',
    isAuthenticated,
    EntriesController.delete)

  app.get('/bookmarks',
    isAuthenticated,
    BookmarksController.index)

  app.get('/bookmarks/indexer',
    isAuthenticated,
    BookmarksController.indexer)

  app.post('/bookmarks/create',
    isAuthenticated,
    BookmarksController.post)

  app.delete('/bookmarks/delete',
    isAuthenticated,
    BookmarksController.delete)
}
