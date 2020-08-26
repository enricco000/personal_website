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

  app.post('/login',
    AuthenticationController.login)

  app.get('/entries',
    EntriesController.index)

  app.get('/entries/count',
    EntriesController.count)

  app.post('/entries',
    isAuthenticated,
    EntriesControllerPolicy.post,
    EntriesController.post)

  app.get('/entries/:postId',
    EntriesController.show)

  app.put('/entries/:postId',
    isAuthenticated,
    EntriesController.put)

  app.get('/bookmarks',
    isAuthenticated,
    BookmarksController.index)

  app.get('/bookmarks/indexer',
    isAuthenticated,
    BookmarksController.indexer)

  app.post('/bookmarks',
    isAuthenticated,
    BookmarksController.post)

  app.delete('/bookmarks/delete',
    isAuthenticated,
    BookmarksController.delete)
}
