const Joi = require('joi')

module.exports = {
  post (req, res, next) {
    const schema = {
      title: Joi.string().required(),
      subTitle: Joi.string().allow('').allow(null),
      summary: Joi.string().required(),
      author: Joi.string().required(),
      content: Joi.string().required(),
      topics: Joi.string().required()
    }
    const { error } = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'title':
          res.status(400).send({
            error: 'Entry requires a title'
          })
          break
        case 'summary':
          res.status(400).send({
            error: 'Entry requires a summary'
          })
          break
        case 'author':
          res.status(400).send({
            error: 'Entry requires a valid author and you\'re not logged in. How are you even here?'
          })
          break
        case 'content':
          res.status(400).send({
            error: 'Entry must have content'
          })
          break
        case 'topics':
          res.status(400).send({
            error: 'Entry requires topics to make it findable'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid entry creation'
          })
      }
    } else {
      next()
    }
  }
}
