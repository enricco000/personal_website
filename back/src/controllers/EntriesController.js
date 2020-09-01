const { Entry } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  async index (req, res) {
    try {
      let entries = null
      const search = req.query.search
      const page = req.query.page
      const articlesPerPage = 6
      if (search) {
        entries = await Entry.findAll({
          offset: (page - 1) * articlesPerPage,
          limit: articlesPerPage,
          where: {
            [Op.or]: [
              'title', 'author', 'content', 'summary', 'topics'
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
          offset: (page - 1) * articlesPerPage,
          limit: articlesPerPage,
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
  async topicIndex (req, res) {
    try {
      let entries = null
      const topic = req.query.topic
      const page = req.query.page
      const articlesPerPage = 6
      entries = await Entry.findAll({
        offset: (page - 1) * articlesPerPage,
        limit: articlesPerPage,
        where: {
          topics: {
            [Op.like]: `%${topic}%`
          }
        },
        order: [
          ['id', 'DESC'],
          ['title', 'ASC']
        ]
      })
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
              'title', 'author', 'content', 'topics'
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
  async topicCount (req, res) {
    try {
      let numEntries = null
      const topic = req.query.topic
      numEntries = await Entry.count({
        where: {
          topics: {
            [Op.like]: `%${topic}%`
          }
        }
      })
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
      const entry = await Entry.findByPk(req.params.entryId) // find by primary key
      res.send(entry)
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
          id: req.params.entryId
        }
      })
      res.send(entry)
    } catch (error) {
      res.status(500).send({
        error: 'An error occured while updating entry'
      })
    }
  },
  async delete (req, res) {
    try {
      const { entryId } = req.query
      const exists = await Entry.findOne({
        where: {
          Id: entryId
        }
      })
      if (!exists) {
        res.status(400).send({
          error: 'This entry does not exist'
        })
      }
      await Entry.destroy({
        where: {
          Id: entryId
        }
      })
      res.send({
        data: 'Entry destroyed'
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while deleting the entry'
      })
    }
  }
}
