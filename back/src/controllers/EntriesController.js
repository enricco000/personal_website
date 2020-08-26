const { Entry } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  async index (req, res) {
    try {
      let entries = null
      const search = req.query.search
      const page = req.query.page
      if (search) {
        entries = await Entry.findAll({
          offset: (page - 1) * 10,
          limit: 10,
          where: {
            [Op.or]: [
              'title', 'author', 'content', 'summary'
            ].map(key => ({
              [key]: {
                [Op.like]: `%${search}%`
              }
            }))
          },
          order: [
            ['id', 'DESC'],
            ['title', 'ASC']
          ]
        })
      } else {
        entries = await Entry.findAll({
          offset: (page - 1) * 10,
          limit: 10,
          order: [
            ['id', 'DESC'],
            ['title', 'ASC']
          ]
        })
      }
      res.send(entries)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while fetching entries'
      })
    }
  },
  async count (req, res) {
    try {
      let numEntries = null
      const search = req.query.search
      if (search) {
        numEntries = await Entry.count({
          where: {
            [Op.or]: [
              'title', 'author', 'content', 'summary'
            ].map(key => ({
              [key]: {
                [Op.like]: `%${search}%`
              }
            }))
          }
        })
      } else {
        numEntries = await Entry.count({
        })
      }
      res.send({ numEntries: numEntries })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while counting entries'
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
        error: 'An error has occured while creating entry'
      })
    }
  },
  async show (req, res) {
    try {
      const post = await Entry.findByPk(req.params.postId) // find by primary key
      res.send(post)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while fetching entry'
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
        error: 'An error occured while updating entry'
      })
    }
  }
}
