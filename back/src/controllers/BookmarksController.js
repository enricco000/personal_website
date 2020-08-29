const { Bookmark, Entry } = require('../models')
// const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const { entryId } = req.query
      const bookmark = await Bookmark.findOne({
        where: {
          EntryId: entryId,
          UserId: userId
        }
      })
      if (bookmark) {
        res.send(true)
      } else {
        res.send(false)
      }
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while fetching bookmark'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const { entryId } = req.body.params
      const exists = await Bookmark.findOne({
        where: {
          EntryId: entryId,
          UserId: userId
        }
      })
      if (exists) {
        res.status(400).send({
          error: 'This entry is already bookmarked'
        })
      }
      const created = await Bookmark.create({
        UserId: userId,
        EntryId: entryId
      })
      res.send({ bookmarked: created.EntryId })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occured while creating the bookmark'
      })
    }
  },
  async delete (req, res) {
    try {
      const userId = req.user.id
      const { entryId } = req.query
      const exists = await Bookmark.findOne({
        where: {
          UserId: userId,
          EntryId: entryId
        }
      })
      if (!exists) {
        res.status(400).send({
          error: 'This entry was not bookmarked'
        })
      }
      await Bookmark.destroy({
        where: {
          UserId: userId,
          EntryId: entryId
        }
      })
      res.send({
        data: 'Bookmark destroyed'
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while deleting the bookmark'
      })
    }
  },
  async indexer (req, res) {
    try {
      const userId = req.user.id
      const bookmarks = await Bookmark.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Entry
          }
        ],
        order: [
          ['id', 'DESC']
        ]
      })
      bookmarks.map(bookmark => bookmark.toJSON())
      res.send(bookmarks)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occured while fetching bookmarks'
      })
    }
  }
}
