const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      username: Joi.string().alphanum().disallow(['root', 'admin']).min(8).max(30),
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }
    const { error } = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'username':
          res.status(400).send({
            error: `
              El nombre de usuario no cumple con las siguientes reglas:
              1. Debe contener 8 - 30 caracteres alfanuméricos,
              2. El nombre de usuario no puede ser 'root' ni 'admin'
            `
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
              La contraseña no cumple con las siguientes reglas:
              1. Debe contener 8 - 32 caracteres alfanuméricos,
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
