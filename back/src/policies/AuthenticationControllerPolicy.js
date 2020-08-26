const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = Joi.object({
      username: Joi.string().alphanum().disallow('root', 'admin').min(8).max(30),
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    })
    const { error } = schema.validate(req.body)
    if (error) {
      switch (error.details[0].context.key) {
        case 'username':
          res.status(400).send({
            error: 'Username must be 8 - 30 alphanumeric characters'
          })
          break
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: `
              Password must be 8 - 32 alphanumeric characters
            `
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  }
}
