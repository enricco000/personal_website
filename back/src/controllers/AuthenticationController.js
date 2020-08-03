const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const bcrypt = require('bcryptjs')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const { email, username } = req.body
      const existingEmail = await User.findOne({
        where: {
          email: email
        }
      })
      const existingUsername = await User.findOne({
        where: {
          username: username
        }
      })
      if (existingEmail != null) {
        res.status(400).send({
          error: 'This email account already has a username associated'
        })
      }
      if (existingUsername != null) {
        res.status(400).send({
          error: 'This username is taken'
        })
      }
      if (existingEmail == null && existingUsername == null) {
        req.body.isAdmin = false
        const user = await User.create(req.body)
        res.send(user.toJSON())
      }
    } catch (err) {
      res.status(500).send({
        error: 'An error occured during registration'
      })
    }
  },

  async login (req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({
        where: {
          username: username
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'The login information is incorrect'
        })
      }
      bcrypt.compare(password, user.password, function (err, response) {
        if (err) {
          throw err
        } else if (response === true) {
          const userJSON = user.toJSON()
          return res.send({
            user: userJSON,
            token: jwtSignUser(userJSON)
          })
        } else {
          return res.status(403).send({
            error: 'The login information is incorrect'
          })
        }
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to login'
      })
    }
  }
}
