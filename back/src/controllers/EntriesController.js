const { Entry } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  async index (req, res) {
    try {
      let entries = null
      const search = req.query.search
      if (search) {
        entries = await Entry.findAll({
          where: {
            [Op.or]: [
              'title', 'author', 'content'
            ].map(key => ({
              [key]: {
                [Op.like]: `%${search}%`
              }
            }))
          }
        })
      } else {
        entries = await Entry.findAll({
          limit: 10
        })
      }
      res.send(entries)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while fetching posts'
      })
    }
  },
  async post (req, res) {
    try {
      const entry = await Entry.create(req.body)
      const entryJSON = entry.toJSON()
      res.send(entryJSON)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while creating post'
      })
    }
  },
  async show (req, res) {
    try {
      const post = await Entry.findByPk(req.params.postId) // find by primary key
      res.send(post)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while fetching post'
      })
    }
  },
  async put (req, res) {
    try {
      const entry = await Entry.update(req.body, {
        where: {
          id: req.params.postId
        }
      })
      res.send(entry)
    } catch (error) {
      res.status(500).send({
        error: 'An error occured while updating post'
      })
    }
  }
}
