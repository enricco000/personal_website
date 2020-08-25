const EntriesController = require('./controllers/EntriesController')

module.exports = (app) => {
  app.post('/register', (req, res) => {
    res.send({
      message: `Email ${req.body.email} registered`
    })
  })

  app.get('/entries',
    EntriesController.index)
}
