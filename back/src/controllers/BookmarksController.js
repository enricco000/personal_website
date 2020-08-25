const { Bookmark, Entry } = require('../models')
const _ = require('lodash')

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
      const UserId = req.user.id
      const { EntryId } = req.body.params
      const exists = await Bookmark.findOne({
        where: {
          EntryId: EntryId,
          UserId: UserId
        }
      })
      if (exists) {
        res.status(400).send({
          error: 'This entry is already bookmarked'
        })
      }
      const created = await Bookmark.create({
        UserId: UserId,
        EntryId: EntryId
      })
      res.send(created)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while creating the bookmark'
      })
    }
  },
  async delete (req, res) {
    try {
      const UserId = req.user.id
      const { EntryId } = req.query
      const exists = await Bookmark.findOne({
        where: {
          UserId: UserId,
          EntryId: EntryId
        }
      })
      if (!exists) {
        res.status(400).send({
          error: 'This entry was not bookmarked'
        })
      }
      await Bookmark.destroy({
        where: {
          UserId: UserId,
          EntryId: EntryId
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
      const UserId = req.user.id
      const bookmarks = await Bookmark.findAll({
        where: {
          UserId: UserId
        },
        include: [
          {
            model: Entry
          }
        ]
      })
        .map(bookmarks => bookmarks.toJSON())
        .map(bookmarks => _.extend({
          bookmarkId: bookmarks.id
        }, bookmarks.Entry))
      res.send(bookmarks)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured while fetching bookmarks'
      })
    }
  }
}
