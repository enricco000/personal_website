const passport = require('passport')

module.exports = function (req, res, next) {
  passport.authenticate('jwt', async function (err, user) {
    if (err || !user) {
      res.status(403).send({
        error: 'You don\'t have access to this resource'
      })
    } else {
      req.user = await user
      next()
    }
  })(req, res, next)
}
